
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    text: "The AI interviews saved us over 20 hours per hiring cycle. We now screen more candidates in less time and make better hiring decisions.",
    name: "Ananya Sharma",
    position: "HR Director, TechSolutions India",
    type: "employer"
  },
  {
    text: "I got detailed feedback after my interview that helped me improve my skills. Within two weeks, I landed my dream job through this platform.",
    name: "Raj Patel",
    position: "Frontend Developer",
    type: "jobseeker"
  },
  {
    text: "The detailed candidate reports made our hiring decisions much easier. We've reduced our bad hires by 40% since using HirebyAI.",
    name: "Neha Verma",
    position: "Talent Acquisition, StartupGrow",
    type: "employer"
  },
  {
    text: "Being able to interview at my convenience without scheduling hassles was a game-changer for me while I was switching careers.",
    name: "Vikram Singh",
    position: "Data Analyst",
    type: "jobseeker"
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter">What People Are Saying</h2>
          <p className="text-muted-foreground md:text-lg md:max-w-2xl mx-auto">
            Hear from job seekers and employers who have transformed their hiring experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`${
                testimonial.type === 'employer' 
                  ? 'bg-primary/5 border-primary/20' 
                  : 'bg-secondary/5 border-secondary/20'
              }`}
            >
              <CardContent className="p-6 space-y-4">
                <div className={`text-4xl ${testimonial.type === 'employer' ? 'text-primary' : 'text-secondary'} opacity-30`}>"</div>
                <p className="italic">{testimonial.text}</p>
                <div className="pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  <div className="mt-2">
                    <span 
                      className={`text-xs px-2 py-1 rounded-full ${
                        testimonial.type === 'employer' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-secondary/10 text-secondary'
                      }`}
                    >
                      {testimonial.type === 'employer' ? 'Employer' : 'Job Seeker'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
