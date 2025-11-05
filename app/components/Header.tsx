"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Visa header bara när vi är på toppen (inom 50px)
      setIsVisible(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`absolute inset-x-0 top-0 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <span className="sr-only">Alignat</span>
            <Image
              src="/images/Alignat_logo_nobackground.png"
              alt="Alignat logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-3xl font-medium text-gray-900">
              Alignat
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
