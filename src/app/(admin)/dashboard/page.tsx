'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Home, LineChart, ShoppingCart, Users } from 'lucide-react'
import algData from '@/data/alg-data.json'
import Image from 'next/image'

const AdminPage = () => {
  const [cubes, setCubes] = useState(algData[0].cubes)
  const [algs, setAlgs] = useState(algData[1].algs)

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <span className="flex items-center gap-2 text-lg font-semibold">Acme Inc</span>
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
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Add Product
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Algorithms</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Cube</th>
                  <th className="px-4 py-2">Method</th>
                  <th className="px-4 py-2">Algorithm Set</th>
                  <th className="px-4 py-2">Algorithm Name</th>
                  <th className="px-4 py-2">Algorithm</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {algs.map((alg, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{alg.cube}</td>
                    <td className="px-4 py-2 border">{alg.method}</td>
                    <td className="px-4 py-2 border">{alg.algSet}</td>
                    <td className="px-4 py-2 border">{alg.algName}</td>
                    <td className="px-4 py-2 border">{alg.alg}</td>
                    <td className="px-4 py-2 border">
                      <Image src={alg.algImg} alt={alg.algName} width={50} height={50} />
                    </td>
                    <td className="px-4 py-2 border">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="ml-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

const NavLink = ({ href, icon, children }) => (
  <Link
    href={href}
    className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/20"
  >
    {icon}
    <span>{children}</span>
  </Link>
)

export default AdminPage
