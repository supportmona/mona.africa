import NavigationBar from "@/app/components/NavigationBar";
import FooterSection from "@/app/components/FooterSection";
import { MapPin, Star, Sparkles, ExternalLink, Phone, Mail, ChevronLeft, Clock, Target, Dumbbell, Activity, Apple, BarChart, Flame, Weight, Home } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export default function BodyPulsePage() {
  const images = [
    "https://images.unsplash.com/photo-1758957646695-ec8bce3df462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBlcXVpcG1lbnQlMjBtb2Rlcm4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njk0MzkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1761971976003-dc348a4f2fa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVyY2lzZSUyMHN0dWRpbyUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc2OTQ0NDU0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwc3R1ZGlvJTIwZW1wdHklMjBzcGFjZXxlbnwxfHx8fDE3Njk0NDQ1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  const amenities = [
    { icon: Dumbbell, label: "Coaching 100% personnalisé" },
    { icon: Target, label: "Programmes sur-mesure" },
    { icon: Apple, label: "Suivi nutritionnel inclus" },
    { icon: BarChart, label: "Évaluations régulières" },
    { icon: Activity, label: "Stretching & mobilité" },
    { icon: Flame, label: "Boxing & cardio" },
    { icon: Weight, label: "Musculation fonctionnelle" },
    { icon: Home, label: "Studio intimiste (max 2 personnes)" },
  ];

  const programs = [
    {
      name: "Séance Découverte",
      duration: "1h",
      price: "Gratuit",
      description: "Bilan postural + test condition physique + programme personnalisé",
    },
    {
      name: "Coaching Privé (1 séance)",
      duration: "1h",
      price: "25 000 FCFA",
      description: "Séance individuelle 100% adaptée à vos objectifs",
    },
    {
      name: "Carnet 10 Séances",
      duration: "10h",
      price: "200 000 FCFA",
      description: "Formule engagement avec suivi nutrition inclus",
    },
    {
      name: "Programme Transformation 3 mois",
      duration: "3 mois",
      price: "450 000 FCFA",
      description: "24 séances + nutrition + suivi WhatsApp quotidien",
    },
  ];

  const schedule = [
    { day: "Lundi - Vendredi", hours: "6h00 - 21h00" },
    { day: "Samedi", hours: "7h00 - 15h00" },
    { day: "Dimanche", hours: "Fermé" },
  ];

  const specialties = [
    { icon: "💪", title: "Remise en forme", desc: "Perte de poids, tonification musculaire" },
    { icon: "🏋️", title: "Prise de masse", desc: "Programme hypertrophie & nutrition adaptée" },
    { icon: "🧘", title: "Mobilité & Posture", desc: "Correction posturale, stretching avancé" },
    { icon: "🥊", title: "Cardio Boxing", desc: "Défouloir & brûleur de calories efficace" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Bouton Retour */}
      <div className="pt-24 sm:pt-28 pb-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/cercle"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-terracotta transition-colors duration-200 font-sans"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Retour au Cercle</span>
          </Link>
        </div>
      </div>

      {/* Hero Image avec Gallery */}
      <section className="bg-white pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Image principale */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={images[0]}
                alt="Body Pulse"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-terracotta/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-sans text-white">Pilates & Sport</span>
              </div>
            </div>

            {/* Images secondaires */}
            <div className="hidden lg:grid grid-rows-2 gap-4">
              {images.slice(1).map((img, idx) => (
                <div key={idx} className="relative h-full rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={img}
                    alt={`Body Pulse ${idx + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contenu Principal */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Colonne Principale */}
            <div className="lg:col-span-2 space-y-8">
              {/* En-tête */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-anthracite mb-2">
                      Body Pulse
                    </h1>
                    <p className="text-lg text-terracotta font-sans mb-2">Coaching Privé & Sur-Mesure</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-sans">Les Almadies, Dakar, Sénégal</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-gold/10 px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="text-sm font-sans font-semibold text-gold">5.0</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-beige/20 text-foreground rounded-full text-sm font-sans">
                    🏋️ Coaching Privé
                  </span>
                  <span className="px-3 py-1.5 bg-beige/20 text-foreground rounded-full text-sm font-sans">
                    💪 Sur-mesure
                  </span>
                  <span className="px-3 py-1.5 bg-beige/20 text-foreground rounded-full text-sm font-sans">
                    🎯 Intimiste
                  </span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-serif text-anthracite mb-4">À propos</h2>
                <div className="space-y-4 text-foreground font-sans leading-relaxed">
                  <p>
                    Body Pulse n'est pas une salle de sport classique. C'est un studio privé de coaching sportif
                    haut de gamme où chaque client bénéficie d'un suivi 100% personnalisé. Pas de cours collectifs
                    bondés, pas d'attente aux machines : ici, c'est vous, votre coach, et vos objectifs.
                  </p>
                  <p>
                    Fondé par Amadou Diallo, coach sportif certifié avec 15 ans d'expérience (diplômé de l'INSEPS
                    de Dakar et certifications internationales NASM et ACE), Body Pulse propose des programmes
                    d'entraînement ultra-personnalisés qui prennent en compte votre morphologie, vos blessures
                    éventuelles, votre emploi du temps, et vos goûts.
                  </p>
                  <p>
                    La philosophie : pas de méthode miracle ni de promesses irréalistes, mais un travail sérieux,
                    progressif et adapté. Chaque programme inclut un volet nutritionnel avec des menus adaptés
                    à la cuisine sénégalaise (oui, on peut manger du thiébou dieun et atteindre ses objectifs !).
                  </p>
                </div>
              </motion.div>

              {/* Le vrai plus */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-beige/20 to-terracotta/10 border border-beige/30 rounded-xl p-6"
              >
                <h3 className="text-xl font-serif text-anthracite mb-3">Le Vrai Plus</h3>
                <p className="text-foreground font-sans leading-relaxed">
                  L'approche sur-mesure loin des salles bondées. Body Pulse ne prend jamais plus de 2 clients
                  simultanément dans le studio. Résultat : votre coach est 100% concentré sur vous, corrige
                  chaque mouvement, adapte l'intensité en temps réel, et vous pousse exactement là où il faut.
                  C'est comme avoir un coach olympique rien que pour vous.
                </p>
              </motion.div>

              {/* Spécialités */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-serif text-anthracite mb-4">Spécialités</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {specialties.map((specialty, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-beige/10 rounded-lg border border-beige/30"
                    >
                      <div className="text-3xl mb-2">{specialty.icon}</div>
                      <h4 className="font-sans font-semibold text-anthracite mb-1">{specialty.title}</h4>
                      <p className="text-sm text-muted-foreground font-sans">{specialty.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Équipements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-serif text-anthracite mb-4">Équipements & Services</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-sans text-foreground">
                      <amenity.icon className="w-4 h-4" />
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Programmes & Tarifs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-serif text-anthracite mb-4">Programmes & Tarifs</h2>
                <div className="space-y-3">
                  {programs.map((program, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-beige/10 rounded-lg border border-beige/30"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-sans font-semibold text-foreground text-lg">{program.name}</p>
                          <p className="text-sm text-muted-foreground font-sans">{program.duration}</p>
                        </div>
                        <span className="text-lg font-sans font-semibold text-terracotta">{program.price}</span>
                      </div>
                      <p className="text-sm text-foreground font-sans">{program.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Horaires */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-serif text-anthracite mb-4">Horaires d'ouverture</h2>
                <div className="space-y-3">
                  {schedule.map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white border border-beige/30 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-terracotta" />
                        <span className="font-sans text-foreground">{slot.day}</span>
                      </div>
                      <span className="font-sans font-semibold text-anthracite">{slot.hours}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Témoignage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-gold/10 to-beige/20 border border-gold/30 rounded-xl p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-terracotta" />
                  </div>
                  <div>
                    <p className="text-foreground font-sans italic leading-relaxed mb-2">
                      "Amadou a transformé ma relation au sport. J'ai perdu 15kg en 4 mois, mais surtout j'ai
                      retrouvé confiance en moi. Son approche bienveillante et professionnelle fait toute la
                      différence."
                    </p>
                    <p className="text-sm font-sans text-muted-foreground">
                      — Fatou D., Directrice Marketing, Programme Transformation 3 mois
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Réservation */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-28 bg-white border-2 border-beige/30 rounded-2xl p-6 space-y-6"
              >
                {/* Avantage MindPass */}
                <div className="bg-gradient-to-br from-gold/10 to-terracotta/10 border-2 border-gold/20 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <Sparkles className="w-6 h-6 text-gold flex-shrink-0" />
                    <div>
                      <p className="font-sans font-bold text-anthracite mb-1">Avantage Membre MindPass</p>
                      <p className="text-sm font-sans text-foreground">
                        -20% sur le premier carnet de 10 séances
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prix avec réduction */}
                <div className="border-t border-beige/30 pt-6">
                  <p className="text-sm text-muted-foreground font-sans mb-2">Carnet 10 séances</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <p className="text-3xl font-serif text-anthracite">160 000 FCFA</p>
                    <p className="text-lg font-sans text-muted-foreground line-through">200 000 FCFA</p>
                  </div>
                  <p className="text-sm text-terracotta font-sans">Économisez 40 000 FCFA avec MindPass</p>
                </div>

                {/* Bouton CTA Principal */}
                <a
                  href="https://bodypulse.sn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl font-sans"
                >
                  <span>Contacter le coach</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Contact */}
                <div className="space-y-3">
                  <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white border-2 border-beige text-anthracite rounded-lg hover:bg-beige/10 transition-all duration-200 font-sans">
                    <Phone className="w-4 h-4" />
                    <span>Appeler directement</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white border-2 border-beige text-anthracite rounded-lg hover:bg-beige/10 transition-all duration-200 font-sans">
                    <Mail className="w-4 h-4" />
                    <span>Message WhatsApp</span>
                  </button>
                </div>

                {/* Séance découverte */}
                <div className="bg-terracotta/10 border border-terracotta/30 rounded-lg p-4">
                  <p className="text-sm font-sans font-semibold text-anthracite mb-2">
                    🎁 Première séance gratuite
                  </p>
                  <p className="text-xs text-foreground font-sans leading-relaxed">
                    Profitez d'une séance découverte offerte incluant bilan postural, test condition physique
                    et programme personnalisé.
                  </p>
                </div>

                {/* Info */}
                <div className="border-t border-beige/30 pt-6">
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    💳 Mentionnez votre statut MindPass lors de votre première prise de contact pour bénéficier
                    de la réduction de 20% sur votre carnet.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}