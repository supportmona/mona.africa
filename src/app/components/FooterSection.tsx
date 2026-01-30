import { Mail, MapPin, Phone, Linkedin, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router";

export default function FooterSection() {
  const footerLinks = {
    Plateforme: [
      { label: "Nos Services", href: "/services" },
      { label: "Nos Experts", href: "/experts" },
      { label: "Le Cercle", href: "/cercle" },
      { label: "Carte Membre", href: "/carte-membre" },
      { label: "Tarifs", href: "/tarifs" },
    ],
    Entreprises: [
      { label: "Solutions B2B", href: "/b2b" },
      { label: "Dashboard RH", href: "/dashboard-rh" },
      { label: "Partenariats", href: "/partenariats" },
      { label: "Carrières", href: "/carrieres" },
      { label: "Contact", href: "/contact" },
    ],
    Ressources: [
      { label: "Blog", href: "/blog" },
      { label: "Centre d'aide", href: "/aide" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "CGU", href: "/cgu" },
      { label: "RGPD", href: "/rgpd" },
    ],
    Présence: [
      { label: "Kinshasa", href: "#" },
      { label: "Dakar", href: "#" },
      { label: "Abidjan", href: "#" },
    ],
  };

  return (
    <footer className="bg-anthracite text-white pt-6 sm:pt-8 lg:pt-12 pb-3 sm:pb-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
          {/* Brand Column - Compact on Mobile */}
          <div className="lg:col-span-2">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-sans font-bold mb-1 break-words tracking-wide">
              M.O.N.A
            </h3>
            <p className="text-[10px] sm:text-xs text-white/70 font-sans tracking-tight mb-2 sm:mb-3 break-words">
              Mieux-être, Optimisation & Neuro-Apaisement
            </p>
            
            {/* Social Links - Compact */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <a
                href="#"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-terracotta flex items-center justify-center transition-all duration-200 flex-shrink-0"
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a
                href="#"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-terracotta flex items-center justify-center transition-all duration-200 flex-shrink-0"
              >
                <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a
                href="#"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-terracotta flex items-center justify-center transition-all duration-200 flex-shrink-0"
              >
                <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>

            {/* Contact Info - Very Compact */}
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white/70 font-sans break-words">
                <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-terracotta flex-shrink-0" />
                <span className="break-all">contact@monafrica.net</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white/70 font-sans">
                <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-terracotta flex-shrink-0" />
                <span>+243 XXX XXX XXX</span>
              </div>
              <div className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white/70 font-sans">
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-terracotta flex-shrink-0 mt-0.5" />
                <span className="break-words">Kinshasa, Dakar, Abidjan</span>
              </div>
            </div>
          </div>

          {/* Links Columns - 2 colonnes sur mobile, 3 sur desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:col-span-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[11px] sm:text-xs lg:text-sm font-serif text-white mb-1.5 sm:mb-2 break-words">{title}</h4>
                <ul className="space-y-0.5 sm:space-y-1">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-[9px] sm:text-[10px] lg:text-xs text-white/70 hover:text-terracotta transition-colors duration-200 font-sans leading-tight break-words inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Ultra Compact */}
        <div className="pt-3 sm:pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] lg:text-xs text-white/50 font-sans">
            <p className="break-words">&copy; 2026 M.O.N.A Tous droits réservés.</p>
            <div className="flex items-center gap-3">
              <p className="text-center sm:text-right leading-tight break-words">Chiffrement de bout en bout • Norme FHIR • Conforme RGPD</p>
              <Link 
                to="/admin-login" 
                className="text-white/30 hover:text-terracotta transition-colors duration-200 opacity-60 hover:opacity-100"
                title="Portail Administration"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}