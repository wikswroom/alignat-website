'use client';

import Image from 'next/image';
import { useState } from 'react';

// Screenshot data med bildfiler och beskrivningar
const screenshots = [
  {
    src: '/images/Al_scs_huvudmeny.png',
    alt: 'Alignat huvudmeny',
    caption: 'Enkel överblick på dina jobb och funktioner',
  },
  {
    src: '/images/Al_scs_plusMeny.png',
    alt: 'Skapa nytt i Alignat',
    caption: 'Skapa offert, jobb, kunder eller registrera personal',
  },
  {
    src: '/images/Al_scs_NyttJobb1.png',
    alt: 'Lägg till jobb',
    caption: 'Registrera tid, material och tjänster direkt på jobbet',
  },
  {
    src: '/images/Al_scs_ProjSkärm.png',
    alt: 'Projektöversikt',
    caption: 'Se alla aktiva jobb och offerter på ett ställe',
  },
];

export default function ScreenshotCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Se hur det funkar
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Enkelt och intuitivt – från jobb till faktura
          </p>
        </div>

        {/* Desktop: Grid with all screenshots */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 items-start">
          {screenshots.map((screenshot, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="relative w-full aspect-[9/19] mb-4">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
              <p className="text-sm text-center text-gray-600 px-2">
                {screenshot.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="relative">
            {/* Screenshot */}
            <div className="flex justify-center mb-6">
              <div className="relative w-64 aspect-[9/19]">
                <Image
                  src={screenshots[currentIndex].src}
                  alt={screenshots[currentIndex].alt}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Caption */}
            <p className="text-sm text-center text-gray-600 mb-8 px-4">
              {screenshots[currentIndex].caption}
            </p>

            {/* Navigation arrows */}
            <div className="flex justify-center items-center gap-8">
              <button
                onClick={goToPrev}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Föregående bild"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'bg-brand-blue w-6'
                        : 'bg-gray-300'
                    }`}
                    aria-label={`Gå till bild ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Nästa bild"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
