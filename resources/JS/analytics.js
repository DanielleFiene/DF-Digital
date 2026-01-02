// Google Analytics 4 with Cookie Consent
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID

(function() {
  'use strict';

  // Configuration
  const GA_MEASUREMENT_ID = 'G-372GS80NS3';
  const COOKIE_CONSENT_KEY = 'cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  // Check if user has already given consent
  function getCookieConsent() {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === null) return null;
    return consent === 'true';
  }

  // Save cookie consent
  function setCookieConsent(accepted) {
    localStorage.setItem(COOKIE_CONSENT_KEY, accepted.toString());
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000));
    document.cookie = `${COOKIE_CONSENT_KEY}=${accepted}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  }

  // Initialize Google Analytics
  function initGoogleAnalytics() {
    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      console.warn('Google Analytics: Please set your Measurement ID in analytics.js');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true, // GDPR compliance
      allow_google_signals: false, // Disable Google Signals for privacy
      allow_ad_personalization_signals: false // Disable ad personalization
    });

    window.gtag = gtag;
  }

  // Create cookie consent banner
  function createCookieBanner() {
    const consent = getCookieConsent();
    if (consent !== null) {
      // User has already made a choice
      if (consent) {
        initGoogleAnalytics();
      }
      return;
    }

    // Create banner element
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    
    banner.innerHTML = `
      <div class="cookie-consent-banner__content">
        <div class="cookie-consent-banner__text">
          <h3>Cookie Consent</h3>
          <p>
            We use cookies to analyze website traffic and improve your experience. 
            By clicking "Accept", you consent to our use of analytics cookies. 
            You can change your preferences at any time in our 
            <a href="/privacy.html">Privacy Policy</a>.
          </p>
        </div>
        <div class="cookie-consent-banner__actions">
          <button id="cookie-accept" class="cookie-consent-banner__button cookie-consent-banner__button--accept">
            Accept
          </button>
          <button id="cookie-reject" class="cookie-consent-banner__button cookie-consent-banner__button--reject">
            Reject
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    document.getElementById('cookie-accept').addEventListener('click', function() {
      setCookieConsent(true);
      banner.classList.add('cookie-consent-banner--hidden');
      setTimeout(() => banner.remove(), 300);
      initGoogleAnalytics();
    });

    document.getElementById('cookie-reject').addEventListener('click', function() {
      setCookieConsent(false);
      banner.classList.add('cookie-consent-banner--hidden');
      setTimeout(() => banner.remove(), 300);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createCookieBanner);
  } else {
    createCookieBanner();
  }
})();

