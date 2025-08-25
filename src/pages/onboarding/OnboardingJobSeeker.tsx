
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

const OnboardingJobSeeker = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    resume: null as File | null,
    bio: "",
    linkedIn: "",
    skills: "",
    experience: "",
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
      updateFormData("resume", e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Onboarding completed",
      description: "Your profile has been set up successfully!",
    });
    
    navigate("/");
    setIsLoading(false);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => updateFormData("fullName", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="Mumbai, India"
          value={formData.location}
          onChange={(e) => updateFormData("location", e.target.value)}
          required
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
        <Label htmlFor="resume">Upload Resume</Label>
        <div className="grid w-full gap-1.5">
          <Label 
            htmlFor="resume-upload" 
            className="border-2 border-dashed rounded-md cursor-pointer py-8 text-center flex flex-col items-center justify-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-muted-foreground" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={1}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm text-muted-foreground mt-2">
              {formData.resume ? formData.resume.name : "Click to upload your resume (PDF)"}
            </span>
          </Label>
          <Input 
            id="resume-upload" 
            type="file" 
            accept=".pdf,.doc,.docx" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us a bit about yourself..."
          value={formData.bio}
          onChange={(e) => updateFormData("bio", e.target.value)}
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="linkedIn">LinkedIn Profile</Label>
        <Input
          id="linkedIn"
          placeholder="https://linkedin.com/in/your-profile"
          value={formData.linkedIn}
          onChange={(e) => updateFormData("linkedIn", e.target.value)}
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
        <Label htmlFor="skills">Skills</Label>
        <Textarea
          id="skills"
          placeholder="React, Node.js, TypeScript, etc."
          value={formData.skills}
          onChange={(e) => updateFormData("skills", e.target.value)}
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="experience">Work Experience</Label>
        <Textarea
          id="experience"
          placeholder="Share your previous work experience..."
          value={formData.experience}
          onChange={(e) => updateFormData("experience", e.target.value)}
          rows={5}
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
      title="Complete Your Profile"
      subtitle="Let's set up your job seeker profile to help you find the perfect job"
      progress={Math.floor((step / 3) * 100)}
    >
      {stepContent()}
    </OnboardingLayout>
  );
};

export default OnboardingJobSeeker;
