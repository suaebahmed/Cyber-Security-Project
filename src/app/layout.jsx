"use client";
import { Providers } from "@/app/Theme/ThemeProvider"
import Header from "@/app/layout/Header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Cipher Algorithms</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </head>

      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
