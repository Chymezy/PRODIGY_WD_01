import React, { Suspense, lazy, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { DarkModeProvider } from './contexts/DarkModeContext'
import './index.css'
import BackToTop from './components/BackToTop'
import ErrorBoundary from './components/ErrorBoundary'
import { initGA, logPageView } from './services/analytics'

const LandingPage = lazy(() => import('./components/LandingPage'))

const App: React.FC = () => {
  useEffect(() => {
    initGA('YOUR_GA_TRACKING_ID'); // Replace with your actual GA tracking ID
    logPageView();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <DarkModeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
          <Navbar />
          <ErrorBoundary>
            <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
              <main className="flex-grow">
                <LandingPage />
              </main>
            </Suspense>
          </ErrorBoundary>
          <Footer />
          <BackToTop />
        </div>
      </DarkModeProvider>
    </I18nextProvider>
  )
}

export default App
