import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface Alg {
  _id: string;
  img: string;
  alg: string;
  cube: string;
  method: string;
  set: string;
  data: string;
}

export function AlgTable() {
  const [algs, setAlgs] = useState<Alg[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAlg, setEditingAlg] = useState<Alg | null>(null);

  useEffect(() => {
    fetchAlgs();
  }, []);

  const fetchAlgs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/algs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        const data = await response.json();
        setAlgs(data.data);
      } else {
        toast({
          title: "Failed to fetch algorithms",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching algs:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (alg: Alg) => {
    setEditingAlg(alg);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingAlg) return;

    try {
      const response = await fetch("http://localhost:8080/api/algs/update/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          old_data: {
            cube: editingAlg.cube,
            method: editingAlg.method,
            set: editingAlg.set,
            alg: editingAlg.alg,
          },
          new_data: editingAlg,
          name: "James",
          password: "James",
          email: "james@czak.me",
        }),
      });

      const responseText = await response.text();
      console.log("API Response:", responseText);

      if (response.ok) {
        toast({
          title: "Success",
          description: "Algorithm updated successfully in the database",
        });
        setIsEditDialogOpen(false);
        fetchAlgs();
      } else {
        throw new Error(responseText || "Failed to update algorithm");
      }
    } catch (error) {
      console.error("Error updating alg:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = async (alg: Alg) => {
    try {
      const response = await fetch("http://localhost:8080/api/algs/delete/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cube: alg.cube,
          method: alg.method,
          set: alg.set,
          alg: alg.alg,
          name: "James",
          password: "James",
          email: "james@czak.me",
        }),
      });

      const responseText = await response.text();
      console.log("API Response:", responseText);

      if (response.ok) {
        toast({
          title: "Success",
          description: "Algorithm deleted successfully",
        });
        fetchAlgs(); 
      } else {
        throw new Error(responseText || "Failed to delete algorithm");
      }
    } catch (error) {
      console.error("Error deleting alg:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <>
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
              <TableRow
                key={alg._id}
                className="border-b border-gray-700 hover:bg-[#0A4779] hover:bg-opacity-20 transition-colors duration-200"
              >
                <TableCell>
                  <Image
                    src={alg.img}
                    alt={alg.alg}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="text-white">{alg.alg}</TableCell>
                <TableCell className="text-white">{alg.cube}</TableCell>
                <TableCell className="text-white">{alg.method}</TableCell>
                <TableCell className="text-white">{alg.set}</TableCell>
                <TableCell className="text-white font-mono">
                  {alg.data}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-transparent"
                      onClick={() => handleEditClick(alg)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-transparent"
                      onClick={() => handleDeleteClick(alg)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg border border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-400">
              Edit Algorithm
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Refine your algorithm details below. Save when you're satisfied.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-6 py-4">
              {["cube", "method", "set", "alg", "data"].map((field) => (
                <div
                  key={field}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label
                    htmlFor={field}
                    className="text-right font-medium text-gray-300"
                  >
                    {field === "alg"
                      ? "Name"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    id={field}
                    value={editingAlg?.[field as keyof Alg] || ""}
                    onChange={(e) =>
                      setEditingAlg(
                        editingAlg
                          ? { ...editingAlg, [field]: e.target.value }
                          : null
                      )
                    }
                    className="col-span-3 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="text-gray-300 border-gray-700 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
