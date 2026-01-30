import NavigationBar from "@/app/components/NavigationBar";
import FooterSection from "@/app/components/FooterSection";
import { motion } from "motion/react";
import { BookOpen, FileText, Video, Download, TrendingUp, Heart } from "lucide-react";

export default function ResourcesPage() {
  const categories = [
    {
      icon: BookOpen,
      title: "Guides & Articles",
      description: "Découvrez nos guides pratiques sur la santé mentale",
      items: [
        "Guide du bien-être au travail",
        "Comprendre l'anxiété",
        "Techniques de relaxation",
        "Gérer le stress quotidien",
      ],
    },
    {
      icon: Video,
      title: "Vidéos & Webinaires",
      description: "Formations et témoignages de nos experts",
      items: [
        "Introduction à la méditation",
        "Gestion des émotions",
        "Sommeil et santé mentale",
        "Équilibre vie pro/perso",
      ],
    },
    {
      icon: FileText,
      title: "Documents",
      description: "Ressources téléchargeables et outils pratiques",
      items: [
        "Journal de gratitude",
        "Exercices de respiration",
        "Plan d'action bien-être",
        "Fiches pratiques",
      ],
    },
  ];

  const stats = [
    { icon: Heart, value: "500+", label: "Articles" },
    { icon: Video, value: "100+", label: "Vidéos" },
    { icon: Download, value: "50+", label: "Guides PDF" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-16 bg-gradient-to-b from-beige/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 border border-terracotta/20 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-terracotta" />
              <span className="text-sm text-terracotta font-sans">Ressources</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-anthracite mb-6">
              Centre de <span className="text-terracotta">Ressources</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed">
              Accédez à notre bibliothèque complète de ressources sur la santé mentale.
              Articles, vidéos, guides pratiques et outils pour votre bien-être.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 max-w-4xl mx-auto"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center p-4 sm:p-6 bg-white rounded-xl border border-beige/30">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-terracotta mx-auto mb-3" />
                  <div className="text-xl sm:text-2xl lg:text-3xl font-serif text-anthracite mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-sans">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-beige/30 hover:border-terracotta/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="inline-flex p-3 bg-terracotta/10 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-terracotta" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-anthracite mb-3">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="flex items-center gap-3 text-sm text-anthracite font-sans"
                      >
                        <div className="w-1.5 h-1.5 bg-terracotta rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 w-full px-4 py-3 bg-beige/30 text-anthracite rounded-lg hover:bg-beige/50 transition-all duration-200 font-sans text-sm">
                    Explorer
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-beige/30 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TrendingUp className="w-12 h-12 text-terracotta mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-anthracite mb-4">
              Besoin d'un accompagnement personnalisé ?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-sans mb-8">
              Nos experts en santé mentale sont là pour vous accompagner dans votre parcours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-all duration-200 shadow-lg font-sans">
                Trouver un expert
              </button>
              <button className="px-8 py-4 bg-white text-anthracite border-2 border-beige rounded-lg hover:border-terracotta/30 transition-all duration-200 font-sans">
                En savoir plus
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
