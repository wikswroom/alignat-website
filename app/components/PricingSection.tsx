import { CheckIcon } from "@heroicons/react/24/outline";

export default function PricingSection() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Enkel prissättning.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Betala bara för det du använder. Inga dolda avgifter.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          {/* Grundpaket - Vänster sida */}
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Grundpaket
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Allt som krävs för att driva fakturering och samla underlag i ett
              litet uppdragsbaserat bolag.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-brand-blue">
                Vad ingår
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {[
                "Obegränsat antal fakturor & offerter",
                "Samla tid, material & utlägg",
                "Kunddatabas & projektöversikt",
                "Export till PDF eller Excel",
                "Stöd för ROT/RUT & omvänd moms",
                "Ett företag, en admin",
              ].map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-brand-blue"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-10 p-4 bg-blue-50 rounded-xl text-sm text-brand-blue font-medium text-center italic">
              Ett företag, en admin, inga anställda – klart.
            </div>
          </div>

          {/* Pris & Tillägg - Höger sida */}
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-white py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Månadskostnad
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    129
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    kr / mån
                  </span>
                </p>

                <div className="mt-8 space-y-6 text-left border-t border-gray-100 pt-8">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-semibold text-gray-900">
                        Anställd
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        +29 kr/mån
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      För rapportering av tid, material & se arbetsorder.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-semibold text-gray-900">
                        Extra admin
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        +99 kr/mån
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      För att hantera projekt, fakturera & kunder.
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-xs text-gray-500 italic text-center">
                  Du bestämmer vem som har vilka rättigheter.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Så fungerar betalningen */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
            Så fungerar betalningen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-gray-600 text-center md:text-left">
            {[
              "14 dagars gratis test",
              "Betalas månadsvis i förskott",
              "Ingen bindningstid",
              "Avsluta när som helst",
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start p-4 bg-white rounded-lg shadow-sm ring-1 ring-gray-100">
                 <CheckIcon className="h-6 w-6 text-green-500 mb-2" />
                 <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance */}
        <div className="mt-16 text-center border-t border-gray-200 pt-10">
            <p className="text-lg font-semibold text-gray-900">
                De flesta företag betalar mellan 150–300 kr/månad.
            </p>
            <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
                <span className="font-medium text-brand-blue">Vanligast:</span> Små uppdragsbaserade bolag som kör Alignat parallellt med Fortnox eller annat system för att slippa dubbelarbete och få bättre överblick.
            </p>
        </div>
      </div>
    </div>
  );
}

