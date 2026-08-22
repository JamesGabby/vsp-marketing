import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
  display: "swap",
})

const siteDescription =
  "Perihelion books qualified B2B sales calls. Every prospect is researched, verified against your ICP, and showing a real trigger event before we send a single email. You pay per qualified call held. No retainers, no setup fee, monthly rolling."

export const metadata: Metadata = {
  metadataBase: new URL("https://periheliongrowth.com"),
  title: {
    default: "Perihelion | B2B Lead Generation Agency",
    template: "%s | Perihelion",
  },
  description: siteDescription,
  keywords: [
    "B2B lead generation",
    "outbound sales agency",
    "cold email agency",
    "qualified sales meetings",
    "B2B appointment setting",
    "AI outbound prospecting",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Perihelion",
    title: "Perihelion | B2B Lead Generation Agency",
    description: siteDescription,
    images: [
      { url: "/perihelion-logo-light.png", width: 512, height: 512, alt: "Perihelion" },
    ],
  },
  twitter: {
    card: "summary",
    title: "Perihelion | B2B Lead Generation Agency",
    description: siteDescription,
    images: ["/perihelion-logo-light.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Perihelion",
              url: "https://periheliongrowth.com",
              logo: "https://periheliongrowth.com/perihelion-logo-light.png",
              description: siteDescription,
              founder: { "@type": "Person", name: "James Gabbitus" },
              contactPoint: {
                "@type": "ContactPoint",
                email: "contact@periheliongrowth.com",
                contactType: "sales",
              },
            }),
          }}
        />
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
