import NavigationBar from "@/app/components/NavigationBar";
import FooterSection from "@/app/components/FooterSection";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const offices = [
    {
      city: "Kinshasa",
      country: "RD Congo",
      address: "Avenue de la Liberté, Gombe",
      phone: "+243 XX XXX XXXX",
      email: "kinshasa@monafrica.net",
    },
    {
      city: "Dakar",
      country: "Sénégal",
      address: "Plateau, Avenue Léopold Sédar Senghor",
      phone: "+221 XX XXX XXXX",
      email: "dakar@monafrica.net",
    },
    {
      city: "Abidjan",
      country: "Côte d'Ivoire",
      address: "Plateau, Boulevard Carde",
      phone: "+225 XX XXX XXXX",
      email: "abidjan@monafrica.net",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Hero - Compact */}
      <section className="pt-24 sm:pt-28 pb-8 sm:pb-12 bg-gradient-to-b from-beige/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-anthracite mb-3 sm:mb-4">
              <span className="text-terracotta">Contactez</span>-nous
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-sans max-w-3xl mx-auto px-4">
              Notre équipe est à votre écoute pour répondre à toutes vos questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form - Compact */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Contact Form */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl border border-beige/30">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-anthracite mb-4 sm:mb-6">Envoyez-nous un message</h2>
              <form className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm font-sans mb-1.5 sm:mb-2 text-foreground">Nom complet</label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-beige/30 rounded-lg focus:outline-none focus:border-terracotta font-sans text-sm sm:text-base"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-sans mb-1.5 sm:mb-2 text-foreground">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-beige/30 rounded-lg focus:outline-none focus:border-terracotta font-sans text-sm sm:text-base"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-sans mb-1.5 sm:mb-2 text-foreground">Sujet</label>
                  <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-beige/30 rounded-lg focus:outline-none focus:border-terracotta font-sans text-sm sm:text-base">
                    <option>Question générale</option>
                    <option>Partenariat</option>
                    <option>Solution B2B</option>
                    <option>Support technique</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-sans mb-1.5 sm:mb-2 text-foreground">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-beige/30 rounded-lg focus:outline-none focus:border-terracotta font-sans text-sm sm:text-base"
                    placeholder="Votre message..."
                  />
                </div>
                <button className="w-full px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 font-sans">
                  Envoyer
                </button>
              </form>
            </div>

            {/* Quick Contact */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-beige/30">
                <MessageCircle className="w-12 h-12 text-terracotta mb-4" />
                <h3 className="text-xl font-serif text-anthracite mb-2">Support 24/7</h3>
                <p className="text-muted-foreground font-sans mb-4">
                  Besoin d'aide immédiate ? Notre équipe est disponible en permanence.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-terracotta hover:underline font-sans"
                >
                  Démarrer un chat
                </a>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-beige/30">
                <Phone className="w-12 h-12 text-terracotta mb-4" />
                <h3 className="text-xl font-serif text-anthracite mb-2">Ligne d'urgence</h3>
                <p className="text-muted-foreground font-sans mb-4">
                  En cas de crise, contactez notre ligne d'écoute prioritaire.
                </p>
                <a
                  href="tel:+243"
                  className="text-lg text-terracotta hover:underline font-sans"
                >
                  +243 XX XXX XXXX
                </a>
              </div>
            </div>
          </div>

          {/* Offices */}
          <div>
            <h2 className="text-3xl font-serif text-anthracite mb-8 text-center">Nos Bureaux</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-beige/30 text-center"
                >
                  <MapPin className="w-10 h-10 text-terracotta mx-auto mb-4" />
                  <h3 className="text-xl font-serif text-anthracite mb-1">{office.city}</h3>
                  <p className="text-sm text-gold mb-4 font-sans">{office.country}</p>
                  <p className="text-sm text-muted-foreground mb-3 font-sans">{office.address}</p>
                  <p className="text-sm text-foreground mb-1 font-sans">{office.phone}</p>
                  <p className="text-sm text-foreground font-sans">{office.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}