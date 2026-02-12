"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pinewik.mira";

export default function AppStoreBadges() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const android = /android/i.test(userAgent);
    
    setIsMobile(mobile);
    setIsAndroid(android);
  }, []);

  // QR-kod genereras via API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(PLAY_STORE_URL)}&bgcolor=ffffff&color=000000&margin=10`;

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
            alt="Ladda ned på Google Play"
            width={200}
            height={60}
            className="h-[60px] w-auto"
            priority
          />
        </a>

        {/* App Store Badge - Coming Soon */}
        <div className="relative cursor-default opacity-60">
          <Image
            src="/images/badges/app-store-badge.svg"
            alt="App Store - Kommer snart"
            width={180}
            height={60}
            className="h-[60px] w-auto"
          />
        </div>
      </div>

      {/* QR-kod för desktop */}
      {!isMobile && (
        <div className="text-center">
          <button
            onClick={() => setShowQR(!showQR)}
            className="text-sm text-gray-500 hover:text-brand-blue transition-colors underline underline-offset-2"
          >
            {showQR ? "Dölj QR-kod" : "Visa QR-kod för Google Play"}
          </button>
          
          {showQR && (
            <div className="mt-4 flex flex-col items-center gap-2 animate-fadeIn">
              <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                <Image
                  src={qrCodeUrl}
                  alt="Skanna för att ladda ned Alignat"
                  width={150}
                  height={150}
                  className="rounded-lg"
                  unoptimized
                />
              </div>
              <p className="text-xs text-gray-400">
                Skanna med din Android för att ladda ner
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mobilspecifikt meddelande för iOS */}
      {isMobile && !isAndroid && (
        <p className="text-sm text-gray-500 text-center max-w-xs">
          🍎 iOS-appen är på väg! Lämna din e-post nedan för att få reda på när den lanseras.
        </p>
      )}
    </div>
  );
}
