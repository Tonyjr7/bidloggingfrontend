import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Bid Tracker",
  description: "Track your job applications and bids",
  icons: {
    icon: "/apply.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/apply.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Bid Tracker</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/" className="text-gray-600 hover:text-gray-900">
                      Add Bid
                    </Link>
                  </li>
                  <li>
                    <Link href="/bids" className="text-gray-600 hover:text-gray-900">
                      View Bids
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}

