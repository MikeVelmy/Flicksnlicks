import type { Metadata } from "next";
import { Baloo_2, Work_Sans } from "next/font/google";
import CartDrawer from "@/components/cart/CartDrawer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { CartProvider } from "@/context/CartContext";
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
    default: "Flicks & Licks | The Suya Boss, 5 Locations in Accra",
    template: "%s | Flicks & Licks",
  },
  description:
    "Flicks & Licks is Accra's favorite grill spot, the Suya Boss. Fresh suya, loaded shawarma, wood fired pizza and combo plates at 5 locations: Haatso Atomic, Mile 7, Achimota, East Legon and Dansoman. Fast pickup, flexible payment, big flavor.",
  keywords: [
    "Flicks & Licks",
    "Haatso Atomic",
    "Mile 7 T Junction",
    "Kingsby Achimota",
    "East Legon suya",
    "Dansoman restaurant",
    "Suya Boss",
    "suya Accra",
    "shawarma Accra",
    "local food brand Ghana",
    "Centrepoint Mall food",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flicks & Licks | The Suya Boss",
    description:
      "Fresh suya, loaded shawarma, wood fired pizza and combo plates at 5 locations across Accra. Fast pickup, flexible payment, big flavor.",
    url: siteUrl,
    siteName: "Flicks & Licks",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flicks & Licks, The Suya Boss",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flicks & Licks | The Suya Boss",
    description:
      "Fresh suya, loaded shawarma, wood fired pizza and combo plates at 5 locations across Accra. Fast pickup, flexible payment, big flavor.",
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
  paymentAccepted: "Cash, Mobile Money",
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
        <CartProvider>
          {children}
          <CartDrawer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
