import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";


const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NovaCrust Checkout - Crypto Payments",
  description: "Secure and simple crypto payment checkout experience",
  keywords: ["crypto", "payments", "checkout", "bitcoin", "ethereum"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrumentSans.className}>
  {children}
</body>
    </html>
  );
}
