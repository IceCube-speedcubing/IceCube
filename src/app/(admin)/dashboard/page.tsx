"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  LineChart,
  ShoppingCart,
  Users,
  Edit,
  Plus,
  Menu,
} from "lucide-react";
import algData from "@/data/alg-data.json";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPage = () => {
  const [cubes, setCubes] = useState(algData[0].cubes.map((cube) => cube.name));
  const [algs, setAlgs] = useState(algData[1].algs);
  const [methods, setMethods] = useState([]);
  const [algSets, setAlgSets] = useState([]);

  const [newAlgCube, setNewAlgCube] = useState("");
  const [newAlgMethod, setNewAlgMethod] = useState("");
  const [newAlgSet, setNewAlgSet] = useState("");
  const [newAlgName, setNewAlgName] = useState("");
  const [newAlgString, setNewAlgString] = useState("");
  const [newAlgImg, setNewAlgImg] = useState(null);
  const [isAddAlgDialogOpen, setIsAddAlgDialogOpen] = useState(false);

  const [editAlgIndex, setEditAlgIndex] = useState(-1);
  const [editAlgCube, setEditAlgCube] = useState("");
  const [editAlgMethod, setEditAlgMethod] = useState("");
  const [editAlgSet, setEditAlgSet] = useState("");
  const [editAlgName, setEditAlgName] = useState("");
  const [editAlgString, setEditAlgString] = useState("");
  const [editAlgImg, setEditAlgImg] = useState(null);
  const [isEditAlgDialogOpen, setIsEditAlgDialogOpen] = useState(false);

  useEffect(() => {
    const uniqueMethods = new Set(algs.map((alg) => alg.method));
    setMethods(Array.from(uniqueMethods));

    const uniqueAlgSets = new Set(algs.map((alg) => alg.algSet));
    setAlgSets(Array.from(uniqueAlgSets));
  }, [algs]);

  const handleAddAlg = (e) => {
    e.preventDefault();
    if (
      newAlgCube &&
      newAlgMethod &&
      newAlgSet &&
      newAlgName &&
      newAlgString &&
      newAlgImg
    ) {
      const newAlgorithm = {
        cube: newAlgCube,
        method: newAlgMethod,
        algSet: newAlgSet,
        algName: newAlgName,
        alg: newAlgString,
        algImg:
          typeof newAlgImg === "string"
            ? newAlgImg
            : URL.createObjectURL(newAlgImg),
      };

      // Save the new algorithm to the JSON file
      const updatedData = [...algData];
      updatedData[1].algs[editAlgIndex] = updatedAlg;
      saveDataToFile(updatedData);

      const updatedAlgs = [...algs];
      updatedAlgs[editAlgIndex] = updatedAlg;
      setAlgs(updatedAlgs);
      setEditAlgIndex(-1);
      setEditAlgCube("");
      setEditAlgMethod("");
      setEditAlgSet("");
      setEditAlgName("");
      setEditAlgString("");
      setEditAlgImg(null);
      setIsEditAlgDialogOpen(false);
    }
  };

  const handleEditAlg = (index) => {
    const alg = algs[index];
    setEditAlgIndex(index);
    setEditAlgCube(alg.cube);
    setEditAlgMethod(alg.method);
    setEditAlgSet(alg.algSet);
    setEditAlgName(alg.algName);
    setEditAlgString(alg.alg);
    setEditAlgImg(alg.algImg);
    setIsEditAlgDialogOpen(true);
  };

  const handleUpdateAlg = () => {
    if (
      editAlgCube &&
      editAlgMethod &&
      editAlgSet &&
      editAlgName &&
      editAlgString &&
      editAlgImg
    ) {
      const updatedAlg = {
        cube: editAlgCube,
        method: editAlgMethod,
        algSet: editAlgSet,
        algName: editAlgName,
        alg: editAlgString,
        algImg:
          typeof editAlgImg === "string"
            ? editAlgImg
            : URL.createObjectURL(editAlgImg),
      };

      const updatedAlgs = [...algs];
      updatedAlgs[editAlgIndex] = updatedAlg;
      setAlgs(updatedAlgs);
      setEditAlgIndex(-1);
      setEditAlgCube("");
      setEditAlgMethod("");
      setEditAlgSet("");
      setEditAlgName("");
      setEditAlgString("");
      setEditAlgImg(null);
      setIsEditAlgDialogOpen(false);
    }
  };

  const handleAddAlgDialogOpen = () => {
    setIsAddAlgDialogOpen(true);
  };

  const handleAddAlgDialogClose = () => {
    setIsAddAlgDialogOpen(false);
    // Reset the form fields
    setNewAlgCube("");
    setNewAlgMethod("");
    setNewAlgSet("");
    setNewAlgName("");
    setNewAlgString("");
    setNewAlgImg(null);
  };

  const handleDeleteAlg = (index) => {
    // Remove the algorithm from the JSON file
    const updatedData = [...algData];
    updatedData[1].algs.splice(index, 1);
    saveDataToFile(updatedData);

    const updatedAlgs = [...algs];
    updatedAlgs.splice(index, 1);
    setAlgs(updatedAlgs);
  };

  const saveDataToFile = async (data) => {
    try {
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save data to file");
      }
    } catch (error) {
      console.error("Error saving data to file:", error);
    }
  };

  const handleNewCube = () => {
    const newCube = prompt("Enter the name of the new cube:");
    if (newCube && !cubes.includes(newCube)) {
      setCubes([...cubes, newCube]);
      setNewAlgCube(newCube);
    }
  };

  const handleNewMethod = () => {
    const newMethod = prompt("Enter the name of the new method:");
    if (newMethod && !methods.includes(newMethod)) {
      setMethods([...methods, newMethod]);
      setNewAlgMethod(newMethod);
    }
  };

  const handleNewAlgSet = () => {
    const newSet = prompt("Enter the name of the new algorithm set:");
    if (newSet && !algSets.includes(newSet)) {
      setAlgSets([...algSets, newSet]);
      setNewAlgSet(newSet);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 hidden h-full border-r bg-white md:block">
          <div className="flex h-full max-h-screen flex-col pt-16">
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <nav className="grid items-start text-sm font-medium">
                <div className="mt-4 space-y-2">
                  <NavLink href="#" icon={<Home className="h-5 w-5" />}>
                    Dashboard
                  </NavLink>
                  <NavLink href="#" icon={<ShoppingCart className="h-5 w-5" />}>
                    Inventory
                  </NavLink>
                  <NavLink href="#" icon={<Users className="h-5 w-5" />}>
                    Customers
                  </NavLink>
                  <NavLink href="#" icon={<LineChart className="h-5 w-5" />}>
                    Analytics
                  </NavLink>
                </div>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-0 flex flex-1 flex-col md:ml-[150px]">
          <div className="flex-1 flex-col gap-6 p-6 lg:gap-8 lg:p-8">
            <div className="flex items-center justify-between rounded-md bg-white p-4 shadow-md">
              <h1 className="text-2xl font-semibold">Inventory</h1>
              <Button
                variant="outline"
                onClick={() => setIsAddAlgDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add Algorithm
              </Button>
            </div>
            <Card className="flex-1 rounded-md shadow-md">
              <CardHeader className="bg-white p-4">
                <CardTitle className="text-xl">Algorithms</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4">
                <Tabs defaultValue="all" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    {cubes.map((cube) => (
                      <TabsTrigger key={cube} value={cube}>
                        {cube}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="all">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Cube</th>
                          <th className="px-4 py-2">Method</th>
                          <th className="px-4 py-2">Algorithm Set</th>
                          <th className="px-4 py-2">Algorithm Name</th>
                          <th className="px-4 py-2">Algorithm String</th>
                          <th className="px-4 py-2">Algorithm Image</th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {algs.map((alg, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">{alg.cube}</td>
                            <td className="px-4 py-2">{alg.method}</td>
                            <td className="px-4 py-2">{alg.algSet}</td>
                            <td className="px-4 py-2">{alg.algName}</td>
                            <td className="px-4 py-2">{alg.alg}</td>
                            <td className="px-4 py-2">
                              <Image
                                src={alg.algImg}
                                alt="Algorithm Image"
                                width={50}
                                height={50}
                                className="rounded-md"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger>
                                  <Button variant="outline">Actions</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={() => handleEditAlg(index)}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteAlg(index)}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </TabsContent>
                  {cubes.map((cube) => (
                    <TabsContent key={cube} value={cube}>
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="px-4 py-2">Method</th>
                            <th className="px-4 py-2">Algorithm Set</th>
                            <th className="px-4 py-2">Algorithm Name</th>
                            <th className="px-4 py-2">Algorithm String</th>
                            <th className="px-4 py-2">Algorithm Image</th>
                            <th className="px-4 py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {algs
                            .filter((alg) => alg.cube === cube)
                            .map((alg, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2">{alg.method}</td>
                                <td className="px-4 py-2">{alg.algSet}</td>
                                <td className="px-4 py-2">{alg.algName}</td>
                                <td className="px-4 py-2">{alg.alg}</td>
                                <td className="px-4 py-2">
                                  <Image
                                    src={alg.algImg}
                                    alt="Algorithm Image"
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                  />
                                </td>
                                <td className="px-4 py-2">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger>
                                      <Button variant="outline">Actions</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem
                                        onClick={() => handleEditAlg(index)}
                                      >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => handleDeleteAlg(index)}
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Edit Algorithm Dialog */}
      <Dialog open={isEditAlgDialogOpen} onOpenChange={setIsEditAlgDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Algorithm</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editAlgCube" className="text-right">
                Cube
              </Label>
              <div className="col-span-3 flex items-center">
                <select
                  id="editAlgCube"
                  value={editAlgCube}
                  onChange={(e) => setEditAlgCube(e.target.value)}
                  className="flex-1 rounded-md border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {cubes.map((cube) => (
                    <option key={cube} value={cube}>
                      {cube}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editAlgMethod" className="text-right">
                Method
              </Label>
              <div className="col-span-3 flex items-center">
                <select
                  id="editAlgMethod"
                  value={editAlgMethod}
                  onChange={(e) => setEditAlgMethod(e.target.value)}
                  className="flex-1 rounded-md border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {methods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editAlgSet" className="text-right">
                Algorithm Set
              </Label>
              <div className="col-span-3 flex items-center">
                <select
                  id="editAlgSet"
                  value={editAlgSet}
                  onChange={(e) => setEditAlgSet(e.target.value)}
                  className="flex-1 rounded-md border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {algSets.map((set) => (
                    <option key={set} value={set}>
                      {set}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editAlgName" className="text-right">
                Algorithm Name
              </Label>
              <Input
                id="editAlgName"
                type="text"
                placeholder="Enter algorithm name"
                value={editAlgName}
                onChange={(e) => setEditAlgName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editAlgString" className="text-right">
                Algorithm String
              </Label>
              <Input
                id="editAlgString"
                type="text"
                placeholder="Enter algorithm string"
                value={editAlgString}
                onChange={(e) => setEditAlgString(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editAlgImg" className="text-right">
                Algorithm Image{" "}
              </Label>
              <div className="col-span-3 flex items-center">
                <Input
                  id="editAlgImg"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditAlgImg(e.target.files[0])}
                  className="flex-1"
                />
                {editAlgImg && (
                  <div className="ml-4">
                    <Image
                      src={
                        typeof editAlgImg === "string"
                          ? editAlgImg
                          : URL.createObjectURL(editAlgImg)
                      }
                      alt="Algorithm Image"
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateAlg}>
              Update Algorithm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Algorithm Dialog */}
      <Dialog open={isAddAlgDialogOpen} onOpenChange={handleAddAlgDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Algorithm</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAlg}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newAlgCube" className="text-right">
                  Cube
                </Label>
                <div className="col-span-3 flex items-center">
                  <select
                    id="newAlgCube"
                    value={newAlgCube}
                    onChange={(e) => setNewAlgCube(e.target.value)}
                    className="flex-1 rounded-md border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {cubes.map((cube) => (
                      <option key={cube} value={cube}>
                        {cube}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="outline"
                    onClick={handleNewCube}
                    className="ml-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newAlgMethod" className="text-right">
                  Method
                </Label>
                <div className="col-span-3 flex items-center">
                  <select
                    id="newAlgMethod"
                    value={newAlgMethod}
                    onChange={(e) => setNewAlgMethod(e.target.value)}
                    className="flex-1 rounded-md border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {methods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="outline"
                    onClick={handleNewMethod}
                    className="ml-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newAlgSet" className="text-right">
                  Algorithm Set
                </Label>
                <div className="col-span-3 flex items-center">
                  <select
                    id="newAlgSet"
                    value={newAlgSet}
                    onChange={(e) => setNewAlgSet(e.target.value)}
                    className="flex-1 rounded-md border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {algSets.map((set) => (
                      <option key={set} value={set}>
                        {set}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="outline"
                    onClick={handleNewAlgSet}
                    className="ml-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newAlgName" className="text-right">
                  Algorithm Name
                </Label>
                <Input
                  id="newAlgName"
                  type="text"
                  placeholder="Enter algorithm name"
                  value={newAlgName}
                  onChange={(e) => setNewAlgName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newAlgString" className="text-right">
                  Algorithm String
                </Label>
                <Input
                  id="newAlgString"
                  type="text"
                  placeholder="Enter algorithm string"
                  value={newAlgString}
                  onChange={(e) => setNewAlgString(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newAlgImg" className="text-right">
                  Algorithm Image
                </Label>
                <div className="col-span-3 flex items-center">
                  <Input
                    id="newAlgImg"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewAlgImg(e.target.files[0])}
                    className="flex-1"
                  />
                  {newAlgImg && (
                    <div className="ml-4">
                      <Image
                        src={
                          typeof newAlgImg === "string"
                            ? newAlgImg
                            : URL.createObjectURL(newAlgImg)
                        }
                        alt="Algorithm Image"
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddAlgDialogOpen(true)}
                className="flex items-center gap-2"
                suppressHydrationWarning
              >
                <Plus className="h-4 w-4" />
                Add Algorithm
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const NavLink = ({ href, icon, children }) => (
  <Link
    href={href}
    className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/20"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default AdminPage;
