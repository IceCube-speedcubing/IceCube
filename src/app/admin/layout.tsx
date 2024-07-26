import AdminCheck from "@/components/admin/AdminCheck";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminCheck>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8 bg-gray-100">{children}</main>
      </div>
    </AdminCheck>
  );
}
