import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import {
  Shield,
  User,
  Mail,
  Lock,
  Briefcase,
  Phone,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Users,
} from "lucide-react";

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  profession: string;
  experience: string;
  specialties: string;
  languages: string;
  licenseNumber: string;
  status: string;
  submittedAt: string;
}

export default function AdminExpertCreationPage() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const [expertEmail, setExpertEmail] = useState("");
  const [expertPassword, setExpertPassword] = useState("");

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6378cc81`;

  // Charger les candidatures en attente
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${serverUrl}/expert/applications`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setApplications(data.data.filter((app: Application) => app.status === "pending"));
      }
    } catch (err) {
      console.error("Erreur lors du chargement des candidatures:", err);
      setError("Erreur lors du chargement des candidatures");
    } finally {
      setLoading(false);
    }
  };

  const generateEmail = (firstName: string, lastName: string) => {
    const cleanFirst = firstName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const cleanLast = lastName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return `${cleanFirst}.${cleanLast}@monafrica.net`;
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleSelectApplication = (app: Application) => {
    setSelectedApplication(app);
    setExpertEmail(generateEmail(app.firstName, app.lastName));
    setExpertPassword(generatePassword());
    setError("");
    setSuccess("");
  };

  const handleCreateExpert = async () => {
    if (!selectedApplication) return;

    setIsCreating(true);
    setError("");
    setSuccess("");

    try {
      // Créer le compte expert
      const response = await fetch(`${serverUrl}/expert/signup`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: expertEmail,
          password: expertPassword,
          firstName: selectedApplication.firstName,
          lastName: selectedApplication.lastName,
          specialty: selectedApplication.profession,
          licenseNumber: selectedApplication.licenseNumber,
          phone: selectedApplication.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création du compte");
      }

      // Mettre à jour le statut de la candidature
      const applicationUpdate = {
        ...selectedApplication,
        status: "approved",
        approvedAt: new Date().toISOString(),
        expertEmail,
      };

      await fetch(`${serverUrl}/expert/application/${selectedApplication.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationUpdate),
      });

      setSuccess(`Compte créé avec succès ! Email: ${expertEmail}`);
      
      // Recharger les candidatures
      await fetchApplications();
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setSelectedApplication(null);
        setSuccess("");
      }, 3000);

    } catch (err) {
      console.error("Erreur lors de la création:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-beige/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-anthracite" />
              </button>
              <div>
                <h1 className="text-2xl font-serif text-anthracite">
                  Administration Experts
                </h1>
                <p className="text-sm text-muted-foreground font-sans">
                  Créer des comptes pour les candidats approuvés
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-sm text-anthracite font-sans">Admin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Liste des candidatures */}
          <div className="bg-white rounded-2xl border border-beige/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-terracotta" />
              <h2 className="text-xl font-serif text-anthracite">
                Candidatures en attente
              </h2>
              <span className="ml-auto px-3 py-1 bg-terracotta/10 text-terracotta rounded-full text-sm font-sans">
                {applications.length}
              </span>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground font-sans">Chargement...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground font-sans">
                  Aucune candidature en attente
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {applications.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleSelectApplication(app)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedApplication?.id === app.id
                        ? "border-terracotta bg-terracotta/5"
                        : "border-beige/30 hover:border-beige/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-terracotta" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-sans font-medium text-anthracite">
                          {app.firstName} {app.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground font-sans">
                          {app.profession}
                        </p>
                        <p className="text-xs text-muted-foreground font-sans mt-1">
                          {app.city} • {app.experience}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Formulaire de création */}
          <div className="bg-white rounded-2xl border border-beige/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-terracotta" />
              <h2 className="text-xl font-serif text-anthracite">
                Créer un compte expert
              </h2>
            </div>

            {!selectedApplication ? (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-sans">
                  Sélectionnez une candidature pour commencer
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Informations du candidat */}
                <div className="p-4 bg-beige/10 rounded-lg border border-beige/30">
                  <h3 className="font-sans font-medium text-anthracite mb-3">
                    Informations du candidat
                  </h3>
                  <div className="space-y-2 text-sm font-sans">
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">Nom:</span>
                      <span className="text-anthracite font-medium">
                        {selectedApplication.firstName} {selectedApplication.lastName}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">Profession:</span>
                      <span className="text-anthracite">{selectedApplication.profession}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">Licence:</span>
                      <span className="text-anthracite">{selectedApplication.licenseNumber}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">Téléphone:</span>
                      <span className="text-anthracite">{selectedApplication.phone}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">Email personnel:</span>
                      <span className="text-anthracite">{selectedApplication.email}</span>
                    </div>
                  </div>
                </div>

                {/* Email professionnel */}
                <div>
                  <label className="block text-sm font-sans text-anthracite mb-2">
                    Email professionnel M.O.N.A
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={expertEmail}
                      onChange={(e) => setExpertEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-beige/30 rounded-lg focus:outline-none focus:border-terracotta/50 font-sans text-sm"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground font-sans mt-1">
                    Cet email sera utilisé pour la connexion au portail
                  </p>
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-sans text-anthracite mb-2">
                    Mot de passe temporaire
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={expertPassword}
                      onChange={(e) => setExpertPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-beige/30 rounded-lg focus:outline-none focus:border-terracotta/50 font-sans text-sm font-mono"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground font-sans mt-1">
                    L'expert devra le changer lors de la première connexion
                  </p>
                </div>

                {/* Messages */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 font-sans">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-green-600 font-sans font-medium mb-2">
                        {success}
                      </p>
                      <p className="text-xs text-green-600 font-sans">
                        Mot de passe: <code className="font-mono bg-white px-2 py-1 rounded">{expertPassword}</code>
                      </p>
                      <p className="text-xs text-green-600 font-sans mt-1">
                        ⚠️ Copiez ces identifiants et envoyez-les à l'expert par email sécurisé
                      </p>
                    </div>
                  </div>
                )}

                {/* Bouton de création */}
                <button
                  onClick={handleCreateExpert}
                  disabled={isCreating || !expertEmail || !expertPassword}
                  className="w-full bg-terracotta text-white py-3 rounded-lg font-sans font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? "Création en cours..." : "Créer le compte expert"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}