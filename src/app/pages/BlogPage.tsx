import FooterSection from "@/app/components/FooterSection";
import { Calendar, User, ArrowRight } from "lucide-react";
import NavigationBar from "@/app/components/NavigationBar";

export default function BlogPage() {
  const articles = [
    {
      title: "5 Techniques de Gestion du Stress Adaptées au Contexte Africain",
      excerpt: "Découvrez des méthodes éprouvées qui respectent nos valeurs culturelles et notre mode de vie.",
      author: "Dr. Amara K.",
      date: "15 Jan 2026",
      category: "Bien-être",
      readTime: "5 min",
    },
    {
      title: "L'Importance de la Santé Mentale en Entreprise",
      excerpt: "Comment les dirigeants africains peuvent créer une culture du bien-être au travail.",
      author: "Jean-Paul M.",
      date: "10 Jan 2026",
      category: "Business",
      readTime: "7 min",
    },
    {
      title: "Trouver l'Équilibre Entre Tradition et Modernité",
      excerpt: "Naviguer entre héritage familial et aspirations personnelles sans perdre son identité.",
      author: "Dr. Fatou M.",
      date: "5 Jan 2026",
      category: "Culture",
      readTime: "6 min",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-beige/10 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-serif text-anthracite mb-6">
              <span className="text-terracotta">Blog</span> & Ressources
            </h1>
            <p className="text-xl text-muted-foreground font-sans max-w-3xl mx-auto">
              Articles, conseils et insights sur la santé mentale dans le contexte africain.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <article
                key={idx}
                className="bg-white rounded-2xl border border-beige/30 overflow-hidden hover:border-terracotta/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-terracotta/10 to-beige/20" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-terracotta mb-3 font-sans">
                    <span className="px-2 py-1 bg-terracotta/10 rounded-full">{article.category}</span>
                    <span>• {article.readTime}</span>
                  </div>
                  <h2 className="text-xl font-serif text-anthracite mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-sans mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-beige/30">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-2 text-terracotta hover:gap-3 transition-all font-sans text-sm"
                  >
                    Lire l'article
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}