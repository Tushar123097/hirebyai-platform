import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

// Use the environment variable
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.warn(
    "Missing Clerk Publishable Key - authentication features will not work properly"
  );
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
