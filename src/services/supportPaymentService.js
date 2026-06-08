import { siteConfig } from '../config/siteConfig.js';

export function getPaypalSupportUrl() {
  if (siteConfig.paypal.supportLink) return siteConfig.paypal.supportLink;

  const { hostedButtonId, currencyCode } = siteConfig.paypal;
  const url = new URL('https://www.paypal.com/donate/');
  url.searchParams.set('hosted_button_id', hostedButtonId);
  url.searchParams.set('currency_code', currencyCode);
  return url.toString();
}

export function getEnabledSupportMethods() {
  return siteConfig.support.methods
    .map((method) => {
      if (method.id === 'paypal') {
        return {
          ...method,
          url: getPaypalSupportUrl(),
          enabled: siteConfig.paypal.enabled
        };
      }

      return method;
    })
    .filter((method) => method.enabled && method.url);
}

export function trackSupportEvent(eventName, detail = {}) {
  if (!eventName) return;

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('qubitel-academy:support', {
        detail: { eventName, ...detail }
      })
    );
  }

  if (import.meta.env.DEV) {
    console.info(`[support] ${eventName}`, detail);
  }
}
