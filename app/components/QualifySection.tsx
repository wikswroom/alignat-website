import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const steps = [
  {
    id: 1,
    question: "Hur hanterar du dina jobb & fakturor idag?",
    options: [
      {
        text: "Lösa lappar, anteckningar, Messenger eller Excel",
        status: "success",
        result: "Alignat ger dig struktur",
      },
      {
        text: "Ett större system där jag betalar för massa funktioner jag inte använder",
        status: "success",
        result: "Alignat sänker dina kostnader",
      },
      {
        text: "Ett komplett affärssystem med bokföring & lager som jag använder fullt ut",
        status: "error",
        result: "Alignat är nog inte rätt för dig",
      },
    ],
  },
  {
    id: 2,
    question: "Behöver du e-fakturor eller systemkopplingar?",
    options: [
      {
        text: "Nej, jag vill hålla det enkelt",
        status: "success",
        result: "Fortsätt",
      },
      {
        text: "Ja, det är viktigt för mig",
        status: "error",
        result: "Alignat är inte rätt för dig",
      },
    ],
  },
  {
    id: 3,
    question: "Tar administrationen mer tid än den borde?",
    options: [
      {
        text: "Ja",
        status: "success",
        result: "Alignat passar dig!",
      },
      {
        text: "Nej",
        status: "neutral",
        result: "Du behöver troligen inget nytt verktyg",
      },
    ],
  },
];

export default function QualifySection() {
  return (
    <div className="relative isolate py-24 sm:py-32 overflow-hidden">
      {/* Bakgrundseffekt som matchar Hero-sektionen men svagare */}
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
            Är Alignat rätt för dig?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Alignat är för dig som äger ett litet företag och själv har koll på
            jobb, kunder och fakturor.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
          {steps.map((step, stepIdx) => (
            <div
              key={step.id}
              className="relative flex flex-col h-full rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-sm ring-1 ring-gray-200"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple text-white text-xl font-bold shadow-md">
                  {step.id}
                </span>
              </div>
              <h3 className="mb-6 text-xl font-bold text-gray-900">
                {step.question}
              </h3>

              <div className="flex flex-1 flex-col gap-4">
                {step.options.map((option, optIdx) => (
                  <div
                    key={optIdx}
                    className={`rounded-xl p-4 text-sm border ${
                      option.status === "success"
                        ? "bg-green-50/50 border-green-200"
                        : option.status === "error"
                        ? "bg-red-50/50 border-red-200"
                        : "bg-gray-50/50 border-gray-200"
                    }`}
                  >
                    <p className="mb-3 font-medium text-gray-900 leading-relaxed">
                      {option.text}
                    </p>
                    <div className="flex items-center gap-2 pt-2 border-t border-black/5">
                      {option.status === "success" ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : option.status === "error" ? (
                        <XCircleIcon className="h-5 w-5 text-red-600 flex-shrink-0" />
                      ) : null}
                      <span
                        className={`font-semibold text-xs uppercase tracking-wide ${
                          option.status === "success"
                            ? "text-green-700"
                            : option.status === "error"
                            ? "text-red-700"
                            : "text-gray-600"
                        }`}
                      >
                        {option.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-gray-900 mb-6">
            Passade beskrivningen in på dig?
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-8 py-3 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            Testa Alignat Beta
          </a>
        </div>
      </div>
    </div>
  );
}

