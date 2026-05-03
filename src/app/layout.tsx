import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/src/components/Nav'
import Footer from '@/src/components/Footer'
import CursorGlow from '@/src/components/CursorGlow'

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'Petrit Halabaku — Full Stack Engineer',
  description:
    'Full Stack Engineer with 6+ years building secure, scalable systems across e-commerce, health data, and deep tech.',
  icons: { icon: '/uploads/logo-white.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans" suppressHydrationWarning>
        <CursorGlow />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
