import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { supabase } from "@/lib/supabase";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Plus } from "lucide-react";
import { CreateTicketDialog } from "@/components/support/create-ticket-dialog";
import { TicketDetailsDialog } from "@/components/support/ticket-details-dialog";
import type { Tables } from "@/types/supabase";

// Define ticket type manually since it's not in the schema yet
type Ticket = {
  id: string;
  member_id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  created_at: string;
  updated_at: string;
};

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    try {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (err) {
      console.error("Error loading tickets:", err);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 space-y-6">
        <Breadcrumbs className="mb-6" />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Suporte</h1>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Ticket
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setSelectedTicket(ticket)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{ticket.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {ticket.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(ticket.status)}
                      >
                        {ticket.status === "open"
                          ? "Aberto"
                          : ticket.status === "in_progress"
                            ? "Em Andamento"
                            : "Fechado"}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={getPriorityColor(ticket.priority)}
                      >
                        {ticket.priority === "high"
                          ? "Alta"
                          : ticket.priority === "medium"
                            ? "Média"
                            : "Baixa"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {tickets.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">
                  Nenhum ticket de suporte
                </p>
                <p className="text-muted-foreground">
                  Crie um novo ticket para receber ajuda
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <CreateTicketDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onTicketCreated={loadTickets}
      />

      <TicketDetailsDialog
        ticket={selectedTicket as any}
        onOpenChange={(open) => !open && setSelectedTicket(null)}
        onTicketUpdated={loadTickets}
      />
    </div>
  );
}
