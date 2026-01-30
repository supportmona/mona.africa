import NavigationBar from "@/app/components/NavigationBar";
import FooterSection from "@/app/components/FooterSection";
import { MapPin, Star, Sparkles, ExternalLink, Phone, Mail, ChevronLeft, Clock, Bath, Flame, Waves, Eye, Leaf, Coffee, Music } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export default function EforeaSpaPage() {
  const images = [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1596178060671-7a80e880c3f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  ];

  const amenities = [
    { icon: Sparkles, label: "Soins Elemis de luxe" },
    { icon: Bath, label: "Hammam traditionnel privatif" },
    { icon: Flame, label: "Sauna finlandais" },
    { icon: Waves, label: "Piscine intérieure chauffée" },
    { icon: Eye, label: "Cabines VIP ultra-luxe" },
    { icon: Leaf, label: "Produits bio & naturels" },
    { icon: Coffee, label: "Espace relaxation avec thés" },
    { icon: Music, label: "Ambiance sonore apaisante" },
  ];

  const treatments = [
    {
      name: "Massage Elemis Signature",
      duration: "60 min",
      price: "45 000 FCFA",
      description: "Massage relaxant aux huiles aromatiques",
    },
    {
      name: "Soin Visage Pro-Collagen",
      duration: "75 min",
      price: "55 000 FCFA",
      description: "Soin anti-âge emblématique d'Elemis",
    },
    {
      name: "Rituel Hammam + Gommage",
      duration: "90 min",
      price: "40 000 FCFA",
      description: "Expérience purifiante complète",
    },
    {
      name: "Journey Wellness (3h)",
      duration: "180 min",
      price: "120 000 FCFA",
      description: "Hammam + Gommage + Massage + Soin visage",
    },
  ];

  const schedule = [
    { day: "Lundi - Vendredi", hours: "10h00 - 21h00" },
    { day: "Samedi - Dimanche", hours: "9h00 - 22h00" },
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
                alt="Eforea Spa"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-terracotta/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-sans text-white">Spas & Soins</span>
              </div>
            </div>

            {/* Images secondaires */}
            <div className="hidden lg:grid grid-rows-2 gap-4">
              {images.slice(1).map((img, idx) => (
                <div key={idx} className="relative h-full rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={img}
                    alt={`Eforea Spa ${idx + 2}`}
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
                      Eforea Spa
                    </h1>
                    <p className="text-lg text-terracotta font-sans mb-2">Sanctuaire de Bien-Être</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-sans">Marcory Zone 4, Abidjan, Côte d'Ivoire</span>
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
                    💆 Soins Elemis
                  </span>
                  <span className="px-3 py-1.5 bg-beige/20 text-foreground rounded-full text-sm font-sans">
                    🛁 Hammam
                  </span>
                  <span className="px-3 py-1.5 bg-beige/20 text-foreground rounded-full text-sm font-sans">
                    ✨ Design Épuré
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
                    Eforea Spa est un havre de paix au cœur d'Abidjan. Inspiré par les philosophies holistiques
                    orientales et occidentales, ce spa d'exception marie design contemporain minimaliste et
                    rituels ancestraux de bien-être.
                  </p>
                  <p>
                    Les cabines de soins sont de véritables cocons de luxe : éclairage tamisé, matériaux nobles
                    (marbre, bois précieux), linge en coton égyptien, et technologies de pointe (tables
                    chauffantes, chromothérapie). Chaque détail est pensé pour créer une expérience sensorielle
                    totale.
                  </p>
                  <p>
                    Eforea Spa est partenaire exclusif de la marque britannique Elemis, référence mondiale en
                    soins spa de luxe. Les thérapeutes, formés internationalement, maîtrisent les protocoles
                    signature Elemis tout en intégrant des techniques locales (massage ivoirien au beurre de
                    karité, gommage au café).
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
                  Les cabines de soins ultra-luxe et le hammam privé. Contrairement aux spas classiques, ici
                  chaque cabine VIP dispose de son propre hammam privatif, douche à effet pluie, et espace
                  relaxation. Vous n'avez jamais à partager les espaces humides avec d'autres clients. Une
                  intimité totale pour une déconnexion absolue.
                </p>
              </motion.div>

              {/* Équipements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
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

              {/* Soins & Tarifs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-serif text-anthracite mb-4">Carte des Soins</h2>
                <div className="space-y-3">
                  {treatments.map((treatment, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-beige/10 rounded-lg border border-beige/30"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-sans font-semibold text-foreground text-lg">{treatment.name}</p>
                          <p className="text-sm text-muted-foreground font-sans">{treatment.duration}</p>
                        </div>
                        <span className="text-lg font-sans font-semibold text-terracotta">{treatment.price}</span>
                      </div>
                      <p className="text-sm text-foreground font-sans">{treatment.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Horaires */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
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

              {/* Expertise Elemis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-gold/10 to-beige/20 border border-gold/30 rounded-xl p-6"
              >
                <h3 className="text-xl font-serif text-anthracite mb-3">✨ L'Excellence Elemis</h3>
                <p className="text-foreground font-sans leading-relaxed mb-3">
                  Elemis est la marque de spa n°1 en Grande-Bretagne, utilisée dans les plus grands hôtels
                  5 étoiles du monde. Ses soins visage Pro-Collagen sont mondialement réputés pour leurs
                  résultats anti-âge spectaculaires.
                </p>
                <p className="text-sm text-muted-foreground font-sans">
                  Eforea Spa est l'un des rares spas en Afrique de l'Ouest à proposer l'intégralité de la
                  gamme Elemis.
                </p>
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
                        Accès Hammam offert pour tout soin de 60min
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prix à partir de */}
                <div className="border-t border-beige/30 pt-6">
                  <p className="text-sm text-muted-foreground font-sans mb-2">Soins à partir de</p>
                  <p className="text-3xl font-serif text-anthracite mb-1">40 000 FCFA</p>
                  <p className="text-xs text-muted-foreground font-sans">Hammam + Gommage (90min)</p>
                </div>

                {/* Bouton CTA Principal */}
                <a
                  href="https://eforeaspa.ci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl font-sans"
                >
                  <span>Voir la carte des soins</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Contact */}
                <div className="space-y-3">
                  <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white border-2 border-beige text-anthracite rounded-lg hover:bg-beige/10 transition-all duration-200 font-sans">
                    <Phone className="w-4 h-4" />
                    <span>Appeler le spa</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white border-2 border-beige text-anthracite rounded-lg hover:bg-beige/10 transition-all duration-200 font-sans">
                    <Mail className="w-4 h-4" />
                    <span>Réserver par email</span>
                  </button>
                </div>

                {/* Info */}
                <div className="border-t border-beige/30 pt-6">
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    💳 Présentez votre carte MindPass lors de votre réservation pour bénéficier de l'accès
                    Hammam offert avec tout soin de 60min ou plus.
                  </p>
                </div>

                {/* Conseil */}
                <div className="bg-beige/10 border border-beige/30 rounded-lg p-4">
                  <p className="text-xs font-sans text-foreground">
                    💡 <strong>Astuce :</strong> Réservez en semaine avant 14h pour profiter de tarifs
                    préférentiels et d'une plus grande disponibilité.
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