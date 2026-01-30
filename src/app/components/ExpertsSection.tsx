import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Award, MapPin, Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export default function ExpertsSection() {
  const experts = [
    {
      name: "Dr. Amara Kamara",
      title: "Psychologue Clinicienne",
      specialties: ["Thérapie cognitive", "Gestion du stress"],
      location: "Kinshasa",
      image: "https://images.unsplash.com/photo-1633419798503-0b0c628f267c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdGhlcmFwaXN0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY5NDI1MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      verified: true,
    },
    {
      name: "Dr. Fatou Mbaye",
      title: "Psychiatre",
      specialties: ["Troubles anxieux", "Dépression"],
      location: "Dakar",
      image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGZlbWFsZSUyMHBzeWNob2xvZ2lzdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njk0MjUzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5.0,
      verified: true,
    },
    {
      name: "Dr. Kofi Mensah",
      title: "Thérapeute en Santé Mentale",
      specialties: ["Traumatismes", "ESPT"],
      location: "Abidjan",
      image: "https://images.unsplash.com/photo-1632054229795-4097870879b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFsZSUyMGRvY3RvciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njk0MjU0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      verified: true,
    },
    {
      name: "Dr. Awa Diop",
      title: "Psychologue pour Adolescents",
      specialties: ["Thérapie familiale", "Estime de soi"],
      location: "Kinshasa",
      image: "https://images.unsplash.com/photo-1712821125604-4ca6b1f86488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk0MjU0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      verified: true,
    },
  ];

  const [currentExpert, setCurrentExpert] = useState(0);

  const handlePrevExpert = () => {
    setCurrentExpert((prev) => (prev > 0 ? prev - 1 : experts.length - 1));
  };

  const handleNextExpert = () => {
    setCurrentExpert((prev) => (prev < experts.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="experts" className="py-12 sm:py-16 bg-gradient-to-b from-white to-beige/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Ultra compact */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-serif text-anthracite mb-3"
          >
            Nos <span className="text-terracotta">Experts</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-muted-foreground font-sans max-w-2xl mx-auto"
          >
            Des professionnels certifiés qui vous comprennent vraiment
          </motion.p>
        </div>

        {/* Carousel - 3-4 profils */}
        <div className="relative max-w-4xl mx-auto mb-8">
          <AnimatePresence mode="wait">
            {(() => {
              const expert = experts[currentExpert];
              return (
                <motion.div
                  key={currentExpert}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-beige/30 hover:border-terracotta/30 hover:shadow-xl transition-all duration-300">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Photo */}
                      <div className="relative h-64 md:h-80 overflow-hidden">
                        <ImageWithFallback
                          src={expert.image}
                          alt={expert.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {expert.verified && (
                          <div className="absolute top-4 right-4 bg-terracotta text-white p-2 rounded-full">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-serif text-anthracite mb-2">{expert.name}</h3>
                        <p className="text-sm text-terracotta mb-4 font-sans">{expert.title}</p>

                        {/* Location & Rating */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 font-sans">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{expert.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-gold fill-gold" />
                            <span>{expert.rating}</span>
                          </div>
                        </div>

                        {/* Specialties */}
                        <div className="mb-6">
                          <p className="text-xs text-muted-foreground mb-2 font-sans">Spécialités :</p>
                          <div className="flex flex-wrap gap-2">
                            {expert.specialties.map((specialty, sidx) => (
                              <span
                                key={sidx}
                                className="text-xs px-3 py-1.5 bg-beige/20 text-foreground rounded-full font-sans"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevExpert}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white border border-beige/30 hover:border-terracotta/30 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            aria-label="Expert précédent"
          >
            <ChevronLeft className="w-6 h-6 text-anthracite" />
          </button>
          <button
            onClick={handleNextExpert}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white border border-beige/30 hover:border-terracotta/30 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            aria-label="Expert suivant"
          >
            <ChevronRight className="w-6 h-6 text-anthracite" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {experts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentExpert(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentExpert
                    ? "bg-terracotta w-8"
                    : "bg-beige/40 hover:bg-beige/60"
                }`}
                aria-label={`Aller à l'expert ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA - Ultra compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/experts"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl font-sans text-base"
          >
            Découvrir nos experts
          </Link>
        </motion.div>
      </div>
    </section>
  );
}