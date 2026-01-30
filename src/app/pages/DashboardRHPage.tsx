import NavigationBar from "@/app/components/NavigationBar";
import FooterSection from "@/app/components/FooterSection";
import { BarChart3, Shield, TrendingUp, Users, Bell, Download, DollarSign, Globe } from "lucide-react";
import { formatCurrency, CurrencyCode } from "@/app/utils/currency";

export default function DashboardRHPage() {
  // Statistiques multi-devises pour démonstration B2B - Chiffres réalistes
  const multiCurrencyStats = [
    { 
      location: "Kinshasa", 
      currency: "USD" as CurrencyCode, 
      monthlyInvestment: 1890, // 45 employés × 42 USD (plan Essentiel moyen)
      employees: 45 
    },
    { 
      location: "Dakar & Abidjan", 
      currency: "XOF" as CurrencyCode, 
      monthlyInvestment: 1700000, // 68 employés × 25,000 XOF (plan Essentiel)
      employees: 68 
    },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Indicateurs Agrégés",
      description: "Visualisez le bien-être global de vos équipes sans accès aux données individuelles",
    },
    {
      icon: Shield,
      title: "Anonymat Garanti",
      description: "Conformité RGPD totale : aucune donnée personnelle accessible aux RH",
    },
    {
      icon: Bell,
      title: "Alertes Préventives",
      description: "Notifications automatiques sur les tendances nécessitant attention",
    },
    {
      icon: TrendingUp,
      title: "Analyse Prédictive",
      description: "IA pour anticiper les risques et recommander des interventions",
    },
    {
      icon: Users,
      title: "Segmentation Intelligente",
      description: "Analyse par département, site ou tranche d'âge (toujours anonyme)",
    },
    {
      icon: Download,
      title: "Rapports Personnalisés",
      description: "Exportez des rapports mensuels/trimestriels pour la direction",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-beige/10 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-serif text-anthracite mb-6">
              Dashboard RH <span className="text-terracotta">Anonymisé</span>
            </h1>
            <p className="text-xl text-muted-foreground font-sans max-w-3xl mx-auto mb-8">
              Suivez le bien-être collectif de vos équipes tout en respectant
              l'anonymat et la confidentialité de chaque employé.
            </p>

            {/* Multi-Currency Investment Overview */}
            <div className="max-w-4xl mx-auto mt-8">
              <div className="bg-white rounded-2xl p-6 border border-beige/30 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-terracotta" />
                  <h3 className="text-lg font-serif text-anthracite">Investissement bien-être multi-sites</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {multiCurrencyStats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-beige/10 to-white">
                      <div className="text-sm text-muted-foreground mb-2">{stat.location}</div>
                      <div className="text-3xl font-bold text-anthracite mb-1">
                        {formatCurrency(stat.monthlyInvestment, stat.currency, { showSymbol: true, compact: true })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.employees} employés • /mois
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  💡 Facturation flexible par devise locale : USD (Kinshasa), XOF (Dakar, Abidjan)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-beige/30 hover:border-terracotta/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-6 inline-flex p-4 bg-terracotta/10 rounded-xl">
                    <Icon className="w-8 h-8 text-terracotta" />
                  </div>
                  <h3 className="text-2xl font-serif text-anthracite mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground font-sans">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Demo CTA */}
          <div className="text-center bg-gradient-to-r from-anthracite to-anthracite/90 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-serif mb-4">Accédez au Dashboard en temps réel</h2>
            <p className="text-white/80 mb-8 font-sans max-w-2xl mx-auto">
              Connectez-vous à votre portail entreprise pour visualiser les données de bien-être 
              de vos équipes et gérer votre wallet de crédits M.O.N.A.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/b2b-login"
                className="px-8 py-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl font-sans font-medium inline-block"
              >
                Se connecter au Dashboard B2B
              </a>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all duration-200 font-sans font-medium">
                Réserver une démo personnalisée
              </button>
            </div>
            <div className="mt-6 text-sm text-white/60 font-sans">
              Nouveau client ? <a href="/contact" className="text-white underline hover:text-white/80">Contactez notre équipe</a>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}