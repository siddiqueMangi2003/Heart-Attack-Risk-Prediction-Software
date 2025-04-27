import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CardioGuard - Heart Attack Risk Prediction",
  description: "A tool to assess your heart attack risk factors based on health parameters",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}

