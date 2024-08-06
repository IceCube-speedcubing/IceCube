import { Background } from "@/components/Background";
import { DashboardCard } from "@/components/admin/DashboardCard";
import {
  FaUsers,
  FaShoppingCart,
  FaChartLine,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <>
      <Background />
      <div className="flex min-h-screen relative z-10">
        <main className="flex-1 p-6 pt-24">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Admin Overview
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard
              title="User Management"
              value="Manage Users"
              icon={<FaUsers className="text-blue-500 text-3xl" />}
            />
            <DashboardCard
              title="Order Management"
              value="View Orders"
              icon={<FaShoppingCart className="text-green-500 text-3xl" />}
            />
            <DashboardCard
              title="Analytics"
              value="View Reports"
              icon={<FaChartLine className="text-purple-500 text-3xl" />}
            />
            <DashboardCard
              title="Task Management"
              value="Manage Tasks"
              icon={<FaClipboardList className="text-yellow-500 text-3xl" />}
            />
            <DashboardCard
              title="System Settings"
              value="Configure"
              icon={<FaCog className="text-red-500 text-3xl" />}
            />
          </div>
        </main>
      </div>
    </>
  );
}
