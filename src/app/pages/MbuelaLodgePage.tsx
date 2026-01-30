import NavigationBar from "@/app/components/NavigationBar";
import FooterSection from "@/app/components/FooterSection";
import { MapPin, Star, Sparkles, ExternalLink, Phone, Mail, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export default function MbuelaLodgePage() {
  const images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  ];

  const amenities = [
    { icon: "🌳", label: "Vergers biologiques" },
    { icon: "🥕", label: "Potagers en permaculture" },
    { icon: "🧘", label: "Espace yoga & méditation" },
    { icon: "🍃", label: "Parcours nature guidés" },
    { icon: "🏡", label: "Bungalows écologiques" },
    { icon: "🍽️", label: "Cuisine farm-to-table" },
    { icon: "🐓", label: "Ferme pédagogique" },
    { icon: "📚", label: "Bibliothèque bien-être" },
  ];

  const activities = [
    { name: "Visite des vergers avec dégustation", duration: "1h30", price: "Inclus" },
    { name: "Atelier cuisine produits bio", duration: "2h", price: "Sur demande" },
    { name: "Séance yoga au lever du soleil", duration: "1h", price: "Inclus" },
    { name: "Randonnée forestière guidée", duration: "3h", price: "Sur demande" },
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
                alt="Mbuela Lodge"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-terracotta/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-sans text-white">Escapades</span>
              </div>
            </div>

            {/* Images secondaires */}
            <div className="hidden lg:grid grid-rows-2 gap-4">
              {images.slice(1).map((img, idx) => (
                <div key={idx} className="relative h-full rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={img}
                    alt={`Mbuela Lodge ${idx + 2}`}
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
                      Mbuela Lodge
                    </h1>
                    <p className="text-lg text-terracotta font-sans mb-2">Retraite Agrotouristique</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-sans">Kisantu, Kongo Central, RDC</span>
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
                    🌳 Agrotourisme
                  </span>
                  <span className="px-3 py-1.5 bg-beige/20 text-foreground rounded-full text-sm font-sans">
                    🧘 Calme Absolu
                  </span>
                  <span className="px-3 py-1.5 bg-beige/20 text-foreground rounded-full text-sm font-sans">
                    🍃 Bio
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
                    Niché au cœur du verdoyant Kongo Central, à une heure de route de Kinshasa, Mbuela Lodge
                    est bien plus qu'un simple lieu d'hébergement : c'est une philosophie de vie. Ce lodge
                    écologique combine hébergement durable, agriculture biologique et reconnexion à la nature.
                  </p>
                  <p>
                    Sur un domaine de 10 hectares, vous découvrirez des vergers d'avocatiers, manguiers,
                    papayers, des potagers en permaculture et une ferme pédagogique. Les bungalows en matériaux
                    locaux (bois, bambou, terre) sont conçus pour minimiser l'impact environnemental tout en
                    offrant un confort optimal.
                  </p>
                  <p>
                    Mbuela Lodge est le refuge idéal pour ceux qui cherchent à se déconnecter du stress urbain.
                    Pas de télévision, peu de WiFi (disponible uniquement dans les espaces communs), mais une
                    bibliothèque riche en ouvrages sur le bien-être, un espace yoga face aux collines, et le
                    chant des oiseaux pour seule musique.
                  </p>
                </div>
              </motion.div>

              {/* Équipements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
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

              {/* Activités */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-serif text-anthracite mb-4">Activités Proposées</h2>
                <div className="space-y-3">
                  {activities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-beige/10 rounded-lg border border-beige/30"
                    >
                      <div>
                        <p className="font-sans font-semibold text-foreground">{activity.name}</p>
                        <p className="text-sm text-muted-foreground font-sans">{activity.duration}</p>
                      </div>
                      <span className="text-sm font-sans text-terracotta">{activity.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Le vrai plus */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-beige/20 to-terracotta/10 border border-beige/30 rounded-xl p-6"
              >
                <h3 className="text-xl font-serif text-anthracite mb-3">Le Vrai Plus</h3>
                <p className="text-foreground font-sans leading-relaxed">
                  L'expérience immersive dans l'agriculture biologique congolaise. Vous ne visitez pas
                  seulement un lieu, vous participez à la vie du domaine : récolte de fruits et légumes,
                  préparation de repas avec le chef, ateliers de permaculture... Et vous repartez avec un
                  panier de produits bio fraîchement cueillis, symbole d'une reconnexion authentique à la terre.
                </p>
              </motion.div>

              {/* Engagement Écologique */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-green-50 border border-green-200 rounded-xl p-6"
              >
                <h3 className="text-xl font-serif text-anthracite mb-3">🌱 Engagement Écologique</h3>
                <ul className="space-y-2 text-sm font-sans text-foreground">
                  <li>✓ Énergie solaire pour l'électricité</li>
                  <li>✓ Récupération et filtration de l'eau de pluie</li>
                  <li>✓ Compostage des déchets organiques</li>
                  <li>✓ Construction en matériaux locaux et durables</li>
                  <li>✓ Zéro pesticide, 100% agriculture biologique</li>
                </ul>
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
                        Accès VIP aux vergers + Panier Bio offert
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prix indicatif */}
                <div className="border-t border-beige/30 pt-6">
                  <p className="text-sm text-muted-foreground font-sans mb-2">À partir de</p>
                  <p className="text-3xl font-serif text-anthracite mb-1">80 000 FCFA</p>
                  <p className="text-sm text-muted-foreground font-sans">par nuit</p>
                </div>

                {/* Bouton CTA Principal */}
                <a
                  href="https://mbuela-lodge.cd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl font-sans"
                >
                  <span>Réserver mon séjour</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Contact */}
                <div className="space-y-3">
                  <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white border-2 border-beige text-anthracite rounded-lg hover:bg-beige/10 transition-all duration-200 font-sans">
                    <Phone className="w-4 h-4" />
                    <span>Appeler</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white border-2 border-beige text-anthracite rounded-lg hover:bg-beige/10 transition-all duration-200 font-sans">
                    <Mail className="w-4 h-4" />
                    <span>Envoyer un message</span>
                  </button>
                </div>

                {/* Info */}
                <div className="border-t border-beige/30 pt-6">
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    💳 Réservation directe avec notre partenaire. Mentionnez votre statut de Membre MindPass
                    lors de votre réservation pour bénéficier des avantages exclusifs.
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