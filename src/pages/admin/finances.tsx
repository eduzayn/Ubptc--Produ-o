import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button-fix";
import { Search } from "lucide-react";

type Payment = {
  id: string;
  member_id: string;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string | null;
};

export default function AdminFinancesPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {
    try {
      // Mock data for development
      const mockPayments = [
        {
          id: "1",
          member_id: "123",
          amount: 399.9,
          payment_method: "credit_card",
          status: "paid",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          member_id: "456",
          amount: 349.9,
          payment_method: "pix",
          status: "pending",
          created_at: new Date().toISOString(),
        },
        {
          id: "3",
          member_id: "789",
          amount: 199.9,
          payment_method: "boleto",
          status: "failed",
          created_at: new Date().toISOString(),
        },
      ];

      setPayments(mockPayments);
    } catch (err) {
      console.error("Error loading payments:", err);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const filteredPayments = payments.filter(
    (payment) =>
      payment.payment_method.toLowerCase().includes(search.toLowerCase()) ||
      payment.status.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Financeiro</h1>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar pagamentos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            filteredPayments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">
                        Associado #{payment.member_id}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.created_at!).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(payment.amount)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {payment.payment_method}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(payment.status)}
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
