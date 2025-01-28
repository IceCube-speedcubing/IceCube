'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
        />
      </div>

      <div className="relative w-full max-w-md space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome <span className="text-primary">back</span>
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Sign in to continue your progress
            </p>
          </motion.div>
        </div>

        {/* Sign In Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-xl border shadow-lg"
        >
          <form className="space-y-4" suppressHydrationWarning>
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 bg-card/50 focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                  suppressHydrationWarning
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-10 transition-opacity blur-sm pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 bg-card/50 focus:ring-2 focus:ring-primary/50 pr-10 transition-all duration-200"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-10 transition-opacity blur-sm pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:text-primary/90 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full h-11 group",
                "bg-gradient-to-r from-primary/90 to-primary",
                "text-primary-foreground font-medium",
                "shadow-lg shadow-primary/25 hover:shadow-primary/40",
                "hover:scale-[1.02] transition-all duration-200"
              )}
            >
              <span className="flex items-center gap-2">
                Sign In
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary hover:text-primary/90 font-medium transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}