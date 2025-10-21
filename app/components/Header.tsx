import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Alignat</span>
            <Image
              src="/images/Alignat_logo_nobackground.png"
              alt="Alignat logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
