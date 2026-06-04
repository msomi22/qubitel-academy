import { getActiveAcademy } from './detectAcademy.ts';

const defaultPaypalSupportLink = 'https://www.paypal.com/ncp/payment/X9PVPTEPKSGS8';
const defaultPaystackSupportLink = 'https://paystack.shop/pay/1lrvz0bahb';
const activeAcademy = getActiveAcademy();
const academyBrandAssets = {
  tech: {
    logoLight: '/brand-logo-light.svg',
    logoDark: '/brand-logo-dark.svg'
  },
  cbc: {
    logoLight: '/academy-logos/cbc-logo-light.svg',
    logoDark: '/academy-logos/cbc-logo-dark.svg'
  },
  'customer-experience': {
    logoLight: '/academy-logos/cx-logo-light.svg',
    logoDark: '/academy-logos/cx-logo-dark.svg'
  }
};
const activeBrandAssets = academyBrandAssets[activeAcademy.id] || academyBrandAssets.tech;

export const siteConfig = {
  academyId: activeAcademy.id,
  academyName: activeAcademy.displayName,
  appName: import.meta.env.VITE_APP_NAME || activeAcademy.productName,
  tagline: import.meta.env.VITE_APP_TAGLINE || 'Focused learning and practice for every academy',
  storageKey: import.meta.env.VITE_STORAGE_KEY || activeAcademy.storageKey,
  brand: activeBrandAssets,
  support: {
    label: '🚀 Support from $1',
    title: `Support ${activeAcademy.productName}`,
    tooltip: 'Help create more learning content',
    intro:
      'Help us create more focused lessons, practice activities, assessments, and professional learning content.',
    methods: [
      {
        id: 'paypal',
        label: 'PayPal',
        description: 'Support globally using PayPal or card where available.',
        type: 'external',
        enabled: true
      },
      {
        id: 'paystack',
        label: 'Card / Mobile Money',
        description: 'Support using card, bank, or mobile money through Paystack where available.',
        type: 'external',
        url: import.meta.env.VITE_PAYSTACK_SUPPORT_LINK || defaultPaystackSupportLink,
        enabled: Boolean(import.meta.env.VITE_PAYSTACK_SUPPORT_LINK || defaultPaystackSupportLink)
      }
    ]
  },
  paypal: {
    enabled: import.meta.env.VITE_PAYPAL_ENABLED !== 'false',
    supportLink: import.meta.env.VITE_PAYPAL_SUPPORT_LINK || defaultPaypalSupportLink,
    hostedButtonId: import.meta.env.VITE_PAYPAL_HOSTED_BUTTON_ID || 'GFP9HAYP9P5NY',
    currencyCode: import.meta.env.VITE_PAYPAL_CURRENCY || 'USD'
  }
};
