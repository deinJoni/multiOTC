"use client"
import React, { createContext, useContext } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { useInitWallet } from "@/wallets/wallet-selector";
import { NetworkId } from "@/config";
import { Wallet } from "../services/near-wallet";

const inter = Inter({ subsets: ["latin"] });

// Create a context for the wallet
const WalletContext = createContext<Wallet | null>(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useInitWallet({ createAccessKeyFor: "", networkId: NetworkId });
  // CONSTANTS
  const MPC_CONTRACT = "multichain-testnet-2.testnet";

  // NEAR WALLET
  const wallet = new Wallet({
    network: "testnet",
    createAccessKeyFor: MPC_CONTRACT,
  });

  return (
    <WalletContext.Provider value={wallet}>
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          {children}
        </body>
      </html>
    </WalletContext.Provider>
  );
}

// Custom hook to access the wallet from any component
export function useWallet(): Wallet {
  const wallet = useContext(WalletContext);
  if (!wallet) {
    throw new Error("useWallet must be used within a WalletContextProvider");
  }
  return wallet;
}
