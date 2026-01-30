import { useB2BAuth } from '@/app/contexts/B2BAuthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BarChart3
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  Cell
} from 'recharts';

export default function B2BDashboardPage() {
  const { user } = useB2BAuth();

  // Score Global de Bien-être
  const globalWellbeingScore = 78;
  const previousScore = 74;
  const scoreChange = globalWellbeingScore - previousScore;

  // Statistiques clés
  const keyStats = [
    {
      label: 'Taux d\'engagement',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Activity,
      description: '98/113 employés actifs'
    },
    {
      label: 'Consultations ce mois',
      value: '234',
      change: '+12%',
      trend: 'up',
      icon: Users,
      description: '2.1 par employé en moyenne'
    },
    {
      label: 'Temps de réponse moyen',
      value: '18min',
      change: '-8min',
      trend: 'up',
      icon: Clock,
      description: 'Support expert'
    },
    {
      label: 'Départements à risque',
      value: '1',
      change: '-2',
      trend: 'up',
      icon: AlertTriangle,
      description: 'Finance (stress élevé)'
    },
  ];

  // Données de stress par département (Heatmap/Barres)
  const departmentStress = [
    { dept: 'Marketing', stress: 42, baseline: 50, status: 'good', employees: 24 },
    { dept: 'Finance', stress: 78, baseline: 50, status: 'warning', employees: 18 },
    { dept: 'Opérations', stress: 55, baseline: 50, status: 'moderate', employees: 32 },
    { dept: 'Tech', stress: 48, baseline: 50, status: 'good', employees: 21 },
    { dept: 'RH', stress: 38, baseline: 50, status: 'excellent', employees: 12 },
    { dept: 'Direction', stress: 52, baseline: 50, status: 'moderate', employees: 6 },
  ];

  // Évolution du bien-être sur 6 mois
  const wellbeingEvolution = [
    { month: 'Août', score: 68, consultations: 156 },
    { month: 'Sept', score: 71, consultations: 178 },
    { month: 'Oct', score: 74, consultations: 198 },
    { month: 'Nov', score: 76, consultations: 212 },
    { month: 'Déc', score: 74, consultations: 189 },
    { month: 'Jan', score: 78, consultations: 234 },
  ];

  // Thématiques les plus consultées (100% anonymisé)
  const topThemes = [
    { theme: 'Gestion du stress', count: 78, percentage: 33, trend: 'up' },
    { theme: 'Équilibre vie pro/perso', count: 56, percentage: 24, trend: 'stable' },
    { theme: 'Sommeil & repos', count: 45, percentage: 19, trend: 'down' },
    { theme: 'Relations au travail', count: 32, percentage: 14, trend: 'up' },
    { theme: 'Motivation', count: 23, percentage: 10, trend: 'stable' },
  ];

  const getStressColor = (stress: number) => {
    if (stress < 40) return '#A8B5A0'; // vert doux sage
    if (stress < 60) return '#D4B5A0'; // beige chaud
    return '#C8A39A'; // terracotta doux
  };

  const getStressLabel = (stress: number) => {
    if (stress < 40) return 'Excellent';
    if (stress < 60) return 'Modéré';
    return 'Élevé';
  };

  return (
    <div className="space-y-6">
      {/* Score Global - Hero Section */}
      <div className="bg-gradient-to-br from-terracotta/10 via-white to-beige/10 rounded-2xl p-8 border border-beige/30 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-medium text-muted-foreground font-sans mb-2">
              Score Global de Bien-être
            </div>
            <div className="flex items-baseline gap-4">
              <div className="text-6xl font-bold text-anthracite font-serif">
                {globalWellbeingScore}
                <span className="text-3xl text-muted-foreground">/100</span>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium`}
                style={{
                  backgroundColor: scoreChange > 0 ? '#A8B5A0' : '#C8A39A',
                  color: 'white'
                }}
              >
                {scoreChange > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {scoreChange > 0 ? '+' : ''}{scoreChange} pts
              </div>
            </div>
            <p className="mt-3 text-muted-foreground font-sans">
              Votre organisation affiche un bien-être <strong className="text-terracotta">en progression</strong>. 
              Continuez vos efforts ! 🌟
            </p>
          </div>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-terracotta to-terracotta/60 flex items-center justify-center shadow-xl">
            <div className="text-center text-white">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-1" />
              <div className="text-xs font-medium">Bonne santé</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-terracotta/10">
                  <Icon className="w-5 h-5 text-terracotta" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full`}
                  style={{
                    backgroundColor: stat.trend === 'up' ? '#A8B5A0' : '#E8E4E1',
                    color: stat.trend === 'up' ? 'white' : '#4A4A4A'
                  }}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-anthracite mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-gray-900 mb-1 font-sans">{stat.label}</div>
              <div className="text-xs text-muted-foreground font-sans">{stat.description}</div>
            </div>
          );
        })}
      </div>

      {/* Météo Mentale par Département */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-serif text-anthracite mb-1">
              Météo Mentale par Département
            </h3>
            <p className="text-sm text-muted-foreground font-sans">
              Niveau de stress agrégé (0-100). Données 100% anonymisées.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-sans">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#A8B5A0]"></div>
              <span className="text-muted-foreground">Excellent (&lt;40)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#D4B5A0]"></div>
              <span className="text-muted-foreground">Modéré (40-60)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C8A39A]"></div>
              <span className="text-muted-foreground">Élevé (&gt;60)</span>
            </div>
          </div>
        </div>

        {/* Cartes des départements - Design moderne */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departmentStress.map((dept, idx) => {
            const stressColor = getStressColor(dept.stress);
            const isHigh = dept.stress >= 60;
            const isMedium = dept.stress >= 40 && dept.stress < 60;
            const isLow = dept.stress < 40;
            
            return (
              <div 
                key={idx}
                className="group relative bg-white rounded-xl p-5 border hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                style={{ borderColor: '#E8E4E1' }}
              >
                {/* Gradient background subtil */}
                <div 
                  className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${stressColor} 0%, transparent 100%)` }}
                ></div>
                
                {/* Contenu */}
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-anthracite font-sans text-base mb-1">
                        {dept.dept}
                      </h4>
                      <p className="text-xs text-muted-foreground font-sans">
                        {dept.employees} employés
                      </p>
                    </div>
                    
                    {/* Badge de score circulaire doux */}
                    <div 
                      className="relative w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white shadow-sm"
                      style={{ backgroundColor: stressColor }}
                    >
                      <span className="text-base">{dept.stress}</span>
                    </div>
                  </div>
                  
                  {/* Barre de progression douce */}
                  <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div 
                      className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${dept.stress}%`,
                        backgroundColor: stressColor 
                      }}
                    ></div>
                  </div>
                  
                  {/* Label de statut épuré */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${stressColor}15`,
                        color: stressColor
                      }}
                    >
                      {isHigh && 'Élevé'}
                      {isMedium && 'Modéré'}
                      {isLow && 'Excellent'}
                    </span>
                    <span className="text-xs text-muted-foreground font-sans">
                      {dept.stress > dept.baseline ? '+' : ''}{dept.stress - dept.baseline} pts
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mini graphique optionnel en dessous */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-muted-foreground mb-4 font-sans">Vue d'ensemble comparative</p>
          
          {/* Version épurée avec couleurs douces */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
            {departmentStress.map((dept, idx) => {
              const stressColor = getStressColor(dept.stress);
              return (
                <div key={idx} className="text-center">
                  <div 
                    className="w-full h-20 rounded-lg mb-2 flex items-end justify-center pb-2 bg-gray-50"
                  >
                    <div 
                      className="w-10 rounded-t transition-all duration-500"
                      style={{ 
                        height: `${dept.stress}%`,
                        backgroundColor: stressColor 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground font-sans mb-1">{dept.dept}</div>
                  <div className="text-sm font-semibold text-anthracite">{dept.stress}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Évolution ROI */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-serif text-anthracite flex items-center gap-2 mb-1">
                <BarChart3 className="w-5 h-5 text-terracotta" />
                ROI : Évolution du Bien-être
              </h3>
              <p className="text-sm text-muted-foreground font-sans">
                Performance sur les 6 derniers mois
              </p>
            </div>
            
            {/* KPI rapide */}
            <div className="text-right">
              <div className="text-3xl font-bold text-terracotta">+10</div>
              <div className="text-xs text-muted-foreground font-sans">points de gain</div>
            </div>
          </div>
          
          {/* Statistiques clés avant le graphique */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gradient-to-br from-[#A8B5A0]/10 to-[#A8B5A0]/5 rounded-lg p-3 border border-[#A8B5A0]/20">
              <div className="text-xs font-sans mb-1" style={{ color: '#A8B5A0' }}>Score actuel</div>
              <div className="text-2xl font-bold text-anthracite">{globalWellbeingScore}</div>
            </div>
            <div className="bg-gradient-to-br from-[#D4B5A0]/10 to-[#D4B5A0]/5 rounded-lg p-3 border border-[#D4B5A0]/20">
              <div className="text-xs font-sans mb-1" style={{ color: '#D4B5A0' }}>Score moyen</div>
              <div className="text-2xl font-bold text-anthracite">73.5</div>
            </div>
            <div className="bg-gradient-to-br from-terracotta/10 to-terracotta/5 rounded-lg p-3 border border-terracotta/20">
              <div className="text-xs text-terracotta font-sans mb-1">Tendance</div>
              <div className="text-2xl font-bold text-anthracite">↗ +14%</div>
            </div>
          </div>
          
          {/* Graphique amélioré */}
          <div className="w-full bg-gradient-to-b from-transparent to-gray-50/50 rounded-lg p-4">
            {/* Version sans graphique Recharts - Timeline simple */}
            <div className="space-y-3">
              {wellbeingEvolution.map((item, idx) => {
                const progress = ((item.score - 60) / (85 - 60)) * 100;
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-16 text-xs text-muted-foreground font-sans">{item.month}</div>
                    <div className="flex-1">
                      <div className="relative w-full h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-terracotta/40 to-terracotta rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                          style={{ width: `${progress}%` }}
                        >
                          <span className="text-xs font-bold text-white">{item.score}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-20 text-right">
                      <div className="text-xs text-muted-foreground font-sans">{item.consultations} visites</div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Légende */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-muted-foreground font-sans">
              <span>Score min: 60</span>
              <span>Score max: 85</span>
            </div>
          </div>
          
          {/* Message de succès */}
          <div className="mt-4 p-4 bg-gradient-to-r from-[#A8B5A0]/10 to-[#A8B5A0]/5 rounded-lg border border-[#A8B5A0]/30">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#A8B5A0' }}>
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-anthracite font-sans mb-1">
                  📈 Progression exceptionnelle de +10 points en 6 mois
                </div>
                <div className="text-xs text-muted-foreground font-sans">
                  Votre investissement dans le bien-être génère un ROI mesurable sur la satisfaction et la productivité !
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thématiques les Plus Consultées */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-serif text-anthracite mb-4">
            Thématiques Principales
          </h3>
          <p className="text-xs text-muted-foreground mb-4 font-sans">
            Sujets anonymisés les plus abordés en consultation
          </p>
          <div className="space-y-4">
            {topThemes.map((theme, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-anthracite font-sans">{theme.theme}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-sans">{theme.count}</span>
                    <span className={`text-xs`}
                      style={{
                        color: theme.trend === 'up' ? '#C8A39A' : 
                               theme.trend === 'down' ? '#A8B5A0' : 
                               '#9CA3AF'
                      }}
                    >
                      {theme.trend === 'up' ? '↑' : theme.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-terracotta h-2 rounded-full transition-all duration-500"
                    style={{ width: `${theme.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerte de Crise */}
      <div className="bg-[#D4B5A0]/10 border-2 border-[#D4B5A0]/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#D4B5A0' }}>
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-anthracite mb-2 font-sans">
              Alerte : Département Finance sous surveillance
            </h4>
            <p className="text-sm text-muted-foreground mb-3 font-sans">
              Le niveau de stress agrégé du département Finance (78/100) dépasse le seuil d'alerte. 
              Aucune donnée personnelle identifiable.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-sans" style={{ backgroundColor: '#C8A39A' }}>
                Voir les recommandations
              </button>
              <button className="px-4 py-2 bg-white text-anthracite border rounded-lg hover:bg-gray-50 transition-colors text-sm font-sans" style={{ borderColor: '#D4B5A0' }}>
                Programmer une intervention
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}