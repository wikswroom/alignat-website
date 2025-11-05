import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:py-20 lg:px-8">
        {/* Navigation Links */}
        <nav className="flex justify-center space-x-8 mb-8" aria-label="Footer">
          <Link href="/#about" className="text-sm text-gray-600 hover:text-brand-blue transition-colors">
            Om oss
          </Link>
          <Link href="/legal" className="text-sm text-gray-600 hover:text-brand-blue transition-colors">
            Legal
          </Link>
          <a href="mailto:support@alignat.se" className="text-sm text-gray-600 hover:text-brand-blue transition-colors">
            Kontakt
          </a>
        </nav>

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600 font-medium">
            Svenskutvecklat 🇸🇪
          </p>
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Pinewik AB (Org.nr 559160-1264). Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
}
