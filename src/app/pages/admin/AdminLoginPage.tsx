import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, Mail, Lock, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Vérifier que c'est un email @monafrica.net
      if (!email.endsWith("@monafrica.net")) {
        setError("Seuls les emails @monafrica.net sont autorisés");
        setLoading(false);
        return;
      }

      // Vérifier que c'est contact@ ou support@
      const allowedEmails = ["contact@monafrica.net", "support@monafrica.net"];
      if (!allowedEmails.includes(email)) {
        setError("Email administrateur non autorisé");
        setLoading(false);
        return;
      }

      // Pour la démo, accepter n'importe quel mot de passe (8+ caractères)
      if (password.length < 8) {
        setError("Mot de passe incorrect");
        setLoading(false);
        return;
      }

      // Stocker dans localStorage pour l'auth
      const adminUser = {
        id: `admin_${email.split('@')[0]}`,
        email,
        name: email === "contact@monafrica.net" ? "Admin Principal" : "Support M.O.N.A",
        role: "admin",
      };

      localStorage.setItem("mona_admin_user", JSON.stringify(adminUser));

      // Rediriger vers le dashboard admin
      navigate("/admin-mona");
    } catch (err) {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige via-white to-beige/50 flex items-center justify-center p-4">
      {/* Bouton retour */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-anthracite hover:bg-white/50 rounded-lg transition-colors font-sans"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à M.O.N.A
      </button>

      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif text-anthracite mb-2">
            Portail Admin M.O.N.A
          </h1>
          <p className="text-muted-foreground font-sans">
            Connexion réservée au staff M.O.N.A
          </p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 font-sans">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-anthracite mb-2 font-sans">
                Email administrateur
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@monafrica.net"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent font-sans"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-sans">
                Emails autorisés : contact@ ou support@monafrica.net
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-anthracite mb-2 font-sans">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans font-medium"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground font-sans">
              Accès réservé au personnel autorisé M.O.N.A<br />
              Pour toute aide, contactez l'administrateur système
            </p>
          </div>
        </div>

        {/* Démo credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-blue-900 mb-2 font-sans">
            🔐 Démo - Identifiants de test :
          </p>
          <div className="space-y-1 text-xs text-blue-800 font-sans font-mono">
            <div>Email : contact@monafrica.net</div>
            <div>Mot de passe : MonaAdmin2024!</div>
          </div>
        </div>
      </div>
    </div>
  );
}