export default function Cta() {
  return (
    <div className="bg-white flex items-center" id="get-started">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Har du alignat idag?
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 font-medium">
          Kom igång utan risk. Kör parallellt med dina befintliga system. Avsluta
          när som helst.
        </p>
        <p className="mt-2 text-base text-gray-500">
          Betaversionen finns tillgänglig nu – anmäl ditt intresse nedan för att
          få en inbjudan.
        </p>
        <div className="mt-10 max-w-xl mx-auto">
          <iframe
            data-tally-src="https://tally.so/embed/mYL20B?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height={152}
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            title="Anmäl intresse för Alignat Beta"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
