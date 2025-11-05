import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Legal - Användarvillkor & Integritetspolicy | Alignat",
  description: "Användarvillkor, integritetspolicy och kontaktinformation för Alignat.",
};

export default function LegalPage() {
  return (
    <div className="bg-white">
      <Header />
      
      <main className="relative isolate pt-20">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Legal Information
            </h1>
            <p className="text-lg text-gray-600">
              Användarvillkor, integritetspolicy och kontaktinformation
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Innehåll</h2>
            <ul className="space-y-2">
              <li>
                <a href="#terms" className="text-brand-blue hover:text-brand-purple underline">
                  Användarvillkor
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-brand-blue hover:text-brand-purple underline">
                  Integritetspolicy (GDPR)
                </a>
              </li>
              <li>
                <a href="#contact" className="text-brand-blue hover:text-brand-purple underline">
                  Kontakt
                </a>
              </li>
            </ul>
          </nav>

          {/* Användarvillkor Section */}
          <section id="terms" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Användarvillkor
              </h2>
              
              <p className="text-gray-700 mb-6">
                Välkommen till Alignat! Genom att skapa ett konto och använda våra tjänster (&quot;Tjänsten&quot;) godkänner du dessa användarvillkor.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Tjänsten
              </h3>
              <p className="text-gray-700 mb-4">
                Tjänsten tillhandahålls som en prenumerationstjänst. Specifika detaljer om prissättning och funktioner presenteras vid köptillfället och i ditt konto.
              </p>
              <p className="text-gray-700 mb-6">
                Vi förbehåller oss rätten att ändra våra prenumerationsavgifter. Prisändringar meddelas minst 30 dagar i förväg. Fortsatt användning av Tjänsten efter att en prisändring trätt i kraft innebär ett godkännande av de nya avgifterna. Om du inte godkänner ändringen har du rätt att avsluta din prenumeration innan den börjar gälla.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Ditt Ansvar för Ekonomi och Redovisning
              </h3>
              <p className="text-gray-700 font-bold mb-4">
                Alignat är ett verktyg designat för att underlätta din administration. Du som användare är alltid ensamt och fullt ansvarig för att all information du matar in, samt de underlag (såsom fakturor, offerter och rapporter) du skapar i appen, är korrekta och följer gällande lagar och regler för bokföring, skatt och redovisning.
              </p>
              <p className="text-gray-700 mb-6">
                Vi, utvecklarna av Alignat, tar inget juridiskt eller ekonomiskt ansvar för hur du använder den data du producerar, och vi kan inte hållas ansvariga för eventuella felaktigheter, uteblivna intäkter eller juridiska påföljder som uppstår till följd av din användning av Tjänsten.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Tillgänglighet och Ansvarsbegränsning
              </h3>
              <p className="text-gray-700 mb-4">
                Tjänsten tillhandahålls &quot;i befintligt skick&quot;. Vi strävar efter högsta möjliga tillgänglighet men kan inte garantera att Tjänsten alltid kommer vara oavbruten eller fri från fel. Vi ansvarar inte för eventuella förluster som uppstår till följd av driftstopp eller tekniska fel.
              </p>
              <p className="text-gray-700 mb-6">
                I den fulla utsträckning som lagen tillåter, ska vårt totala ekonomiska ansvar gentemot dig för alla anspråk som uppstår vara begränsat till det totala belopp du betalat till oss för Tjänsten under de tolv (12) månader som föregår händelsen som gav upphov till anspråket.
              </p>
            </div>
          </section>

          {/* Integritetspolicy Section */}
          <section id="privacy" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Integritetspolicy (GDPR)
              </h2>
              
              <p className="text-gray-700 mb-6">
                Vi värnar om din integritet och hanterar dina personuppgifter i enlighet med Dataskyddsförordningen (GDPR).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Vilken data samlar vi in och varför?
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="text-gray-700 pl-4">
                  • <span className="font-bold">Dina kontouppgifter:</span> Din e-postadress används för inloggning och kommunikation gällande ditt konto.
                </li>
                <li className="text-gray-700 pl-4">
                  • <span className="font-bold">Din företags- och kunddata:</span> All information du matar in om ditt företag, dina anställda, dina kunder och dina projekt sparas för att appens kärnfunktioner ska fungera. Denna data är din egendom.
                </li>
              </ul>
              <p className="text-gray-700 mb-6">
                Vi samlar endast in den data som är absolut nödvändig för Tjänstens funktion. Vi kommer aldrig att sälja din data till tredje part.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Dina rättigheter
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="text-gray-700 pl-4">
                  • <span className="font-bold">Rätt till tillgång:</span> Du har rätt att begära ett utdrag av all data vi har sparat om dig.
                </li>
                <li className="text-gray-700 pl-4">
                  • <span className="font-bold">Rätt till radering:</span> Du har rätt att få all din data permanent borttagen (&quot;rätten att bli glömd&quot;) genom att radera ditt konto via appens inställningar.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Datasäkerhet
              </h3>
              <p className="text-gray-700 mb-6">
                Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina uppgifter mot förlust och obehörig åtkomst. Din data lagras säkert via Googles molntjänster (Firebase).
              </p>
            </div>
          </section>

          {/* Kontakt Section */}
          <section id="contact" className="mb-16 scroll-mt-24">
            <div className="bg-gradient-to-r from-brand-purple/5 to-brand-blue/5 rounded-lg border border-brand-blue/20 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Kontakt
              </h2>
              
              <p className="text-gray-700 mb-4">
                Har du frågor om dessa villkor eller vår hantering av personuppgifter?
              </p>
              <p className="text-gray-700 mb-6">
                Kontakta oss på:{' '}
                <a 
                  href="mailto:support@alignat.se" 
                  className="text-brand-blue hover:text-brand-purple font-semibold underline"
                >
                  support@alignat.se
                </a>
              </p>

              <div className="border-t border-gray-300 pt-6 mt-6">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Pinewik AB</span><br />
                  Organisationsnummer: 559160-1264
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

