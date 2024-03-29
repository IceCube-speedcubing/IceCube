import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SignUpPage = () => {
  return (
    <div className="bg-[#001A2C] pt-5 pb-10 h-screen flex items-center justify-center">
        <Card className="mx-auto max-w-sm min-w-[400px] bg-[#003356] border-0">
      <CardHeader>
        <CardTitle className="text-2xl text-[#fff]">Sign up</CardTitle>
        <CardDescription className="text-gray-300">
          Create an account below to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
          <Label htmlFor="text" className="text-[#fff]">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="username"
              required
            />
            <Label htmlFor="email" className="text-[#fff]">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password" className="text-[#fff]">Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          <Button variant="outline" className="w-full">
            Sing up with WCA
          </Button>
        </div>
        <div className="mt-4 text-center text-sm text-gray-200">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default SignUpPage