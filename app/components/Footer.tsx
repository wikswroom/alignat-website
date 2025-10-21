export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
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
