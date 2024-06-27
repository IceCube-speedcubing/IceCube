"use client";

import { useState, useEffect } from "react";
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

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().optional(),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (loginAttempts >= 3) {
      setShowCaptcha(true);
    }
  }, [loginAttempts]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setLoginAttempts((prev) => prev + 1);

    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulating a login check
    if (values.email === "test@example.com" && values.password === "password") {
      toast({
        title: "Login successful!",
        description: "Welcome back to IceCube.",
      });

      if (values.rememberMe) {
        // TODO: Implement actual "Remember me" functionality
        localStorage.setItem("rememberedUser", values.email);
      }

      // TODO: Implement actual analytics tracking
      console.log("Login success:", {
        email: values.email,
        timestamp: new Date().toISOString(),
      });

      router.push("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });

      // TODO: Implement actual analytics tracking
      console.log("Login failure:", {
        email: values.email,
        timestamp: new Date().toISOString(),
      });
    }

    setIsLoading(false);
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
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <Input
                          {...field}
                          type="email"
                          placeholder="m@example.com"
                          className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-400 pl-10 focus:ring-2 focus:ring-[#0A4779] transition-all duration-300"
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
                        <Lock
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-400 pl-10 pr-10 focus:ring-2 focus:ring-[#0A4779] transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-200">
                          Remember me
                        </FormLabel>
                      </div>
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
              {showCaptcha && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>CAPTCHA Required</AlertTitle>
                  <AlertDescription>
                    Please complete the CAPTCHA to continue.
                  </AlertDescription>
                  {/* TODO: Implement actual CAPTCHA here */}
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button
                type="submit"
                className="w-full bg-[#0A4779] hover:bg-[#083A61] text-white py-6 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
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
              <div className="flex justify-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                  onClick={() => {
                    // TODO: Implement WCA login
                    console.log("WCA login clicked");
                  }}
                >
                  Login with WCA
                </Button>
              </div>
              <p className="text-sm text-center text-gray-300">
                Don&apos;t have an account?{" "}
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

// TODO: Add two-factor authentication option
// TODO: Implement password strength meter
// TODO: Implement proper accessibility features (e.g., aria labels, keyboard navigation)
// TODO: Add internationalization support for multiple languages
