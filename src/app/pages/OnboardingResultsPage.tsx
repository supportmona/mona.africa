import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Download, Sparkles, TrendingUp, Users, Apple, Smartphone, Star, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

// Mapping des dimensions pour le graphique radar
const dimensionLabels: Record<string, string> = {
  energie: 'Énergie',
  sommeil: 'Sommeil',
  concentration: 'Focus',
  emotions: 'Émotions',
  relations: 'Relations',
  stress: 'Sérénité',
  accomplissement: 'Sens',
  equilibre: 'Équilibre',
};

export default function OnboardingResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Essayer de récupérer depuis location.state OU sessionStorage
  const mentalScoresFromState = location.state?.mentalScores || {};
  const matchingAnswersFromState = location.state?.matchingAnswers || {};
  
  const mentalScoresFromStorage = sessionStorage.getItem('mona_mental_scores');
  const matchingAnswersFromStorage = sessionStorage.getItem('mona_matching_answers');
  
  const mentalScores = Object.keys(mentalScoresFromState).length > 0
    ? mentalScoresFromState
    : mentalScoresFromStorage
      ? JSON.parse(mentalScoresFromStorage)
      : {};
      
  const matchingAnswers = Object.keys(matchingAnswersFromState).length > 0
    ? matchingAnswersFromState
    : matchingAnswersFromStorage
      ? JSON.parse(matchingAnswersFromStorage)
      : {};

  console.log('🎯 OnboardingResultsPage - Données reçues:');
  console.log('  - Mental Scores:', mentalScores);
  console.log('  - Matching Answers:', matchingAnswers);

  // Validation : rediriger si pas de scores (dans useEffect pour éviter l'erreur React)
  useEffect(() => {
    if (Object.keys(mentalScores).length === 0) {
      console.warn('⚠️ Aucun score mental trouvé, redirection vers onboarding');
      navigate('/onboarding', { replace: true });
    } else {
      console.log('✅ Scores valides - Affichage des résultats');
    }
  }, [mentalScores, navigate]);

  // Si pas de données, ne rien afficher (évite le flash avant la redirection)
  if (Object.keys(mentalScores).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-beige/20 via-white to-terracotta/10 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Chargement de vos résultats...</p>
        </div>
      </div>
    );
  }

  // Calculer le score global avec une meilleure formule
  const scoresArray = Object.values(mentalScores).filter(score => typeof score === 'number' && score >= 1 && score <= 5) as number[];
  
  // Le score minimum possible est 20/100 (si tous les scores sont à 1/5)
  // Le score maximum possible est 100/100 (si tous les scores sont à 5/5)
  const averageScore = scoresArray.length > 0 
    ? scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length
    : 0;
  
  const globalScore = Math.round((averageScore / 5) * 100);

  // Préparer les données pour le graphique radar
  const radarData = Object.entries(mentalScores)
    .filter(([, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      dimension: dimensionLabels[key] || key,
      score: value as number,
      maxScore: 5,
    }));

  // Déterminer le niveau, le message et les recommandations
  const getScoreLevel = (score: number) => {
    if (score >= 80) {
      return { 
        label: 'Excellent', 
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: Star,
        message: 'Votre mieux-être est remarquable ! Vous avez mis en place de bonnes habitudes. Continuez sur cette voie.',
        cta: 'Maintenez votre équilibre avec un suivi mensuel'
      };
    }
    if (score >= 60) {
      return { 
        label: 'Bon', 
        color: 'text-gold',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        icon: CheckCircle2,
        message: 'Vous êtes sur la bonne voie. Quelques ajustements pourraient vous aider à optimiser votre bien-être.',
        cta: 'Explorez nos programmes pour passer au niveau supérieur'
      };
    }
    if (score >= 40) {
      return { 
        label: 'À améliorer', 
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: AlertCircle,
        message: 'Votre équilibre mental mérite attention. Un accompagnement peut faire une vraie différence.',
        cta: 'Parlons de vos défis avec un expert M.O.N.A'
      };
    }
    return { 
        label: 'Priorité absolue', 
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: TrendingUp,
        message: 'Votre mieux-être nécessite une attention immédiate. Vous méritez un soutien professionnel.',
        cta: 'Connectez-vous rapidement avec un expert spécialisé'
      };
  };

  const scoreLevel = getScoreLevel(globalScore);
  const ScoreLevelIcon = scoreLevel.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige/20 via-white to-terracotta/10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header avec animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-anthracite font-sans">Votre Profil M.O.N.A</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl text-anthracite mb-4">
            Votre Mental Score
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Félicitations ! Voici votre profil de mieux-être personnalisé
          </p>
        </motion.div>

        {/* Score global */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-beige/20 mb-8"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-beige/20 rounded-3xl mb-4">
              <ScoreLevelIcon className={`w-12 h-12 ${scoreLevel.color}`} />
            </div>
            <div className="mb-2">
              <span className="text-6xl font-sans text-anthracite">{globalScore}</span>
              <span className="text-3xl text-muted-foreground">/100</span>
            </div>
            <p className={`text-2xl font-sans ${scoreLevel.color}`}>
              {scoreLevel.label}
            </p>
          </div>

          {/* Graphique Radar */}
          <div className="mb-8">
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#D4B5A0" strokeOpacity={0.3} />
                <PolarAngleAxis 
                  dataKey="dimension" 
                  tick={{ fill: '#4A4A4A', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 5]} 
                  tick={{ fill: '#8B8B8B', fontSize: 11 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#C8A39A"
                  fill="#C8A39A"
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Message personnalisé basé sur le score */}
          <div className={`${scoreLevel.bgColor} ${scoreLevel.borderColor} border-2 rounded-xl p-6 mb-8`}>
            <p className="text-base text-anthracite leading-relaxed mb-3">
              {scoreLevel.message}
            </p>
            <p className={`text-sm ${scoreLevel.color} font-medium`}>
              → {scoreLevel.cta}
            </p>
          </div>

          {/* Points forts et axes d'amélioration */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Points forts */}
            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-sans text-lg text-anthracite">Points forts</h3>
              </div>
              <div className="space-y-2">
                {Object.entries(mentalScores)
                  .filter(([, value]) => (value as number) >= 4)
                  .slice(0, 3)
                  .map(([key]) => (
                    <div key={key} className="flex items-center gap-2 text-sm text-green-800">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      {dimensionLabels[key]}
                    </div>
                  ))}
                {Object.entries(mentalScores).filter(([, value]) => (value as number) >= 4).length === 0 && (
                  <p className="text-sm text-green-800">Continuez vos efforts !</p>
                )}
              </div>
            </div>

            {/* Axes d'amélioration */}
            <div className="bg-orange-50 rounded-xl p-5 border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-orange-600" />
                <h3 className="font-sans text-lg text-anthracite">À travailler</h3>
              </div>
              <div className="space-y-2">
                {Object.entries(mentalScores)
                  .filter(([, value]) => (value as number) <= 3)
                  .slice(0, 3)
                  .map(([key]) => (
                    <div key={key} className="flex items-center gap-2 text-sm text-orange-800">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      {dimensionLabels[key]}
                    </div>
                  ))}
                {Object.entries(mentalScores).filter(([, value]) => (value as number) <= 3).length === 0 && (
                  <p className="text-sm text-orange-800">Excellent équilibre global !</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Votre profil de matching */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-beige/20 mb-8"
        >
          <h2 className="text-2xl text-anthracite mb-6">Votre profil de matching</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {matchingAnswers.objectif && (
              <div className="bg-beige/20 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Objectif principal</p>
                <p className="text-sm text-anthracite font-medium capitalize">
                  {matchingAnswers.objectif.replace('_', ' ')}
                </p>
              </div>
            )}
            
            {matchingAnswers.genre && (
              <div className="bg-beige/20 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Préférence expert</p>
                <p className="text-sm text-anthracite font-medium capitalize">
                  {matchingAnswers.genre}
                </p>
              </div>
            )}
            
            {matchingAnswers.style && (
              <div className="bg-beige/20 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Style de communication</p>
                <p className="text-sm text-anthracite font-medium capitalize">
                  {matchingAnswers.style}
                </p>
              </div>
            )}
            
            {matchingAnswers.spiritualite && (
              <div className="bg-beige/20 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Dimension spirituelle</p>
                <p className="text-sm text-anthracite font-medium capitalize">
                  {matchingAnswers.spiritualite}
                </p>
              </div>
            )}
            
            {matchingAnswers.contexte && (
              <div className="bg-beige/20 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Contexte culturel</p>
                <p className="text-sm text-anthracite font-medium capitalize">
                  {matchingAnswers.contexte}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA principal - Télécharger l'app */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-terracotta to-terracotta/80 rounded-3xl shadow-2xl p-8 sm:p-12 text-center text-white"
        >
          <Download className="w-16 h-16 mx-auto mb-4 opacity-90" />
          
          <h2 className="text-3xl sm:text-4xl mb-4">
            Téléchargez l'App M.O.N.A
          </h2>
          
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Sauvegardez votre score, accédez à votre tableau de bord personnalisé et 
            connectez-vous avec un expert qui vous correspond parfaitement.
          </p>

          {/* Boutons de téléchargement */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-anthracite rounded-xl hover:bg-beige/90 transition-all duration-200 font-sans shadow-lg">
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs opacity-70">Télécharger sur</div>
                <div className="text-base font-semibold">App Store</div>
              </div>
            </button>
            
            <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-anthracite rounded-xl hover:bg-beige/90 transition-all duration-200 font-sans shadow-lg">
              <Smartphone className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs opacity-70">Télécharger sur</div>
                <div className="text-base font-semibold">Google Play</div>
              </div>
            </button>
          </div>

          <p className="text-sm opacity-75">
            Disponible sur iOS et Android • Connexion Offline-First pour l'Afrique
          </p>
        </motion.div>

        {/* Bouton retour */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-anthracite transition-colors text-sm"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}