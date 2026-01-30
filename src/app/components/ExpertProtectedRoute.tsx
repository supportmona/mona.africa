import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useExpertAuth } from "@/app/contexts/ExpertAuthContext";
import { Loader2 } from "lucide-react";

interface ExpertProtectedRouteProps {
  children: React.ReactNode;
}

export default function ExpertProtectedRoute({
  children,
}: ExpertProtectedRouteProps) {
  const { user, loading } = useExpertAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // Rediriger vers la page de connexion si non authentifié
      navigate("/expert-login", { replace: true });
    }
  }, [user, loading, navigate]);

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-terracotta animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Si pas d'utilisateur après le chargement, ne rien afficher
  // (la redirection se fera via useEffect)
  if (!user) {
    return null;
  }

  // Afficher le contenu protégé si authentifié
  return <>{children}</>;
}
