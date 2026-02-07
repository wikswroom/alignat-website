import { CheckIcon } from "@heroicons/react/24/outline";

// Tier-konfiguration (priser exkl. moms för webben)
const TIERS = [
  {
    name: "Grundpaket",
    price: 119,
    description: "1 användare",
    details: "Allt du behöver för att komma igång och effektivisera din administration.",
  },
  {
    name: "Liten",
    price: 199,
    description: "1 + 2 anställda",
    details: "Perfekt för små team med upp till 2 medarbetare.",
  },
  {
    name: "Mellan",
    price: 279,
    description: "1 + 5 anställda",
    details: "För växande företag med upp till 5 medarbetare.",
    popular: true,
  },
  {
    name: "Stor",
    price: 399,
    description: "1 + 10 anställda",
    details: "För större team med upp till 10 medarbetare.",
  },
];

const FEATURES = [
  "Obegränsat antal fakturor & offerter",
  "Samla tid, material & utlägg",
  "Kunddatabas & projektöversikt",
  "Export till PDF eller Excel",
  "Stöd för ROT/RUT & omvänd moms",
  "Schemalägg arbetsordrar & personal",
];

export default function PricingSection() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Enkel prissättning.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Designat för små bolag – därför kostar Alignat också därefter.
          </p>
        </div>

        {/* Tier-kort */}
        <div className="mx-auto mt-16 grid max-w-lg gap-6 lg:max-w-none lg:grid-cols-4">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ${
                tier.popular
                  ? "ring-2 ring-brand-blue"
                  : "ring-gray-200"
              }`}
            >
              {/* Populär-badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white">
                    Populärast
                  </span>
                </div>
              )}

              {/* Tier-namn */}
              <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
              
              {/* Pris */}
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {tier.price}
                </span>
                <span className="ml-1 text-sm text-gray-500">kr/mån exkl. moms</span>
              </div>

              {/* Beskrivning */}
              <p className="mt-2 text-sm font-medium text-brand-blue">
                {tier.description}
              </p>
              <p className="mt-3 text-sm text-gray-600 flex-1">
                {tier.details}
              </p>
            </div>
          ))}
        </div>

        {/* Vad ingår */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl bg-white p-8 ring-1 ring-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Vad ingår i alla paket
            </h3>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckIcon className="h-5 w-5 flex-shrink-0 text-brand-blue mt-0.5" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Så fungerar betalningen */}
        <div className="mx-auto mt-12 max-w-4xl">
          <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
            Så fungerar betalningen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-gray-600">
            {[
              "14 dagars gratis test",
              "Betalas månadsvis i förskott",
              "Ingen bindningstid",
              "Avsluta när som helst",
            ].map((item) => (
              <div
                key={item}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm ring-1 ring-gray-100 text-center"
              >
                <CheckIcon className="h-6 w-6 text-green-500 mb-2" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
