import { useEffect, useState } from 'react';
import { WifiOff, X, AlertCircle } from 'lucide-react';
import { isOnline, setupNetworkListeners, handleNetworkError } from '../utils/networkErrorHandler';

interface NetworkErrorToastProps {
  error?: Error | unknown;
  onDismiss?: () => void;
}

export function NetworkErrorToast({ error, onDismiss }: NetworkErrorToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOffline, setIsOffline] = useState(!isOnline());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const networkError = handleNetworkError(error);
      setErrorMessage(networkError.message);
      setIsVisible(true);
    }
  }, [error]);

  useEffect(() => {
    const cleanup = setupNetworkListeners(
      () => {
        setIsOffline(false);
        if (isVisible && !error) {
          setIsVisible(false);
        }
      },
      () => {
        setIsOffline(true);
        setErrorMessage('Connection failed. If the problem persists, please check your internet connection or VPN');
        setIsVisible(true);
      }
    );

    return cleanup;
  }, [isVisible, error]);

  if (!isVisible && !isOffline) {
    return null;
  }

  const displayMessage = errorMessage || 'Connection failed. If the problem persists, please check your internet connection or VPN';

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg shadow-lg p-4 max-w-md mx-4 flex items-start gap-3">
        <div className="flex-shrink-0">
          {isOffline ? (
            <WifiOff className="w-5 h-5 text-red-600 dark:text-red-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            {displayMessage}
          </p>
        </div>
        
        {(onDismiss || error) && (
          <button
            onClick={() => {
              setIsVisible(false);
              onDismiss?.();
            }}
            className="flex-shrink-0 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

