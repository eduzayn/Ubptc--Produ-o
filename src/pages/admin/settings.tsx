import { AdminLayout } from "@/components/admin/admin-layout";
import { SiteSettingsEditor } from "@/components/admin/site-settings-editor";

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <SiteSettingsEditor />
    </AdminLayout>
  );
}
