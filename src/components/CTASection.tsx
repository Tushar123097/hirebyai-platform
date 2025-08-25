
import React from 'react';
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 gradient-bg opacity-90"></div>
          
          <div className="relative z-10 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Transform Your Hiring Process?
              </h2>
              <p className="text-white/90 max-w-md">
                Join thousands of companies and job seekers already using our AI-powered platform to find their perfect match.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" variant="secondary">
                Find Jobs
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
