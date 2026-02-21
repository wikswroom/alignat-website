"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pinewik.mira";
const APP_STORE_URL = "https://apps.apple.com/se/app/alignat/id6756240394";

export default function AppStoreBadges() {
  const [isMobile, setIsMobile] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  const playStoreQR = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(PLAY_STORE_URL)}&bgcolor=ffffff&color=000000&margin=10`;
  const appStoreQR = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(APP_STORE_URL)}&bgcolor=ffffff&color=000000&margin=10`;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Badges */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Google Play Badge */}
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105 active:scale-95"
        >
          <Image
            src="/images/badges/google-play-badge.svg"
            alt="Ladda ner på Google Play"
            width={200}
            height={60}
            className="h-[60px] w-auto"
            priority
          />
        </a>

        {/* App Store Badge */}
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105 active:scale-95"
        >
          <Image
            src="/images/badges/app-store-badge.svg"
            alt="Ladda ner på App Store"
            width={180}
            height={60}
            className="h-[60px] w-auto"
          />
        </a>
      </div>

      {/* QR-koder för desktop */}
      {!isMobile && (
        <div className="text-center">
          <button
            onClick={() => setShowQR(!showQR)}
            className="text-sm text-gray-500 hover:text-brand-blue transition-colors underline underline-offset-2"
          >
            {showQR ? "Dölj QR-koder" : "Visa QR-koder för mobil"}
          </button>
          
          {showQR && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-8 animate-fadeIn">
              {/* Android QR */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className="text-lg">🤖</span>
                  <span>Android</span>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                  <Image
                    src={playStoreQR}
                    alt="QR-kod för Google Play"
                    width={130}
                    height={130}
                    className="rounded-lg"
                    unoptimized
                  />
                </div>
                <p className="text-xs text-gray-400">Google Play</p>
              </div>

              {/* iPhone QR */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className="text-lg">🍎</span>
                  <span>iPhone</span>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                  <Image
                    src={appStoreQR}
                    alt="QR-kod för App Store"
                    width={130}
                    height={130}
                    className="rounded-lg"
                    unoptimized
                  />
                </div>
                <p className="text-xs text-gray-400">App Store</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
