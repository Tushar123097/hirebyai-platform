
import React, { createContext, useState, useContext, useEffect } from "react";

type UserRole = "jobseeker" | "employer";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole | null;
  isOnboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credentialResponse: any) => Promise<void>;
  signup: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demonstration purposes - in a real app, validate credentials with your backend
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substring(2, 15),
        email,
        name: email.split('@')[0],
        role: null, // Will be set during onboarding
        isOnboarded: false,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (credentialResponse: any) => {
    try {
      setLoading(true);
      console.log("Google credential response:", credentialResponse);
      
      // In a real app, you would verify the token with your backend
      // Here we're just creating a mock user based on the credential response
      
      // For demonstration purposes - in a real app, integrate with Google OAuth
      const mockUser: User = {
        id: "google-" + Math.random().toString(36).substring(2, 15),
        email: "user" + Math.floor(Math.random() * 1000) + "@gmail.com",
        name: "Google User",
        role: null, // Will be set during onboarding
        isOnboarded: false,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demonstration purposes - in a real app, create user in your backend
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substring(2, 15),
        email,
        name: email.split('@')[0],
        role: role,
        isOnboarded: false,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        loginWithGoogle, 
        signup, 
        logout, 
        isAuthenticated 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
