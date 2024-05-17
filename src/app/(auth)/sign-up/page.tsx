'use client'

import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const SignUpPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertTimeout, setAlertTimeout] = useState<NodeJS.Timeout | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Handle successful sign-up
        console.log('Sign-up successful')
        router.push('/sign-in') // Redirect to sign-in page
      } else if (response.status === 404) {
        // Handle 404 Not Found error
        setError('The sign-up endpoint is not available. Please contact the website administrators for assistance.')
        setShowAlert(true)
      } else {
        // Handle other errors
        const responseText = await response.text()
        let errorMessage

        try {
          const errorData = JSON.parse(responseText)
          errorMessage = errorData.message
        } catch (error) {
          // If the response is not valid JSON, use the response text as the error message
          errorMessage = responseText
        }

        console.error('Sign-up error:', errorMessage)
        setError(errorMessage)
        setShowAlert(true)
      }
    } catch (error) {
      console.error('An error occurred:', error)
      setError('An error occurred. Please try again later.')
      setShowAlert(true)
    }
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (showAlert) {
      timeout = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [showAlert]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Error Alert Popup */}
      {showAlert && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 -mt-20">
          <Alert variant="destructive" className="max-w-xs">
            <AlertTitle className="text-sm">Error</AlertTitle>
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        </div>
      )}

      <Card className="max-w-md w-full p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-blue-500 underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUpPage
