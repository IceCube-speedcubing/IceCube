import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

const algs = [
  { id: 1, name: "Aa", cube: "3x3", method: "cfop", algSet: "pll", alg: "x ( R' U R' ) D2 ( R U' R' ) D2 R2 x'", algImg: "/algs/3x3/cfop/pll/Aa.png" },
  { id: 2, name: "T", cube: "3x3", method: "cfop", algSet: "oll", alg: "F (R U R' U') F'", algImg: "/algs/3x3/cfop/oll/T.png" },
  // Add more alg data as needed
];

export function AlgTable() {
  return (
    <div className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-gray-300">Image</TableHead>
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Cube</TableHead>
            <TableHead className="text-gray-300">Method</TableHead>
            <TableHead className="text-gray-300">Alg Set</TableHead>
            <TableHead className="text-gray-300">Algorithm</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {algs.map((alg) => (
            <TableRow key={alg.id} className="border-b border-gray-700 hover:bg-[#0A4779] hover:bg-opacity-20 transition-colors duration-200">
              <TableCell>
                <Image src={alg.algImg} alt={alg.name} width={50} height={50} className="rounded-md" />
              </TableCell>
              <TableCell className="text-white">{alg.name}</TableCell>
              <TableCell className="text-white">{alg.cube}</TableCell>
              <TableCell className="text-white">{alg.method}</TableCell>
              <TableCell className="text-white">{alg.algSet}</TableCell>
              <TableCell className="text-white font-mono">{alg.alg}</TableCell>
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
