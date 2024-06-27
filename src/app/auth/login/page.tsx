"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // TODO: Implement form submission logic
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Add authentication logic here
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/images/gradiantBackground.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="opacity-80"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Content */}
      <Card className="relative z-10 w-full max-w-md bg-black bg-opacity-40 backdrop-blur-md border-0 shadow-2xl">
        <CardHeader className="space-y-1 pb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/IceCube-logo.png"
              alt="IceCube Logo"
              width={64}
              height={64}
              className="drop-shadow-glow"
            />
          </div>
          <CardTitle className="text-3xl text-center font-bold text-white">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-400 pl-10 focus:ring-2 focus:ring-[#0A4779] transition-all duration-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-400 pl-10 pr-10 focus:ring-2 focus:ring-[#0A4779] transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#0A4779] focus:ring-[#0A4779] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="font-medium text-[#0A4779] hover:text-[#083A61]"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-6">
            <Button
              type="submit"
              className="w-full bg-[#0A4779] hover:bg-[#083A61] text-white py-6 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Sign in
            </Button>
            <p className="text-sm text-center text-gray-300">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-[#0A4779] hover:text-[#083A61] font-semibold"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

// TODO: Implement error handling and display error messages to the user
// TODO: Add loading state for the sign-in button during form submission
// TODO: Implement "Remember me" functionality
// TODO: Create a "Forgot Password" page and link it
// TODO: Add client-side form validation (e.g., email format, password strength)
// TODO: Implement authentication state management (e.g., using React Context or a state management library)
// TODO: Add accessibility features (e.g., proper aria labels, keyboard navigation)
// TODO: Implement analytics tracking for login attempts and success/failure rates
