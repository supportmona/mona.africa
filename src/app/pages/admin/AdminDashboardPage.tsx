import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  MessageSquare,
  Briefcase,
  LifeBuoy,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  TicketIcon,
  ArrowUp,
  ArrowDown,
  Sparkles,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { createTestConversations } from "@/utils/createTestConversations";

interface TicketStats {
  total: number;
  ouvert: number;
  en_cours: number;
  resolu: number;
  ferme: number;
}

export default function AdminDashboardPage() {
  const [ticketStats, setTicketStats] = useState<TicketStats>({
    total: 0,
    ouvert: 0,
    en_cours: 0,
    resolu: 0,
    ferme: 0,
  });
  const [loading, setLoading] = useState(true);
  const [creatingTestData, setCreatingTestData] = useState(false);

  useEffect(() => {
    loadTicketStats();
  }, []);

  const loadTicketStats = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6378cc81/tickets/stats`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTicketStats(data.data);
        }
      }
    } catch (error) {
      console.error("Erreur chargement stats tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTestConversations = async () => {
    setCreatingTestData(true);
    try {
      const result = await createTestConversations();
      if (result.success) {
        alert(`✅ ${result.count} conversations de test créées avec succès !`);
      } else {
        alert("❌ Erreur lors de la création des conversations de test");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("❌ Erreur lors de la création des conversations de test");
    } finally {
      setCreatingTestData(false);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-white via-beige/5 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-beige/30 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-anthracite font-serif">
              Tableau de bord
            </h1>
            <p className="text-sm text-anthracite/60 font-sans mt-1">
              Vue d'ensemble de la plateforme M.O.N.A
            </p>
          </div>
          
          <button
            onClick={handleCreateTestConversations}
            disabled={creatingTestData}
            className="px-4 py-2 bg-gradient-to-br from-terracotta/70 to-gold/60 text-white rounded-lg hover:shadow-lg hover:shadow-terracotta/20 transition-all text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            {creatingTestData ? "Création..." : "Créer Conversations Test"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats Grid - Style Teams */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Membres */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 p-6 hover:border-terracotta/30 hover:shadow-lg hover:shadow-terracotta/5 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-terracotta/15 to-terracotta/5 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-terracotta/70" />
              </div>
              <div className="flex items-center gap-1 text-green-600/70 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                12%
              </div>
            </div>
            <p className="text-3xl font-bold text-anthracite mb-1">2,847</p>
            <p className="text-sm text-anthracite/50 font-sans">Membres actifs</p>
          </div>

          {/* Messages */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 p-6 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold/15 to-gold/5 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-gold/80" />
              </div>
              <div className="flex items-center gap-1 text-green-600/70 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                8%
              </div>
            </div>
            <p className="text-3xl font-bold text-anthracite mb-1">1,234</p>
            <p className="text-sm text-anthracite/50 font-sans">Conversations actives</p>
          </div>

          {/* Experts */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 p-6 hover:border-terracotta/30 hover:shadow-lg hover:shadow-terracotta/5 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-terracotta/15 to-gold/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-terracotta/70" />
              </div>
              <div className="flex items-center gap-1 text-green-600/70 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                5%
              </div>
            </div>
            <p className="text-3xl font-bold text-anthracite mb-1">142</p>
            <p className="text-sm text-anthracite/50 font-sans">Experts certifiés</p>
          </div>

          {/* Entreprises */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 p-6 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold/15 to-beige/20 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-gold/80" />
              </div>
              <div className="flex items-center gap-1 text-green-600/70 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                15%
              </div>
            </div>
            <p className="text-3xl font-bold text-anthracite mb-1">38</p>
            <p className="text-sm text-anthracite/50 font-sans">Comptes B2B</p>
          </div>
        </div>

        {/* Tickets Stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 mb-8">
          <div className="px-6 py-4 border-b border-beige/20 bg-gradient-to-r from-beige/10 to-transparent">
            <h2 className="text-lg font-semibold text-anthracite font-serif">
              Support - Tickets
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-beige/20 to-beige/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TicketIcon className="w-8 h-8 text-anthracite/60" />
                </div>
                <p className="text-2xl font-bold text-anthracite">{ticketStats.total}</p>
                <p className="text-xs text-anthracite/50 font-sans mt-1">Total</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-terracotta/15 to-terracotta/5 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-8 h-8 text-terracotta/70" />
                </div>
                <p className="text-2xl font-bold text-terracotta/80">{ticketStats.ouvert}</p>
                <p className="text-xs text-terracotta/60 font-sans mt-1">Ouverts</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gold/15 to-gold/5 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-gold/80" />
                </div>
                <p className="text-2xl font-bold text-gold/90">{ticketStats.en_cours}</p>
                <p className="text-xs text-gold/70 font-sans mt-1">En cours</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100/50 to-green-50/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-600/60" />
                </div>
                <p className="text-2xl font-bold text-green-700/70">{ticketStats.resolu}</p>
                <p className="text-xs text-green-600/60 font-sans mt-1">Résolus</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100/40 to-gray-50/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <XCircle className="w-8 h-8 text-gray-500/60" />
                </div>
                <p className="text-2xl font-bold text-anthracite/70">{ticketStats.ferme}</p>
                <p className="text-xs text-anthracite/50 font-sans mt-1">Fermés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-lg font-semibold text-anthracite font-sans mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Activité récente */}
            <div className="bg-white rounded-lg shadow-sm border border-beige/50 p-6 hover:border-terracotta/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-terracotta/20 to-terracotta/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-terracotta" />
                </div>
                <h3 className="font-semibold text-anthracite font-sans">
                  Activité récente
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-anthracite font-sans">
                      Nouveau membre inscrit
                    </p>
                    <p className="text-xs text-muted-foreground">Il y a 5 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-terracotta rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-anthracite font-sans">
                      Ticket résolu
                    </p>
                    <p className="text-xs text-muted-foreground">Il y a 12 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-anthracite font-sans">
                      Expert approuvé
                    </p>
                    <p className="text-xs text-muted-foreground">Il y a 1 heure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm border border-beige/50 p-6 hover:border-terracotta/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-50 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-anthracite font-sans">
                  Alertes
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-900 font-medium font-sans">
                    12 tickets en attente
                  </p>
                  <p className="text-xs text-red-700 mt-1">Action requise</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-terracotta/10 to-gold/10 border border-terracotta/30 rounded-lg">
                  <p className="text-sm text-terracotta font-medium font-sans">
                    5 candidatures d'experts
                  </p>
                  <p className="text-xs text-gold mt-1">À réviser</p>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-beige/50 p-6 hover:border-terracotta/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-anthracite font-sans">
                  Performance
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground font-sans">
                      Satisfaction
                    </span>
                    <span className="text-sm font-medium text-anthracite">98%</span>
                  </div>
                  <div className="w-full bg-beige/30 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-terracotta to-gold h-2 rounded-full"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground font-sans">
                      Temps de réponse
                    </span>
                    <span className="text-sm font-medium text-anthracite">95%</span>
                  </div>
                  <div className="w-full bg-beige/30 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-gold to-terracotta h-2 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}