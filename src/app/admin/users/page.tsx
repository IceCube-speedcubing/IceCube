import UserTable from "@/components/admin/UserTable";
import { Background } from "@/components/Background";

export default function UsersPage() {
  return (
    <>
        <Background />
        <div className="flex min-h-screen relative z-10 pt-16">
          <main className="flex-1 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Users</h2>
            <UserTable />
          </main>
        </div>
    </>
  );
}
