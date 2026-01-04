import { CheckIcon } from "@heroicons/react/24/outline";

export default function WorkflowSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ett vanligt sätt att använda Alignat:
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-8 text-gray-600 text-left sm:text-center">
            <p>
              Ett jobb börjar med en offert som skapas i appen. När offerten
              accepteras blir den automatiskt ett aktivt jobb.
            </p>
            <p>
              Under tiden jobbet pågår rapporterar anställda löpande timmar,
              material och eventuella avvikelser direkt på jobbet i appen.
            </p>
            <p>
              När jobbet är klart kan admin fakturera direkt, utan att samla in
              underlag i efterhand. All information finns redan på plats.
            </p>
            <p>
              I slutet av månaden exporteras ett samlat löneunderlag baserat på
              det som rapporterats under arbetets gång och rapporterade
              personalhändelser.
            </p>
            <p className="font-semibold text-gray-900">
              Samma information används hela vägen – från offert till faktura och
              lön.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-start sm:items-center justify-center space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
            <div className="flex items-center gap-x-2">
              <CheckIcon className="h-5 w-5 flex-none text-brand-blue" />
              <span className="font-medium text-gray-900">Mindre efterarbete</span>
            </div>
            <div className="flex items-center gap-x-2">
              <CheckIcon className="h-5 w-5 flex-none text-brand-blue" />
              <span className="font-medium text-gray-900">
                Samma data för faktura och lön
              </span>
            </div>
            <div className="flex items-center gap-x-2">
              <CheckIcon className="h-5 w-5 flex-none text-brand-blue" />
              <span className="font-medium text-gray-900">
                Överse och planera arbete
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

