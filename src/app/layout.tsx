import type { Metadata } from "next";
import { Baloo_2, Work_Sans } from "next/font/google";
import { siteInfo } from "@/data/site";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-worksans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://flicksandlicks.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Flicks & Licks | The Suya Boss — Haatso Atomic, Accra",
    template: "%s | Flicks & Licks",
  },
  description:
    "Flicks & Licks is Haatso Atomic's favorite grill spot — the Suya Boss. Fresh suya, loaded shawarma, wood-fired pizza and combo plates. Cash only, fast pickup, big flavor.",
  keywords: [
    "Flicks & Licks",
    "Haatso Atomic",
    "Suya Boss",
    "suya Accra",
    "shawarma Haatso",
    "local food brand Ghana",
    "cash only restaurant Accra",
    "Centrepoint Mall food",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flicks & Licks | The Suya Boss",
    description:
      "Fresh suya, loaded shawarma, wood-fired pizza and combo plates in Haatso Atomic. Cash only, fast pickup, big flavor.",
    url: siteUrl,
    siteName: "Flicks & Licks",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flicks & Licks — The Suya Boss",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flicks & Licks | The Suya Boss",
    description:
      "Fresh suya, loaded shawarma, wood-fired pizza and combo plates in Haatso Atomic. Cash only, fast pickup, big flavor.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteInfo.name,
  alternateName: "The Suya Boss",
  image: `${siteUrl}/images/og-image.jpg`,
  servesCuisine: ["Suya", "Grill", "Shawarma", "Pizza", "Ghanaian", "Nigerian"],
  priceRange: "₵₵",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteInfo.location,
    addressLocality: "Accra",
    addressCountry: "GH",
  },
  telephone: siteInfo.phonePrimary,
  paymentAccepted: "Cash",
  sameAs: [siteInfo.instagram, siteInfo.tiktok, siteInfo.facebook, siteInfo.twitter],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
