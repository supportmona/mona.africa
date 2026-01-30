import NavigationBar from "@/app/components/NavigationBar";
import FooterSection from "@/app/components/FooterSection";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Building2, 
  Users, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Heart,
  Zap,
  CheckCircle2,
  Wallet,
  Globe,
  Phone,
  Mail
} from "lucide-react";
import { Link } from "react-router";

export default function B2BPage() {
  const benefits = [
    {
      icon: Heart,
      title: "Réduction du Burnout",
      stat: "42%",
      description: "Diminution mesurable du stress et de l'épuisement professionnel",
    },
    {
      icon: TrendingUp,
      title: "Performance Accrue",
      stat: "+25%",
      description: "Amélioration de la productivité et de l'engagement des équipes",
    },
    {
      icon: Users,
      title: "Rétention Talents",
      stat: "89%",
      description: "Satisfaction employés et réduction du turnover",
    },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Dashboard RH Anonymisé",
      description: "Visualisez la météo mentale de vos équipes avec des données agrégées. Signaux d'alerte précoces sans compromis sur la confidentialité individuelle.",
      features: ["Métriques collectives en temps réel", "Alertes automatiques", "Export de rapports", "Données 100% anonymisées"]
    },
    {
      icon: Wallet,
      title: "Gestion de Crédits",
      description: "Système de wallet flexible pour allouer des séances à vos collaborateurs. Contrôle budgétaire et visibilité complète.",
      features: ["Attribution par département", "Recharge automatique", "Historique transparent", "Paiement Mobile Money"]
    },
    {
      icon: Shield,
      title: "Confidentialité Totale",
      description: "Architecture zéro-connaissance : vos employés restent anonymes. Conformité RGPD et normes FHIR internationales.",
      features: ["Chiffrement end-to-end", "Aucune donnée personnelle visible", "Conformité légale totale", "Audit trail sécurisé"]
    },
    {
      icon: Globe,
      title: "Infrastructure Africa-Ready",
      description: "Solution adaptée aux réalités africaines : connectivité Offline-First, paiements locaux et support multilingue.",
      features: ["Mode hors-ligne", "Mobile Money intégré", "Support Kinshasa/Dakar/Abidjan", "Latence optimisée"]
    },
  ];

  const useCases = [
    {
      company: "Groupe bancaire (Kinshasa)",
      employees: "500+ collaborateurs",
      results: "38% de réduction du stress en 6 mois, ROI de 3:1 sur l'absentéisme",
    },
    {
      company: "Scale-up Tech (Dakar)",
      employees: "120 employés",
      results: "Rétention des talents +45%, NPS employé passé de 52 à 78",
    },
    {
      company: "Groupe telecom (Abidjan)",
      employees: "800+ collaborateurs",
      results: "89% d'adoption volontaire, amélioration bien-être mesurée à +62%",
    },
  ];

  const pricingFeatures = [
    "Dashboard RH anonymisé illimité",
    "Gestion des crédits par département",
    "Signaux d'alerte précoces",
    "Support prioritaire 24/7",
    "Intégration SSO entreprise",
    "Formation des managers",
    "Rapports mensuels personnalisés",
    "Conformité RGPD + FHIR",
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-anthracite to-anthracite/95 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/20 border border-terracotta/30 rounded-full mb-6"
            >
              <Building2 className="w-4 h-4 text-terracotta" />
              <span className="text-sm text-terracotta font-sans">Solutions Entreprises</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-6"
            >
              Investissez dans la santé mentale de vos <span className="text-terracotta">équipes</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 font-sans max-w-3xl mx-auto mb-10"
            >
              Dashboard RH anonymisé, gestion de crédits flexible et impact mesurable. 
              La solution B2B pensée pour les entreprises africaines.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl font-sans font-medium"
              >
                Demander une démo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/b2b-login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 font-sans font-medium"
              >
                Accéder au Dashboard B2B
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <Icon className="w-8 h-8 text-terracotta mx-auto mb-3" />
                  <div className="text-3xl font-serif text-terracotta mb-2">{benefit.stat}</div>
                  <h3 className="text-lg font-serif mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/70 font-sans">{benefit.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features détaillées */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-anthracite mb-4">
              Une plateforme <span className="text-terracotta">complète</span>
            </h2>
            <p className="text-lg text-muted-foreground font-sans max-w-2xl mx-auto">
              Tous les outils pour piloter le bien-être de vos équipes avec impact et confidentialité
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-gradient-to-b from-beige/5 to-transparent rounded-2xl border border-beige/30 hover:border-terracotta/30 transition-all duration-300"
                >
                  <div className="inline-flex p-3 bg-terracotta/10 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-terracotta" />
                  </div>
                  <h3 className="text-2xl font-serif text-anthracite mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground font-sans mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-anthracite/80 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-terracotta flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing & Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-anthracite to-anthracite/90 rounded-2xl p-8 sm:p-12 text-white">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-serif mb-4">
                Tarification <span className="text-terracotta">sur mesure</span>
              </h2>
              <p className="text-lg text-white/80 font-sans">
                Forfaits adaptés à la taille de vos équipes et à vos besoins
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {pricingFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-terracotta flex-shrink-0" />
                  <span className="text-sm font-sans">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl font-sans font-medium"
              >
                Demander un devis personnalisé
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground font-sans mb-4">
              Des questions ? Notre équipe est là pour vous
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="mailto:b2b@monafrica.net" className="flex items-center gap-2 text-terracotta hover:underline font-sans">
                <Mail className="w-5 h-5" />
                b2b@monafrica.net
              </a>
              <a href="tel:+243123456789" className="flex items-center gap-2 text-terracotta hover:underline font-sans">
                <Phone className="w-5 h-5" />
                +243 123 456 789
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}