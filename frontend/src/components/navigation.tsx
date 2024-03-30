"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@near-wallet-selector/modal-ui/styles.css";
import NearLogo from "public/near-logo.svg";
import { useWallet } from "@/wallets/wallet-selector";

export const Navigation = () => {
  const { signedAccountId, logOut, logIn } = useWallet();
  const [action, setAction] = useState(() => {});
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    if (signedAccountId) {
      setAction(() => logOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => logIn);
      setLabel("Login");
    }
  }, [signedAccountId, logOut, logIn, setAction, setLabel]);
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-gray-100">
      <Link className="flex items-center justify-center" href="#">
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href="/" passHref legacyBehavior>
          <Image
            priority
            src={NearLogo}
            alt="NEAR"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
        </Link>
        <div className="navbar-nav pt-1">
          {/* @ts-ignore */}
          <button className="btn btn-secondary" onClick={action}>
            {" "}
            {label}{" "}
          </button>
        </div>
      </nav>
    </header>
  );
};
