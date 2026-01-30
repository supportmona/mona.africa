import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { useB2BAuth } from '@/app/contexts/B2BAuthContext';
import { 
  LayoutDashboard, 
  Wallet, 
  FileText, 
  Settings, 
  LogOut,
  Building2,
  ChevronRight
} from 'lucide-react';

interface B2BLayoutProps {
  children: ReactNode;
}

export default function B2BLayout({ children }: B2BLayoutProps) {
  const { user, logout, isAuthenticated } = useB2BAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect si non authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/b2b-login');
    }
  }, [isAuthenticated, navigate]);

  // Ne rien afficher si non authentifié
  if (!isAuthenticated) {
    return null;
  }

  const navigation = [
    { 
      name: 'Vue d\'ensemble', 
      href: '/dashboard-b2b', 
      icon: LayoutDashboard,
      current: location.pathname === '/dashboard-b2b'
    },
    { 
      name: 'Wallet & Crédits', 
      href: '/dashboard-b2b/wallet', 
      icon: Wallet,
      current: location.pathname === '/dashboard-b2b/wallet'
    },
    { 
      name: 'Rapports', 
      href: '/dashboard-b2b/reports', 
      icon: FileText,
      current: location.pathname === '/dashboard-b2b/reports'
    },
    { 
      name: 'Paramètres', 
      href: '/dashboard-b2b/settings', 
      icon: Settings,
      current: location.pathname === '/dashboard-b2b/settings'
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/b2b-login');
  };

  const primaryColor = '#C17B5C'; // terracotta
  const secondaryColor = '#2C3E50'; // anthracite

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-3 h-16 px-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-terracotta rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-serif text-lg text-anthracite">M.O.N.A</div>
            <div className="text-xs text-muted-foreground font-sans">Portail Entreprise</div>
          </div>
        </div>

        {/* Company Info */}
        <div className="p-4 border-b border-gray-200 bg-beige/10">
          <div className="text-sm font-semibold text-anthracite font-sans">{user?.companyName}</div>
          <div className="text-xs text-muted-foreground font-sans mt-1">
            {user?.employeeCount} employés
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {user?.locations.map((loc, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-white text-xs rounded-full border border-beige">
                {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans text-sm transition-all duration-200
                  ${item.current 
                    ? 'bg-terracotta/10 text-terracotta font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {item.name}
                {item.current && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center text-terracotta font-semibold">
              {user?.companyName.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-anthracite truncate font-sans">
                {user?.email}
              </div>
              <div className="text-xs text-muted-foreground font-sans capitalize">
                {user?.role.replace('-', ' ')}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-sans"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-serif text-anthracite">
              {navigation.find(item => item.current)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground font-sans">
              Dernière mise à jour : Il y a 5 min
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}