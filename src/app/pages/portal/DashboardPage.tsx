import { Calendar, Users, Video, TrendingUp, Clock, CheckCircle2, DollarSign, Wallet } from "lucide-react";
import { formatCurrency, CurrencyCode } from "@/app/utils/currency";
import { useState } from "react";

interface DashboardPageProps {
  primaryColor: string;
  secondaryColor: string;
  isMacbook: boolean;
}

export default function DashboardPage({ primaryColor, secondaryColor, isMacbook }: DashboardPageProps) {
  const [displayCurrency] = useState<CurrencyCode>("USD");

  const stats = [
    { label: "Consultations aujourd'hui", value: "8", icon: <Video size={24} />, color: primaryColor },
    { label: "Membres actifs", value: "142", icon: <Users size={24} />, color: secondaryColor },
    { label: "Rendez-vous semaine", value: "34", icon: <Calendar size={24} />, color: primaryColor },
    { label: "Taux de satisfaction", value: "98%", icon: <TrendingUp size={24} />, color: secondaryColor }
  ];

  // Statistiques de revenus par devise - Chiffres réalistes adaptés à l'Afrique
  const revenueStats = [
    { 
      currency: "USD" as CurrencyCode, 
      amount: 3280, // ~38 membres à Kinshasa (mix Essentiel/Premium/Excellence)
      consultations: 86, 
      label: "Kinshasa" 
    },
    { 
      currency: "XOF" as CurrencyCode, 
      amount: 3850000, // ~88 membres Dakar/Abidjan (majoritairement Premium/Essentiel)
      consultations: 124, 
      label: "Dakar & Abidjan" 
    },
    { 
      currency: "CDF" as CurrencyCode, 
      amount: 385000, // ~16 membres payant en CDF (environ 140 USD équivalent)
      consultations: 18, 
      label: "RDC (Franc congolais)" 
    },
  ];

  const upcomingAppointments = [
    { time: "09:00", patient: "Amina K.", type: "Thérapie cognitive", duration: "50 min", city: "Abidjan", currency: "XOF" as CurrencyCode, amount: 35000 },
    { time: "11:00", patient: "Jean-Pierre L.", type: "Suivi mensuel", duration: "30 min", city: "Kinshasa", currency: "USD" as CurrencyCode, amount: 50 },
    { time: "14:30", patient: "Fatoumata D.", type: "Première consultation", duration: "60 min", city: "Dakar", currency: "XOF" as CurrencyCode, amount: 40000 },
    { time: "16:00", patient: "Omar T.", type: "Téléconsultation", duration: "45 min", city: "Dakar", currency: "XOF" as CurrencyCode, amount: 30000 }
  ];

  const recentActivities = [
    { action: "Dossier mis à jour", patient: "Grace M.", time: "Il y a 15 min" },
    { action: "Nouvelle consultation", patient: "Kwame A.", time: "Il y a 1h" },
    { action: "Rendez-vous confirmé", patient: "Nadia B.", time: "Il y a 2h" },
    { action: "Document partagé", patient: "Christelle T.", time: "Il y a 3h" }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}15` }}>
                <div style={{ color: stat.color }}>{stat.icon}</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Stats - New Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Wallet size={20} style={{ color: primaryColor }} />
          Revenus par marché (Ce mois)
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {revenueStats.map((stat, index) => (
            <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-beige/10 to-white border border-beige/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <DollarSign size={16} className="text-terracotta" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(stat.amount, stat.currency, { showSymbol: true, compact: true })}
              </div>
              <div className="text-xs text-gray-500">
                {stat.consultations} consultations
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={20} style={{ color: primaryColor }} />
            Rendez-vous du jour
          </h3>
          <div className="space-y-3">
            {upcomingAppointments.map((apt, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="text-sm font-semibold text-gray-900 min-w-[50px]">{apt.time}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{apt.patient}</div>
                  <div className="text-sm text-gray-600">{apt.type}</div>
                  <div className="text-xs text-gray-500 mt-1">{apt.city}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Clock size={12} />
                    {apt.duration}
                  </div>
                  <div className="text-sm font-semibold text-terracotta">
                    {formatCurrency(apt.amount, apt.currency, { showSymbol: true, compact: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} style={{ color: secondaryColor }} />
            Activité récente
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: primaryColor }}></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.action}</div>
                  <div className="text-sm text-gray-600">{activity.patient}</div>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}