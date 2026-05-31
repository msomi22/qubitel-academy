import { siteConfig } from '../config/siteConfig.js';

function paypalUrl() {
  const { hostedButtonId, currencyCode } = siteConfig.paypal;
  const url = new URL('https://www.paypal.com/donate/');
  url.searchParams.set('hosted_button_id', hostedButtonId);
  url.searchParams.set('currency_code', currencyCode);
  return url.toString();
}

export default function SupportButton({ className = 'support-link' }) {
  if (!siteConfig.paypal.enabled) return null;

  const { label, title, tooltip } = siteConfig.support;

  return (
    <a
      href={paypalUrl()}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={title}
      title={tooltip}
    >
      {label}
    </a>
  );
}
