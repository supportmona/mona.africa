import FooterSection from "@/app/components/FooterSection";
import { Check, Star, Globe } from "lucide-react";
import NavigationBar from "@/app/components/NavigationBar";
import CurrencySelector from "@/app/components/CurrencySelector";
import { useState } from "react";
import { CurrencyCode, formatCurrency, getSubscriptionPrice } from "@/app/utils/currency";

export default function PricingPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("USD");

  const plans = [
    {
      name: "Essentiel",
      planKey: "essentiel" as const,
      description: "Pour commencer votre parcours bien-être",
      features: [
        "2 consultations/mois",
        "Accès chat thérapeutique",
        "Outils d'auto-évaluation",
        "Support par email",
      ],
      cta: "Commencer",
      popular: false,
    },
    {
      name: "Premium",
      planKey: "premium" as const,
      description: "Le plus populaire pour un suivi régulier",
      features: [
        "4 consultations/mois",
        "Accès chat illimité",
        "Passeport Santé numérique",
        "Accès au Cercle M.O.N.A",
        "10% réduction partenaires",
        "Support prioritaire",
      ],
      cta: "Choisir Premium",
      popular: true,
    },
    {
      name: "Excellence",
      planKey: "excellence" as const,
      description: "Pour une expérience complète et privilégiée",
      features: [
        "Consultations illimitées",
        "Accès VIP au Cercle",
        "Carte membre NFC premium",
        "Concierge santé dédié",
        "Escapes wellness incluses",
        "25% réduction partenaires",
        "Support 24/7",
      ],
      cta: "Excellence",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Hero - Compact */}
      <section className="pt-24 sm:pt-28 pb-8 sm:pb-12 bg-gradient-to-b from-beige/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-anthracite mb-3 sm:mb-4">
              Tarifs <span className="text-terracotta">Transparents</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-sans max-w-3xl mx-auto px-4 mb-6">
              Choisissez le plan qui correspond à vos besoins. Paiement flexible par Mobile Money
              (Wave, Orange Money) ou carte bancaire.
            </p>

            {/* Currency Selector */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4 text-terracotta" />
                <span>Afficher les tarifs en :</span>
              </div>
              <CurrencySelector
                value={selectedCurrency}
                onChange={setSelectedCurrency}
                compact={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards - Compact */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">{plans.map((plan, idx) => {
              const price = getSubscriptionPrice(plan.planKey, selectedCurrency);
              const formattedPrice = formatCurrency(price, selectedCurrency, { 
                showSymbol: false,
                compact: true 
              });

              return (
              <div
                key={idx}
                className={`relative bg-white rounded-xl border-2 p-4 sm:p-5 lg:p-6 ${
                  plan.popular
                    ? "border-terracotta shadow-2xl sm:scale-105"
                    : "border-beige/30 hover:border-terracotta/30"
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta text-white px-3 py-1 rounded-full text-xs sm:text-sm font-sans flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
                    Le plus populaire
                  </div>
                )}

                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-anthracite mb-1 sm:mb-2">{plan.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-sans mb-3 sm:mb-4">{plan.description}</p>

                <div className="mb-4 sm:mb-5">
                  <span className="text-4xl sm:text-5xl font-serif text-anthracite">{formattedPrice}</span>
                  <span className="text-sm sm:text-lg text-muted-foreground font-sans ml-2">
                    /mois
                  </span>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-5">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3 font-sans">
                      <Check className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg transition-all duration-200 font-sans ${
                    plan.popular
                      ? "bg-terracotta text-white hover:bg-opacity-90 shadow-lg"
                      : "bg-white border-2 border-beige text-anthracite hover:bg-beige/10"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}</div>

          {/* Additional Info */}
          <div className="mt-16 text-center space-y-4">
            <div className="bg-beige/10 rounded-xl p-6 max-w-3xl mx-auto">
              <h4 className="font-serif text-lg text-anthracite mb-3">💡 À savoir</h4>
              <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>
                  <div className="font-semibold text-anthracite mb-1">Kinshasa</div>
                  <div>USD principalement accepté</div>
                </div>
                <div>
                  <div className="font-semibold text-anthracite mb-1">Dakar & Abidjan</div>
                  <div>XOF (Franc CFA)</div>
                </div>
                <div>
                  <div className="font-semibold text-anthracite mb-1">Paiements</div>
                  <div>Mobile Money & Cartes</div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground font-sans">
              Tous les plans incluent : Chiffrement E2E • Conformité RGPD • Infrastructure Offline-First
            </p>
            <p className="text-sm text-muted-foreground font-sans">
              Besoin d'une solution sur mesure ? <a href="#" className="text-terracotta hover:underline">Contactez-nous</a>
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}