import Header from "@/app/components/Header";
import Features from "@/app/components/Features";
import Cta from "@/app/components/Cta";
import About from "@/app/components/About";
import Footer from "@/app/components/Footer";
import QualifySection from "@/app/components/QualifySection";
import WorkflowSection from "@/app/components/WorkflowSection";
import PricingSection from "@/app/components/PricingSection";
import FaqSection from "@/app/components/FaqSection";
import ScreenshotCarousel from "@/app/components/ScreenshotCarousel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <main className="relative isolate">
        {/* Background gradient */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#A067CF] to-[#3886D4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        {/* Hero Section with Login Screenshot */}
        <div className="mx-auto max-w-7xl px-4 lg:px-8 pt-28 pb-16 sm:pt-36 lg:pt-24 sm:pb-24">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-12 lg:items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <p className="text-base font-semibold text-gray-600 mb-12">
                Steget mellan anteckningsbok och affärssystem
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Slipp jaga underlag till fakturor och lön
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Samla jobb, anteckningar och personalhändelser direkt i mobilen.
                <span className="block mt-1">När jobbet är klart är fakturan redan redo.</span>
              </p>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                <a
                  href="#get-started"
                  className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800"
                >
                  Kom igång – 14 dagar utan risk
                </a>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="text-green-600">✓</span> Ingen bindningstid
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-green-600">✓</span> Testa gratis utan betalkort
                </span>
              </div>
            </div>

            {/* Login Screenshot */}
            <div className="flex justify-center lg:justify-end w-full">
              {/* Mobil: 230px, Desktop: 280px */}
              <div className="relative w-[230px] lg:w-[280px]">
                  <Image
                    src="/images/Al_scs_inlogg.png?v=8"
                    alt="Alignat inloggningsskärm"
                    width={800}
                    height={1600}
                    className="object-contain drop-shadow-2xl w-full h-auto"
                    priority
                    unoptimized
                  />
              </div>
            </div>
          </div>
        </div>
      </main>
      <QualifySection />
      <WorkflowSection />
      <PricingSection />
      <Features />
      <ScreenshotCarousel />
      <FaqSection />
      <Cta />
      <About />
      <Footer />
    </div>
  );
}
