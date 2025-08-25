
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import OnboardingLayout from "@/components/OnboardingLayout";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const OnboardingEmployer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    companyWebsite: "",
    companyLogo: null as File | null,
    companyDescription: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      updateFormData("companyLogo", e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Onboarding completed",
      description: "Your company profile has been set up successfully!",
    });
    
    navigate("/");
    setIsLoading(false);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          placeholder="Acme Corp"
          value={formData.companyName}
          onChange={(e) => updateFormData("companyName", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          placeholder="Software, Healthcare, etc."
          value={formData.industry}
          onChange={(e) => updateFormData("industry", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companySize">Company Size</Label>
        <Input
          id="companySize"
          placeholder="e.g. 1-10, 11-50, 51-200, 201-500, 501+"
          value={formData.companySize}
          onChange={(e) => updateFormData("companySize", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyWebsite">Company Website</Label>
        <Input
          id="companyWebsite"
          placeholder="https://www.example.com"
          value={formData.companyWebsite}
          onChange={(e) => updateFormData("companyWebsite", e.target.value)}
        />
      </div>
      
      <Button onClick={() => setStep(2)} className="w-full">
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="companyLogo">Company Logo</Label>
        <div className="grid w-full gap-1.5">
          <Label 
            htmlFor="logo-upload" 
            className="border-2 border-dashed rounded-md cursor-pointer py-8 text-center flex flex-col items-center justify-center"
          >
            {formData.companyLogo ? (
              <div className="w-32 h-32">
                <AspectRatio ratio={1 / 1}>
                  <img
                    src={URL.createObjectURL(formData.companyLogo)}
                    alt="Logo preview"
                    className="rounded-md object-contain"
                  />
                </AspectRatio>
              </div>
            ) : (
              <>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10 text-muted-foreground" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={1}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-muted-foreground mt-2">
                  Click to upload your company logo
                </span>
              </>
            )}
          </Label>
          <Input 
            id="logo-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyDescription">Company Description</Label>
        <Textarea
          id="companyDescription"
          placeholder="Tell us about your company..."
          value={formData.companyDescription}
          onChange={(e) => updateFormData("companyDescription", e.target.value)}
          rows={5}
          required
        />
      </div>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(1)} className="w-full">
          Back
        </Button>
        <Button onClick={() => setStep(3)} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );
  
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="contactPerson">Contact Person Name</Label>
        <Input
          id="contactPerson"
          placeholder="John Smith"
          value={formData.contactPerson}
          onChange={(e) => updateFormData("contactPerson", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input
          id="contactEmail"
          type="email"
          placeholder="john@example.com"
          value={formData.contactEmail}
          onChange={(e) => updateFormData("contactEmail", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactPhone">Contact Phone</Label>
        <Input
          id="contactPhone"
          placeholder="+91 98765 43210"
          value={formData.contactPhone}
          onChange={(e) => updateFormData("contactPhone", e.target.value)}
          required
        />
      </div>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(2)} className="w-full">
          Back
        </Button>
        <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
          {isLoading ? "Completing Setup..." : "Complete Setup"}
        </Button>
      </div>
    </div>
  );

  const stepContent = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout
      title="Complete Your Company Profile"
      subtitle="Let's set up your employer profile to help you find the perfect candidates"
      progress={Math.floor((step / 3) * 100)}
    >
      {stepContent()}
    </OnboardingLayout>
  );
};

export default OnboardingEmployer;
