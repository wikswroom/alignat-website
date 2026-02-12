import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Juridiska villkor – Användarvillkor, Integritetspolicy & PUB-avtal | Alignat",
  description: "Användarvillkor, integritetspolicy (GDPR) och personuppgiftsbiträdesavtal för Alignat. Senast uppdaterad 2026-02-08.",
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
              Juridiska villkor
            </h1>
            <p className="text-lg text-gray-600">
              Användarvillkor, integritetspolicy och personuppgiftsbiträdesavtal
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Version: 2026-02-08
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
                <a href="#dpa" className="text-brand-blue hover:text-brand-purple underline">
                  Personuppgiftsbiträdesavtal (PUB-avtal / DPA)
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
                Användarvillkor – Alignat
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                1. Parter och tillämpning
              </h3>
              <p className="text-gray-700 mb-4">
                Dessa användarvillkor (&quot;Villkoren&quot;) gäller mellan Pinewik AB, org.nr 559160-1264, (&quot;Pinewik&quot;, &quot;vi&quot;) och den juridiska person eller enskilda näringsidkare (&quot;Kunden&quot;) som registrerar konto och använder tjänsten Alignat (&quot;Tjänsten&quot;).
              </p>
              <p className="text-gray-700 mb-4">
                Tjänsten är avsedd för näringsidkare och företag, inklusive enskilda näringsidkare. Tjänsten är inte avsedd för privat bruk eller konsumentändamål.
              </p>
              <p className="text-gray-700 mb-6">
                Genom att skapa konto intygar användaren att denne har behörighet att ingå avtal för Kundens räkning.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                2. Tjänstens karaktär och begränsningar
              </h3>
              <p className="text-gray-700 mb-4">
                Alignat är ett administrativt stödverktyg för strukturering av projekt, personal, kunder, tidrapportering, fakturering och rapportunderlag.
              </p>
              <p className="text-gray-700 mb-6">
                Alignat tillhandahåller inte juridisk, skattemässig, redovisningsmässig eller annan professionell rådgivning.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                3. Ansvar för fakturor, offerter och rapporter
              </h3>
              <p className="text-gray-700 mb-4">
                Fakturor, offerter, prisförslag, rapporter, exporter, sammanställningar och andra underlag som skapas i Tjänsten tillhandahålls som administrativa hjälpmedel och kan innehålla fel, brister eller ofullständigheter.
              </p>
              <p className="text-gray-700 mb-4">
                Kunden ansvarar för att själv kontrollera, verifiera och godkänna allt underlag innan det:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 pl-4">
                <li>skickas till kunder eller motparter</li>
                <li>används för bokföring eller lönehantering</li>
                <li>används för myndighetsrapportering eller skattedeklaration</li>
                <li>ligger till grund för ekonomiska beslut</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Pinewik ansvarar inte för felaktiga belopp, felberäknade summor, moms- eller skattefel, eller andra felaktigheter i underlag som genererats via Tjänsten.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                4. Kundens ansvar
              </h3>
              <p className="text-gray-700 mb-4">
                Kunden ansvarar för:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 pl-4">
                <li>riktigheten i all information som matas in i Tjänsten</li>
                <li>att användningen av Tjänsten sker i enlighet med tillämplig lag</li>
                <li>att nödvändiga interna kontroller genomförs innan data används externt</li>
                <li>att uppgifter om anställda, kunder och projekt hanteras korrekt</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Pinewik ansvarar inte för beslut eller åtgärder som Kunden vidtar baserat på information från Tjänsten.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                5. Tillgänglighet och förändringar
              </h3>
              <p className="text-gray-700 mb-4">
                Tjänsten tillhandahålls &quot;i befintligt skick&quot;. Pinewik eftersträvar hög tillgänglighet men garanterar inte att Tjänsten är felfri eller oavbruten.
              </p>
              <p className="text-gray-700 mb-4">
                Pinewik har rätt att uppdatera, ändra, förbättra eller tillfälligt stänga Tjänsten, helt eller delvis, exempelvis för underhåll eller vidareutveckling.
              </p>
              <p className="text-gray-700 mb-6">
                Pinewik ansvarar inte för avbrott eller förluster som beror på omständigheter utanför Pinewiks kontroll, inklusive men inte begränsat till driftstörningar hos tredjepartsleverantörer (t.ex. Google Firebase, Apple, Stripe).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                6. Avgifter och betalning
              </h3>
              <p className="text-gray-700 mb-6">
                Avgifter och abonnemangsnivåer framgår vid köptillfället. Prisändringar meddelas minst 30 dagar i förväg. Kunden har rätt att säga upp abonnemanget innan nya priser träder i kraft.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                7. Avstängning och uppsägning
              </h3>
              <p className="text-gray-700 mb-4">
                Pinewik har rätt att tillfälligt eller permanent stänga av Kundens konto vid:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 pl-4">
                <li>brott mot Villkoren</li>
                <li>försök att kringgå betalningsmodell</li>
                <li>missbruk av Tjänsten</li>
                <li>lämnande av oriktiga uppgifter</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Kunden ansvarar själv för att säkerhetskopiera sin data före uppsägning.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                8. Ansvarsbegränsning
              </h3>
              <p className="text-gray-700 mb-4">
                I den fulla utsträckning som lagen tillåter ansvarar Pinewik inte för:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 pl-4">
                <li>indirekta skador</li>
                <li>utebliven vinst</li>
                <li>förlorade affärsmöjligheter</li>
                <li>följdskador</li>
                <li>felaktiga utbetalningar, felaktig bokföring eller felaktig fakturering som uppstår genom användning av Tjänsten</li>
                <li>skador som uppstår till följd av fel i fakturor, offerter, rapporter, exporter eller andra underlag från Tjänsten</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Pinewiks sammanlagda ekonomiska ansvar för samtliga krav under en tolvmånadersperiod är begränsat till det belopp Kunden faktiskt betalat till Pinewik under de tolv (12) månader som föregår den skadegörande händelsen.
              </p>
              <p className="text-gray-700 mb-6">
                Ansvarsbegränsningen gäller inte vid uppsåt eller grov vårdslöshet.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                9. Ändringar av Villkoren
              </h3>
              <p className="text-gray-700 mb-6">
                Pinewik förbehåller sig rätten att uppdatera Villkoren. Vid väsentliga ändringar krävs nytt aktivt godkännande för fortsatt användning av Tjänsten.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                10. Tillämplig lag och tvist
              </h3>
              <p className="text-gray-700">
                Svensk rätt ska tillämpas. Tvist ska avgöras av svensk allmän domstol med Stockholms tingsrätt som första instans.
              </p>
            </div>
          </section>

          {/* Integritetspolicy Section */}
          <section id="privacy" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Integritetspolicy – Alignat (GDPR)
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                1. Personuppgiftsansvarig och personuppgiftsbiträde
              </h3>
              <p className="text-gray-700 mb-4">
                Pinewik AB, org.nr 559160-1264, är personuppgiftsbiträde för de personuppgifter som behandlas i Tjänsten Alignat på uppdrag av Kundföretag (personuppgiftsansvarig).
              </p>
              <p className="text-gray-700 mb-6">
                För kontouppgifter (inloggning etc.) är Pinewik AB personuppgiftsansvarig.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                2. Vilka personuppgifter behandlas?
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="text-gray-700">
                  <span className="font-semibold">Kontouppgifter:</span> E-postadress, lösenord (krypterat), inloggningshistorik
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Företagsuppgifter:</span> Företagsnamn, organisationsnummer, adress, kontaktuppgifter
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Anställdas uppgifter:</span> Namn, kontaktuppgifter, arbetstider, närvaro/frånvaro (inkl. sjuk/VAB)
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Kundregister:</span> Kunders namn, kontaktuppgifter, projektinformation
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Fakturadata:</span> Fakturanummer, belopp, mottagare, betalningsuppgifter
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                3. Ändamål och rättslig grund
              </h3>
              <ul className="space-y-2 mb-6">
                <li className="text-gray-700">
                  <span className="font-semibold">Tillhandahålla Tjänstens funktioner:</span> Fullgörande av avtal
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Hantera prenumeration och betalning:</span> Fullgörande av avtal
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Skicka driftsrelaterade meddelanden:</span> Berättigat intresse
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Felsökning och förbättring:</span> Berättigat intresse
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                4. Lagringstid
              </h3>
              <ul className="space-y-2 mb-6">
                <li className="text-gray-700">
                  <span className="font-semibold">Kontodata:</span> Så länge kontot är aktivt + 30 dagar efter avslut (för backup och teknisk återställning)
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Företags- och kunddata:</span> Så länge kontot är aktivt. Raderas vid kontoborttagning.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Betalningsdata:</span> Hanteras av Stripe/Apple. Pinewik lagrar inte kortnummer.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                5. Underbiträden
              </h3>
              <p className="text-gray-700 mb-4">
                Pinewik använder följande underleverantörer som kan behandla personuppgifter:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-gray-700">
                  <span className="font-semibold">Google Firebase</span> (Firestore, Auth, Functions) – Datalagring, autentisering, serverlogik – EU (europe-west1)
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Stripe</span> – Betalningshantering – EU/USA (standardavtalsklausuler)
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Apple (App Store)</span> – Betalning via Apple IAP – EU/USA (standardavtalsklausuler)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                6. Överföring utanför EU/EES
              </h3>
              <p className="text-gray-700 mb-6">
                Vid överföring till tredje land används tillämpliga skyddsmekanismer enligt GDPR, såsom EU-kommissionens standardavtalsklausuler (SCC).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                7. Registrerades rättigheter
              </h3>
              <p className="text-gray-700 mb-4">
                Den registrerade har rätt till:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="text-gray-700">
                  <span className="font-semibold">Tillgång</span> – begära utdrag av sparade uppgifter
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Rättelse</span> – korrigera felaktiga uppgifter
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Radering</span> – &quot;rätten att bli glömd&quot; via kontoradering i appen
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Begränsning</span> – begränsa behandlingen under utredning
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Dataportabilitet</span> – få ut data i maskinläsbart format
                </li>
              </ul>
              <p className="text-gray-700 mb-6">
                Begäran hanteras inom 30 dagar. Kontakta: support@alignat.se
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                8. Säkerhetsåtgärder
              </h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1 pl-4">
                <li>HTTPS för all kommunikation</li>
                <li>Krypterad datalagring via Google Firebase</li>
                <li>Åtkomstkontroll via rollbaserad behörighet (superadmin/admin/anställd)</li>
                <li>Regelbundna säkerhetskopior</li>
                <li>Loggning av kritiska förändringar</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                9. Personuppgiftsincident
              </h3>
              <p className="text-gray-700 mb-6">
                Vid personuppgiftsincident informeras berörda Kunder utan onödigt dröjsmål och senast inom 72 timmar.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                10. Kontakt
              </h3>
              <p className="text-gray-700 mb-2">
                Dataskyddsfrågor: <a href="mailto:support@alignat.se" className="text-brand-blue hover:underline">support@alignat.se</a>
              </p>
              <p className="text-gray-700">
                Pinewik AB, Smörgatan 102, 412 76 Göteborg
              </p>
            </div>
          </section>

          {/* PUB-avtal Section */}
          <section id="dpa" className="mb-16 scroll-mt-24">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Personuppgiftsbiträdesavtal (PUB-avtal / DPA)
              </h2>
              <p className="text-gray-700 mb-6">
                Detta avtal gäller mellan Kundföretaget (Personuppgiftsansvarig) och Pinewik AB, org.nr 559160-1264 (Personuppgiftsbiträde), avseende behandling av personuppgifter i tjänsten Alignat.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                1. Ändamål och omfattning
              </h3>
              <p className="text-gray-700 mb-4">
                Pinewik behandlar personuppgifter i Alignat uteslutande i syfte att tillhandahålla Tjänsten enligt gällande Användarvillkor. Behandlingen omfattar:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1 pl-4">
                <li>Lagring och visning av Kundens anställdas uppgifter</li>
                <li>Generering av rapporter, fakturor och underlag</li>
                <li>Tidrapportering och närvarohantering</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                2. Kategorier av personuppgifter
              </h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1 pl-4">
                <li>Namn och kontaktuppgifter</li>
                <li>Arbetstider och närvaro/frånvaro</li>
                <li>Sjukfrånvaro och VAB (känsliga uppgifter)</li>
                <li>Kundregister och projektuppgifter</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                3. Instruktioner
              </h3>
              <p className="text-gray-700 mb-6">
                Pinewik behandlar personuppgifter endast enligt Kundens dokumenterade instruktioner, vilka primärt utgörs av Kundens användning av Tjänstens funktioner.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                4. Konfidentialitet
              </h3>
              <p className="text-gray-700 mb-6">
                Pinewik säkerställer att personer med behörighet att behandla personuppgifterna har åtagit sig att iaktta konfidentialitet.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                5. Säkerhetsåtgärder
              </h3>
              <p className="text-gray-700 mb-4">
                Pinewik vidtar lämpliga tekniska och organisatoriska säkerhetsåtgärder, inklusive:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1 pl-4">
                <li>Krypterad lagring och överföring</li>
                <li>Rollbaserad åtkomstkontroll</li>
                <li>Regelbundna säkerhetskopior</li>
                <li>Loggning av dataåtkomst</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                6. Underbiträden
              </h3>
              <p className="text-gray-700 mb-6">
                Pinewik har rätt att anlita underbiträden (se Integritetspolicy, avsnitt 5). Kunden informeras vid väsentliga förändringar av underbiträden.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                7. Personuppgiftsincidenter
              </h3>
              <p className="text-gray-700 mb-6">
                Pinewik ska utan onödigt dröjsmål, och senast inom 72 timmar, informera Kunden vid personuppgiftsincident som berör Kundens data.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                8. Bistånd
              </h3>
              <p className="text-gray-700 mb-4">
                Pinewik bistår Kunden, i skälig utsträckning, med att:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1 pl-4">
                <li>besvara registerutdrag och rättelsebegäran</li>
                <li>genomföra konsekvensbedömningar</li>
                <li>uppfylla anmälningsskyldighet vid incidenter</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                9. Radering vid upphörande
              </h3>
              <p className="text-gray-700 mb-6">
                Vid avtalets upphörande raderas Kundens personuppgifter inom 30 dagar, såvida inte lag kräver fortsatt lagring. Kunden kan begära radering via appens funktion &quot;Radera konto&quot;.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                10. Revision
              </h3>
              <p className="text-gray-700">
                Kunden har rätt att, med rimligt varsel, begära information om hur personuppgifter behandlas och vilka säkerhetsåtgärder som vidtagits.
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
                  Organisationsnummer: 559160-1264<br />
                  Smörgatan 102, 412 76 Göteborg
                </p>
                <p className="text-xs text-gray-500 mt-4">
                  Senast uppdaterad: 2026-02-08
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
