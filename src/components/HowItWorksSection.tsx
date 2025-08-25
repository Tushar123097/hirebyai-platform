
import React from 'react';

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Job seekers complete their profile with skills, experience, and preferences. Employers create company profiles and job listings.",
    forJobSeeker: "Upload your resume and highlight your skills",
    forEmployer: "Create your company profile and job descriptions"
  },
  {
    number: "02",
    title: "AI Matching & Filtering",
    description: "Our AI algorithm matches candidates with relevant job opportunities based on multiple factors.",
    forJobSeeker: "Get matched with jobs that fit your profile",
    forEmployer: "Receive a curated list of qualified candidates"
  },
  {
    number: "03",
    title: "AI Interview Process",
    description: "Candidates participate in AI-led interviews that assess technical skills, problem-solving abilities, and cultural fit.",
    forJobSeeker: "Complete AI interviews at your convenience",
    forEmployer: "Review comprehensive interview recordings and analysis"
  },
  {
    number: "04",
    title: "Assessment Reports",
    description: "Detailed reports are generated highlighting candidate strengths, areas for improvement, and overall fit.",
    forJobSeeker: "Get constructive feedback to improve your skills",
    forEmployer: "Make data-driven hiring decisions"
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16" id="how-it-works">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
          <p className="text-muted-foreground md:text-lg md:max-w-2xl mx-auto">
            Our streamlined process makes hiring and job hunting efficient and effective
          </p>
        </div>
        
        <div className="space-y-16 mt-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="border rounded-lg p-6 bg-accent relative">
                  <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-background rounded-md">
                      <h4 className="text-sm font-medium text-primary mb-2">For Job Seekers</h4>
                      <p className="text-sm">{step.forJobSeeker}</p>
                    </div>
                    <div className="p-4 bg-background rounded-md">
                      <h4 className="text-sm font-medium text-secondary mb-2">For Employers</h4>
                      <p className="text-sm">{step.forEmployer}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-muted/30 h-48 w-full max-w-sm rounded-lg relative overflow-hidden">
                  {/* This is where we'd normally put an image, but I'm using a placeholder design for now */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold gradient-text opacity-20">Step {step.number}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
