
import React from "react";
import { Link } from "react-router-dom";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  progress: number;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
  children,
  title,
  subtitle,
  progress
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">HA</span>
              </div>
              <span className="font-bold text-xl">
                Hireby<span className="text-primary">AI</span>
              </span>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Progress Bar */}
      <div className="h-1 bg-muted w-full">
        <div 
          className="h-1 bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-1">
        {/* Left side - Form */}
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="mt-2 text-muted-foreground">
                {subtitle}
              </p>
            </div>
            {children}
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="h-full w-full bg-muted">
            <div className="h-full w-full bg-gradient-to-bl from-primary to-secondary/60 flex items-center justify-center p-12">
              <div className="max-w-lg text-white">
                <h2 className="text-3xl font-bold mb-6">
                  You're almost ready to get started!
                </h2>
                <p className="text-lg opacity-90 mb-8">
                  Complete your profile to unlock all the features of HirebyAI and start your journey.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                      <span className="font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Complete your profile</h3>
                      <p className="opacity-90">Provide your basic information to personalize your experience.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                      <span className="font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Explore opportunities</h3>
                      <p className="opacity-90">Browse through our extensive list of jobs or candidates.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                      <span className="font-semibold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Start your journey</h3>
                      <p className="opacity-90">Apply for jobs or post listings with AI-powered interviews.</p>
                    </div>
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

export default OnboardingLayout;
