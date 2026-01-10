export default function FaqSection() {
  const faqs = [
    {
      question: "Är Alignat en faktureringsapp?",
      answer:
        "Ja. Alignat är en mobilapp för fakturering och löneunderlag, byggd för hantverkare, konsulter och serviceföretag som fakturerar per jobb. Enklare än tunga affärssystem, kraftfullare än Excel.",
    },
    {
      question: "Passar Alignat för hantverkare och byggföretag?",
      answer:
        "Ja. Alignat är byggt för små uppdragsbaserade bolag inom bygg, hantverk, konsulttjänster och service. Allt från offert till faktura och löneunderlag på mobilen.",
    },
    {
      question: "Måste jag binda mig?",
      answer:
        "Nej. Alignat betalas månadsvis i förskott och kan avslutas när som helst. Du kan använda appen fram till periodens slut.",
    },
    {
      question: "Finns det en gratis testperiod?",
      answer:
        "Ja. Alignat har 14 dagars gratis test. Betalkort krävs vid start, men inget debiteras under testperioden.",
    },
    {
      question: "Kan jag köra Alignat parallellt med mitt nuvarande system?",
      answer:
        "Ja. Alignat är byggt för att kunna köras parallellt med befintliga system, så du kan testa i lugn och ro utan att ändra hela ditt arbetssätt direkt.",
    },
    {
      question: "Hur skickas fakturor till redovisningen?",
      answer:
        "När du skickar en faktura till kund kan Alignat automatiskt skicka en hemlig kopia till din redovisnings- eller bokföringsmejl. Det fungerar med alla redovisningssystem som tar emot fakturor via e-post.",
    },
    {
      question: "Stöder Alignat ROT/RUT och omvänd moms?",
      answer: "Ja. ROT, RUT och omvänd moms stöds och väljs per faktura.",
    },
    {
      question: "Går det att kreditera fakturor?",
      answer:
        "Ja. Skickade fakturor kan inte raderas, men kan krediteras direkt i appen i enlighet med bokföringslagen.",
    },
    {
      question: "Hur fungerar löneunderlag?",
      answer:
        "Alignat är byggt för att hantera avvikelser från ordinarie arbetstid – till exempel övertid, frånvaro, VAB, semester och utlägg. I slutet av månaden kan admin exportera ett samlat löneunderlag i PDF eller Excel.",
    },
    {
      question: "Är Alignat ett fullständigt tidrapporteringssystem?",
      answer:
        "Nej. Alignat fokuserar på enkel vardagsrapportering och löneunderlag, inte avancerad tidrapportering per projekt, kompbanker eller större personalflöden.",
    },
    {
      question: "Hur många anställda passar Alignat för?",
      answer:
        "Alignat passar bäst för små och medelstora team där man vill hålla administrationen enkel och tydlig, utan tunga system eller omfattande uppsättning.",
    },
    {
      question: "Är min data säker?",
      answer:
        "Ja. All data lagras säkert i molnet och är endast tillgänglig för behöriga användare i ditt företag.",
    },
    {
      question: "Vad händer med min data om jag avslutar?",
      answer:
        "Du kan avsluta när som helst. Vid avslut kan du välja att radera all företagsdata permanent.",
    },
    {
      question: "Hur får jag support?",
      answer:
        "Support sker via e-post på support@alignat.se. Vanliga frågor och hjälp finns även samlade på supportsidan.",
    },
    {
      question: "Får jag kvitto på betalningen av Alignat?",
      answer:
        "Ja. Stripe skickar automatiskt kvitto via e-post vid varje betalning, och kvittot kan även laddas ner vid behov.",
    },
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32" id="faq">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Vanliga frågor
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Här har vi samlat svar på de vanligaste funderingarna kring Alignat.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold text-gray-900">{faq.question}</dt>
              <dd className="mt-1 text-gray-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

