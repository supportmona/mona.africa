import { useState } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { CheckCircle2, AlertCircle, Copy, Mail, Lock, User } from "lucide-react";

export default function DemoSetupPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6378cc81`;

  const createDemoExpert = async () => {
    setIsCreating(true);
    setError("");
    setSuccess(false);

    const demoEmail = "demo.expert@monafrica.net";
    const demoPassword = "DemoMONA2024!";

    try {
      console.log("🚀 Création du compte démo...");
      console.log("📧 Email:", demoEmail);
      console.log("🔗 URL:", `${serverUrl}/expert/signup`);

      const response = await fetch(`${serverUrl}/expert/signup`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: demoEmail,
          password: demoPassword,
          firstName: "Dr. Amara",
          lastName: "Diallo",
          specialty: "Psychologue clinicien",
          licenseNumber: "PSY-KIN-2024-001",
          phone: "+243 999 000 111",
        }),
      });

      console.log("📡 Statut réponse:", response.status);
      const data = await response.json();
      console.log("📦 Données reçues:", data);

      if (!response.ok) {
        // Si le compte existe déjà, c'est OK
        if (data.error?.includes("already registered") || data.error?.includes("exists") || data.error?.includes("User already registered") || data.error?.includes("email address has already been registered")) {
          console.log("✅ Le compte existe déjà");
          setCredentials({
            email: demoEmail,
            password: demoPassword,
          });
          setSuccess(true);
          return;
        }
        console.error("❌ Erreur:", data.error);
        throw new Error(data.error || "Erreur lors de la création");
      }

      console.log("✅ Compte créé avec succès!");
      setCredentials({
        email: demoEmail,
        password: demoPassword,
      });
      setSuccess(true);
    } catch (err) {
      console.error("❌ Erreur complète:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (err) {
      // Ignorer les erreurs de clipboard (permissions bloquées)
      console.log("Impossible de copier dans le presse-papier");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige via-white to-beige/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg border border-beige/30 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-terracotta" />
            </div>
            <h1 className="text-3xl font-serif text-anthracite mb-2">
              Configuration Compte Démo
            </h1>
            <p className="text-muted-foreground font-sans">
              Créez un compte expert de démonstration pour tester la plateforme
            </p>
          </div>

          {/* Bouton de création */}
          {!success && (
            <div className="text-center mb-8">
              <button
                onClick={createDemoExpert}
                disabled={isCreating}
                className="px-8 py-4 bg-terracotta text-white rounded-xl hover:bg-terracotta/90 transition-all shadow-lg hover:shadow-xl font-sans font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? "Création en cours..." : "Créer le compte démo"}
              </button>
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Succès avec identifiants */}
          {success && (
            <div className="space-y-6">
              {/* Message de succès */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-green-800 font-medium">
                    ✅ Compte expert de démonstration créé avec succès !
                  </p>
                </div>
              </div>

              {/* Identifiants */}
              <div className="bg-gradient-to-br from-terracotta/5 to-gold/5 rounded-xl p-6 border-2 border-terracotta/20">
                <h3 className="text-lg font-serif text-anthracite mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-terracotta" />
                  Identifiants de connexion
                </h3>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-anthracite mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={credentials.email}
                      readOnly
                      className="flex-1 px-4 py-3 bg-white border border-border rounded-lg font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(credentials.email)}
                      className="p-3 bg-white border border-border rounded-lg hover:bg-beige/10 transition-colors"
                      title="Copier l'email"
                    >
                      <Copy className="w-4 h-4 text-anthracite" />
                    </button>
                  </div>
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-anthracite mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    Mot de passe
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={credentials.password}
                      readOnly
                      className="flex-1 px-4 py-3 bg-white border border-border rounded-lg font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(credentials.password)}
                      className="p-3 bg-white border border-border rounded-lg hover:bg-beige/10 transition-colors"
                      title="Copier le mot de passe"
                    >
                      <Copy className="w-4 h-4 text-anthracite" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Informations du profil */}
              <div className="bg-beige/10 rounded-xl p-6 border border-beige/30">
                <h4 className="text-sm font-medium text-anthracite mb-3">
                  📋 Informations du profil démo
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground font-sans">
                  <p>👤 <strong>Nom :</strong> Dr. Amara Diallo</p>
                  <p>💼 <strong>Spécialité :</strong> Psychologue clinicien</p>
                  <p>📞 <strong>Téléphone :</strong> +243 999 000 111</p>
                  <p>🎓 <strong>Licence :</strong> PSY-KIN-2024-001</p>
                </div>
              </div>

              {/* Lien de connexion */}
              <div className="text-center pt-4">
                <a
                  href="/expert-login"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-terracotta text-white rounded-xl hover:bg-terracotta/90 transition-all shadow-lg hover:shadow-xl font-sans font-medium"
                >
                  Se connecter au portail expert
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          )}

          {/* Note */}
          <div className="mt-8 pt-6 border-t border-beige/30">
            <p className="text-xs text-center text-muted-foreground">
              ⚠️ Ce compte est uniquement pour les tests et démonstrations.<br />
              Les données peuvent être réinitialisées à tout moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}