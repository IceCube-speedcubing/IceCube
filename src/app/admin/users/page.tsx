import { UserTable } from "@/components/admin/UserTable";
import { Sidebar } from "@/components/admin/Sidebar";
import { Background } from "@/components/Background";
import AdminCheck from "@/components/admin/AdminCheck";

export default function UsersPage() {
  return (
    <>
      <AdminCheck>
        <Background />
        <div className="flex min-h-screen relative z-10 pt-16">
          <Sidebar />
          <main className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Users</h2>
            <UserTable />
          </main>
        </div>
      </AdminCheck>
    </>
  );
}
