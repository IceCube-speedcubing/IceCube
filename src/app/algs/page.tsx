import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const cubes = [
  {
    name: "3x3",
    Icon: "/nav/3x3.png",
  }
]

const AlgsPage = () => {
    return (
      <>
        <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl"></CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
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
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>

<section className='border-t border-gray-200 bg-gray-50 dark:bg-[#0a0e1ec5]'>
<MaxWidthWrapper className='py-20'>
  <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
    {cubes.map((cubes) => (
      <div
        key={cubes.name}
        className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
        <div className='md:flex-shrink-0 flex justify-center'>
          <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-[#0f152dc5] text-blue-900'>
            {<cubes.Icon />}
          </div>
        </div>

        <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
          <h3 className='text-base font-medium text-gray-900 dark:text-[#6e6e6e]'>
            {cubes.name}
          </h3>
        </div>
      </div>
    ))}
  </div>
</MaxWidthWrapper>
</section>
</>
    )
}

export default AlgsPage