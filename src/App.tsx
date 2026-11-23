import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { NeedsProvider } from './context/NeedsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { LabPage } from './pages/LabPage';
import { InsightsPage } from './pages/InsightsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';

const AppRouterView: React.FC = () => {
  const { pathname, serviceSlug } = useRouter();

  const renderPage = () => {
    switch (pathname) {
      case '/':
        return <HomePage />;
      case '/servicios':
        return serviceSlug ? <ServiceDetailPage slug={serviceSlug} /> : <ServicesPage />;
      case '/metodologia':
        return <MethodologyPage />;
      case '/proyectos':
        return <ProjectsPage />;
      case '/sobre-nosotros':
        return <AboutPage />;
      case '/laboratorio':
        return <LabPage />;
      case '/insights':
        return <InsightsPage />;
      case '/faq':
        return <FaqPage />;
      case '/contacto':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:text-xs focus:font-semibold"
      >
        Saltar al contenido principal
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <NeedsProvider>
        <AppRouterView />
      </NeedsProvider>
    </RouterProvider>
  );
}
