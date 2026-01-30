import NavigationBar from "@/app/components/NavigationBar";
import FooterSection from "@/app/components/FooterSection";
import { useState } from "react";
import { MapPin, Sparkles, Dumbbell, Plane, Calendar, ChevronDown, Waves, UtensilsCrossed, Palmtree, Trees, Leaf, Activity, Coffee, User, Bath, Eye, Target } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export default function CerclePage() {
  const [activeFilter, setActiveFilter] = useState("Tout voir");
  const [selectedCity, setSelectedCity] = useState("Toutes les villes");

  const filters = [
    { id: "Tout voir", label: "Tout voir", icon: Sparkles },
    { id: "Escapades", label: "Escapades", icon: Plane },
    { id: "Spas & Soins", label: "Spas & Soins", icon: Sparkles },
    { id: "Pilates & Sport", label: "Pilates & Sport", icon: Dumbbell },
    { id: "Événements", label: "Événements", icon: Calendar },
  ];

  const cities = ["Toutes les villes", "Kinshasa", "Abidjan", "Dakar", "Saly", "Assinie"];

  const experiences = [
    {
      id: "casa-del-toro",
      name: "Casa Del Toro",
      category: "Escapades",
      city: "Saly",
      country: "Sénégal",
      description: "Luxury Ranch avec équitation et piscine",
      tags: [
        { icon: Activity, label: "Équitation" },
        { icon: Leaf, label: "Nature" },
        { icon: Waves, label: "Piscine" }
      ],
      advantage: "Surclassement offert + Cocktail de bienvenue",
      image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    },
    {
      id: "maison-akoula",
      name: "Maison d'Akoula",
      category: "Escapades",
      city: "Assinie",
      country: "Côte d'Ivoire",
      description: "Vue paradisiaque sur la lagune d'Assinie",
      tags: [
        { icon: Waves, label: "Lagune & Mer" },
        { icon: UtensilsCrossed, label: "Gastronomie" },
        { icon: Palmtree, label: "Plage" }
      ],
      advantage: "-15% sur les soins Spa",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    },
    {
      id: "mbuela-lodge",
      name: "Mbuela Lodge",
      category: "Escapades",
      city: "Kisantu",
      country: "RDC",
      description: "Agrotourisme dans le Kongo Central",
      tags: [
        { icon: Trees, label: "Agrotourisme" },
        { icon: Sparkles, label: "Calme Absolu" },
        { icon: Leaf, label: "Bio" }
      ],
      advantage: "Accès VIP aux vergers + Panier Bio offert",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    },
    {
      id: "reset-studio",
      name: "RESET Studio",
      category: "Pilates & Sport",
      city: "Kinshasa",
      country: "RDC",
      description: "Studio chic avec machines Reformer et Bar à jus detox",
      tags: [
        { icon: Activity, label: "Reformer" },
        { icon: Coffee, label: "Bar à Jus" },
        { icon: User, label: "Coaching Privé" }
      ],
      advantage: "1 Séance Reformer achetée = 1 Séance offerte",
      image: "https://images.unsplash.com/photo-1764726331220-b323be2b57b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWxhdGVzJTIwc3R1ZGlvJTIwZW1wdHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njk0NDQ1NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "eforea-spa",
      name: "Eforea Spa",
      category: "Spas & Soins",
      city: "Abidjan",
      country: "Côte d'Ivoire",
      description: "Sanctuaire de bien-être avec soins Elemis",
      tags: [
        { icon: Sparkles, label: "Soins Elemis" },
        { icon: Bath, label: "Hammam" },
        { icon: Eye, label: "Design Épuré" }
      ],
      advantage: "Accès Hammam offert pour tout soin de 60min",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    },
    {
      id: "body-pulse",
      name: "Body Pulse",
      category: "Pilates & Sport",
      city: "Dakar",
      country: "Sénégal",
      description: "Coaching privé ultra-personnalisé",
      tags: [
        { icon: Dumbbell, label: "Coaching Privé" },
        { icon: Activity, label: "Sur-mesure" },
        { icon: Target, label: "Intimiste" }
      ],
      advantage: "-20% sur le premier carnet de 10 séances",
      image: "https://images.unsplash.com/photo-1758957646695-ec8bce3df462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBlcXVpcG1lbnQlMjBtb2Rlcm4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njk0MzkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  // Filtrer les expériences
  const filteredExperiences = experiences.filter((exp) => {
    const matchesCategory = activeFilter === "Tout voir" || exp.category === activeFilter;
    const matchesCity = selectedCity === "Toutes les villes" || exp.city === selectedCity;
    return matchesCategory && matchesCity;
  });

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12 bg-gradient-to-b from-beige/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-anthracite mb-4 sm:mb-6"
            >
              Le <span className="text-terracotta">Cercle M.O.N.A</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground font-sans max-w-3xl mx-auto px-4"
            >
              Un écosystème lifestyle premium combinant privilèges wellness quotidiens
              et escapades ressourçantes à travers l'Afrique.
            </motion.p>
          </div>

          {/* Barre de Filtres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Ligne 1: Filtres par catégorie (Pill tabs) */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm whitespace-nowrap transition-all duration-200
                      ${
                        isActive
                          ? "bg-terracotta text-white shadow-lg"
                          : "bg-white border border-beige/30 text-anthracite hover:border-terracotta/30 hover:bg-beige/10"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Ligne 2: Filtre par ville (Dropdown) */}
            <div className="flex justify-start">
              <div className="relative inline-block">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="appearance-none bg-white border border-beige/30 rounded-lg px-4 py-2 pr-10 text-sm font-sans text-anthracite cursor-pointer hover:border-terracotta/30 transition-all duration-200 focus:outline-none focus:border-terracotta"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grille des Expériences */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compteur de résultats */}
          <div className="mb-6 sm:mb-8">
            <p className="text-sm text-muted-foreground font-sans">
              {filteredExperiences.length} {filteredExperiences.length > 1 ? "expériences" : "expérience"} trouvée
              {filteredExperiences.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Grille */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredExperiences.map((experience, idx) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-xl overflow-hidden border border-beige/30 hover:border-terracotta/30 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <ImageWithFallback
                    src={experience.image}
                    alt={experience.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Badge catégorie */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-xs font-sans text-anthracite">{experience.category}</span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-serif text-anthracite mb-1">{experience.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground font-sans">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{experience.city}, {experience.country}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-foreground font-sans mb-4">{experience.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {experience.tags.map((tag, tidx) => {
                      const TagIcon = tag.icon;
                      return (
                        <span
                          key={tidx}
                          className="flex items-center gap-1.5 text-xs px-2.5 py-1 bg-beige/20 text-foreground rounded-full font-sans"
                        >
                          <TagIcon className="w-3 h-3" />
                          {tag.label}
                        </span>
                      );
                    })}
                  </div>

                  {/* Avantage M.O.N.A */}
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-sans font-semibold text-gold mb-1">Avantage M.O.N.A</p>
                        <p className="text-xs font-sans text-foreground">{experience.advantage}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/cercle/${experience.id}`}
                    className="block w-full px-4 py-2.5 bg-terracotta text-white rounded-lg text-center font-sans text-sm hover:bg-opacity-90 transition-all duration-200"
                  >
                    Découvrir
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredExperiences.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground font-sans">
                Aucune expérience trouvée avec ces critères.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("Tout voir");
                  setSelectedCity("Toutes les villes");
                }}
                className="mt-4 px-6 py-2 bg-terracotta text-white rounded-lg font-sans text-sm hover:bg-opacity-90 transition-all duration-200"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}