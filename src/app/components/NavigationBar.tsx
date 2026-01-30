import { Menu, X, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router";

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fermer le menu quand on change de page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Bloquer le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Barre de navigation fixe */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-beige/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl lg:text-2xl text-anthracite font-sans font-bold tracking-wide whitespace-nowrap">
                  M.O.N.A
                </h1>
                <p className="text-[8px] sm:text-[9px] lg:text-[10px] text-muted-foreground font-sans tracking-tight -mt-1">
                  Mieux-être, Optimisation & Neuro-Apaisement
                </p>
              </div>
            </Link>

            {/* Bouton Espace Expert */}
            <div className="flex items-center gap-3">
              <Link
                to="/espace-expert"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 text-anthracite rounded-lg hover:bg-gold/20 transition-all duration-200 font-sans text-sm"
              >
                Espace Expert
              </Link>

              {/* Bouton hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-beige/20 transition-colors duration-200"
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {mobileMenuOpen ? (
                  <X size={28} className="text-anthracite" />
                ) : (
                  <Menu size={28} className="text-anthracite" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Hamburger - Overlay Plein Écran */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-[60] overflow-y-auto"
          >
            {/* Header du menu */}
            <div className="sticky top-0 bg-white border-b border-beige/20 px-6 py-5 flex items-center justify-between z-10">
              <div className="flex flex-col">
                <h1 className="text-xl font-sans font-bold tracking-wide text-anthracite">
                  M.O.N.A
                </h1>
                <p className="text-[9px] text-muted-foreground font-sans tracking-tight -mt-0.5">
                  Mieux-être, Optimisation & Neuro-Apaisement
                </p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-beige/20 rounded-lg transition-colors duration-200"
                aria-label="Fermer le menu"
              >
                <X size={28} className="text-anthracite" />
              </button>
            </div>

            {/* Contenu du menu */}
            <div className="px-6 py-8 pb-24">
              {/* 1. MENU PRINCIPAL */}
              <div className="mb-10">
                <h3 className="text-sm font-sans font-bold text-anthracite mb-5 tracking-wide uppercase">
                  Menu Principal
                </h3>
                <div className="space-y-4">
                  <Link
                    to="/"
                    className="block text-lg font-sans text-anthracite hover:text-terracotta transition-colors duration-200 py-2"
                  >
                    Plateforme
                  </Link>
                  <Link
                    to="/services"
                    className="block text-lg font-sans text-anthracite hover:text-terracotta transition-colors duration-200 py-2"
                  >
                    Nos Services
                  </Link>
                  <Link
                    to="/experts"
                    className="block text-lg font-sans text-anthracite hover:text-terracotta transition-colors duration-200 py-2"
                  >
                    Nos Experts
                  </Link>
                  <Link
                    to="/tarifs"
                    className="block text-lg font-sans text-anthracite hover:text-terracotta transition-colors duration-200 py-2"
                  >
                    Tarifs
                  </Link>
                </div>
              </div>

              {/* Séparateur */}
              <div className="border-t border-beige/30 my-8"></div>

              {/* 2. LIFESTYLE */}
              <div className="mb-10">
                <h3 className="text-sm font-sans font-bold text-gold mb-5 tracking-wide uppercase">
                  Lifestyle
                </h3>
                <div className="space-y-4">
                  <Link
                    to="/cercle"
                    className="block text-lg font-sans text-anthracite hover:text-gold transition-colors duration-200 py-2"
                  >
                    Le Cercle
                  </Link>
                  <Link
                    to="/carte-membre"
                    className="block text-lg font-sans text-anthracite hover:text-gold transition-colors duration-200 py-2"
                  >
                    Carte Membre
                  </Link>
                </div>
              </div>

              {/* Séparateur */}
              <div className="border-t border-beige/30 my-8"></div>

              {/* 3. BUSINESS & PRO */}
              <div className="mb-10">
                <h3 className="text-sm font-sans font-bold text-anthracite mb-5 tracking-wide uppercase">
                  Business & Pro
                </h3>
                <div className="space-y-4 pl-4">
                  <Link
                    to="/espace-expert"
                    className="block text-lg font-sans text-anthracite hover:text-gold transition-colors duration-200 py-2"
                  >
                    Espace Expert
                  </Link>
                  <Link
                    to="/business"
                    className="block text-lg font-sans text-anthracite hover:text-terracotta transition-colors duration-200 py-2"
                  >
                    Entreprises
                  </Link>
                  <Link
                    to="/dashboard-rh"
                    className="block text-lg font-sans text-anthracite hover:text-terracotta transition-colors duration-200 py-2"
                  >
                    Dashboard RH
                  </Link>
                </div>
              </div>

              {/* Séparateur */}
              <div className="border-t border-beige/30 my-8"></div>

              {/* 4. INFOS & AIDE */}
              <div className="mb-10">
                <h3 className="text-xs font-sans font-semibold text-muted-foreground mb-5 tracking-wide uppercase">
                  Infos & Aide
                </h3>
                <div className="space-y-3">
                  {/* Partenariats | Témoignages */}
                  <div className="flex items-center gap-3 text-base font-sans py-1">
                    <Link
                      to="/partenariats"
                      className="text-muted-foreground hover:text-terracotta transition-colors duration-200"
                    >
                      Partenariats
                    </Link>
                    <span className="text-muted-foreground/40">|</span>
                    <Link
                      to="/temoignages"
                      className="text-muted-foreground hover:text-terracotta transition-colors duration-200"
                    >
                      Témoignages
                    </Link>
                  </div>

                  {/* Ressources | Blog */}
                  <div className="flex items-center gap-3 text-base font-sans py-1">
                    <Link
                      to="/ressources"
                      className="text-muted-foreground hover:text-terracotta transition-colors duration-200"
                    >
                      Ressources
                    </Link>
                    <span className="text-muted-foreground/40">|</span>
                    <Link
                      to="/blog"
                      className="text-muted-foreground hover:text-terracotta transition-colors duration-200"
                    >
                      Blog
                    </Link>
                  </div>

                  {/* Contact | Centre d'aide */}
                  <div className="flex items-center gap-3 text-base font-sans py-1">
                    <Link
                      to="/contact"
                      className="text-muted-foreground hover:text-terracotta transition-colors duration-200"
                    >
                      Contact
                    </Link>
                    <span className="text-muted-foreground/40">|</span>
                    <Link
                      to="/aide"
                      className="text-muted-foreground hover:text-terracotta transition-colors duration-200"
                    >
                      Centre d'aide
                    </Link>
                  </div>
                </div>
              </div>

              {/* Séparateur */}
              <div className="border-t border-beige/30 my-8"></div>

              {/* 5. LÉGAL */}
              <div className="mb-10">
                <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground/60 py-1">
                  <Link
                    to="/confidentialite"
                    className="hover:text-terracotta transition-colors duration-200"
                  >
                    Confidentialité
                  </Link>
                  <span>•</span>
                  <Link
                    to="/cgu"
                    className="hover:text-terracotta transition-colors duration-200"
                  >
                    CGU
                  </Link>
                  <span>•</span>
                  <Link
                    to="/rgpd"
                    className="hover:text-terracotta transition-colors duration-200"
                  >
                    RGPD
                  </Link>
                </div>
              </div>

              {/* CTAs en bas du menu */}
              <div className="space-y-4 pt-6 mt-8 border-t border-beige/30">
                <Link
                  to="/onboarding"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gold/10 border-2 border-gold/20 text-anthracite rounded-lg hover:bg-gold/20 transition-all duration-200 font-sans text-base shadow-sm"
                >
                  <Download className="w-5 h-5" />
                  Télécharger l'app
                </Link>
                <Link
                  to="/onboarding"
                  className="w-full px-6 py-4 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-all duration-200 font-sans text-base shadow-lg text-center block"
                >
                  Commencer maintenant
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}