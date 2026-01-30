import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  ChevronDown,
  MessageSquare,
  User,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface Ticket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  sujet: string;
  categorie: string;
  priorite: string;
  statut: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("tous");

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6378cc81`;

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await fetch(`${serverUrl}/tickets`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTickets(data.data);
        }
      }
    } catch (error) {
      console.error("Erreur chargement tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const response = await fetch(
        `${serverUrl}/tickets/${ticketId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ statut: newStatus }),
        }
      );

      if (response.ok) {
        loadTickets();
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket({ ...selectedTicket, statut: newStatus });
        }
      }
    } catch (error) {
      console.error("Erreur mise à jour statut:", error);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchSearch =
      ticket.sujet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      filterStatus === "tous" || ticket.statut === filterStatus;

    return matchSearch && matchStatus;
  });

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "ouvert":
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case "en_cours":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "resolu":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "ferme":
        return <XCircle className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (statut: string) => {
    const styles: Record<string, string> = {
      ouvert: "bg-blue-100 text-blue-800 border-blue-200",
      en_cours: "bg-amber-100 text-amber-800 border-amber-200",
      resolu: "bg-green-100 text-green-800 border-green-200",
      ferme: "bg-gray-100 text-gray-800 border-gray-200",
    };

    const labels: Record<string, string> = {
      ouvert: "Ouvert",
      en_cours: "En cours",
      resolu: "Résolu",
      ferme: "Fermé",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
          styles[statut] || "bg-gray-100 text-gray-800"
        }`}
      >
        {getStatusIcon(statut)}
        {labels[statut] || statut}
      </span>
    );
  };

  const getPriorityColor = (priorite: string) => {
    const colors: Record<string, string> = {
      haute: "text-red-600/70 bg-red-50/60",
      moyenne: "text-gold/90 bg-gold/10",
      basse: "text-terracotta/70 bg-terracotta/10",
    };
    return colors[priorite] || "text-gray-600 bg-gray-50";
  };

  return (
    <div className="h-full bg-gradient-to-br from-white via-beige/5 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-beige/30 px-8 py-6">
        <h1 className="text-2xl font-semibold text-anthracite font-serif">
          Tickets Support
        </h1>
        <p className="text-sm text-anthracite/60 font-sans mt-1">
          Gérer les demandes de support des membres
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          {/* Liste des tickets */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 overflow-hidden flex flex-col">
            {/* Recherche et filtres */}
            <div className="p-4 border-b border-gray-200 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un ticket..."
                  className="w-full pl-10 pr-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-transparent font-sans text-sm bg-white/50"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-sm"
              >
                <option value="tous">Tous les statuts</option>
                <option value="ouvert">Ouverts</option>
                <option value="en_cours">En cours</option>
                <option value="resolu">Résolus</option>
                <option value="ferme">Fermés</option>
              </select>
            </div>

            {/* Liste */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500 font-sans mt-3">
                    Chargement...
                  </p>
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 font-sans">
                    Aucun ticket trouvé
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredTickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedTicket?.id === ticket.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 font-sans truncate">
                            {ticket.sujet}
                          </p>
                          <p className="text-xs text-gray-500 font-sans mt-1">
                            Par {ticket.userName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(ticket.statut)}
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(
                            ticket.priorite
                          )}`}
                        >
                          {ticket.priorite}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 font-sans">
                        {new Date(ticket.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Détails du ticket */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 overflow-hidden flex flex-col">
            {selectedTicket ? (
              <>
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 font-sans mb-2">
                        {selectedTicket.sujet}
                      </h2>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          {selectedTicket.userName}
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">
                          {selectedTicket.userEmail}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(selectedTicket.statut)}
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        selectedTicket.priorite
                      )}`}
                    >
                      Priorité {selectedTicket.priorite}
                    </span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                      {selectedTicket.categorie}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 font-sans mb-2">
                      Description
                    </h3>
                    <p className="text-sm text-gray-700 font-sans whitespace-pre-wrap">
                      {selectedTicket.description}
                    </p>
                  </div>

                  <div className="text-xs text-gray-500 font-sans">
                    <p>
                      Créé le{" "}
                      {new Date(selectedTicket.createdAt).toLocaleString(
                        "fr-FR"
                      )}
                    </p>
                    <p className="mt-1">
                      Mis à jour le{" "}
                      {new Date(selectedTicket.updatedAt).toLocaleString(
                        "fr-FR"
                      )}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 font-sans">
                      Changer le statut:
                    </label>
                    <select
                      value={selectedTicket.statut}
                      onChange={(e) =>
                        updateTicketStatus(selectedTicket.id, e.target.value)
                      }
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-sm"
                    >
                      <option value="ouvert">Ouvert</option>
                      <option value="en_cours">En cours</option>
                      <option value="resolu">Résolu</option>
                      <option value="ferme">Fermé</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 font-sans mb-2">
                    Sélectionnez un ticket
                  </h3>
                  <p className="text-sm text-gray-500 font-sans">
                    Choisissez un ticket dans la liste pour voir les détails
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}