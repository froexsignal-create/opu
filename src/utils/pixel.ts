import { PixelEventLog } from '../types';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const PIXEL_CONFIG_KEY = 'mayer_heshel_pixel_config';
const PIXEL_LOGS_KEY = 'mayer_heshel_pixel_logs';

export function getPixelConfig(): { pixelId: string; isEnabled: boolean } {
  try {
    const saved = localStorage.getItem(PIXEL_CONFIG_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return {
    pixelId: '984120394810293', // Pre-configured demo / ready pixel ID
    isEnabled: true,
  };
}

export function savePixelConfig(config: { pixelId: string; isEnabled: boolean }) {
  try {
    localStorage.setItem(PIXEL_CONFIG_KEY, JSON.stringify(config));
    // Also re-init fbq if valid
    if (window.fbq && config.isEnabled && config.pixelId) {
      window.fbq('init', config.pixelId);
      window.fbq('track', 'PageView');
    }
  } catch (e) {
    console.error(e);
  }
}

export function getPixelLogs(): PixelEventLog[] {
  try {
    const saved = localStorage.getItem(PIXEL_LOGS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

function addPixelLog(eventName: string, data?: Record<string, unknown>) {
  try {
    const logs = getPixelLogs();
    const newLog: PixelEventLog = {
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      eventName,
      timestamp: new Date().toLocaleTimeString('bn-BD', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      data,
    };
    const updated = [newLog, ...logs].slice(0, 50);
    localStorage.setItem(PIXEL_LOGS_KEY, JSON.stringify(updated));
    // Dispatch custom event so UI can react in real-time
    window.dispatchEvent(new CustomEvent('mayer_heshel_pixel_event', { detail: newLog }));
  } catch (e) {
    console.error(e);
  }
}

export function clearPixelLogs() {
  localStorage.removeItem(PIXEL_LOGS_KEY);
  window.dispatchEvent(new CustomEvent('mayer_heshel_pixel_event_clear'));
}

/**
 * Standard Facebook Pixel Events for E-Commerce:
 * - PageView
 * - ViewContent (Product view)
 * - AddToCart (Cart addition)
 * - InitiateCheckout (Checkout opened)
 * - Purchase (Order confirmed)
 */
export function trackPixelEvent(eventName: string, data?: Record<string, unknown>) {
  const config = getPixelConfig();

  // Log locally for user inspection in Admin/Pixel Manager
  addPixelLog(eventName, data);

  // Send to Meta Pixel if enabled and initialized
  if (config.isEnabled && typeof window !== 'undefined' && window.fbq) {
    try {
      if (data) {
        window.fbq('track', eventName, data);
      } else {
        window.fbq('track', eventName);
      }
    } catch (err) {
      console.warn('Meta Pixel dispatch error:', err);
    }
  }
}
