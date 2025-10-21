export default function About() {
  return (
    <div className="bg-white py-24 sm:py-32 min-h-screen flex items-center snap-start">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Byggd av en företagare, för företagare
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            &ldquo;Jag skapade Alignat efter att ha tröttnat på att hantera min fars
            handskrivna lappar från hans hantverksjobb. Målet var att bygga
            något så enkelt att han faktiskt ville använda det. Inga krångliga
            funktioner, bara ett smartare sätt att jobba.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
