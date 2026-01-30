import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/routing';

// Helper function to check if value is a plain object
const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item) && item.constructor === Object;
};

// Deep merge function that merges fallback messages with locale messages
const deepMerge = (target: any, source: any): any => {
  if (!isObject(target) || !isObject(source)) {
    return source || target;
  }

  const output = { ...target };
  
  Object.keys(source).forEach(key => {
    if (isObject(source[key])) {
      if (!(key in target) || !isObject(target[key])) {
        output[key] = { ...source[key] };
      } else {
        output[key] = deepMerge(target[key], source[key]);
      }
    } else {
      // Override with source value (locale messages take precedence)
      output[key] = source[key];
    }
  });

  return output;
};

// Helper to get nested value from object by path
const getNestedValue = (obj: any, path: string): any => {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') {
      return undefined;
    }
    current = current[key];
  }
  return current;
};

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is derived from the URL (via middleware)
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  // Load locale messages
  let messages = {};
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (e) {
    console.error(`[next-intl] Failed to load messages for locale: ${locale}`, e);
    // Fallback to default locale if current locale fails
    try {
      messages = (await import(`../messages/${routing.defaultLocale}.json`)).default;
      locale = routing.defaultLocale;
    } catch (fallbackError) {
      console.error(`[next-intl] Failed to load fallback messages`, fallbackError);
    }
  }
  
  // Load fallback messages (uz) for missing keys
  let fallbackMessages = {};
  if (locale !== 'uz') {
    try {
      fallbackMessages = (await import(`../messages/uz.json`)).default;
    } catch (e) {
      // Fallback file doesn't exist, continue without it
      if (process.env.NODE_ENV === 'development') {
        console.warn('[next-intl] Fallback messages (uz.json) not found');
      }
    }
  }

  // Deep merge messages: fallback as base, then override with locale messages
  const mergedMessages = deepMerge(fallbackMessages, messages);

  return {
    locale,
    messages: mergedMessages,
    // Set an explicit timezone to avoid extra lookups
    timeZone: 'Asia/Tashkent',
    // Enhanced fallback mechanism
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join('.');
      
      // Try to get value from fallback messages if available
      if (fallbackMessages && path) {
        const fallbackValue = getNestedValue(fallbackMessages, path);
        if (fallbackValue !== undefined) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[next-intl] Using fallback for missing key: ${path}`);
          }
          return fallbackValue;
        }
      }
      
      // In development, log the missing key
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[next-intl] Missing translation key: ${path}`);
      }
      
      // Return the key path as last resort (prevents crashes)
      return path;
    },
    // Suppress errors for missing translations
    onError(error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[next-intl] Translation error:', error);
      }
      // Don't throw, prevent crashes
      return;
    }
  };
});













