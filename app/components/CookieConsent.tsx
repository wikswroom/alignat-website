"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "alignat_cookie_consent";

export type ConsentStatus = "accepted" | "declined" | null;

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "accepted" || stored === "declined") return stored;
  return null;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const consent = getConsentStatus();
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleChoice = (choice: "accepted" | "declined") => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem(CONSENT_KEY, choice);
      setShowBanner(false);
      
      if (choice === "accepted") {
        window.dispatchEvent(new Event("cookie-consent-accepted"));
      }
    }, 200);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-200 ${
        isClosing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Vi använder cookies
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Vi använder cookies för att analysera trafik och förbättra din upplevelse. 
              Dina data delas inte med tredje part för annonsering.{" "}
              <Link 
                href="/legal#privacy" 
                className="text-brand-blue hover:underline"
              >
                Läs mer i vår integritetspolicy
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleChoice("declined")}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                Neka
              </button>
              <button
                onClick={() => handleChoice("accepted")}
                className="px-5 py-2.5 text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue/90 rounded-full transition-colors"
              >
                Acceptera
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
