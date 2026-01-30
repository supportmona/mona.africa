import { useState } from 'react';
import { useB2BAuth } from '@/app/contexts/B2BAuthContext';
import { 
  Wallet, 
  CreditCard,
  Plus,
  Send,
  History,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Smartphone,
  Building2
} from 'lucide-react';
import { formatCurrency, CurrencyCode, getPreferredCurrency, convertCurrency } from '@/app/utils/currency';
import CurrencySelector from '@/app/components/CurrencySelector';

export default function B2BWalletPage() {
  const { user } = useB2BAuth();
  
  // Déterminer la devise principale selon la localisation
  const primaryLocation = user?.locations[0] || 'Kinshasa';
  const primaryCurrency = getPreferredCurrency(primaryLocation);
  
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(primaryCurrency);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');

  // Solde actuel de crédits (en crédits M.O.N.A)
  const currentBalanceCredits = 450; // crédits
  const creditValueUSD = 1; // 1 crédit = ~1 USD
  const monthlyBudget = 2000; // crédits par mois
  const budgetUsed = monthlyBudget - currentBalanceCredits;
  const budgetPercentage = (budgetUsed / monthlyBudget) * 100;

  // Convertir le solde dans la devise sélectionnée
  const currentBalanceUSD = currentBalanceCredits * creditValueUSD;
  const currentBalance = convertCurrency(currentBalanceUSD, 'USD', selectedCurrency);

  // Statistiques d'utilisation
  const usageStats = [
    { label: 'Crédits distribués ce mois', value: 1550, icon: Send, color: 'text-terracotta' },
    { label: 'Employés ayant utilisé', value: 98, icon: TrendingUp, color: '#A8B5A0' },
    { label: 'Crédits restants', value: currentBalanceCredits, icon: Wallet, color: 'text-blue-600' },
    { label: 'Taux d\'utilisation', value: `${budgetPercentage.toFixed(0)}%`, icon: TrendingUp, color: 'text-purple-600' },
  ];

  // Historique des transactions
  const transactions = [
    { 
      id: 'TRX-001',
      type: 'recharge',
      amount: 500,
      description: 'Recharge mensuelle - Janvier',
      method: 'Virement bancaire',
      date: '15 Jan 2025',
      status: 'completed'
    },
    {
      id: 'TRX-002', 
      type: 'distribution',
      amount: -150,
      description: 'Distribution département Marketing',
      method: 'Auto',
      date: '14 Jan 2025',
      status: 'completed'
    },
    {
      id: 'TRX-003',
      type: 'distribution',
      amount: -200,
      description: 'Distribution département Finance',
      method: 'Auto',
      date: '12 Jan 2025',
      status: 'completed'
    },
    {
      id: 'TRX-004',
      type: 'recharge',
      amount: 300,
      description: 'Recharge supplémentaire',
      method: 'Mobile Money (Wave)',
      date: '10 Jan 2025',
      status: 'completed'
    },
    {
      id: 'TRX-005',
      type: 'distribution',
      amount: -100,
      description: 'Distribution département Tech',
      method: 'Auto',
      date: '08 Jan 2025',
      status: 'completed'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-br from-terracotta via-terracotta/90 to-anthracite rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="text-white/80 text-sm font-sans mb-2">Solde Wallet M.O.N.A</div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold font-serif">{currentBalanceCredits}</span>
              <span className="text-2xl text-white/80">crédits</span>
            </div>
            <div className="text-white/70 text-sm mt-2 font-sans">
              ≈ {formatCurrency(currentBalance, selectedCurrency, { showSymbol: true })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Wallet className="w-8 h-8" />
            </div>
            <CurrencySelector 
              value={selectedCurrency}
              onChange={setSelectedCurrency}
              compact={true}
              className="bg-white/10 border-white/30 text-white"
            />
          </div>
        </div>

        {/* Budget Progress */}
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-sans">Budget mensuel utilisé</span>
            <span className="text-sm font-medium">{budgetUsed}/{monthlyBudget} crédits</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${budgetPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button 
            onClick={() => setShowRechargeModal(true)}
            className="flex-1 bg-white text-terracotta px-6 py-3 rounded-lg font-sans font-medium hover:bg-white/90 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Recharger
          </button>
          <button className="flex-1 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-sans font-medium hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2 border border-white/30">
            <Send className="w-5 h-5" />
            Distribuer
          </button>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {usageStats.map((stat, idx) => {
          const Icon = stat.icon;
          const isGreenStat = typeof stat.color === 'string' && stat.color.startsWith('#');
          return (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gray-50`}>
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

      {/* Recharge Methods */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-serif text-anthracite mb-4">Moyens de recharge</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-terracotta hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-anthracite font-sans">Virement bancaire</div>
                <div className="text-xs text-muted-foreground">2-3 jours ouvrés</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground font-sans">
              Idéal pour les grandes entreprises. Facturation mensuelle possible.
            </div>
          </div>

          <div className="p-4 border-2 border-terracotta rounded-lg shadow-md cursor-pointer bg-terracotta/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-terracotta/10 rounded-lg">
                <Smartphone className="w-6 h-6 text-terracotta" />
              </div>
              <div>
                <div className="font-semibold text-anthracite font-sans">Mobile Money</div>
                <div className="text-xs text-terracotta font-medium">Instantané ⚡</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground font-sans mb-2">
              Wave, Orange Money, M-Pesa. Recommandé pour l'Afrique.
            </div>
            <div className="flex gap-1 text-xs">
              <span className="px-2 py-0.5 bg-white rounded-full border border-terracotta/30 text-terracotta">Wave</span>
              <span className="px-2 py-0.5 bg-white rounded-full border border-orange-300 text-orange-600">Orange</span>
            </div>
          </div>

          <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-terracotta hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#A8B5A0' }}>
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-anthracite font-sans">Carte bancaire</div>
                <div className="text-xs text-muted-foreground">Immédiat</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground font-sans">
              Visa, Mastercard. Paiement sécurisé 3D Secure.
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif text-anthracite flex items-center gap-2">
            <History className="w-5 h-5 text-terracotta" />
            Historique des transactions
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-terracotta border border-terracotta rounded-lg hover:bg-terracotta/5 transition-colors font-sans">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div 
              key={tx.id}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 rounded-lg`}
                style={{
                  backgroundColor: tx.type === 'recharge' ? '#A8B5A0' : '#6B9FD8'
                }}
              >
                {tx.type === 'recharge' ? (
                  <ArrowDownRight className="w-5 h-5 text-white" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-anthracite font-sans">{tx.description}</div>
                <div className="text-xs text-muted-foreground font-sans">
                  {tx.method} • {tx.date}
                </div>
              </div>

              <div className={`text-right`}>
                <div className="font-semibold text-lg"
                  style={{ color: tx.type === 'recharge' ? '#A8B5A0' : '#6B9FD8' }}
                >
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </div>
                <div className="text-xs text-muted-foreground">crédits</div>
              </div>

              <div>
                <span className="px-3 py-1 text-xs rounded-full font-medium text-white" style={{ backgroundColor: '#A8B5A0' }}>
                  Complété
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 mb-3 font-sans">
          💡 Guide de distribution des crédits
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800 font-sans">
          <div>
            <strong>Distribution automatique :</strong> Les crédits sont automatiquement répartis 
            entre vos employés selon leur plan d'abonnement.
          </div>
          <div>
            <strong>1 crédit = 1 consultation :</strong> Chaque crédit donne droit à une séance 
            de thérapie de 50 minutes.
          </div>
          <div>
            <strong>Report possible :</strong> Les crédits non utilisés sont reportés le mois suivant 
            (limite: 3 mois).
          </div>
          <div>
            <strong>Anonymat garanti :</strong> Vous ne voyez pas qui utilise les crédits, 
            seulement les statistiques agrégées.
          </div>
        </div>
      </div>
    </div>
  );
}