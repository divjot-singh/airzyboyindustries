import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const panamFont = localFont({ 
  src: [
    {
      path: '../../public/fonts/PanAmLogoText.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/PanAmText.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/PanAmTextCaps.ttf',
      weight: '400'
    }
  ],
  variable: '--font-panam'
 });

export const metadata: Metadata = {
  title: 'Airzyboy industries',
  description: 'Airzyboy industries',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={panamFont.className}>{children}</body>
    </html>
  )
}
