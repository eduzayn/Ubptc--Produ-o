import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button-fix";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, MoreVertical, FileCheck } from "lucide-react";
import { DocumentApprovalDialog } from "@/components/admin/document-approval-dialog";
import { CredentialValidator } from "@/components/admin/credential-validator";
import type { Tables } from "@/types/supabase";

type Member = Tables<"members">;

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      console.error("Error loading members:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredMembers = members.filter(
    (member) =>
      member.full_name.toLowerCase().includes(search.toLowerCase()) ||
      member.cpf.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Associados</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar associados..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-4">
              {loading
                ? [...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-24 rounded-lg bg-muted animate-pulse"
                    />
                  ))
                : filteredMembers.map((member) => (
                    <Card
                      key={member.id}
                      className="hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage
                                src={member.photo_url || undefined}
                              />
                              <AvatarFallback>
                                {member.full_name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h3 className="font-semibold">
                                {member.full_name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {member.cpf}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="secondary"
                              className={
                                member.active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {member.active ? "Ativo" : "Pendente"}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedMember(member)}
                            >
                              <FileCheck className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </div>

          <div>
            <CredentialValidator />
          </div>
        </div>

        <DocumentApprovalDialog
          member={selectedMember}
          open={!!selectedMember}
          onOpenChange={(open) => !open && setSelectedMember(null)}
          onUpdate={loadMembers}
        />
      </div>
    </AdminLayout>
  );
}
