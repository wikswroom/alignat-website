import Header from "@/app/components/Header";
import Features from "@/app/components/Features";
import Cta from "@/app/components/Cta";
import About from "@/app/components/About";
import Footer from "@/app/components/Footer";
import QualifySection from "@/app/components/QualifySection";
import WorkflowSection from "@/app/components/WorkflowSection";
import PricingSection from "@/app/components/PricingSection";
import FaqSection from "@/app/components/FaqSection";

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
        <div className="flex min-h-[80vh] flex-col items-center justify-center p-8 text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Fakturering och löneunderlag – utan efterarbete.
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-900 font-medium">
              Ett enkelt, appbaserat affärsverktyg för små projektbolag.
            </p>
            <p className="mt-2 text-base text-gray-600">
              Kör parallellt med dina befintliga system. Ingen bindningstid.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#get-started"
                className="rounded-md bg-gradient-to-r from-brand-purple to-brand-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-brand-purple/90 hover:to-brand-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                Kom igång – 14 dagar utan risk
              </a>
            </div>
          </div>
        </div>
      </main>
      <QualifySection />
      <WorkflowSection />
      <PricingSection />
      <Features />
      <FaqSection />
      <Cta />
      <About />
      <Footer />
    </div>
  );
}
