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
    <div className="fixed inset-0 flex min-h-screen items-center justify-center bg-gray-100 overflow-hidden">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-white py-6 px-8">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 bg-white py-8 px-10">
          <div>
            <Label htmlFor="email" className="text-gray-700 font-semibold mb-2">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="border border-gray-300 rounded-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700 font-semibold mb-2">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              className="border border-gray-300 rounded-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-3 transition-colors duration-300"
          >
            Login
          </Button>
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:text-blue-600">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignInPage
