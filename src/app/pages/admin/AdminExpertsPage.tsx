import { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Search,
  Mail,
  Phone,
  Award,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  Eye,
  CheckCircle,
  Edit2,
  Trash2,
  Power,
  X,
  Globe,
  Briefcase,
  Calendar,
  FileText,
  Linkedin,
  Download,
  File,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  profession: string;
  experience: string;
  diplomas?: string;
  specialties: string;
  languages: string;
  availability?: string;
  linkedin?: string;
  motivation?: string;
  licenseNumber: string;
  status: string;
  active?: boolean;
  submittedAt: string;
  createdAt?: string;
  updatedAt?: string;
  files?: {
    cv?: {
      name: string;
      size: number;
      type: string;
      data: string;
    };
    diplomas?: {
      name: string;
      size: number;
      type: string;
      data: string;
    };
    certifications?: {
      name: string;
      size: number;
      type: string;
      data: string;
    };
  };
}

export default function AdminExpertsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Modals
  const [selectedExpert, setSelectedExpert] = useState<Application | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState<Partial<Application>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    profession: "",
    experience: "",
    diplomas: "",
    specialties: "",
    languages: "",
    availability: "",
    linkedin: "",
    licenseNumber: "",
  });

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6378cc81`;

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/expert/applications`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setApplications(data.data);
        }
      }
    } catch (error) {
      console.error("Erreur chargement candidatures:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = `${app.firstName} ${app.lastName} ${app.email} ${app.profession}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(
        `${serverUrl}/expert/application/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        await loadApplications();
      }
    } catch (error) {
      console.error("Erreur mise à jour statut:", error);
    }
  };

  const handleAddExpert = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/expert/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        await loadApplications();
        setShowAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Erreur ajout expert:", error);
    }
  };

  const handleEditExpert = async () => {
    if (!selectedExpert) return;
    
    try {
      const response = await fetch(
        `${serverUrl}/expert/${selectedExpert.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        await loadApplications();
        setShowEditModal(false);
        setSelectedExpert(null);
        resetForm();
      }
    } catch (error) {
      console.error("Erreur modification expert:", error);
    }
  };

  const handleDeleteExpert = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet expert ?")) {
      return;
    }

    try {
      const response = await fetch(
        `${serverUrl}/expert/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        await loadApplications();
      }
    } catch (error) {
      console.error("Erreur suppression expert:", error);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const response = await fetch(
        `${serverUrl}/expert/${id}/toggle-active`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        await loadApplications();
      }
    } catch (error) {
      console.error("Erreur toggle active:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      profession: "",
      experience: "",
      diplomas: "",
      specialties: "",
      languages: "",
      availability: "",
      linkedin: "",
      licenseNumber: "",
    });
  };

  const openEditModal = (expert: Application) => {
    setSelectedExpert(expert);
    setFormData({
      firstName: expert.firstName,
      lastName: expert.lastName,
      email: expert.email,
      phone: expert.phone,
      city: expert.city,
      profession: expert.profession,
      experience: expert.experience,
      diplomas: expert.diplomas || "",
      specialties: expert.specialties,
      languages: expert.languages,
      availability: expert.availability || "",
      linkedin: expert.linkedin || "",
      licenseNumber: expert.licenseNumber,
    });
    setShowEditModal(true);
  };

  const openDetailsModal = (expert: Application) => {
    setSelectedExpert(expert);
    setShowDetailsModal(true);
  };

  return (
    <div className="h-full bg-gradient-to-br from-white via-beige/5 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-beige/30 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-anthracite font-serif">
              Gestion des Experts
            </h1>
            <p className="text-sm text-anthracite/60 font-sans mt-1">
              Approuver et gérer les experts de la plateforme
            </p>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gradient-to-br from-terracotta/70 to-gold/60 text-white rounded-lg hover:shadow-lg hover:shadow-terracotta/20 transition-all text-sm font-medium flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Ajouter un Expert
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 p-6 hover:shadow-lg hover:shadow-terracotta/5 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-terracotta/15 to-terracotta/5 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-terracotta/70" />
              </div>
              <div>
                <p className="text-3xl font-bold text-terracotta/80">{stats.pending}</p>
                <p className="text-sm text-anthracite/50 font-sans">En attente</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 p-6 hover:shadow-lg hover:shadow-gold/5 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold/15 to-gold/5 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-gold/80" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gold/90">{stats.approved}</p>
                <p className="text-sm text-anthracite/50 font-sans">Approuvés</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 p-6 hover:shadow-lg hover:shadow-terracotta/5 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100/50 to-red-50/30 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600/60" />
              </div>
              <div>
                <p className="text-3xl font-bold text-red-700/70">{stats.rejected}</p>
                <p className="text-sm text-anthracite/50 font-sans">Refusés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-anthracite/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par nom, email..."
              className="w-full pl-11 pr-4 py-3 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-transparent font-sans bg-white/50"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans bg-white/50"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="approved">Approuvés</option>
            <option value="rejected">Refusés</option>
          </select>
        </div>

        {/* Experts List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-beige/10 to-transparent border-b border-beige/20">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-sans">
                    Expert
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-sans">
                    Spécialités
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-sans">
                    Expérience
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-sans">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-sans">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-sans">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <div className="inline-block w-8 h-8 border-4 border-terracotta/70 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-anthracite/50 font-sans mt-4">
                        Chargement des candidatures...
                      </p>
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center">
                      <Users className="w-12 h-12 text-anthracite/20 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-anthracite font-sans mb-2">
                        Aucune candidature
                      </h3>
                      <p className="text-sm text-anthracite/50 font-sans">
                        {searchTerm
                          ? "Aucun résultat ne correspond à votre recherche"
                          : "Aucune candidature n'a été soumise pour le moment"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="border-b border-beige/20 hover:bg-beige/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-terracotta/40 to-gold/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">
                              {app.firstName.charAt(0)}{app.lastName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-anthracite font-sans">
                              {app.firstName} {app.lastName}
                            </h3>
                            <p className="text-sm text-terracotta/70 font-medium font-sans">
                              {app.profession}
                            </p>
                            {app.active === false && (
                              <span className="text-xs text-red-600/70 font-sans">
                                (Désactivé)
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-beige/20 text-anthracite/70 rounded-full text-xs font-medium font-sans">
                          {app.specialties}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-beige/20 text-anthracite/70 rounded-full text-xs font-medium font-sans">
                          {app.experience}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold font-sans ${
                            app.status === "pending"
                              ? "bg-terracotta/10 text-terracotta/80 border border-terracotta/20"
                              : app.status === "approved"
                              ? "bg-gold/10 text-gold/90 border border-gold/20"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {app.status === "pending"
                            ? "En attente"
                            : app.status === "approved"
                            ? "Approuvé"
                            : "Refusé"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-anthracite/60 font-sans">
                        {new Date(app.submittedAt).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openDetailsModal(app)}
                            className="p-2 hover:bg-beige/20 rounded-lg transition-colors text-anthracite/60 hover:text-anthracite"
                            title="Voir détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {app.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(app.id, "approved")
                                }
                                className="p-2 hover:bg-gold/10 rounded-lg transition-colors text-gold/80 hover:text-gold"
                                title="Approuver"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(app.id, "rejected")
                                }
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600/60 hover:text-red-600"
                                title="Refuser"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}

                          {app.status === "approved" && (
                            <>
                              <button
                                onClick={() => openEditModal(app)}
                                className="p-2 hover:bg-beige/20 rounded-lg transition-colors text-anthracite/60 hover:text-anthracite"
                                title="Modifier"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              
                              <button
                                onClick={() => handleToggleActive(app.id)}
                                className={`p-2 rounded-lg transition-colors ${
                                  app.active === false
                                    ? "hover:bg-gold/10 text-gold/80 hover:text-gold"
                                    : "hover:bg-terracotta/10 text-terracotta/70 hover:text-terracotta"
                                }`}
                                title={app.active === false ? "Activer" : "Désactiver"}
                              >
                                <Power className="w-4 h-4" />
                              </button>
                              
                              <button
                                onClick={() => handleDeleteExpert(app.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600/60 hover:text-red-600"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Ajouter Expert */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-terracotta/10 to-gold/10 border-b border-beige/30 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-anthracite font-serif">
                Ajouter un Expert
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-beige/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-anthracite/60" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  Profession *
                </label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  placeholder="Ex: Psychologue clinicien"
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  Numéro de licence *
                </label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Expérience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Ex: 5 ans"
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Langues
                  </label>
                  <input
                    type="text"
                    value={formData.languages}
                    onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                    placeholder="Ex: Français, Anglais"
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  Spécialités
                </label>
                <input
                  type="text"
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  placeholder="Ex: Anxiété, Dépression"
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  Diplômes
                </label>
                <textarea
                  value={formData.diplomas}
                  onChange={(e) => setFormData({ ...formData, diplomas: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-beige/30 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-beige/30 text-anthracite/70 rounded-lg hover:bg-beige/10 transition-colors text-sm font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleAddExpert}
                className="px-4 py-2 bg-gradient-to-br from-terracotta/70 to-gold/60 text-white rounded-lg hover:shadow-lg hover:shadow-terracotta/20 transition-all text-sm font-medium"
              >
                Ajouter l'Expert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modifier Expert */}
      {showEditModal && selectedExpert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-terracotta/10 to-gold/10 border-b border-beige/30 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-anthracite font-serif">
                Modifier l'Expert
              </h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedExpert(null);
                  resetForm();
                }}
                className="p-2 hover:bg-beige/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-anthracite/60" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  Profession *
                </label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  Numéro de licence *
                </label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Expérience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-anthracite/70 mb-2">
                    Langues
                  </label>
                  <input
                    type="text"
                    value={formData.languages}
                    onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                    className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  Spécialités
                </label>
                <input
                  type="text"
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  Diplômes
                </label>
                <textarea
                  value={formData.diplomas}
                  onChange={(e) => setFormData({ ...formData, diplomas: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-anthracite/70 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-beige/30 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedExpert(null);
                  resetForm();
                }}
                className="px-4 py-2 border border-beige/30 text-anthracite/70 rounded-lg hover:bg-beige/10 transition-colors text-sm font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleEditExpert}
                className="px-4 py-2 bg-gradient-to-br from-terracotta/70 to-gold/60 text-white rounded-lg hover:shadow-lg hover:shadow-terracotta/20 transition-all text-sm font-medium"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails Expert */}
      {showDetailsModal && selectedExpert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-terracotta/10 to-gold/10 border-b border-beige/30 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-anthracite font-serif">
                Détails de l'Expert
              </h2>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedExpert(null);
                }}
                className="p-2 hover:bg-beige/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-anthracite/60" />
              </button>
            </div>

            <div className="p-6">
              {/* Header avec avatar */}
              <div className="flex items-start gap-6 mb-6 pb-6 border-b border-beige/30">
                <div className="w-20 h-20 bg-gradient-to-br from-terracotta/40 to-gold/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">
                    {selectedExpert.firstName.charAt(0)}{selectedExpert.lastName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-anthracite font-serif mb-1">
                    {selectedExpert.firstName} {selectedExpert.lastName}
                  </h3>
                  <p className="text-lg text-terracotta/70 font-medium mb-2">
                    {selectedExpert.profession}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedExpert.status === "pending"
                          ? "bg-terracotta/10 text-terracotta/80"
                          : selectedExpert.status === "approved"
                          ? "bg-gold/10 text-gold/90"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedExpert.status === "pending"
                        ? "En attente"
                        : selectedExpert.status === "approved"
                        ? "Approuvé"
                        : "Refusé"}
                    </span>
                    {selectedExpert.active === false && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                        Désactivé
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Informations */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-terracotta/70 mt-0.5" />
                    <div>
                      <p className="text-xs text-anthracite/50 font-sans mb-1">Email</p>
                      <p className="text-sm text-anthracite font-sans">{selectedExpert.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-terracotta/70 mt-0.5" />
                    <div>
                      <p className="text-xs text-anthracite/50 font-sans mb-1">Téléphone</p>
                      <p className="text-sm text-anthracite font-sans">{selectedExpert.phone || "Non renseigné"}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-terracotta/70 mt-0.5" />
                    <div>
                      <p className="text-xs text-anthracite/50 font-sans mb-1">Ville</p>
                      <p className="text-sm text-anthracite font-sans">{selectedExpert.city || "Non renseigné"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-terracotta/70 mt-0.5" />
                    <div>
                      <p className="text-xs text-anthracite/50 font-sans mb-1">Licence</p>
                      <p className="text-sm text-anthracite font-sans">{selectedExpert.licenseNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-terracotta/70 mt-0.5" />
                    <div>
                      <p className="text-xs text-anthracite/50 font-sans mb-1">Expérience</p>
                      <p className="text-sm text-anthracite font-sans">{selectedExpert.experience || "Non renseigné"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-terracotta/70 mt-0.5" />
                    <div>
                      <p className="text-xs text-anthracite/50 font-sans mb-1">Langues</p>
                      <p className="text-sm text-anthracite font-sans">{selectedExpert.languages || "Non renseigné"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-terracotta/70 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-anthracite/50 font-sans mb-1">Spécialités</p>
                    <p className="text-sm text-anthracite font-sans">{selectedExpert.specialties || "Non renseigné"}</p>
                  </div>
                </div>

                {selectedExpert.diplomas && (
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-terracotta/70 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-anthracite/50 font-sans mb-1">Diplômes</p>
                      <p className="text-sm text-anthracite font-sans whitespace-pre-line">{selectedExpert.diplomas}</p>
                    </div>
                  </div>
                )}

                {selectedExpert.linkedin && (
                  <div className="flex items-start gap-3">
                    <Linkedin className="w-5 h-5 text-terracotta/70 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-anthracite/50 font-sans mb-1">LinkedIn</p>
                      <a
                        href={selectedExpert.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-terracotta/70 hover:underline font-sans"
                      >
                        {selectedExpert.linkedin}
                      </a>
                    </div>
                  </div>
                )}

                {selectedExpert.motivation && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-terracotta/70 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-anthracite/50 font-sans mb-1">Motivation</p>
                      <p className="text-sm text-anthracite font-sans whitespace-pre-line">{selectedExpert.motivation}</p>
                    </div>
                  </div>
                )}

                {/* Documents joints */}
                {selectedExpert.files && (selectedExpert.files.cv || selectedExpert.files.diplomas || selectedExpert.files.certifications) && (
                  <div className="pt-4 border-t border-beige/30">
                    <div className="flex items-center gap-2 mb-3">
                      <File className="w-5 h-5 text-terracotta/70" />
                      <h4 className="text-sm font-semibold text-anthracite font-sans">
                        Documents joints
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {selectedExpert.files.cv && (
                        <a
                          href={selectedExpert.files.cv.data}
                          download={selectedExpert.files.cv.name}
                          className="flex items-center gap-3 p-3 bg-beige/10 rounded-lg border border-beige/30 hover:bg-beige/20 transition-colors group"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-terracotta/20 to-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-terracotta/70" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-anthracite font-sans">
                              CV
                            </p>
                            <p className="text-xs text-anthracite/50 font-sans">
                              {selectedExpert.files.cv.name} • {(selectedExpert.files.cv.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <Download className="w-4 h-4 text-terracotta/70 group-hover:text-terracotta flex-shrink-0" />
                        </a>
                      )}
                      
                      {selectedExpert.files.diplomas && (
                        <a
                          href={selectedExpert.files.diplomas.data}
                          download={selectedExpert.files.diplomas.name}
                          className="flex items-center gap-3 p-3 bg-beige/10 rounded-lg border border-beige/30 hover:bg-beige/20 transition-colors group"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-gold/20 to-terracotta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Award className="w-5 h-5 text-gold/80" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-anthracite font-sans">
                              Diplômes
                            </p>
                            <p className="text-xs text-anthracite/50 font-sans">
                              {selectedExpert.files.diplomas.name} • {(selectedExpert.files.diplomas.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <Download className="w-4 h-4 text-gold/80 group-hover:text-gold flex-shrink-0" />
                        </a>
                      )}
                      
                      {selectedExpert.files.certifications && (
                        <a
                          href={selectedExpert.files.certifications.data}
                          download={selectedExpert.files.certifications.name}
                          className="flex items-center gap-3 p-3 bg-beige/10 rounded-lg border border-beige/30 hover:bg-beige/20 transition-colors group"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-terracotta/20 to-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Award className="w-5 h-5 text-terracotta/70" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-anthracite font-sans">
                              Certifications
                            </p>
                            <p className="text-xs text-anthracite/50 font-sans">
                              {selectedExpert.files.certifications.name} • {(selectedExpert.files.certifications.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <Download className="w-4 h-4 text-terracotta/70 group-hover:text-terracotta flex-shrink-0" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 pt-4 border-t border-beige/30">
                  <Calendar className="w-5 h-5 text-terracotta/70 mt-0.5" />
                  <div>
                    <p className="text-xs text-anthracite/50 font-sans mb-1">Date de soumission</p>
                    <p className="text-sm text-anthracite font-sans">
                      {new Date(selectedExpert.submittedAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-beige/30 px-6 py-4">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedExpert(null);
                }}
                className="w-full px-4 py-2 bg-gradient-to-br from-terracotta/70 to-gold/60 text-white rounded-lg hover:shadow-lg hover:shadow-terracotta/20 transition-all text-sm font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}