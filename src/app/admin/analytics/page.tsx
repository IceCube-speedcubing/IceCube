"use client";

import { Sidebar } from "@/components/admin/Sidebar";
import { Background } from "@/components/Background";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import AdminCheck from "@/components/admin/AdminCheck";

const userData = [
  { month: "January", users: 1200 },
  { month: "February", users: 1900 },
  { month: "March", users: 2400 },
  { month: "April", users: 2800 },
  { month: "May", users: 3500 },
  { month: "June", users: 4100 },
];

const courseData = [
  { month: "January", cfop: 80, roux: 40 },
  { month: "February", cfop: 120, roux: 60 },
  { month: "March", cfop: 150, roux: 80 },
  { month: "April", cfop: 200, roux: 100 },
  { month: "May", cfop: 250, roux: 120 },
  { month: "June", cfop: 300, roux: 150 },
];

const methodData = [
  { name: "CFOP", value: 400 },
  { name: "Roux", value: 300 },
  { name: "ZZ", value: 200 },
  { name: "Petrus", value: 100 },
];

const userChartConfig = {
  users: {
    label: "Users",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const courseChartConfig = {
  cfop: {
    label: "CFOP",
    color: "#2563eb",
  },
  roux: {
    label: "Roux",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const methodChartConfig = {
  value: {
    label: "Value",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const customTooltipStyle = {
  backgroundColor: "rgba(10, 71, 121, 0.9)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "10px",
};

export default function AnalyticsPage() {
  return (
    <>
      <AdminCheck>
        <Background />
        <div className="flex min-h-screen relative z-10 pt-16">
          <Sidebar />
          <main className="flex-1 p-6">
            <h2 className="text-4xl font-bold text-white mb-8">
              Analytics Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-300">
                    User Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={userChartConfig}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userData}>
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={customTooltipStyle}
                          itemStyle={{ color: "#ffffff" }}
                          labelStyle={{ color: "#a3e635", fontWeight: "bold" }}
                          cursor={{
                            stroke: "rgba(255, 255, 255, 0.2)",
                            strokeWidth: 2,
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="users"
                          stroke="var(--color-users)"
                          strokeWidth={2}
                          dot={{ fill: "var(--color-users)" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-300">
                    Course Enrollments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={courseChartConfig}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={courseData}>
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={customTooltipStyle}
                          itemStyle={{ color: "#ffffff" }}
                          labelStyle={{ color: "#a3e635", fontWeight: "bold" }}
                          cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
                        />
                        <Bar
                          dataKey="cfop"
                          fill="var(--color-cfop)"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="roux"
                          fill="var(--color-roux)"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-300">
                    Popular Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={methodChartConfig}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          dataKey="value"
                          nameKey="name"
                          data={methodData}
                          fill="#2563eb"
                          label
                        />
                        <Tooltip
                          contentStyle={customTooltipStyle}
                          itemStyle={{ color: "#ffffff" }}
                          labelStyle={{ color: "#a3e635", fontWeight: "bold" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </AdminCheck>
    </>
  );
}
