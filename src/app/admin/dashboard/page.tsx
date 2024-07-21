import { DashboardCard } from "@/components/admin/DashboardCard";
import { Sidebar } from "@/components/admin/Sidebar";
import { Background } from "@/components/Background";
import AdminCheck from "@/components/admin/AdminCheck";

export default function AdminDashboard() {
  return (
    <>
      <AdminCheck>
        <Background />
        <div className="flex min-h-screen relative z-10">
          <Sidebar />
          <main className="flex-1 p-6 pt-24">
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard title="Total Users" value="5,000" />
              <DashboardCard title="Active Courses" value="20" />
              <DashboardCard title="Revenue" value="$10,000" />
            </div>
            {/* Add more dashboard content here */}
          </main>
        </div>
      </AdminCheck>
    </>
  );
}
