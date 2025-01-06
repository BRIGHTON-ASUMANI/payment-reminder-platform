"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
        await signup(email, password);
      } else {
        await login(email, password);
      }
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="relative w-full max-w-md bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isSignup ? "Create an Account" : "Login to Your Account"}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {isSignup
              ? "Sign up to get started"
              : "Enter your email and password to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-gray-900 border-gray-200 focus:ring-gray-200 focus:border-gray-300 placeholder-gray-400"
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white text-gray-900 border-gray-200 focus:ring-gray-200 focus:border-gray-300 placeholder-gray-400"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {isSignup && (
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-white text-gray-900 border-gray-200 focus:ring-gray-200 focus:border-gray-300 placeholder-gray-400"
                />
              </div>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isSignup
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white transition-colors duration-200`}
            >
              {isLoading ? "Loading..." : isSignup ? "Sign up" : "Log in"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignup((prev) => !prev)}
              className="text-gray-600 underline hover:text-gray-800 transition-colors"
            >
              {isSignup
                ? "Already have an account? Log in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}