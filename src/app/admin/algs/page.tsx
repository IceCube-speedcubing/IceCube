"use client";

import { useState, useEffect } from "react";
import AdminCheck from "@/components/admin/AdminCheck";
import { AlgTable } from "@/components/admin/AlgTable";
import { Sidebar } from "@/components/admin/Sidebar";
import { Background } from "@/components/Background";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "react-hot-toast";

export default function AlgsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [cube, setCube] = useState("");
  const [method, setMethod] = useState("");
  const [algSet, setAlgSet] = useState("");
  const [algName, setAlgName] = useState("");
  const [alg, setAlg] = useState("");
  const [algImage, setAlgImage] = useState<File | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imagePath = `/algs/${cube}/${method}/${algSet}/${algName}.png`;

    const payload = {
      cube,
      method,
      set: algSet,
      alg: algName,
      data: alg,
      img: imagePath,
      name: "James",
      password: "James",
      email: "james@czak.me",
    };

    try {
      toast.loading("Adding algorithm...");

      const response = await fetch("http://localhost:8080/api/algs/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add algorithm");
      }

      console.log("Algorithm created successfully:", responseData);
      setIsOpen(false);
      toast.success("Algorithm added successfully!");

      // Reset form fields and trigger refresh
      setCube("");
      setMethod("");
      setAlgSet("");
      setAlgName("");
      setAlg("");
      setAlgImage(null);
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error creating algorithm:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <>
      <AdminCheck>
        <Background />
        <div className="flex min-h-screen relative z-10 pt-16">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Algorithms</h2>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#0A4779] to-[#083A61] hover:from-[#083A61] hover:to-[#0A4779] text-white transition-all duration-300 transform hover:scale-105">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Algorithm
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-black bg-opacity-70 backdrop-blur-lg text-white shadow-2xl rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center text-white mb-6">
                      Add New Algorithm
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {[
                      {
                        id: "cube",
                        label: "Cube",
                        placeholder: "e.g., 3x3",
                        value: cube,
                        onChange: setCube,
                      },
                      {
                        id: "method",
                        label: "Method",
                        placeholder: "e.g., CFOP",
                        value: method,
                        onChange: setMethod,
                      },
                      {
                        id: "algSet",
                        label: "Algorithm Set",
                        placeholder: "e.g., OLL",
                        value: algSet,
                        onChange: setAlgSet,
                      },
                      {
                        id: "algName",
                        label: "Algorithm Name",
                        placeholder: "e.g., OLL 1",
                        value: algName,
                        onChange: setAlgName,
                      },
                      {
                        id: "alg",
                        label: "Algorithm",
                        placeholder: "Enter algorithm notation",
                        value: alg,
                        onChange: setAlg,
                      },
                    ].map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label
                          htmlFor={field.id}
                          className="text-sm font-medium text-gray-300"
                        >
                          {field.label}
                        </Label>
                        <Input
                          id={field.id}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          placeholder={field.placeholder}
                          className="bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder-gray-500 focus:ring-[#0A4779] focus:border-[#0A4779] transition-all duration-200"
                        />
                      </div>
                    ))}
                    <div className="space-y-2">
                      <Label
                        htmlFor="algImage"
                        className="text-sm font-medium text-gray-300"
                      >
                        Algorithm Image
                      </Label>
                      <div className="relative">
                        <Input
                          id="algImage"
                          type="file"
                          onChange={(e) =>
                            setAlgImage(e.target.files?.[0] || null)
                          }
                          accept="image/*"
                          className="hidden"
                        />
                        <label
                          htmlFor="algImage"
                          className="flex items-center justify-center w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-md cursor-pointer hover:bg-opacity-70 transition-all duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {algImage ? algImage.name : "Choose an image"}
                        </label>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#0A4779] to-[#083A61] hover:from-[#083A61] hover:to-[#0A4779] text-white py-3 rounded-md transition-all duration-300 transform hover:scale-105"
                    >
                      Add Algorithm
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <AlgTable key={refreshKey} />
          </main>
        </div>
      </AdminCheck>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />
    </>
  );
}
