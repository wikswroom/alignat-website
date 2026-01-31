'use client';

import Image from 'next/image';
import { useState } from 'react';

// Screenshot data med bildfiler och beskrivningar
const screenshots = [
  {
    src: '/images/Al_scs_huvudmeny2.png',
    alt: 'Alignat huvudmeny',
    caption: 'Hemskärm med inställningar, sök och meny',
  },
  {
    src: '/images/Al_scs_plusMeny2.png',
    alt: 'Plusmeny',
    caption: 'Plusmeny för snabbt skapande av innehåll',
  },
  {
    src: '/images/Al_scs_NyttJobb1_2.png',
    alt: 'Skapa nytt jobb',
    caption: 'Skapa nytt jobb eller arbetsorder',
  },
  {
    src: '/images/Al_scs_HanteraMeny2.png',
    alt: 'Hantera menyn',
    caption: 'Hanteramenyn ger snabb åtkomst till alla funktioner',
  },
  {
    src: '/images/Al_scs_ProjSkärm2.png',
    alt: 'Projektöversikt',
    caption: 'Tydlig kronologisk översikt på alla jobb',
  },
  {
    src: '/images/Al_scs_Fakturering2.png',
    alt: 'Fakturering',
    caption: 'Fakturera snabbt, jobb och arbetsordrar kan samfaktureras',
  },
];

export default function ScreenshotCarousel() {
  // Separat state för mobil och desktop för att undvika konflikter
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);

  // --- Mobil Navigation (1 bild i taget) ---
  const nextMobile = () => {
    setMobileIndex((prev) => (prev + 1) % screenshots.length);
  };
  const prevMobile = () => {
    setMobileIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  // --- Desktop Navigation (Parvis, 2 bilder i taget) ---
  // Vi har 6 bilder, så det blir 3 "sidor" (0, 1, 2)
  const desktopPages = Math.ceil(screenshots.length / 2);
  
  const nextDesktop = () => {
    setDesktopIndex((prev) => (prev + 1) % desktopPages);
  };
  const prevDesktop = () => {
    setDesktopIndex((prev) => (prev - 1 + desktopPages) % desktopPages);
  };

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Se Alignat i praktiken
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Enkelt och intuitivt – från jobb till faktura
          </p>
        </div>

        {/* --- DESKTOP VIEW (Visa parvis) --- */}
        <div className="hidden md:block">
          <div className="relative">
             {/* Bilder Container */}
             <div className="flex justify-center gap-12 mb-8">
                {/* Vi renderar 2 bilder baserat på desktopIndex */}
                {[0, 1].map((offset) => {
                    const imgIndex = desktopIndex * 2 + offset;
                    // Om vi inte har en bild (udda antal), rendera tomt
                    if (imgIndex >= screenshots.length) return <div key={offset} className="w-[280px]" />;
                    
                    const screenshot = screenshots[imgIndex];
                    return (
                        <div key={imgIndex} className="flex flex-col items-center w-[280px]">
                            <div className="relative w-full">
                                <Image
                                  src={screenshot.src}
                                  alt={screenshot.alt}
                                  width={800}
                                  height={1600}
                                  className="object-contain drop-shadow-2xl w-full h-auto"
                                  unoptimized
                                />
                            </div>
                            <p className="text-sm text-center text-gray-600 mt-6 min-h-[40px] font-medium">
                                {screenshot.caption}
                            </p>
                        </div>
                    );
                })}
             </div>

             {/* Desktop Controls */}
             <div className="flex justify-center items-center gap-8 mt-12">
                <button onClick={prevDesktop} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Föregående">
                     <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                 
                 {/* Dots för sidor */}
                 <div className="flex gap-2">
                   {Array.from({ length: desktopPages }).map((_, idx) => (
                     <button
                       key={idx}
                       onClick={() => setDesktopIndex(idx)}
                       className={`h-2 rounded-full transition-all duration-300 ${
                         idx === desktopIndex ? 'bg-brand-blue w-8' : 'bg-gray-300 w-2'
                       }`}
                       aria-label={`Gå till sida ${idx + 1}`}
                     />
                   ))}
                 </div>

                <button onClick={nextDesktop} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Nästa">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
             </div>
          </div>
        </div>

        {/* --- MOBILE VIEW (Visa 1 åt gången) --- */}
        <div className="md:hidden">
          <div className="relative">
            {/* Bild */}
            <div className="flex justify-center mb-6">
              <div className="relative w-56">
                <Image
                  src={screenshots[mobileIndex].src}
                  alt={screenshots[mobileIndex].alt}
                  width={800}
                  height={1600}
                  className="object-contain drop-shadow-2xl w-full h-auto"
                  unoptimized
                />
              </div>
            </div>

            {/* Caption */}
            <p className="text-sm text-center text-gray-600 mb-8 px-4 min-h-[40px] font-medium">
              {screenshots[mobileIndex].caption}
            </p>

            {/* Mobile Controls */}
            <div className="flex justify-center items-center gap-8">
              <button
                onClick={prevMobile}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Föregående bild"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMobileIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === mobileIndex ? 'bg-brand-blue w-6' : 'bg-gray-300 w-2'
                    }`}
                    aria-label={`Gå till bild ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextMobile}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Nästa bild"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
