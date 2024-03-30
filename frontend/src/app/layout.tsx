"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { useInitWallet } from "@/wallets/wallet-selector";
import { NetworkId } from "@/config";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useInitWallet({ createAccessKeyFor: "", networkId: NetworkId });
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          {children}
          </body>
      </html>
    </>
  );
}
