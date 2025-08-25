import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DUMMY_JOBS } from "@/lib/constants";
import {
  Building2,
  MapPin,
  Briefcase,
  Calendar,
  GraduationCap,
  Globe,
  Users,
  Clock,
  Upload,
  FileText,
} from "lucide-react";
import NavBar from "@/components/NavBar";

const Job = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const job = DUMMY_JOBS.find((job) => job.id === Number(id));

  // Track recently viewed jobs
  useEffect(() => {
    if (job) {
      const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const updatedRecent = [job.id, ...recentlyViewed.filter((jobId: number) => jobId !== job.id)].slice(0, 5);
      localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent));
    }
  }, [job]);

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Job Not Found</h2>
              <p className="text-muted-foreground">
                The job you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate("/")}>Back to Jobs</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume to continue.",
        variant: "destructive",
      });
      return;
    }

    // Save form data to localStorage
    const applicationData = {
      ...formData,
      jobId: id,
      jobTitle: job?.title,
      company: job?.company,
      appliedDate: new Date().toISOString(),
    };
    localStorage.setItem("applicationData", JSON.stringify(applicationData));

    // Generate a random candidate ID for demo purposes
    const candidateId = Math.floor(Math.random() * 1000000);
    localStorage.setItem("candidateId", candidateId.toString());

    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully!",
    });
    navigate(`/job/apply/${id}/join`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setResumeFile(file);

      // Convert file to base64 and save to localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem("candidateResume", base64String);
        localStorage.setItem("resumeFileName", file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{job.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <CardDescription>{job.company}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-base px-4 py-1">
                      {job.type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {job.experience.min}-{job.experience.max}{" "}
                        {job.experience.unit}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {job.education.degree} in {job.education.field}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="capitalize">
                      {job.workMode}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      • {job.companyInfo.size}
                    </span>
                    <a
                      href={job.companyInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                      <Globe className="h-4 w-4" />
                      Company Website
                    </a>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About the Role</h3>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Responsibilities
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    About the Company
                  </h3>
                  <p className="text-muted-foreground">
                    {job.companyInfo.about}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{job.companyInfo.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.companyInfo.industry}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Application Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Position</CardTitle>
                <CardDescription>
                  Fill out the form below to submit your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-1">
                      Full Name
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1">
                      Email
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-1">
                      Phone Number
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="experience"
                      className="flex items-center gap-1"
                    >
                      Years of Experience
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume" className="flex items-center gap-1">
                      Resume/CV
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="mt-1.5">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="resume"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {resumeFile ? (
                              <div className="flex items-center gap-2">
                                <FileText className="w-8 h-8 text-primary" />
                                <span className="text-sm font-medium">
                                  {resumeFile.name}
                                </span>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  PDF, DOC, or DOCX (MAX. 10MB)
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            id="resume"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="coverLetter"
                      className="flex items-center gap-1"
                    >
                      Cover Letter
                    </Label>
                    <Textarea
                      id="coverLetter"
                      value={formData.coverLetter}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coverLetter: e.target.value,
                        })
                      }
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      Application closes on{" "}
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <span className="text-destructive">*</span> Required fields
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
