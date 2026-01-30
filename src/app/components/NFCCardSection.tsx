import { motion } from "motion/react";
import { CreditCard, Shield, Sparkles, Wifi } from "lucide-react";
import { Link } from "react-router";

export default function NFCCardSection() {
  const cardFeatures = [
    {
      icon: CreditCard,
      title: "Design Premium",
      description: "Carte en métal brossé or avec gravure personnalisée",
    },
    {
      icon: Wifi,
      title: "Technologie NFC",
      description: "Accès instantané à vos privilèges d'un simple geste",
    },
    {
      icon: Shield,
      title: "Sécurité Avancée",
      description: "Puce cryptée et authentification biométrique",
    },
    {
      icon: Sparkles,
      title: "Statut Exclusif",
      description: "Reconnaissance immédiate dans notre réseau partenaire",
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-beige/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Side - Card Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            {/* Card Mock */}
            <div className="relative">
              <div className="aspect-[1.586/1] bg-gradient-to-br from-anthracite via-anthracite to-black rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-8 relative overflow-hidden">
                {/* Card Details */}
                <div className="relative z-10 h-full flex flex-col justify-between text-white">
                  <div>
                    <div className="flex items-center gap-2 mb-6 sm:mb-8">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gold rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-anthracite" />
                      </div>
                      <span className="text-xs sm:text-sm font-sans tracking-wider">MEMBRE EXCLUSIF</span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs text-white/60 mb-1 font-sans">MEMBRE DEPUIS</p>
                      <p className="text-base sm:text-lg font-serif">2026</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs sm:text-sm text-gold font-sans">M.O.N.A</p>
                      </div>
                      <Wifi className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gold/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-terracotta/10 rounded-full blur-3xl" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-terracotta text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-xl font-sans text-xs sm:text-sm"
              >
                NFC Enabled
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gold/10 border border-gold/20 rounded-full mb-4 sm:mb-6">
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
              <span className="text-xs sm:text-sm text-gold font-sans">Carte Membre Physique</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-anthracite mb-4 sm:mb-6 px-2">
              Votre Carte <span className="text-terracotta">NFC Premium</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 font-sans leading-relaxed px-2">
              Plus qu'une simple carte, votre passeport vers un écosystème de privilèges
              exclusifs. Technologie NFC pour un accès instantané et sécurisé à tous vos
              avantages membres.
            </p>

            {/* Features List */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {cardFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-beige/30"
                  >
                    <div className="flex-shrink-0 p-2 sm:p-2.5 bg-terracotta/10 rounded-lg">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-serif text-anthracite mb-1">{feature.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground font-sans">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Link
              to="/carte-membre"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl font-sans text-sm sm:text-base"
            >
              Commander ma carte
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}