import { DashboardCard } from "@/components/admin/DashboardCard";
import { Background } from "@/components/Background";

export default function AdminDashboard() {
  return (
    <>
      <Background />
      <div className="flex min-h-screen relative z-10">
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
    </>
  );
}
