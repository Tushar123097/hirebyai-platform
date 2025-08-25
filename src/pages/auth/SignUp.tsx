import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import {
  useSignUp,
  SignUpButton,
  SignUp as SignUpComponent,
} from "@clerk/clerk-react";

type UserRole = "jobseeker" | "employer";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("jobseeker");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp, isLoaded } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure both passwords match.",
      });
      return;
    }

    if (!isLoaded) return;
    setIsLoading(true);

    try {
      // Start the sign-up process
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      toast({
        title: "Verification email sent",
        description: "Please check your email to verify your account.",
      });

      // Store the user role in local storage to retrieve after verification
      localStorage.setItem("userRole", role);

      // Navigate to a verification page or show verification UI
      // For simplicity, we'll just notify the user to check their email
      toast({
        title: "Account created",
        description: "Please verify your email to complete registration.",
      });
    } catch (error) {
      console.error("Sign-up error:", error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: "Please try again with a different email.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* Left side - Sign Up Form */}
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="mx-auto w-full max-w-md space-y-8 px-4 sm:px-6">
            {/* Logo */}
            <div className="flex flex-col items-center space-y-2 text-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-bold">HA</span>
                </div>
                <span className="font-bold text-xl">
                  Hireby<span className="text-primary">AI</span>
                </span>
              </Link>
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-muted-foreground">
                Sign up to start your career journey with HirebyAI
              </p>
            </div>

            <SignUpComponent />
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden bg-muted lg:block lg:w-1/2">
          <div className="h-full w-full bg-gradient-to-bl from-primary to-secondary/60 flex items-center justify-center p-12">
            <div className="max-w-lg text-white">
              <h2 className="text-3xl font-bold mb-6">
                Start Your AI-Powered Job Journey Today
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Whether you're a job seeker looking for your next opportunity or
                an employer looking to find the perfect candidate, HirebyAI
                has you covered.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="font-medium mb-2">For Job Seekers</h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Practice AI interviews</li>
                    <li>• Get instant feedback</li>
                    <li>• Apply to top jobs</li>
                    <li>• Track your progress</li>
                  </ul>
                </div>
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="font-medium mb-2">For Employers</h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Post jobs easily</li>
                    <li>• Screen with AI interviews</li>
                    <li>• Get detailed reports</li>
                    <li>• Save hiring time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
