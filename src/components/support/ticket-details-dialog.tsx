import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";
import type { Tables } from "@/types/supabase";

type Ticket = Tables<"support_tickets">;
type Message = Tables<"support_messages">;

interface TicketDetailsDialogProps {
  ticket: Ticket | null | undefined;
  onOpenChange: (open: boolean) => void;
  onTicketUpdated: () => void;
}

export function TicketDetailsDialog({
  ticket,
  onOpenChange,
  onTicketUpdated,
}: TicketDetailsDialogProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ticket) {
      loadMessages();
      const subscription = supabase
        .channel(`ticket-${ticket.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "support_messages",
            filter: `ticket_id=eq.${ticket.id}`,
          },
          (payload) => {
            setMessages((current) => [...current, payload.new as Message]);
          },
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [ticket]);

  async function loadMessages() {
    if (!ticket) return;

    try {
      const { data, error } = await supabase
        .from("support_messages")
        .select("*")
        .eq("ticket_id", ticket.id)
        .order("created_at");

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error("Error loading messages:", err);
      setError("Falha ao carregar mensagens");
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket || !newMessage.trim()) return;

    try {
      setLoading(true);
      setError("");

      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .select("id")
        .eq("user_id", user?.id)
        .single();

      if (memberError) throw memberError;

      const { error: messageError } = await supabase
        .from("support_messages")
        .insert({
          ticket_id: ticket.id,
          member_id: memberData.id,
          message: newMessage,
        });

      if (messageError) throw messageError;

      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Falha ao enviar mensagem");
    } finally {
      setLoading(false);
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={!!ticket} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{ticket.title}</span>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={
                  ticket.status === "open"
                    ? "bg-green-100 text-green-800"
                    : ticket.status === "closed"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-100 text-blue-800"
                }
              >
                {ticket.status === "open"
                  ? "Aberto"
                  : ticket.status === "in_progress"
                    ? "Em Andamento"
                    : "Fechado"}
              </Badge>
              <Badge
                variant="secondary"
                className={
                  ticket.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : ticket.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                }
              >
                {ticket.priority === "high"
                  ? "Alta"
                  : ticket.priority === "medium"
                    ? "Média"
                    : "Baixa"}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <p className="text-muted-foreground">{ticket.description}</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.admin_id ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${message.admin_id ? "bg-muted" : "bg-primary text-primary-foreground"}`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={loading || ticket.status === "closed"}
          />
          <Button
            type="submit"
            disabled={
              loading || !newMessage.trim() || ticket.status === "closed"
            }
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
