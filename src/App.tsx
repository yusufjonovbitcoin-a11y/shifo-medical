import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Doctors } from './components/Doctors';
import { Appointment } from './components/Appointment';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { NetworkErrorToast } from './components/NetworkErrorToast';
import { setupNetworkListeners, isOnline } from './utils/networkErrorHandler';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [networkError, setNetworkError] = useState<Error | null>(null);

  useEffect(() => {
    // Set up global error handler for unhandled promise rejections (network errors)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;
      if (error && (error.message?.includes('fetch') || error.message?.includes('network') || error.message?.includes('connection'))) {
        setNetworkError(error instanceof Error ? error : new Error(String(error)));
        event.preventDefault(); // Prevent default browser error handling
      }
    };

    // Set up global error handler for general errors
    const handleError = (event: ErrorEvent) => {
      const error = event.error;
      if (error && (error.message?.includes('fetch') || error.message?.includes('network') || error.message?.includes('connection'))) {
        setNetworkError(error instanceof Error ? error : new Error(String(error)));
        event.preventDefault();
      }
    };

    // Set up network status listeners
    const cleanup = setupNetworkListeners(
      () => {
        // Online - clear errors
        setNetworkError(null);
      },
      () => {
        // Offline - show error
        setNetworkError(new Error('Connection failed. If the problem persists, please check your internet connection or VPN'));
      }
    );

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    // Check initial online status
    if (!isOnline()) {
      setNetworkError(new Error('Connection failed. If the problem persists, please check your internet connection or VPN'));
    }

    return () => {
      cleanup();
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
      <Doctors />
      <Appointment />
      <Footer />
      <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      <NetworkErrorToast 
        error={networkError} 
        onDismiss={() => setNetworkError(null)} 
      />
    </div>
  );
}
