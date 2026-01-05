"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Så används Alignat", href: "#features" },
    { name: "Priser", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-white py-2 ${
        isScrolled
          ? "shadow-sm border-b border-gray-100"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="flex items-center justify-between px-4 lg:px-8 max-w-7xl mx-auto"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <Image
              src="/images/Alignat_logo_nobackground.png"
              alt="Alignat logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Alignat
            </span>
          </Link>
        </div>

        {/* Mobil-meny knapp */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Öppna meny</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop länkar */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-semibold leading-6 text-gray-900 hover:text-brand-blue transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="#get-started"
            className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-blue/90 transition-all"
          >
            Kom igång <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Mobilmeny Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                src="/images/Alignat_logo_nobackground.png"
                alt="Alignat"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">Alignat</span>
            </Link>
            <button
              type="button"
              className="rounded-md p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Stäng meny</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="px-4 py-6">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="#get-started"
                className="block rounded-lg px-3 py-2.5 text-base font-bold text-center text-white bg-brand-blue shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kom igång
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
