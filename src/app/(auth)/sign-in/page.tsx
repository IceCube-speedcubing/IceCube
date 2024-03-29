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

const SignInPage = () => {
  return (
    <div className="bg-[#001A2C] pt-5 pb-10 h-screen flex items-center justify-center">
        <Card className="mx-auto max-w-sm min-w-[400px]  bg-[#003356] border-0">
      <CardHeader>
        <CardTitle className="text-2xl text-[#fff]">Login</CardTitle>
        <CardDescription className="text-gray-300">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
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
              <Link href="#" className="ml-auto inline-block text-sm underline text-gray-300">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with WCA
          </Button>
        </div>
        <div className="mt-4 text-center text-sm text-gray-200">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default SignInPage