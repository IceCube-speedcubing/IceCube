import AdminCheck from "@/components/admin/AdminCheck";
import { AlgTable } from "@/components/admin/AlgTable";
import { Sidebar } from "@/components/admin/Sidebar";
import { Background } from "@/components/Background";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AlgsPage() {
  return (
    <>
      <AdminCheck>
        <Background />
        <div className="flex min-h-screen relative z-10 pt-16">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Algorithms</h2>
              <Button className="bg-[#0A4779] hover:bg-[#083A61]">
                <Plus className="mr-2 h-4 w-4" />
                Add Algorithm
              </Button>
            </div>
            <AlgTable />
          </main>
        </div>
      </AdminCheck>
    </>
  );
}
