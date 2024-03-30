// useDeriveAddress.ts
import { useState, useEffect } from "react";
import Web3 from "web3";
import {
  deriveChildPublicKey,
  najPublicKeyStrToUncompressedHexPoint,
  uncompressedHexPointToEvmAddress,
} from "./kdf";

interface DeriveAddressReturn {
  publicKey: string;
  address: string;
}

const useDeriveAddress = (
  web3: Web3 | null,
  accountId: string,
  derivationPath: string,
): DeriveAddressReturn | null => {
  const [derivedAddress, setDerivedAddress] =
    useState<DeriveAddressReturn | null>(null);

  useEffect(() => {
    if (!web3) return;

    const deriveAddress = async () => {
      const publicKey = await deriveChildPublicKey(
        najPublicKeyStrToUncompressedHexPoint(),
        accountId,
        derivationPath
      );
      const address = await uncompressedHexPointToEvmAddress(publicKey);
      setDerivedAddress({ publicKey, address });
    };

    deriveAddress();
  }, [web3, accountId, derivationPath]);

  return derivedAddress;
};

export default useDeriveAddress;
