import { useState } from "react";
import {
  Search,
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  ArrowUp,
} from "lucide-react";

interface Company {
  id: string;
  name: string;
  industry: string;
  employees: number;
  plan: string;
  monthlySpend: number;
  joinedAt: string;
  activeUsers: number;
}

export default function AdminEntreprisesPage() {
  const [companies] = useState<Company[]>([
    {
      id: "1",
      name: "TechCorp Africa",
      industry: "Technologies",
      employees: 250,
      plan: "Premium",
      monthlySpend: 12500,
      joinedAt: "2025-01-15",
      activeUsers: 180,
    },
    {
      id: "2",
      name: "BankPlus RDC",
      industry: "Finance",
      employees: 500,
      plan: "Enterprise",
      monthlySpend: 25000,
      joinedAt: "2025-02-01",
      activeUsers: 320,
    },
    {
      id: "3",
      name: "HealthCare Dakar",
      industry: "Santé",
      employees: 150,
      plan: "Standard",
      monthlySpend: 7500,
      joinedAt: "2025-01-20",
      activeUsers: 95,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = companies.reduce((sum, c) => sum + c.monthlySpend, 0);
  const totalEmployees = companies.reduce((sum, c) => sum + c.employees, 0);
  const totalActiveUsers = companies.reduce((sum, c) => sum + c.activeUsers, 0);

  return (
    <div className="h-full bg-gradient-to-br from-white via-beige/5 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-beige/30 px-8 py-6">
        <h1 className="text-2xl font-semibold text-anthracite font-serif">
          Entreprises B2B
        </h1>
        <p className="text-sm text-anthracite/60 font-sans mt-1">
          Gestion des comptes entreprise
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 p-6 hover:shadow-lg hover:shadow-terracotta/5 hover:border-terracotta/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-terracotta/15 to-terracotta/5 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-terracotta/70" />
              </div>
              <div className="flex items-center gap-1 text-green-600/70 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                15%
              </div>
            </div>
            <p className="text-3xl font-bold text-anthracite mb-1">{companies.length}</p>
            <p className="text-sm text-anthracite/50 font-sans">Entreprises actives</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 p-6 hover:shadow-lg hover:shadow-gold/5 hover:border-gold/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold/15 to-gold/5 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-gold/80" />
              </div>
              <div className="flex items-center gap-1 text-green-600/70 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                22%
              </div>
            </div>
            <p className="text-3xl font-bold text-anthracite mb-1">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-anthracite/50 font-sans">Revenu mensuel</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 p-6 hover:shadow-lg hover:shadow-terracotta/5 hover:border-terracotta/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-terracotta/15 to-gold/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-terracotta/70" />
              </div>
              <div className="flex items-center gap-1 text-green-600/70 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                8%
              </div>
            </div>
            <p className="text-3xl font-bold text-anthracite mb-1">{totalEmployees}</p>
            <p className="text-sm text-anthracite/50 font-sans">Employés couverts</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 p-6 hover:shadow-lg hover:shadow-gold/5 hover:border-gold/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold/15 to-beige/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gold/80" />
              </div>
              <div className="flex items-center gap-1 text-green-600/70 text-sm font-medium">
                <ArrowUp className="w-4 h-4" />
                12%
              </div>
            </div>
            <p className="text-3xl font-bold text-anthracite mb-1">{totalActiveUsers}</p>
            <p className="text-sm text-anthracite/50 font-sans">Utilisateurs actifs</p>
          </div>
        </div>

        {/* Recherche */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-anthracite/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une entreprise..."
              className="w-full pl-11 pr-4 py-3 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-transparent font-sans bg-white/50"
            />
          </div>
        </div>

        {/* Liste des entreprises */}
        <div className="space-y-4">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-beige/30 hover:shadow-lg hover:shadow-terracotta/5 hover:border-terracotta/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-terracotta/40 to-gold/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-anthracite font-serif mb-1">
                      {company.name}
                    </h3>
                    <p className="text-sm text-anthracite/60 font-sans">
                      {company.industry}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold font-sans border ${ 
                    company.plan === "Enterprise"
                      ? "bg-terracotta/10 text-terracotta/80 border-terracotta/20"
                      : company.plan === "Premium"
                      ? "bg-gold/10 text-gold/90 border-gold/20"
                      : "bg-beige/20 text-anthracite/70 border-beige/30"
                  }`}
                >
                  {company.plan}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                <div>
                  <p className="text-xs text-anthracite/50 font-sans mb-1">
                    Employés
                  </p>
                  <p className="text-xl font-bold text-anthracite">
                    {company.employees}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-anthracite/50 font-sans mb-1">
                    Utilisateurs actifs
                  </p>
                  <p className="text-xl font-bold text-anthracite">
                    {company.activeUsers}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-anthracite/50 font-sans mb-1">
                    Dépense mensuelle
                  </p>
                  <p className="text-xl font-bold text-gold/90">
                    ${company.monthlySpend.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-anthracite/50 font-sans mb-1">
                    Membre depuis
                  </p>
                  <div className="flex items-center gap-1 text-sm text-anthracite/70 font-medium">
                    <Calendar className="w-4 h-4 text-anthracite/40" />
                    {new Date(company.joinedAt).toLocaleDateString("fr-FR", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm bg-gradient-to-br from-terracotta/70 to-gold/60 text-white rounded-lg hover:shadow-lg hover:shadow-terracotta/20 transition-all font-sans font-medium">
                  Voir détails
                </button>
                <button className="px-4 py-2 text-sm border border-beige/30 text-anthracite/70 rounded-lg hover:bg-beige/10 transition-colors font-sans font-medium">
                  Analytics
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-xs text-anthracite/50 font-sans">Taux d'adoption</p>
                    <p className="text-sm font-bold text-anthracite">
                      {Math.round((company.activeUsers / company.employees) * 100)}%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-beige/30 flex items-center justify-center relative">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-green-500/60"
                      style={{
                        clipPath: `polygon(0 0, 100% 0, 100% ${
                          (company.activeUsers / company.employees) * 100
                        }%, 0 ${(company.activeUsers / company.employees) * 100}%)`,
                      }}
                    ></div>
                    <TrendingUp className="w-5 h-5 text-green-600/70 relative z-10" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}