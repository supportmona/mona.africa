import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

export default function HeroSection() {
  const therapists = [
    {
      name: "Dr. Amara K.",
      image: "https://images.unsplash.com/photo-1633419798503-0b0c628f267c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NDI1MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Dr. Fatou M.",
      image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGZlbWFsZSUyMHBzeWNob2xvZ2lzdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njk0MjUzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Dr. Kofi A.",
      image: "https://images.unsplash.com/photo-1632054229795-4097870879b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFsZSUyMGRvY3RvciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njk0MjU0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Dr. Awa D.",
      image: "https://images.unsplash.com/photo-1712821125604-4ca6b1f86488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk0MjU0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section id="hero" className="relative min-h-[85vh] sm:min-h-screen flex items-center pt-14 sm:pt-16 lg:pt-20 overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1767350510090-137a6ce252c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWxsbmVzcyUyMG1lZGl0YXRpb24lMjBzcGF8ZW58MXx8fHwxNzY5Mzc1Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Wellness Luxury"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-3 sm:mb-4"
          >
            <Sparkles className="w-3 h-3 text-gold flex-shrink-0" />
            <span className="text-[10px] sm:text-xs lg:text-sm text-gold font-sans whitespace-nowrap">Innovation × Expertise</span>
          </motion.div>

          {/* Logo Principal "M.O.N.A" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-2 sm:mb-3"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold text-anthracite mb-1 break-words tracking-wide">
              M.O.N.A
            </h1>
            <p className="text-[11px] sm:text-xs lg:text-sm text-muted-foreground font-sans tracking-tight">
              Mieux-être, Optimisation & Neuro-Apaisement
            </p>
          </motion.div>

          {/* Accroche principale */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-foreground mb-2 sm:mb-3 leading-relaxed px-2 break-words"
          >
            Découvrez la <span className="text-terracotta">Méthode M.O.N.A</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[11px] sm:text-xs lg:text-sm xl:text-base text-muted-foreground mb-3 sm:mb-4 max-w-2xl mx-auto font-sans leading-relaxed px-3 break-words"
          >
            La première plateforme qui allie l'optimisation de votre potentiel au neuro-apaisement de votre esprit. 
            De Kinshasa à Dakar, prenez le contrôle.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-4"
          >
            <Link
              to="/onboarding"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-sans shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <span>Calculer mon score</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/experts"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-beige text-anthracite rounded-lg hover:bg-beige/10 transition-all duration-300 font-sans text-sm sm:text-base"
            >
              Nos Experts
            </Link>
          </motion.div>

          {/* Section Visages - Social Proof - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4"
          >
            {/* Photos de profil des thérapeutes */}
            <div className="flex items-center -space-x-3 sm:-space-x-4">
              {therapists.map((therapist, idx) => (
                <div
                  key={idx}
                  className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 sm:border-3 border-background shadow-lg hover:scale-110 transition-transform duration-200"
                  title={therapist.name}
                >
                  <ImageWithFallback
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Texte de confiance - Mobile Optimized */}
            <div className="flex items-start sm:items-center gap-2 text-foreground max-w-md">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta flex-shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-xs sm:text-sm font-sans text-left sm:text-center">
                <span className="font-medium">Accompagnement par 50+ experts cliniques vérifiés</span>
                <span className="text-muted-foreground block sm:inline"> à Kinshasa, Dakar et Abidjan</span>
              </p>
            </div>
          </motion.div>

          {/* Features - Mobile First Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-left px-4"
          >
            {[
              { title: "Smart Matching", desc: "Correspondance culturelle intelligente" },
              { title: "Norme FHIR", desc: "Passeport Santé sécurisé" },
              { title: "Offline-First", desc: "Infrastructure Africa-Ready" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-lg border border-beige/30"
              >
                <h3 className="text-base sm:text-lg font-serif text-anthracite mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-sans">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}