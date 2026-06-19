import type { Metadata } from "next";
import { Cinzel_Decorative, Cormorant_Garamond, Raleway } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cinzel = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Amber Prada — Contenido Exclusivo | Osadía by Sade",
  description:
    "Soy Amber Prada. Accede a mi contenido más íntimo y exclusivo. Fotos, videos personalizados y mucho más. Solo para quienes se atreven a entrar.",
  keywords:
    "amber prada, contenido exclusivo amber prada, modelo colombiana contenido, osadia by sade, rawstone producciones",
  metadataBase: new URL("https://thesecretsroom.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Amber Prada — Contenido Exclusivo",
    description:
      "Accede a mi contenido más íntimo y exclusivo. Solo para quienes se atreven.",
    type: "website",
    url: "https://thesecretsroom.com",
    siteName: "Osadía by Sade",
    locale: "es_CO",
    images: [
      {
        url: "/photos/foto01.jpg",
        width: 1200,
        height: 630,
        alt: "Amber Prada — Contenido Exclusivo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amber Prada — Contenido Exclusivo",
    description:
      "Accede a mi contenido más íntimo y exclusivo. Solo para quienes se atreven.",
    images: ["/photos/foto01.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${cormorant.variable} ${raleway.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Amber Prada",
              url: "https://thesecretsroom.com",
              image: "https://thesecretsroom.com/photos/foto01.jpg",
              description:
                "Modelo colombiana con contenido exclusivo. Fotos y videos personalizados disponibles en Clips4Sale y XVideos.",
              sameAs: [
                "https://www.clips4sale.com/es/studio/459727/the-secret-room",
                "https://www.xvideos.com/channels/amber6096",
              ],
            }),
          }}
        />
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-BCFHF5DQNC" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BCFHF5DQNC');
        `}</Script>
      </body>
    </html>
  );
}
