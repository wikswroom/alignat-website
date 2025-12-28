import {
  DocumentTextIcon,
  UsersIcon,
  BriefcaseIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Fakturera utan att missa något",
    description:
      "Lägg in tid, utlägg och tjänster löpande på jobbet. När du är klar skapar du fakturan med ett klick. Allt kommer med – inget glöms bort.",
    icon: DocumentTextIcon,
    color: "bg-brand-blue",
  },
  {
    name: "Färdigt löneunderlag",
    description:
      "Slipp lösa lappar. Rapportera närvaro, semester, VAB och övrigt som traktamente direkt i mobilen. Du får en färdig lista att skicka till lönekontoret varje månad.",
    icon: UsersIcon,
    color: "bg-brand-cyan",
  },
  {
    name: "Planering & Överblick",
    description:
      "Se vem som gör vad. Få en tydlig överblick på dina kunder och pågående jobb. Fördela arbetet enkelt och se historik per anställd direkt i appen.",
    icon: BriefcaseIcon,
    color: "bg-brand-pink",
  },
  {
    name: "Enkelt men kraftfullt",
    description:
      "Med inbyggt stöd för ROT/RUT och omvänd moms funkar det för alla – utan krångliga inställningar. Det bara funkar.",
    icon: DocumentChartBarIcon,
    color: "bg-brand-purple",
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32 flex items-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-gray-600">
            Bara det du behöver
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ett enklare sätt att hantera företaget
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Från den första offerten till ett färdigt bokföringsunderlag. Alignat
            är byggt för att göra din vardag som företagare smidigare.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg ${feature.color}`}>
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
