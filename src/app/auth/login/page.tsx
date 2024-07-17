"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Background } from "@/components/Background";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setLoginAttempts((prev) => prev + 1);

    try {
      if (auth && auth.login) {
        const success = await auth.login(values.email, values.password);

        if (success) {
          toast({
            title: "Login successful!",
            description: "Welcome back to IceCube.",
          });

          if (values.rememberMe) {
            localStorage.setItem("rememberedUser", values.email);
          }

          console.log("Login success:", {
            email: values.email,
            timestamp: new Date().toISOString(),
          });

          router.push("/");
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          });

          console.log("Login failure:", {
            email: values.email,
            timestamp: new Date().toISOString(),
          });
        }
      } else {
        throw new Error("Auth context or login function is not available");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
     <Background />

      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 bg-black bg-opacity-50 border-gray-700 text-white"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 bg-black bg-opacity-50 border-gray-700 text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-black bg-opacity-50 border-gray-700"
                        />
                      </FormControl>
                      <Label className="text-sm text-gray-300">
                        Remember me
                      </Label>
                    </FormItem>
                  )}
                />
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-[#0A4779] hover:text-[#083A61]"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-[#0A4779] hover:bg-[#083A61] text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
              <p className="text-sm text-center text-gray-300">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-[#0A4779] hover:text-[#083A61] font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
