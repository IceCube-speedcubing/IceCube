import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const courses = [
  { id: 1, name: "Advanced CFOP", category: "3x3", enrollments: 250 },
  { id: 2, name: "Beginner's Guide to 4x4", category: "4x4", enrollments: 150 },
  // Add more course data as needed
];

export function CourseTable() {
  return (
    <div className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-gray-300">Course Name</TableHead>
            <TableHead className="text-gray-300">Category</TableHead>
            <TableHead className="text-gray-300">Enrollments</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id} className="border-b border-gray-700 hover:bg-[#0A4779] hover:bg-opacity-20 transition-colors duration-200">
              <TableCell className="text-white">{course.name}</TableCell>
              <TableCell className="text-white">{course.category}</TableCell>
              <TableCell className="text-white">{course.enrollments}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
