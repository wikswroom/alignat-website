import TallyForm from "./TallyForm";

export default function Cta() {
  return (
    <div className="bg-white" id="get-started">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Bli en av de första att testa Alignat.
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Anmäl ditt intresse nedan så hör vi av oss med instruktioner så fort
          betaversionen är redo. Inget spam, bara en inbjudan.
        </p>
        <div className="mt-10">
          <iframe
            data-tally-src="https://tally.so/embed/mYL20B?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="152"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Anmäl intresse för Alignat Beta"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
