import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Amix Lounge | Kempton Park",
  description: "Gauteng's #1 Lounge. Top-tier entertainment, A-listing artists, signature cocktails, and mouth-watering kasi food.",
  icons: {
    icon: "https://res.cloudinary.com/dfuibw321/image/upload/v1778888492/file_00000000b930722fb01c9821c42f3094_pecxib.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#080202]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@200;300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-dm-sans: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
            --font-cormorant: 'Cormorant Garamond', ui-serif, Georgia, serif;
          }
        `}</style>
      </head>
      <body className="font-sans antialiased bg-[#080202]">{children}</body>
    </html>
  )
}
