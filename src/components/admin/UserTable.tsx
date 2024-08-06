"use client";

import { useState, useEffect } from "react";
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

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/getall/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Role</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow
              key={user._id}
              className="border-b border-gray-700 hover:bg-[#0A4779] hover:bg-opacity-20 transition-colors duration-200"
            >
              <TableCell className="text-white">{user.name}</TableCell>
              <TableCell className="text-white">{user.email}</TableCell>
              <TableCell className="text-white">
                {user.isAdmin ? "Admin" : "User"}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
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
  );
}
