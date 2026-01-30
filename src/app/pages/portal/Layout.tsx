import { Search, Bell, User, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useExpertAuth } from "@/app/contexts/ExpertAuthContext";
import { useNavigate } from "react-router";

interface LayoutProps {
  children: React.ReactNode;
  navigationItems: Array<{
    key: string;
    label: string;
    icon: React.ReactNode;
    shortcut?: string;
  }>;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  pageTitle: string;
  isMacbook: boolean;
  primaryColor: string;
}

export default function Layout({
  children,
  navigationItems,
  currentPage,
  setCurrentPage,
  pageTitle,
  isMacbook,
  primaryColor
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, profile, logout } = useExpertAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/expert-login");
  };

  // Construire le nom d'affichage
  const displayName = profile 
    ? `${profile.firstName} ${profile.lastName}`
    : user?.user_metadata?.firstName 
      ? `${user.user_metadata.firstName} ${user.user_metadata.lastName}`
      : 'Expert M.O.N.A';

  const displayRole = profile?.specialty || user?.user_metadata?.specialty || 'Expert';

  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">M.O.N.A</h1>
          <p className="text-sm text-gray-600">Portail Expert</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setCurrentPage(item.key)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.key
                      ? "text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  style={
                    currentPage === item.key
                      ? { backgroundColor: primaryColor }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {isMacbook && item.shortcut && (
                    <span className="text-xs opacity-75">{item.shortcut}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: primaryColor }}
            >
              {initials}
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 text-sm">{displayName}</div>
              <div className="text-xs text-gray-600">{displayRole}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h2 className="text-xl font-semibold text-gray-900">{pageTitle}</h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  id="global-search"
                  type="text"
                  placeholder={isMacbook ? "Rechercher... (⌘/)" : "Rechercher..."}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={handleLogout}>
                <User size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}