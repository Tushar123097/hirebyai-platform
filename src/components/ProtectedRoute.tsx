
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
