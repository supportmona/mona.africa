import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Dumbbell, Sparkles, Palmtree, Star } from "lucide-react";
import { Link } from "react-router";

export default function CercleMonaSection() {
  const highlights = [
    {
      title: "Studios & Spas Premium",
      description: "Pilates, yoga et soins d'exception à Kinshasa, Dakar et Abidjan",
      icon: Dumbbell,
      image:
        "https://images.unsplash.com/photo-1761971975962-9cc397e2ba2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwaWxhdGVzJTIwc3R1ZGlvJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5Mzc1MzQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "M.O.N.A Escapes",
      description: "Retraites wellness en destinations d'exception (Casa Del Toro, Ranch de Saly...)",
      icon: Palmtree,
      image:
        "https://images.unsplash.com/photo-1765988299249-07da710ecb27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXRyZWF0JTIwZGVzdGluYXRpb258ZW58MXx8fHwxNzY5Mzc1MzQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section id="cercle" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white via-beige/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-3 sm:mb-4"
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
            <span className="text-xs sm:text-sm text-gold font-sans">Écosystème Lifestyle Premium</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif text-anthracite mb-3 sm:mb-4 px-2"
          >
            Le <span className="text-terracotta">Cercle M.O.N.A</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm lg:text-base text-muted-foreground font-sans max-w-3xl mx-auto px-4"
          >
            Au-delà de la thérapie, accédez à un écosystème complet de bien-être : studios premium, 
            spas d'exception et destinations wellness soigneusement sélectionnées.
          </motion.p>
        </div>

        {/* Highlights Grid - 2 cartes côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {highlights.map((highlight, idx) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image Background */}
                <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                  <ImageWithFallback
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-anthracite/90 via-anthracite/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-8 text-white">
                  <div className="mb-3 sm:mb-4 inline-flex p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-serif mb-2">{highlight.title}</h3>
                  <p className="text-sm sm:text-base text-white/90 font-sans">{highlight.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Grid - Compact 4 items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          {[
            { icon: Sparkles, label: "Spas d'Exception" },
            { icon: Dumbbell, label: "Studios Certifiés" },
            { icon: Palmtree, label: "Retraites Wellness" },
            { icon: Star, label: "Accès Premium" },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-3 sm:p-4 border border-beige/30 hover:border-gold/30 transition-all duration-300 text-center"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta mx-auto mb-2" />
                <p className="text-xs sm:text-sm text-anthracite font-sans">{feature.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/cercle"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl font-sans text-sm sm:text-base"
          >
            Découvrir Le Cercle M.O.N.A
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
