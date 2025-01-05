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
    <div className="relative flex justify-center items-center min-h-screen bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"></div>

      <Card className="relative w-full max-w-md bg-gray-800 shadow-xl border border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-100">
            {isSignup ? "Create an Account" : "Login to Your Account"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {isSignup
              ? "Sign up to get started"
              : "Enter your email and password to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email" className="text-gray-100">
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
                className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-gray-500 focus:border-gray-500 placeholder-gray-500"
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password" className="text-gray-100">
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
                  className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-gray-500 focus:border-gray-500 placeholder-gray-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 text-gray-400"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {isSignup && (
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="confirmPassword" className="text-gray-100">
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
                  className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-gray-500 focus:border-gray-500 placeholder-gray-500"
                />
              </div>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isSignup
                  ? "bg-gray-600 hover:bg-gray-500"
                  : "bg-gray-800 hover:bg-gray-700"
              } text-white transition-colors duration-200`}
            >
              {isLoading ? "Loading..." : isSignup ? "Sign up" : "Log in"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignup((prev) => !prev)}
              className="text-gray-400 underline hover:text-gray-200 transition-colors"
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
