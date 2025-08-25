
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
          <div className="flex flex-col space-y-4 text-center md:text-left md:w-1/2">
            <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm">
              #1 AI Job Platform in India
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Find Your Perfect Job With <span className="gradient-text">AI-Powered</span> Interviews
            </h1>
            <p className="text-muted-foreground md:text-xl">
              We use cutting-edge AI technology to streamline the hiring process. Job seekers get faster responses, and employers find the perfect candidates more efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button size="lg" className="gradient-bg">Find Jobs</Button>
              <Button size="lg" variant="outline">Post a Job</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Join 10,000+ job seekers and 500+ companies already on our platform
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-60 animate-pulse-light"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl opacity-60 animate-pulse-light"></div>
              
              <div className="rounded-2xl border bg-background/80 backdrop-blur-sm shadow-lg relative z-10 p-6 animate-float">
                <div className="flex flex-col space-y-3">
                  <div className="bg-accent p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-semibold">AI Interview Session</div>
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Live</div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <div className="bg-background rounded-md p-3">
                        <p className="text-sm"><span className="font-medium">AI Interviewer:</span> Can you explain your approach to problem-solving?</p>
                      </div>
                      <div className="bg-primary/10 rounded-md p-3">
                        <p className="text-sm"><span className="font-medium">Candidate:</span> I typically break down complex problems into smaller parts...</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-semibold">Interview Progress</div>
                      <div className="text-xs text-muted-foreground">8 min remaining</div>
                    </div>
                    <div className="bg-muted h-2 w-24 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
