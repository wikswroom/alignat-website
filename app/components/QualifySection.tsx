import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function QualifySection() {
  return (
    <div className="relative isolate py-24 sm:py-32 overflow-hidden bg-white">
      {/* Bakgrundseffekt */}
      <div
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl opacity-10"
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

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Passar Alignat dig?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* JA-Sidan */}
          <div className="relative flex flex-col rounded-3xl bg-green-50/50 p-8 sm:p-10 ring-1 ring-green-200">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                <CheckCircleIcon className="h-5 w-5" />
              </span>
              Alignat passar dig om:
            </h3>
            <ul className="space-y-4">
              {[
                "Du driver ett litet projektbaserat bolag",
                "Du vill att anställda enkelt rapporterar in underlag",
                "Du vill slippa kvällsjobb med fakturor/lön",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <CheckCircleIcon className="h-6 w-5 flex-none text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NEJ-Sidan */}
          <div className="relative flex flex-col rounded-3xl bg-gray-50 p-8 sm:p-10 ring-1 ring-gray-200">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white">
                <XCircleIcon className="h-5 w-5" />
              </span>
              Alignat är inte för dig om:
            </h3>
            <ul className="space-y-4">
              {[
                "Du behöver ett komplett affärssystem",
                "Du har komplex redovisning eller många bolag",
                "Du vill konfigurera allt i detalj",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-600">
                  <XCircleIcon className="h-6 w-5 flex-none text-gray-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

