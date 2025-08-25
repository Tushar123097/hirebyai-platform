import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import OnboardingJobSeeker from "./pages/onboarding/OnboardingJobSeeker";
import OnboardingEmployer from "./pages/onboarding/OnboardingEmployer";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  ClerkLoading,
  useAuth,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Home from "./pages/Home";
import Job from "./pages/Job";
import Interview from "@/pages/interview/Interview";
import InterviewCall from "@/pages/interview/InterviewCall";

const queryClient = new QueryClient();

const App = () => {
  const { isLoaded, userId } = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <Home />
                  </SignedIn>
                  <SignedOut>
                    <Index />
                  </SignedOut>
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/job/:id"
              element={
                <>
                  <SignedIn>
                    <Job />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/job/apply/:jobid/join"
              element={
                <>
                  <SignedIn>
                    <Interview />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/interview/:jobid/call"
              element={
                <>
                  <SignedIn>
                    <InterviewCall />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/onboarding/job-seeker"
              element={
                <ProtectedRoute>
                  <OnboardingJobSeeker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/employer"
              element={
                <ProtectedRoute>
                  <OnboardingEmployer />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
