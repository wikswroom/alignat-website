'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function SuccessPage() {
  useEffect(() => {
    // Hämta session_id från URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    // Bygg deep link med session_id
    const deepLink = sessionId 
      ? `alignat://payment/success?session_id=${sessionId}`
      : 'alignat://payment/success';
    
    window.location.href = deepLink;
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <Image
        src="/images/Alignat_logo_nobackground.png"
        alt="Alignat"
        width={80}
        height={80}
        className="mb-8"
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Tack!</h1>
      <p className="text-lg text-gray-600 mb-8">Vi skickar dig tillbaka till appen...</p>
      
      {/* Spinner med Alignat färger */}
      <div className="relative w-12 h-12 mb-12">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-brand-purple border-r-brand-blue border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>

      {/* Fallback länk */}
      <p className="text-sm text-gray-500 text-center max-w-md">
        Om du inte skickas tillbaka automatiskt,{' '}
        <a 
          href="alignat://payment/success" 
          className="text-brand-blue hover:text-brand-purple underline font-medium"
        >
          klicka här för att återvända till appen
        </a>.
      </p>
    </div>
  );
}
