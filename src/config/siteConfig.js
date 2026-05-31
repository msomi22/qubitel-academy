const defaultPaypalSupportLink = 'https://www.paypal.com/ncp/payment/X9PVPTEPKSGS8';
const defaultPaystackSupportLink = 'https://paystack.shop/pay/1lrvz0bahb';

export const siteConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'Senior Dev Accelerator',
  tagline: import.meta.env.VITE_APP_TAGLINE || 'DSA + System Design mastery for junior and mid-level developers',
  storageKey: import.meta.env.VITE_STORAGE_KEY || 'senior-dev-accelerator:v2',
  support: {
    label: '🚀 Support from $1',
    title: 'Support Senior Dev Accelerator',
    tooltip: 'Help create more learning content',
    intro:
      'Help us add more CKAD, Java, DSA, System Design, Backend Engineering, and interview-prep questions faster.',
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
