import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alignat - Faktureringsapp för små företag | Offert, faktura & löneunderlag",
  description: "Enkel fakturering och löneunderlag för hantverkare, konsulter och serviceföretag. Mobilapp för offert, jobb, faktura och lön. Alternativ till tunga affärssystem.",
  keywords: ["faktureringsapp", "faktura app", "löneunderlag", "mobilapp", "affärssystem", "hantverkare", "byggföretag", "konsulter", "serviceföretag", "ROT RUT", "offert", "fakturering för småföretag"],
  authors: [{ name: "Pinewik AB" }],
  openGraph: {
    title: "Alignat - Faktureringsapp för små företag",
    description: "Enkel fakturering och löneunderlag för hantverkare, konsulter och serviceföretag. Mobilapp för offert, jobb, faktura och lön.",
    url: "https://alignat.se",
    siteName: "Alignat",
    locale: "sv_SE",
    type: "website",
    images: [
      {
        url: "/images/icon512x512.jpeg",
        width: 512,
        height: 512,
        alt: "Alignat - Faktureringsapp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alignat - Faktureringsapp för små företag",
    description: "Enkel fakturering och löneunderlag för hantverkare, konsulter och serviceföretag.",
    images: ["/images/icon512x512.jpeg"],
  },
  icons: {
    icon: "/images/icon512x512.jpeg",
    apple: "/images/icon512x512.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className={poppins.className}>
        {children}
        <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
