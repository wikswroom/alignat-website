import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alignat - Dina projekt. Samlat. Enkelt.",
  description: "Mer tid till det du är bra på. Alignat är det enkla verktyget för att hantera hela flödet från offert till faktura. Precis det du behöver, inget mer.",
  keywords: ["projekthantering", "offert", "faktura", "småföretag", "bokföring", "företagare"],
  authors: [{ name: "Pinewik AB" }],
  openGraph: {
    title: "Alignat - Dina projekt. Samlat. Enkelt.",
    description: "Mer tid till det du är bra på. Alignat hjälper småföretagare hantera projekt från offert till faktura.",
    url: "https://alignat.se",
    siteName: "Alignat",
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alignat - Dina projekt. Samlat. Enkelt.",
    description: "Mer tid till det du är bra på. Alignat hjälper småföretagare hantera projekt från offert till faktura.",
  },
  icons: {
    icon: "/images/Alignat_logo_nobackground.png",
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
