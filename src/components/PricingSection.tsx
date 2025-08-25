
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    description: "Perfect for small businesses just getting started",
    price: "₹4,999",
    billingPeriod: "per month",
    features: [
      "Post up to 5 job listings",
      "Basic AI interview capabilities",
      "Standard candidate reports",
      "Email support",
      "7-day data retention"
    ],
    highlighted: false,
    cta: "Get Started"
  },
  {
    name: "Professional",
    description: "Ideal for growing companies with regular hiring needs",
    price: "₹9,999",
    billingPeriod: "per month",
    features: [
      "Post up to 15 job listings",
      "Advanced AI interview customization",
      "Detailed candidate assessment reports",
      "Screen recording & analysis",
      "Priority support",
      "30-day data retention"
    ],
    highlighted: true,
    cta: "Try Free for 14 Days"
  },
  {
    name: "Enterprise",
    description: "For large organizations with extensive hiring requirements",
    price: "Custom",
    billingPeriod: "contact for pricing",
    features: [
      "Unlimited job listings",
      "Fully customizable AI interviews",
      "Advanced analytics dashboard",
      "API access",
      "Dedicated account manager",
      "90-day data retention",
      "Custom integration support"
    ],
    highlighted: false,
    cta: "Contact Sales"
  }
];

const PricingSection: React.FC = () => {
  return (
    <section className="py-16 bg-accent" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground md:text-lg md:max-w-2xl mx-auto">
            Choose the plan that best fits your hiring needs. All plans include our core AI interview technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`${
                plan.highlighted 
                  ? 'border-primary shadow-lg shadow-primary/10 relative' 
                  : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.billingPeriod}</span>
                </div>
                <ul className="space-y-2 mt-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.highlighted ? 'gradient-bg' : ''}`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            All prices are in INR. Need something specific? <a href="#" className="text-primary underline">Contact us</a> for a custom solution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
