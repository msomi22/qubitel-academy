export const siteConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'Senior Dev Accelerator',
  tagline: import.meta.env.VITE_APP_TAGLINE || 'DSA + System Design mastery for junior and mid-level developers',
  storageKey: import.meta.env.VITE_STORAGE_KEY || 'senior-dev-accelerator:v2',
  support: {
    label: '🚀 Support from $1',
    title: 'Support Senior Dev Accelerator',
    tooltip: 'Help create more learning content'
  },
  paypal: {
    enabled: import.meta.env.VITE_PAYPAL_ENABLED !== 'false',
    hostedButtonId: import.meta.env.VITE_PAYPAL_HOSTED_BUTTON_ID || 'GFP9HAYP9P5NY',
    currencyCode: import.meta.env.VITE_PAYPAL_CURRENCY || 'USD'
  }
};
