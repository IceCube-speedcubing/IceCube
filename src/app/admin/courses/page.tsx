import { CourseTable } from "@/components/admin/CourseTable";
import { Background } from "@/components/Background";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";

export default function CoursesPage() {
  return (
    <>
        <Background />
        <div className="flex min-h-screen relative z-10 pt-16">
          <main className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Courses</h2>
              <Button className="bg-[#0A4779] hover:bg-[#083A61]">
                <BookPlus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </div>
            <CourseTable />
          </main>
        </div>
    </>
  );
}
