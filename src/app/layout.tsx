import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import ChatbotWrapper from "@/components/smart/ChatbotWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Illango Orthodontics & General Dentistry | Scarborough, Markham, Brampton",
  description:
    "Advanced dental care with 25+ years of experience. Orthodontics, implants, wisdom teeth surgery, root canals, and more. Serving Scarborough, Markham, and Brampton. Book your appointment today!",
  keywords: [
    "dentist",
    "orthodontist",
    "dental implants",
    "wisdom teeth",
    "Scarborough dentist",
    "Markham dentist",
    "Brampton dentist",
    "root canal",
    "braces",
    "dental clinic",
    "Dr Illango",
  ],
  openGraph: {
    title: "Dr. Illango Orthodontics & General Dentistry",
    description:
      "Advanced dental care with 25+ years of experience. Serving Scarborough, Markham, and Brampton.",
    type: "website",
    locale: "en_CA",
    siteName: "Illango Dentistry",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full`}>
      <head>
        {/* Schema.org Dentist Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "Dr. Illango Orthodontics & General Dentistry",
              description:
                "Advanced dental care with 25+ years of experience in orthodontics, implants, and oral surgery.",
              url: "https://www.illangodentistry.com",
              telephone: ["+14162927004", "+19054727223", "+19054571700"],
              address: [
                {
                  "@type": "PostalAddress",
                  streetAddress: "3852 Finch Avenue East, Unit 204 & 303",
                  addressLocality: "Scarborough",
                  addressRegion: "ON",
                  postalCode: "M1T 3T9",
                  addressCountry: "CA",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "9500 Markham Road, Unit 107",
                  addressLocality: "Markham",
                  addressRegion: "ON",
                  postalCode: "L6E 0N6",
                  addressCountry: "CA",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "7920 Hurontario Street",
                  addressLocality: "Brampton",
                  addressRegion: "ON",
                  postalCode: "L6Y 0P7",
                  addressCountry: "CA",
                },
              ],
              medicalSpecialty: [
                "Orthodontics",
                "General Dentistry",
                "Oral Surgery",
                "Implant Dentistry",
              ],
              priceRange: "$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "500",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <ChatbotWrapper />
      </body>
    </html>
  );
}
