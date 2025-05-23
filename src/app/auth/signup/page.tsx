'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedBackground } from "@/components/animatedBackground";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20 relative overflow-hidden z-[1]">
     <AnimatedBackground variant="primary" />

      <div className="relative w-full max-w-md space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl font-bold tracking-tight">
              Create your <span className="text-primary">account</span>
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Join our community and start tracking your progress
            </p>
          </motion.div>
        </div>

        {/* Sign Up Form */}
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

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative group">
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
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
                  placeholder="Create a password"
                  className="h-11 bg-card/50 focus:ring-2 focus:ring-primary/50 pr-10 transition-all duration-200"
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
                Create Account
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
          className="text-center space-y-4"
        >
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:text-primary/90 font-medium transition-colors"
            >
              Sign In
            </Link>
          </p>
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );

}