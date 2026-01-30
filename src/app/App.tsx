import { RouterProvider } from "react-router";
import { router } from "@/app/routes";
import { AuthProvider } from "@/app/contexts/AuthContext";
import { B2BAuthProvider } from "@/app/contexts/B2BAuthContext";
import { ExpertAuthProvider } from "@/app/contexts/ExpertAuthContext";

export default function App() {
  return (
    <AuthProvider>
      <B2BAuthProvider>
        <ExpertAuthProvider>
          <RouterProvider router={router} />
        </ExpertAuthProvider>
      </B2BAuthProvider>
    </AuthProvider>
  );
}