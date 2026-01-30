import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  TrendingUp,
  AlertTriangle,
  Shield,
  Eye,
  CheckCircle2,
  Clock,
  FileCheck
} from 'lucide-react';

export default function B2BReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Rapports disponibles
  const availableReports = [
    {
      id: 'wellbeing-jan-2025',
      title: 'Rapport de Bien-être - Janvier 2025',
      type: 'monthly',
      date: '31 Jan 2025',
      size: '2.4 MB',
      format: 'PDF',
      status: 'ready',
      description: 'Score global, évolution par département, thématiques principales',
      insights: ['Score +4 pts', '87% engagement', '1 alerte Finance'],
    },
    {
      id: 'wellbeing-dec-2024',
      title: 'Rapport de Bien-être - Décembre 2024',
      type: 'monthly',
      date: '31 Déc 2024',
      size: '2.2 MB',
      format: 'PDF',
      status: 'ready',
      description: 'Score global, évolution par département, thématiques principales',
      insights: ['Score -2 pts', '82% engagement', 'Aucune alerte'],
    },
    {
      id: 'quarterly-q4-2024',
      title: 'Rapport Trimestriel Q4 2024',
      type: 'quarterly',
      date: '31 Déc 2024',
      size: '5.8 MB',
      format: 'PDF',
      status: 'ready',
      description: 'Analyse détaillée du trimestre avec recommandations stratégiques',
      insights: ['ROI: +15%', 'Tendances positives', '3 actions recommandées'],
    },
    {
      id: 'annual-2024',
      title: 'Bilan Annuel 2024',
      type: 'annual',
      date: '31 Déc 2024',
      size: '12.5 MB',
      format: 'PDF',
      status: 'ready',
      description: 'Vue d\'ensemble complète de l\'année avec benchmarks sectoriels',
      insights: ['Score final: 78/100', '+22% vs 2023', 'Top 15% du secteur'],
    },
  ];

  // Alertes actives
  const activeAlerts = [
    {
      id: 'alert-001',
      severity: 'high',
      department: 'Finance',
      metric: 'Niveau de stress',
      value: '78/100',
      threshold: '60/100',
      date: '26 Jan 2025',
      status: 'active',
      recommendation: 'Intervention recommandée dans les 7 jours',
      employeesAffected: 18, // nombre, pas de noms
    },
    {
      id: 'alert-002',
      severity: 'medium',
      department: 'Opérations',
      metric: 'Taux d\'engagement',
      value: '68%',
      threshold: '80%',
      date: '23 Jan 2025',
      status: 'monitoring',
      recommendation: 'Campagne de sensibilisation suggérée',
      employeesAffected: 32,
    },
  ];

  // Statistiques d'anonymisation
  const privacyStats = [
    { label: 'Données anonymisées', value: '100%', icon: Shield, color: '#A8B5A0' },
    { label: 'Conformité RGPD', value: 'Totale', icon: CheckCircle2, color: 'text-blue-600' },
    { label: 'Identités protégées', value: '113/113', icon: Eye, color: 'text-purple-600' },
    { label: 'Audit de sécurité', value: 'Mensuel', icon: FileCheck, color: 'text-orange-600' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100' };
      case 'medium': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', badge: 'bg-gray-100' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Assurance Banner */}
      <div className="bg-gradient-to-r from-[#A8B5A0]/10 to-blue-50 border rounded-xl p-6" style={{ borderColor: '#A8B5A0' }}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#A8B5A0' }}>
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-anthracite mb-2 font-sans">
              🔒 Garantie d'Anonymat Total
            </h3>
            <p className="text-sm text-muted-foreground font-sans">
              Tous les rapports sont <strong>100% anonymisés</strong>. Aucune donnée personnelle identifiable 
              n'est visible. Seules les tendances agrégées par département sont présentées, conformément au RGPD 
              et aux lois sur la protection de la vie privée en vigueur au Canada et en Afrique.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {privacyStats.map((stat, idx) => {
          const Icon = stat.icon;
          const isGreenStat = typeof stat.color === 'string' && stat.color.startsWith('#');
          return (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-gray-50">
                  <Icon 
                    className={`w-5 h-5`}
                    style={{ color: isGreenStat ? stat.color : undefined }}
                  />
                </div>
              </div>
              <div className="text-2xl font-bold text-anthracite mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-sans">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-serif text-anthracite mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Alertes Actives ({activeAlerts.length})
          </h3>
          <div className="space-y-4">
            {activeAlerts.map((alert) => {
              const colors = getSeverityColor(alert.severity);
              return (
                <div 
                  key={alert.id}
                  className={`p-5 rounded-lg border-2 ${colors.border} ${colors.bg}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 ${colors.badge} ${colors.text} text-xs font-medium rounded-full uppercase`}>
                        {alert.severity === 'high' ? 'Urgent' : 'Surveillance'}
                      </span>
                      <span className="font-semibold text-anthracite font-sans">
                        Département {alert.department}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-sans">{alert.date}</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground font-sans mb-1">Métrique</div>
                      <div className="font-medium text-anthracite font-sans">{alert.metric}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground font-sans mb-1">Valeur actuelle</div>
                      <div className={`font-bold text-lg ${colors.text}`}>
                        {alert.value} <span className="text-sm font-normal">(seuil: {alert.threshold})</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-gray-200 mb-3">
                    <div className="text-sm font-medium text-anthracite mb-1 font-sans">
                      📊 Données agrégées
                    </div>
                    <div className="text-xs text-muted-foreground font-sans">
                      {alert.employeesAffected} employés concernés (identités protégées) • 
                      Recommandation : {alert.recommendation}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className={`px-4 py-2 bg-white ${colors.text} border ${colors.border} rounded-lg hover:bg-opacity-80 transition-colors text-sm font-sans font-medium`}>
                      Voir les détails anonymisés
                    </button>
                    <button className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-sans font-medium">
                      Programmer une intervention
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reports Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif text-anthracite flex items-center gap-2">
            <FileText className="w-5 h-5 text-terracotta" />
            Rapports Disponibles
          </h3>
          <div className="flex gap-3">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-terracotta"
            >
              <option value="month">Mensuel</option>
              <option value="quarter">Trimestriel</option>
              <option value="year">Annuel</option>
              <option value="all">Tous</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-sans">
              <Filter className="w-4 h-4" />
              Filtrer
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {availableReports.map((report) => (
            <div 
              key={report.id}
              className="p-5 rounded-lg border border-gray-200 hover:border-terracotta hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-terracotta/10 rounded-lg">
                      <FileText className="w-5 h-5 text-terracotta" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-anthracite font-sans">{report.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-sans mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {report.date}
                        </span>
                        <span>•</span>
                        <span>{report.format}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 font-sans">{report.description}</p>
                  
                  {/* Key Insights */}
                  <div className="flex flex-wrap gap-2">
                    {report.insights.map((insight, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-beige/20 text-anthracite text-xs rounded-full border border-beige font-sans"
                      >
                        {insight}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-sans font-medium ml-4">
                  <Download className="w-4 h-4" />
                  Télécharger
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-serif text-anthracite mb-4">
          Générer un rapport personnalisé
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-anthracite mb-2 font-sans">
              Période
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans focus:outline-none focus:ring-2 focus:ring-terracotta">
              <option>Janvier 2025</option>
              <option>Décembre 2024</option>
              <option>Personnalisée...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-anthracite mb-2 font-sans">
              Départements
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans focus:outline-none focus:ring-2 focus:ring-terracotta">
              <option>Tous les départements</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>Opérations</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-anthracite mb-2 font-sans">
              Format
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans focus:outline-none focus:ring-2 focus:ring-terracotta">
              <option>PDF (recommandé)</option>
              <option>Excel</option>
              <option>PowerPoint</option>
            </select>
          </div>
        </div>
        <button className="w-full md:w-auto px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-colors font-sans font-medium flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Générer le rapport
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 mb-3 font-sans flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Calendrier des rapports automatiques
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800 font-sans">
          <div>
            <strong>Mensuel :</strong> Généré automatiquement le 1er de chaque mois pour le mois précédent.
          </div>
          <div>
            <strong>Trimestriel :</strong> Disponible 5 jours après la fin du trimestre avec analyse approfondie.
          </div>
          <div>
            <strong>Annuel :</strong> Bilan complet mi-janvier avec benchmarks sectoriels et recommandations stratégiques.
          </div>
        </div>
      </div>
    </div>
  );
}