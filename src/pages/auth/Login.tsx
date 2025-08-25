import { Link } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* Left side - Login Form */}
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
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>

            <SignIn />
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden bg-muted lg:block lg:w-1/2">
          <div className="h-full w-full bg-gradient-to-bl from-primary to-secondary/60 flex items-center justify-center p-12">
            <div className="max-w-lg text-white">
              <h2 className="text-3xl font-bold mb-6">
                Find Your Dream Job with AI-Powered Interviews
              </h2>
              <p className="text-lg opacity-90 mb-8">
                HirebyAI helps you prepare, practice, and perfect your
                interviewing skills with AI feedback and coaching.
              </p>
              <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
                <blockquote className="italic">
                  "HirebyAI helped me land my dream job at a top tech
                  company. The AI interview practice was incredibly helpful!"
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/30 flex items-center justify-center">
                    <span className="font-semibold">RS</span>
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">Rahul Singh</div>
                    <div className="text-sm opacity-80">Software Engineer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
