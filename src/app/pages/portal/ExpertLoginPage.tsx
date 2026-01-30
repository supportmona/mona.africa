import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useExpertAuth } from "@/app/contexts/ExpertAuthContext";
import { Lock, Mail, AlertCircle, Sparkles, ArrowLeft } from "lucide-react";

export default function ExpertLoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useExpertAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Validation email @monafrica.net
    const allowedDomains = ["@monafrica.net"];
    const isValidDomain = allowedDomains.some(domain => email.endsWith(domain));

    if (!isValidDomain) {
      setLocalError(
        `Veuillez utiliser une adresse email professionnelle M.O.N.A (${allowedDomains.join(", ")})`
      );
      return;
    }

    try {
      await login(email, password);
      navigate("/portal-expert/dashboard");
    } catch (err) {
      // L'erreur est déjà gérée dans le contexte
      console.error("Erreur de connexion:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Bouton retour */}
        <div className="mb-6">
          <Link
            to="/espace-expert"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-anthracite transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-sans">Retour</span>
          </Link>
        </div>

        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-gold" />
            <h1 className="text-3xl font-serif text-anthracite">M.O.N.A</h1>
          </div>
          <h2 className="text-xl font-serif text-anthracite mb-2">Portail Expert</h2>
          <p className="text-muted-foreground text-sm">
            Connectez-vous avec votre compte professionnel
          </p>
        </div>

        {/* Carte de connexion */}
        <div className="bg-white rounded-lg shadow-sm border border-beige/30 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-anthracite mb-2">
                Adresse email professionnelle
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="prenom.nom@monafrica.net"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Domaine accepté : @monafrica.net
              </p>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-anthracite mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
            </div>

            {/* Erreurs */}
            {(error || localError) && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-destructive font-medium">
                    {localError || error}
                  </p>
                </div>
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terracotta text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          {/* Lien d'aide */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Besoin d'aide ?{" "}
              <a href="/contact" className="text-terracotta hover:underline">
                Contactez le support
              </a>
            </p>
          </div>
          
          {/* Lien compte démo */}
          <div className="mt-4 pt-4 border-t border-beige/30">
            <p className="text-xs text-center text-muted-foreground mb-2">
              Pour tester la plateforme
            </p>
            <Link
              to="/demo-setup"
              className="block text-center text-sm text-gold hover:text-gold/80 hover:underline transition-colors"
            >
              Créer un compte démo
            </Link>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Réservé aux professionnels de santé agréés par M.O.N.A
          </p>
        </div>
      </div>
    </div>
  );
}