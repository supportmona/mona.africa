import NavigationBar from "@/app/components/NavigationBar";
import FooterSection from "@/app/components/FooterSection";
import { motion } from "motion/react";
import { 
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Calendar,
  Users,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { Link } from "react-router";

export default function OpportunitiesPage() {
  const jobs = [
    {
      id: 1,
      title: "Psychologue Clinicien(ne) - Kinshasa",
      location: "Kinshasa, RDC",
      type: "Temps plein / Temps partiel",
      salary: "À partir de 35,000 FC / session",
      description: "Nous recherchons un(e) psychologue clinicien(ne) expérimenté(e) pour rejoindre notre équipe à Kinshasa. Vous accompagnerez les membres M.O.N.A dans leur parcours de bien-être mental avec une approche culturellement adaptée.",
      requirements: [
        "Diplôme en Psychologie Clinique reconnu",
        "Minimum 3 ans d'expérience post-diplôme",
        "Maîtrise du Français et Lingala",
        "Sensibilité culturelle et approche inclusive"
      ],
      responsibilities: [
        "Consultations individuelles en présentiel et téléconsultation",
        "Suivi des dossiers patients via le système FHIR",
        "Participation aux supervisions mensuelles",
        "Collaboration avec l'équipe multidisciplinaire"
      ],
      postedDate: "Il y a 2 jours",
    },
    {
      id: 2,
      title: "Psychiatre - Dakar",
      location: "Dakar, Sénégal",
      type: "Temps plein",
      salary: "À partir de 45,000 XOF / session",
      description: "Rejoignez notre équipe à Dakar en tant que psychiatre. Vous interviendrez sur des cas complexes nécessitant une expertise médicale et contribuerez à l'excellence clinique de M.O.N.A.",
      requirements: [
        "Doctorat en Médecine avec spécialisation en Psychiatrie",
        "Minimum 5 ans d'expérience en pratique clinique",
        "Maîtrise du Français et Wolof appréciée",
        "Autorisation d'exercer au Sénégal"
      ],
      responsibilities: [
        "Évaluations psychiatriques et diagnostics",
        "Prescription et suivi de traitements médicamenteux",
        "Consultations en présentiel et téléconsultation",
        "Supervision d'équipe et formation continue"
      ],
      postedDate: "Il y a 5 jours",
    },
    {
      id: 3,
      title: "Thérapeute en Traumatisme - Abidjan",
      location: "Abidjan, Côte d'Ivoire",
      type: "Temps partiel (20h/semaine)",
      salary: "À partir de 40,000 XOF / session",
      description: "Nous cherchons un(e) thérapeute spécialisé(e) en traumatisme pour accompagner nos membres à Abidjan. Une expertise en EMDR ou approches somatiques est fortement valorisée.",
      requirements: [
        "Formation reconnue en psychothérapie",
        "Certification EMDR niveau 2 ou équivalent",
        "Minimum 4 ans d'expérience avec populations traumatisées",
        "Bilinguisme Français-Anglais apprécié"
      ],
      responsibilities: [
        "Thérapie individuelle spécialisée en trauma",
        "Séances EMDR et approches somatiques",
        "Documentation clinique selon standards FHIR",
        "Participation aux groupes de supervision"
      ],
      postedDate: "Il y a 1 semaine",
    },
    {
      id: 4,
      title: "Psychologue pour Adolescents - Multi-villes",
      location: "Kinshasa / Dakar / Abidjan",
      type: "Téléconsultation uniquement",
      salary: "À partir de 30,000 FC / session",
      description: "Rejoignez notre équipe dédiée aux adolescents et jeunes adultes. Vous travaillerez exclusivement en téléconsultation avec une flexibilité géographique totale.",
      requirements: [
        "Spécialisation en psychologie de l'adolescent",
        "Expérience avec la tranche 12-25 ans",
        "Aisance avec les outils de téléconsultation",
        "Approche moderne et empathique"
      ],
      responsibilities: [
        "Consultations vidéo avec adolescents et jeunes adultes",
        "Accompagnement sur estime de soi, anxiété, orientation",
        "Collaboration avec les familles si nécessaire",
        "Utilisation des outils numériques M.O.N.A"
      ],
      postedDate: "Il y a 3 jours",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-beige/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold font-sans">Opportunités</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif text-anthracite mb-4"
            >
              Postes <span className="text-terracotta">ouverts</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground font-sans"
            >
              Découvrez nos opportunités actuelles et rejoignez une équipe d'excellence 
              dédiée à transformer la santé mentale en Afrique.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-12"
          >
            {[
              { icon: Briefcase, label: "4 postes ouverts", value: "Actuellement" },
              { icon: Users, label: "50+ experts", value: "Déjà membres" },
              { icon: TrendingUp, label: "70%", value: "De commission" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-beige/30 text-center"
                >
                  <Icon className="w-6 h-6 text-terracotta mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-sans mb-1">{stat.label}</p>
                  <p className="text-sm font-semibold text-anthracite font-sans">{stat.value}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {jobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-beige/30 hover:border-terracotta/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-serif text-anthracite mb-2">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{job.postedDate}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground font-sans mb-6 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Requirements & Responsibilities */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-semibold text-anthracite mb-3 font-sans">
                        Profil recherché
                      </h3>
                      <ul className="space-y-2">
                        {job.requirements.map((req, ridx) => (
                          <li key={ridx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-anthracite mb-3 font-sans">
                        Missions principales
                      </h3>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, ridx) => (
                          <li key={ridx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 flex-shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-beige/30">
                    <Link
                      to="/postuler"
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-sans text-sm"
                    >
                      <span>Postuler à cette offre</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-beige text-anthracite rounded-lg hover:bg-beige/10 transition-all duration-300 font-sans text-sm">
                      En savoir plus
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center bg-gradient-to-r from-terracotta/10 to-gold/10 rounded-2xl p-8"
          >
            <h3 className="text-xl sm:text-2xl font-serif text-anthracite mb-3">
              Vous ne trouvez pas le poste idéal ?
            </h3>
            <p className="text-sm text-muted-foreground font-sans mb-6 max-w-2xl mx-auto">
              Envoyez-nous une candidature spontanée. Nous examinons tous les profils 
              et vous contacterons dès qu'une opportunité correspondant à votre expertise se présente.
            </p>
            <Link
              to="/postuler"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-sans text-sm"
            >
              <span>Candidature spontanée</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
