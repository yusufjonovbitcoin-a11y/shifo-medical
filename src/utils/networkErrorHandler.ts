/**
 * Network Error Handler
 * Handles connection failures and displays user-friendly error messages
 */

export interface NetworkError {
  message: string;
  type: 'connection' | 'timeout' | 'server' | 'unknown';
}

/**
 * Checks if the error is a network-related error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('connection') ||
      message.includes('fetch') ||
      message.includes('failed') ||
      message.includes('timeout') ||
      message.includes('err_network') ||
      message.includes('err_internet_disconnected')
    );
  }
  return false;
}

/**
 * Gets a user-friendly error message based on the error type
 */
export function getNetworkErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('timeout') || message.includes('timed out')) {
      return 'Connection timeout. Please check your internet connection and try again.';
    }
    
    if (message.includes('failed to fetch') || message.includes('networkerror')) {
      return 'Connection failed. If the problem persists, please check your internet connection or VPN';
    }
    
    if (message.includes('cors') || message.includes('cross-origin')) {
      return 'Connection blocked. Please check your VPN or network settings.';
    }
    
    if (isNetworkError(error)) {
      return 'Connection failed. If the problem persists, please check your internet connection or VPN';
    }
  }
  
  return 'Connection failed. If the problem persists, please check your internet connection or VPN';
}

/**
 * Handles network errors and returns a standardized error object
 */
export function handleNetworkError(error: unknown): NetworkError {
  const message = getNetworkErrorMessage(error);
  
  let type: NetworkError['type'] = 'unknown';
  if (error instanceof Error) {
    const errorMsg = error.message.toLowerCase();
    if (errorMsg.includes('timeout')) {
      type = 'timeout';
    } else if (errorMsg.includes('server') || errorMsg.includes('500') || errorMsg.includes('502') || errorMsg.includes('503')) {
      type = 'server';
    } else if (isNetworkError(error)) {
      type = 'connection';
    }
  }
  
  return {
    message,
    type
  };
}

/**
 * Checks if the user is online
 */
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine;
}

/**
 * Sets up online/offline event listeners
 */
export function setupNetworkListeners(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
}






