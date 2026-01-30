import { motion, AnimatePresence } from "motion/react";
import { Globe, Heart, Shield, Sparkles, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function AboutSection() {
  const stats = [
    { value: "50+", label: "Experts certifiés" },
    { value: "3", label: "Villes africaines" },
    { value: "100%", label: "Confidentialité garantie" },
    { value: "24/7", label: "Accès Offline-First" },
  ];

  const pillars = [
    {
      icon: Globe,
      title: "Innovation Mondiale, Ancrage Local",
      description:
        "Née au Canada, M.O.N.A s'enracine stratégiquement à Kinshasa, Dakar et Abidjan pour offrir une technologie de pointe adaptée aux réalités africaines.",
      color: "terracotta",
    },
    {
      icon: Heart,
      title: "Santé Mentale Sans Compromis",
      description:
        "Nous croyons que le mieux-être mental de qualité ne doit pas être un privilège réservé à quelques-uns. M.O.N.A démocratise l'accès à des experts certifiés.",
      color: "gold",
    },
    {
      icon: Shield,
      title: "Respect de Votre Identité",
      description:
        "Votre contexte culturel, vos valeurs spirituelles, votre langue maternelle : nous matchons des experts qui vous comprennent vraiment, pas juste des algorithmes froids.",
      color: "beige",
    },
  ];

  const [currentPillar, setCurrentPillar] = useState(0);

  const handlePrevPillar = () => {
    setCurrentPillar((prev) => (prev > 0 ? prev - 1 : pillars.length - 1));
  };

  const handleNextPillar = () => {
    setCurrentPillar((prev) => (prev < pillars.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-beige/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-sans">Notre Vision</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-anthracite mb-4 sm:mb-6"
          >
            Pourquoi <span className="text-terracotta">M.O.N.A</span> existe
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground font-sans max-w-3xl mx-auto leading-relaxed px-4"
          >
            Trop longtemps, l'Afrique a été un désert en matière de santé mentale de qualité. 
            M.O.N.A change la donne en combinant{" "}
            <span className="text-anthracite font-medium">innovation technologique canadienne</span> et{" "}
            <span className="text-anthracite font-medium">expertise clinique locale</span> pour créer 
            une expérience de mieux-être premium, culturellement pertinente et accessible.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-6 border border-beige/30 text-center hover:border-gold/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-terracotta mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pillars Carousel - Mobile and Tablet only */}
        <div className="block lg:hidden relative mb-12 sm:mb-16">
          <div className="relative max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {(() => {
                const pillar = pillars[currentPillar];
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={currentPillar}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <div className="relative h-full p-6 sm:p-8 bg-white rounded-2xl border border-beige/30 hover:border-terracotta/30 transition-all duration-300 hover:shadow-xl">
                      {/* Gradient Background on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-beige/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Icon */}
                      <div className="relative mb-4 inline-flex p-3 bg-beige/20 rounded-xl">
                        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 text-${pillar.color}`} />
                      </div>

                      {/* Content */}
                      <h3 className="relative text-lg sm:text-xl font-serif text-anthracite mb-3">
                        {pillar.title}
                      </h3>
                      <p className="relative text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevPillar}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white border border-beige/30 hover:border-terracotta/30 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Pilier précédent"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-anthracite" />
            </button>
            <button
              onClick={handleNextPillar}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white border border-beige/30 hover:border-terracotta/30 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Pilier suivant"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-anthracite" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {pillars.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPillar(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentPillar
                      ? "bg-terracotta w-8"
                      : "bg-beige/40 hover:bg-beige/60"
                  }`}
                  aria-label={`Aller au pilier ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pillars Grid - Desktop only */}
        <div className="hidden lg:grid grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="group"
              >
                <div className="relative h-full p-6 sm:p-8 bg-white rounded-2xl border border-beige/30 hover:border-terracotta/30 transition-all duration-300 hover:shadow-xl">
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-beige/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="relative mb-4 inline-flex p-3 bg-beige/20 rounded-xl">
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 text-${pillar.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-lg sm:text-xl font-serif text-anthracite mb-3">
                    {pillar.title}
                  </h3>
                  <p className="relative text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Statement - Quiet Luxury Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-terracotta/5 via-beige/5 to-gold/5 rounded-3xl p-8 sm:p-12 border border-beige/30">
            <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-terracotta mx-auto mb-4 sm:mb-6" />
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif text-anthracite leading-relaxed mb-4">
              "Nous ne parlons pas de <em>patients</em>, nous parlons de{" "}
              <span className="text-terracotta font-medium">Membres M.O.N.A</span> — 
              des individus qui investissent dans leur excellence mentale."
            </blockquote>
            <p className="text-sm sm:text-base text-muted-foreground font-sans">
              Une approche premium pour une transformation durable
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}