import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useExpertAuth } from "@/app/contexts/ExpertAuthContext";
import ExpertProtectedRoute from "@/app/components/ExpertProtectedRoute";
import MessagingWidget from "@/app/components/MessagingWidget";
import TicketWidget from "@/app/components/TicketWidget";
import { 
  Calendar, 
  Users, 
  Video, 
  BarChart2, 
  Settings
} from "lucide-react";

// Import components as pages
import DashboardPage from "./portal/DashboardPage";
import MembersDirectoryPage from "./portal/MembersDirectoryPage";
import TeleconsultationPage from "./portal/TeleconsultationPage";
import AgendaViewPage from "./portal/AgendaViewPage";
import UserSettingsPage from "./portal/UserSettingsPage";
import Layout from "./portal/Layout";

export default function PortalExpertPage() {
  const primaryColor = "#E8A087"; // Terracotta M.O.N.A
  const secondaryColor = "#A8D5BA";
  const backgroundColor = "#F8F6F2";
  const { user } = useExpertAuth();
  
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isMacbook, setIsMacbook] = useState(false);
  
  // Check if we're on MacBook based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      // Macbooks typically have a width of 1280px or more, aspect ratio of 16:10
      setIsMacbook(width >= 1280 && window.innerHeight / window.innerWidth > 0.6);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Define the navigation structure
  const navigationItems = [
    { key: "dashboard", label: "Tableau de bord", icon: <BarChart2 size={20} />, shortcut: "⌘1" },
    { key: "agenda", label: "Agenda intelligent", icon: <Calendar size={20} />, shortcut: "⌘2" },
    { key: "members", label: "Base membres", icon: <Users size={20} />, shortcut: "⌘3" },
    { key: "teleconsult", label: "Téléconsultation", icon: <Video size={20} />, shortcut: "⌘4" },
    { key: "settings", label: "Paramètres", icon: <Settings size={20} />, shortcut: "⌘5" }
  ];

  // Render the appropriate page based on current route
  const renderPage = () => {
    switch(currentPage) {
      case "dashboard":
        return <DashboardPage primaryColor={primaryColor} secondaryColor={secondaryColor} isMacbook={isMacbook} />;
      case "members":
        return <MembersDirectoryPage primaryColor={primaryColor} secondaryColor={secondaryColor} isMacbook={isMacbook} />;
      case "teleconsult":
        return <TeleconsultationPage primaryColor={primaryColor} secondaryColor={secondaryColor} isMacbook={isMacbook} />;
      case "agenda":
        return <AgendaViewPage primaryColor={primaryColor} secondaryColor={secondaryColor} isMacbook={isMacbook} />;
      case "settings":
        return <UserSettingsPage primaryColor={primaryColor} secondaryColor={secondaryColor} isMacbook={isMacbook} />;
      default:
        return <DashboardPage primaryColor={primaryColor} secondaryColor={secondaryColor} isMacbook={isMacbook} />;
    }
  };

  const getPageTitle = () => {
    switch(currentPage) {
      case "dashboard": return "Tableau de bord";
      case "agenda": return "Agenda intelligent";
      case "members": return "Base membres & Dossiers";
      case "teleconsult": return "Téléconsultation";
      case "settings": return "Paramètres";
      default: return "Tableau de bord";
    }
  };

  return (
    <ExpertProtectedRoute>
      <Layout 
        navigationItems={navigationItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageTitle={getPageTitle()}
        isMacbook={isMacbook}
        primaryColor={primaryColor}
      >
        {renderPage()}
      </Layout>
      
      {/* Messagerie et tickets flottants */}
      {user && (
        <>
          <MessagingWidget
            currentUserId={user.id}
            currentUserName={user.name}
            currentUserRole="expert"
          />
          <TicketWidget
            userId={user.id}
            userName={user.name}
            userRole="expert"
          />
        </>
      )}
    </ExpertProtectedRoute>
  );
}