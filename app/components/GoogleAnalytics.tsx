"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import { getConsentStatus } from "./CookieConsent";

const GA_MEASUREMENT_ID = "G-W0XC74GWMK";

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = getConsentStatus();
      if (consent === "accepted") {
        setHasConsent(true);
      }
    };

    checkConsent();

    const handleConsentAccepted = () => {
      setHasConsent(true);
    };

    window.addEventListener("cookie-consent-accepted", handleConsentAccepted);

    return () => {
      window.removeEventListener("cookie-consent-accepted", handleConsentAccepted);
    };
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
