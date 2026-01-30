import FooterSection from "@/app/components/FooterSection";
import { HelpCircle, Book, CreditCard, Users, Shield, Smartphone } from "lucide-react";
import NavigationBar from "@/app/components/NavigationBar";

export default function HelpCenterPage() {
  const categories = [
    {
      icon: Book,
      title: "Démarrer avec M.O.N.A",
      questions: [
        "Comment créer mon compte ?",
        "Comment réserver ma première consultation ?",
        "Comment fonctionne le Smart Matching ?",
      ],
    },
    {
      icon: CreditCard,
      title: "Paiements & Abonnements",
      questions: [
        "Quels moyens de paiement acceptez-vous ?",
        "Comment payer par Mobile Money ?",
        "Puis-je annuler mon abonnement ?",
      ],
    },
    {
      icon: Users,
      title: "Consultations",
      questions: [
        "Comment se déroule une séance en ligne ?",
        "Puis-je changer de thérapeute ?",
        "Que faire en cas d'urgence ?",
      ],
    },
    {
      icon: Shield,
      title: "Confidentialité & Sécurité",
      questions: [
        "Mes données sont-elles sécurisées ?",
        "Qui a accès à mes informations ?",
        "Comment fonctionne le chiffrement E2E ?",
      ],
    },
    {
      icon: Smartphone,
      title: "Application Mobile",
      questions: [
        "L'app fonctionne-t-elle hors ligne ?",
        "Comment télécharger l'application ?",
        "Quelles fonctionnalités offline ?",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-beige/10 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-terracotta mx-auto mb-6" />
            <h1 className="text-5xl lg:text-6xl font-serif text-anthracite mb-6">
              Centre d'<span className="text-terracotta">Aide</span>
            </h1>
            <p className="text-xl text-muted-foreground font-sans max-w-3xl mx-auto mb-8">
              Trouvez rapidement des réponses à vos questions.
            </p>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Rechercher dans l'aide..."
                className="w-full px-6 py-4 border-2 border-beige/30 rounded-lg focus:outline-none focus:border-terracotta font-sans"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-beige/30 hover:border-terracotta/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-4 inline-flex p-3 bg-terracotta/10 rounded-xl">
                    <Icon className="w-6 h-6 text-terracotta" />
                  </div>
                  <h3 className="text-xl font-serif text-anthracite mb-4">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.questions.map((question, qidx) => (
                      <li key={qidx}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground hover:text-terracotta transition-colors font-sans"
                        >
                          {question}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Contact Support */}
          <div className="mt-16 text-center bg-gradient-to-r from-beige/20 to-terracotta/10 rounded-2xl p-12">
            <h2 className="text-3xl font-serif text-anthracite mb-4">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 font-sans">
              Notre équipe support est là pour vous aider 24/7.
            </p>
            <button className="px-8 py-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl font-sans">
              Contacter le support
            </button>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}