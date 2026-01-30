import { useState } from 'react';
import { useB2BAuth } from '@/app/contexts/B2BAuthContext';
import { 
  Settings, 
  Building2,
  Bell,
  Shield,
  Users,
  CreditCard,
  Mail,
  Globe,
  Save,
  AlertTriangle
} from 'lucide-react';

export default function B2BSettingsPage() {
  const { user } = useB2BAuth();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [crisisAlerts, setCrisisAlerts] = useState(true);
  const [monthlyInvoice, setMonthlyInvoice] = useState(true);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-anthracite mb-2">Paramètres du compte</h2>
          <p className="text-muted-foreground font-sans">
            Gérez les paramètres de votre compte entreprise M.O.N.A
          </p>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-6 h-6 text-terracotta" />
          <h3 className="text-xl font-serif text-anthracite">Informations de l'entreprise</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-anthracite mb-2 font-sans">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              defaultValue={user?.companyName}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta font-sans"
              disabled
            />
            <p className="mt-1 text-xs text-muted-foreground font-sans">
              Contactez le support pour modifier
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-anthracite mb-2 font-sans">
              Identifiant entreprise
            </label>
            <input
              type="text"
              defaultValue={user?.companyId.toUpperCase()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-anthracite mb-2 font-sans">
              Email administrateur
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta font-sans"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-anthracite mb-2 font-sans">
              Nombre d'employés
            </label>
            <input
              type="number"
              defaultValue={user?.employeeCount}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta font-sans"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-anthracite mb-2 font-sans">
            Sites d'activité
          </label>
          <div className="flex flex-wrap gap-2">
            {user?.locations.map((loc, idx) => (
              <span key={idx} className="px-4 py-2 bg-beige/20 text-anthracite rounded-full border border-beige font-sans">
                {loc}
              </span>
            ))}
            <button className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-full hover:border-terracotta hover:text-terracotta transition-colors font-sans">
              + Ajouter un site
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-colors font-sans font-medium">
            <Save className="w-5 h-5" />
            Enregistrer les modifications
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-terracotta" />
          <h3 className="text-xl font-serif text-anthracite">Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="font-medium text-anthracite font-sans">Notifications par email</div>
              <div className="text-sm text-muted-foreground font-sans">
                Recevoir les notifications importantes par email
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-terracotta/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terracotta"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="font-medium text-anthracite font-sans">Rapports hebdomadaires</div>
              <div className="text-sm text-muted-foreground font-sans">
                Recevoir un résumé hebdomadaire des métriques de bien-être
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={weeklyReports}
                onChange={(e) => setWeeklyReports(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-terracotta/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terracotta"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border-l-4 border-amber-500">
            <div className="flex-1">
              <div className="font-medium text-anthracite font-sans flex items-center gap-2">
                Alertes de crise
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Recommandé</span>
              </div>
              <div className="text-sm text-muted-foreground font-sans">
                Recevoir immédiatement les alertes critiques de bien-être
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={crisisAlerts}
                onChange={(e) => setCrisisAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-terracotta/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terracotta"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="font-medium text-anthracite font-sans">Factures mensuelles</div>
              <div className="text-sm text-muted-foreground font-sans">
                Recevoir les factures automatiquement par email
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={monthlyInvoice}
                onChange={(e) => setMonthlyInvoice(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-terracotta/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terracotta"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-terracotta" />
          <h3 className="text-xl font-serif text-anthracite">Sécurité & Confidentialité</h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border" style={{ backgroundColor: '#A8B5A0' + '10', borderColor: '#A8B5A0' + '30' }}>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 mt-0.5 text-white p-1 rounded" style={{ backgroundColor: '#A8B5A0' }} />
              <div>
                <div className="font-medium text-anthracite font-sans mb-1">
                  Chiffrement de bout en bout activé
                </div>
                <div className="text-sm text-muted-foreground font-sans">
                  Toutes les données de vos employés sont chiffrées et anonymisées. Conformité RGPD garantie.
                </div>
              </div>
            </div>
          </div>

          <button className="w-full p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-anthracite font-sans mb-1">Modifier le mot de passe</div>
            <div className="text-sm text-muted-foreground font-sans">
              Dernière modification : Il y a 30 jours
            </div>
          </button>

          <button className="w-full p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-anthracite font-sans mb-1">Authentification à deux facteurs</div>
            <div className="text-sm text-muted-foreground font-sans">
              Sécurisez votre compte avec une couche de protection supplémentaire
            </div>
          </button>

          <button className="w-full p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-anthracite font-sans mb-1">Journal d'activité</div>
            <div className="text-sm text-muted-foreground font-sans">
              Consultez l'historique des connexions et actions effectuées
            </div>
          </button>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-terracotta" />
          <h3 className="text-xl font-serif text-anthracite">Gestion des utilisateurs</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center text-terracotta font-semibold">
                {user?.companyName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-anthracite font-sans">{user?.email}</div>
                <div className="text-sm text-muted-foreground font-sans capitalize">
                  {user?.role.replace('-', ' ')} • Propriétaire
                </div>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
              Actif
            </span>
          </div>

          <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-terracotta hover:text-terracotta transition-colors font-sans">
            + Inviter un administrateur
          </button>
        </div>
      </div>

      {/* Billing */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-terracotta" />
          <h3 className="text-xl font-serif text-anthracite">Facturation</h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-medium text-anthracite font-sans mb-1">Plan actuel</div>
                <div className="text-2xl font-bold text-terracotta">Entreprise</div>
              </div>
              <span className="px-3 py-1 bg-terracotta/10 text-terracotta text-sm rounded-full font-medium">
                Actif
              </span>
            </div>
            <div className="text-sm text-muted-foreground font-sans">
              {user?.employeeCount} employés • Facturation flexible par crédits
            </div>
          </div>

          <button className="w-full p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-anthracite font-sans mb-1">Méthodes de paiement</div>
            <div className="text-sm text-muted-foreground font-sans">
              Gérer vos cartes et comptes Mobile Money
            </div>
          </button>

          <button className="w-full p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="font-medium text-anthracite font-sans mb-1">Historique de facturation</div>
            <div className="text-sm text-muted-foreground font-sans">
              Télécharger vos factures précédentes
            </div>
          </button>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-terracotta" />
          <h3 className="text-xl font-serif text-anthracite">Intégrations</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-gray-200 text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div className="font-medium text-anthracite font-sans mb-1">Slack</div>
            <div className="text-xs text-muted-foreground font-sans mb-3">À venir</div>
            <button className="text-sm text-terracotta hover:underline font-sans" disabled>
              Connecter
            </button>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 text-center">
            <div className="w-12 h-12 bg-purple-50 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <div className="font-medium text-anthracite font-sans mb-1">Microsoft Teams</div>
            <div className="text-xs text-muted-foreground font-sans mb-3">À venir</div>
            <button className="text-sm text-terracotta hover:underline font-sans" disabled>
              Connecter
            </button>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 text-center">
            <div className="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#A8B5A0' }}>
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="font-medium text-anthracite font-sans mb-1">Google Workspace</div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl p-6 border-2 border-red-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h3 className="text-xl font-serif text-red-900">Zone de danger</h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="font-medium text-red-900 font-sans mb-2">Désactiver temporairement le compte</div>
            <div className="text-sm text-red-700 font-sans mb-3">
              Votre compte sera suspendu et vos employés n'auront plus accès aux services M.O.N.A. 
              Pour désactiver votre compte entreprise, veuillez contacter notre équipe support.
            </div>
            <a 
              href="mailto:support@monafrica.net?subject=Demande de désactivation de compte entreprise"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm font-sans font-medium"
            >
              <Mail className="w-4 h-4" />
              Contacter le support
            </a>
          </div>

          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="font-medium text-red-900 font-sans mb-2">Supprimer définitivement le compte</div>
            <div className="text-sm text-red-700 font-sans mb-3">
              Cette action est irréversible. Toutes vos données seront supprimées après 30 jours. 
              Pour supprimer votre compte entreprise, veuillez contacter notre équipe support qui traitera votre demande dans les plus brefs délais.
            </div>
            <a 
              href="mailto:support@monafrica.net?subject=Demande de suppression de compte entreprise"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-sans font-medium"
            >
              <Mail className="w-4 h-4" />
              Contacter le support
            </a>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900 font-sans mb-1">
                  Besoin d'aide ?
                </div>
                <div className="text-sm text-blue-700 font-sans mb-2">
                  Notre équipe support est disponible pour vous accompagner dans vos démarches.
                </div>
                <div className="text-sm text-blue-800 font-sans space-y-1">
                  <div><strong>Email :</strong> support@monafrica.net</div>
                  <div><strong>Téléphone :</strong> +243 81 234 5678</div>
                  <div><strong>Horaires :</strong> Lun-Ven 9h-18h (Kinshasa/Dakar/Abidjan)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}