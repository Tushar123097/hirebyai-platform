import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, Bookmark } from "lucide-react";
import { DUMMY_JOBS, Job } from "@/lib/constants";
import JobCard from "@/components/JobCard";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Get recently viewed jobs from localStorage
    const recentIds = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const recentJobs = DUMMY_JOBS.filter(job => recentIds.includes(job.id)).slice(0, 3);
    setRecentlyViewed(recentJobs);

    // Get saved jobs from localStorage
    const savedIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const savedJobsList = DUMMY_JOBS.filter(job => savedIds.includes(job.id)).slice(0, 3);
    setSavedJobs(savedJobsList);
  }, []);

  const filteredJobs = DUMMY_JOBS.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Find Your Next Opportunity</h1>
            <p className="text-muted-foreground">
              Browse through our curated list of AI and tech jobs
            </p>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setSearchQuery(searchQuery)}
              />
            </div>
            <Button onClick={() => setSearchQuery(searchQuery)}>Search</Button>
          </div>

          {searchQuery && (
            <div className="text-sm text-muted-foreground">
              Found {filteredJobs.length} jobs matching "{searchQuery}"
            </div>
          )}

          {/* Recently Viewed and Saved Jobs */}
          {(recentlyViewed.length > 0 || savedJobs.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentlyViewed.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recently Viewed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentlyViewed.map((job) => (
                      <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <p className="text-sm text-muted-foreground">{job.location}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {savedJobs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bookmark className="h-5 w-5" />
                      Saved Jobs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {savedJobs.map((job) => (
                      <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <p className="text-sm text-muted-foreground">{job.location}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
