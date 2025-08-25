
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser, useAuth, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavBar: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-sm font-medium">{user.primaryEmailAddress?.emailAddress || user.fullName}</span>
            <UserButton afterSignOutUrl="/" />
          </div>
          <Button variant="outline" onClick={handleLogout} className="hidden sm:flex">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </>
      );
    }

    return (
      <>
        <SignInButton mode="modal">
          <Button variant="outline" className="hidden sm:flex">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="hidden sm:flex">
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </SignUpButton>
      </>
    );
  };

  const renderMobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col space-y-6 mt-6">
          <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/#features" className="text-lg font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/#how-it-works" className="text-lg font-medium hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link to="/#pricing" className="text-lg font-medium hover:text-primary transition-colors">
            Pricing
          </Link>

          <div className="h-px bg-border my-2" />

          {user ? (
            <>
              <div className="flex items-center gap-2 py-2">
                <UserButton />
                <span className="text-sm font-medium">{user.primaryEmailAddress?.emailAddress || user.fullName}</span>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold">HA</span>
            </div>
            <span className="font-bold text-xl">Hireby<span className="text-primary">AI</span></span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link to="/#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</Link>
          <Link to="/#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {renderAuthButtons()}
          {renderMobileMenu()}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
