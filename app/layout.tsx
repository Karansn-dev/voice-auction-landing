import type { Metadata } from 'next'
import './globals.css'
// import Link from 'next/link'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-gradient-to-br from-white to-blue-50 min-h-screen">
        {/* Header with Sign In button removed */}
        <main className="flex flex-col items-center justify-center flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
