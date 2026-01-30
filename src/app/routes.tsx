import { createBrowserRouter } from "react-router";
import HomePage from "@/app/pages/HomePage";
import ServicesPage from "@/app/pages/ServicesPage";
import ExpertsPage from "@/app/pages/ExpertsPage";
import ExpertSpacePage from "@/app/pages/ExpertSpacePage";
import PortalExpertPage from "@/app/pages/PortalExpertPage";
import CerclePage from "@/app/pages/CerclePage";
import CasaDelToroPage from "@/app/pages/CasaDelToroPage";
import MaisonAkoulaPage from "@/app/pages/MaisonAkoulaPage";
import MbuelaLodgePage from "@/app/pages/MbuelaLodgePage";
import ResetStudioPage from "@/app/pages/ResetStudioPage";
import EforeaSpaPage from "@/app/pages/EforeaSpaPage";
import BodyPulsePage from "@/app/pages/BodyPulsePage";
import CardPage from "@/app/pages/CardPage";
import PricingPage from "@/app/pages/PricingPage";
import B2BPage from "@/app/pages/B2BPage";
import DashboardRHPage from "@/app/pages/DashboardRHPage";
import PartnershipsPage from "@/app/pages/PartnershipsPage";
import TestimonialsPage from "@/app/pages/TestimonialsPage";
import ContactPage from "@/app/pages/ContactPage";
import BlogPage from "@/app/pages/BlogPage";
import HelpCenterPage from "@/app/pages/HelpCenterPage";
import PrivacyPage from "@/app/pages/PrivacyPage";
import TermsPage from "@/app/pages/TermsPage";
import GDPRPage from "@/app/pages/GDPRPage";
import ResourcesPage from "@/app/pages/ResourcesPage";
import NotFoundPage from "@/app/pages/NotFoundPage";
import CareersPage from "@/app/pages/CareersPage";
import ApplicationPage from "@/app/pages/ApplicationPage";
import OpportunitiesPage from "@/app/pages/OpportunitiesPage";

// Onboarding imports
import OnboardingPage from "@/app/pages/OnboardingPage";
import MatchingQuizPage from "@/app/pages/MatchingQuizPage";
import OnboardingResultsPage from "@/app/pages/OnboardingResultsPage";

// B2B Dashboard imports
import B2BLoginPage from "@/app/pages/B2BLoginPage";
import B2BLayout from "@/app/pages/b2b/B2BLayout";
import B2BDashboardPage from "@/app/pages/b2b/B2BDashboardPage";
import B2BWalletPage from "@/app/pages/b2b/B2BWalletPage";
import B2BReportsPage from "@/app/pages/b2b/B2BReportsPage";
import B2BSettingsPage from "@/app/pages/b2b/B2BSettingsPage";

// Expert Portal imports
import ExpertLoginPage from "@/app/pages/portal/ExpertLoginPage";
import AdminExpertCreationPage from "@/app/pages/AdminExpertCreationPage";
import DemoSetupPage from "@/app/pages/DemoSetupPage";

// Admin Portal imports
import AdminLoginPage from "@/app/pages/admin/AdminLoginPage";
import AdminLayout from "@/app/pages/admin/AdminLayout";
import AdminDashboardPage from "@/app/pages/admin/AdminDashboardPage";
import AdminTicketsPage from "@/app/pages/admin/AdminTicketsPage";
import AdminExpertsPage from "@/app/pages/admin/AdminExpertsPage";
import AdminMessagingPage from "@/app/pages/admin/AdminMessagingPage";
import AdminEntreprisesPage from "@/app/pages/admin/AdminEntreprisesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/services",
    Component: ServicesPage,
  },
  {
    path: "/experts",
    Component: ExpertsPage,
  },
  {
    path: "/espace-expert",
    Component: ExpertSpacePage,
  },
  {
    path: "/portal-expert",
    Component: PortalExpertPage,
  },
  {
    path: "/cercle",
    Component: CerclePage,
  },
  {
    path: "/cercle/casa-del-toro",
    Component: CasaDelToroPage,
  },
  {
    path: "/cercle/maison-akoula",
    Component: MaisonAkoulaPage,
  },
  {
    path: "/cercle/mbuela-lodge",
    Component: MbuelaLodgePage,
  },
  {
    path: "/cercle/reset-studio",
    Component: ResetStudioPage,
  },
  {
    path: "/cercle/eforea-spa",
    Component: EforeaSpaPage,
  },
  {
    path: "/cercle/body-pulse",
    Component: BodyPulsePage,
  },
  {
    path: "/carte-membre",
    Component: CardPage,
  },
  {
    path: "/tarifs",
    Component: PricingPage,
  },
  {
    path: "/b2b",
    Component: B2BPage,
  },
  {
    path: "/business",
    Component: B2BPage,
  },
  {
    path: "/dashboard-rh",
    Component: DashboardRHPage,
  },
  {
    path: "/partenariats",
    Component: PartnershipsPage,
  },
  {
    path: "/temoignages",
    Component: TestimonialsPage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
  {
    path: "/ressources",
    Component: ResourcesPage,
  },
  {
    path: "/blog",
    Component: BlogPage,
  },
  {
    path: "/aide",
    Component: HelpCenterPage,
  },
  {
    path: "/confidentialite",
    Component: PrivacyPage,
  },
  {
    path: "/cgu",
    Component: TermsPage,
  },
  {
    path: "/rgpd",
    Component: GDPRPage,
  },
  {
    path: "/carrieres",
    Component: CareersPage,
  },
  {
    path: "/opportunites",
    Component: OpportunitiesPage,
  },
  {
    path: "/postuler",
    Component: ApplicationPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/onboarding/matching",
    Component: MatchingQuizPage,
  },
  {
    path: "/onboarding/results",
    Component: OnboardingResultsPage,
  },
  {
    path: "/b2b-login",
    Component: B2BLoginPage,
  },
  {
    path: "/dashboard-b2b",
    element: <B2BLayout><B2BDashboardPage /></B2BLayout>,
  },
  {
    path: "/dashboard-b2b/wallet",
    element: <B2BLayout><B2BWalletPage /></B2BLayout>,
  },
  {
    path: "/dashboard-b2b/reports",
    element: <B2BLayout><B2BReportsPage /></B2BLayout>,
  },
  {
    path: "/dashboard-b2b/settings",
    element: <B2BLayout><B2BSettingsPage /></B2BLayout>,
  },
  {
    path: "/expert-login",
    Component: ExpertLoginPage,
  },
  {
    path: "/admin-expert-creation",
    Component: AdminExpertCreationPage,
  },
  {
    path: "/demo-setup",
    Component: DemoSetupPage,
  },
  {
    path: "/admin-login",
    Component: AdminLoginPage,
  },
  {
    path: "/admin-mona",
    element: <AdminLayout><AdminDashboardPage /></AdminLayout>,
  },
  {
    path: "/admin-mona/tickets",
    element: <AdminLayout><AdminTicketsPage /></AdminLayout>,
  },
  {
    path: "/admin-mona/experts",
    element: <AdminLayout><AdminExpertsPage /></AdminLayout>,
  },
  {
    path: "/admin-mona/messagerie",
    element: <AdminLayout><AdminMessagingPage /></AdminLayout>,
  },
  {
    path: "/admin-mona/entreprises",
    element: <AdminLayout><AdminEntreprisesPage /></AdminLayout>,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);