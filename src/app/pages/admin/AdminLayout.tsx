import { useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  MessageSquare,
  LifeBuoy,
  Users,
  Briefcase,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  path: string;
  badge?: number;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      icon: LayoutDashboard,
      path: "/admin-mona",
    },
    {
      id: "messaging",
      label: "Messagerie",
      icon: MessageSquare,
      path: "/admin-mona/messagerie",
      badge: 3,
    },
    {
      id: "tickets",
      label: "Support",
      icon: LifeBuoy,
      path: "/admin-mona/tickets",
      badge: 12,
    },
    {
      id: "experts",
      label: "Experts",
      icon: Users,
      path: "/admin-mona/experts",
    },
    {
      id: "entreprises",
      label: "Entreprises",
      icon: Briefcase,
      path: "/admin-mona/entreprises",
    },
  ];

  useEffect(() => {
    // Vérifier l'authentification
    const storedUser = localStorage.getItem("mona_admin_user");
    if (!storedUser) {
      navigate("/admin-login");
      return;
    }

    const user = JSON.parse(storedUser);
    setAdminUser(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("mona_admin_user");
    navigate("/admin-login");
  };

  const isActive = (path: string) => {
    if (path === "/admin-mona") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  if (!adminUser) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-beige/10 to-white overflow-hidden">
      {/* Sidebar - Style Teams avec couleurs M.O.N.A douces */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-anthracite/95 via-anthracite/90 to-anthracite/95 text-white flex-shrink-0 transition-all duration-300 ease-in-out flex flex-col shadow-xl border-r border-beige/20`}
      >
        {/* Header Sidebar */}
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          {isSidebarOpen ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-terracotta/40 to-gold/30 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-serif">M</span>
                </div>
                <div>
                  <h1 className="font-serif text-lg text-beige/90">M.O.N.A</h1>
                  <p className="text-xs text-beige/50 font-sans">Admin</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 hover:bg-white/5 rounded transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-beige/60" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-white/5 rounded transition-colors mx-auto"
            >
              <Menu className="w-5 h-5 text-beige/60" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  active
                    ? "bg-gradient-to-r from-terracotta/20 to-gold/15 text-beige border border-terracotta/20"
                    : "text-beige/60 hover:bg-white/5 hover:text-beige/90"
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta/70 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </div>
                {isSidebarOpen && (
                  <span className="font-sans text-sm flex-1 text-left">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile + Logout */}
        <div className="p-3 border-t border-white/5">
          {isSidebarOpen ? (
            <div className="bg-white/5 rounded-lg p-3 mb-2 border border-beige/10">
              <p className="text-sm font-medium text-beige/90 font-sans truncate">
                {adminUser.name}
              </p>
              <p className="text-xs text-beige/50 font-sans truncate">
                {adminUser.email}
              </p>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-terracotta/30 to-gold/20 rounded-full flex items-center justify-center mb-2 mx-auto border border-beige/20">
              <span className="text-sm font-bold text-beige">
                {adminUser.name.charAt(0)}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-beige/60 hover:bg-white/5 hover:text-beige/90 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && (
              <span className="font-sans text-sm">Déconnexion</span>
            )}
          </button>

          {/* Retour à M.O.N.A */}
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-beige/40 hover:bg-white/5 hover:text-beige/70 rounded-lg transition-all mt-1"
          >
            <ChevronLeft className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && (
              <span className="font-sans text-sm">Retour site</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-white via-beige/5 to-white">
        {children}
      </main>
    </div>
  );
}