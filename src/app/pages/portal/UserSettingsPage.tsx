import { User, Bell, Lock, Globe, Palette, CreditCard, Shield, Mail, MessageCircle, AlertTriangle } from "lucide-react";

interface UserSettingsPageProps {
  primaryColor: string;
  secondaryColor: string;
  isMacbook: boolean;
}

export default function UserSettingsPage({ primaryColor, secondaryColor }: UserSettingsPageProps) {
  const settingsSections = [
    {
      title: "Profil professionnel",
      icon: <User size={20} />,
      items: [
        { label: "Nom complet", value: "Dr. Alice Obambi" },
        { label: "Spécialité", value: "Thérapie cognitive et comportementale" },
        { label: "Numéro d'ordre", value: "PSY-CD-2024-001" },
        { label: "Langues", value: "Français, Anglais, Lingala, Kikongo" }
      ]
    },
    {
      title: "Disponibilités",
      icon: <Globe size={20} />,
      items: [
        { label: "Horaires", value: "Lun-Ven: 9h-18h" },
        { label: "Durée consultation", value: "50 minutes" },
        { label: "Pause déjeuner", value: "12h30-14h" },
        { label: "Zone géographique", value: "Kinshasa, RD Congo" }
      ]
    },
    {
      title: "Tarification",
      icon: <CreditCard size={20} />,
      items: [
        { label: "Consultation standard", value: "25,000 FCFA" },
        { label: "Première consultation", value: "30,000 FCFA" },
        { label: "Téléconsultation", value: "20,000 FCFA" },
        { label: "Mode de paiement", value: "Wave, Orange Money" }
      ]
    },
    {
      title: "Notifications",
      icon: <Bell size={20} />,
      items: [
        { label: "Rendez-vous", value: "Email + SMS", toggle: true },
        { label: "Nouveaux membres", value: "Email", toggle: true },
        { label: "Rappels", value: "30 min avant", toggle: true },
        { label: "Messages", value: "Push + Email", toggle: true }
      ]
    },
    {
      title: "Sécurité & Confidentialité",
      icon: <Shield size={20} />,
      items: [
        { label: "Authentification 2FA", value: "Activée", toggle: true },
        { label: "Chiffrement E2E", value: "Activé", toggle: true },
        { label: "Conformité RGPD", value: "Activée", toggle: true },
        { label: "Sauvegarde automatique", value: "Quotidienne", toggle: true }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-semibold" style={{ backgroundColor: primaryColor }}>
            AO
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Dr. Alice Obambi</h2>
            <p className="text-gray-600">Psychologue clinicienne • Expert M.O.N.A</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Compte vérifié</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">142 membres actifs</span>
            </div>
          </div>
          <button
            className="px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-all"
            style={{ backgroundColor: primaryColor }}
          >
            Modifier le profil
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div style={{ color: primaryColor }}>{section.icon}</div>
            {section.title}
          </h3>
          <div className="space-y-4">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-medium text-gray-900">{item.label}</div>
                  {!item.toggle && <div className="text-sm text-gray-600">{item.value}</div>}
                </div>
                {item.toggle ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                ) : (
                  <button className="text-sm text-gray-600 hover:text-gray-900">Modifier</button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Danger Zone - Contact Support */}
      <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
        <h3 className="text-xl font-semibold text-amber-900 mb-2 flex items-center gap-2">
          <AlertTriangle size={20} />
          Désactivation ou suppression de compte
        </h3>
        <p className="text-sm text-amber-800 mb-4">
          Pour des raisons de sécurité et de conformité, seule notre équipe support peut procéder 
          à la désactivation ou suppression de votre compte professionnel M.O.N.A.
        </p>
        
        <div className="bg-white rounded-lg p-4 border border-amber-200 mb-4">
          <div className="text-sm text-gray-700 space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-terracotta mt-0.5">•</span>
              <span>Votre demande sera traitée dans un délai de <strong>48 heures ouvrées</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-terracotta mt-0.5">•</span>
              <span>Nous vérifierons l'absence de consultations en cours et de paiements en attente</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-terracotta mt-0.5">•</span>
              <span>Un export de vos données vous sera proposé avant suppression définitive</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:support@mona-health.com?subject=Demande%20de%20d%C3%A9sactivation%20de%20compte%20professionnel"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-amber-400 text-amber-800 rounded-lg hover:bg-amber-50 transition-colors font-medium"
          >
            <Mail size={18} />
            Contacter par email
          </a>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium">
            <MessageCircle size={18} />
            Ouvrir un ticket support
          </button>
        </div>

        <div className="mt-4 text-xs text-amber-700 bg-amber-100 rounded-lg p-3">
          <strong>💡 Besoin d'aide ?</strong> Notre équipe support est disponible du lundi au vendredi, 
          9h-18h (heure de Kinshasa/Dakar/Abidjan) au <strong>support@monafrica.net</strong> ou 
          par téléphone au <strong>+243 81 234 5678</strong>
        </div>
      </div>
    </div>
  );
}