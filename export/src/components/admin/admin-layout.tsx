import { Header } from "../layout/header";
import { AdminNav } from "./admin-nav";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6 flex gap-6">
        <aside className="w-64 shrink-0">
          <AdminNav />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
