"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import useEthereumProvider from "@/services/useEthereumProvider";
import useDeriveAddress from "@/services/useDeriveAddress";
import useGetBalance from "@/services/useGetBalance";
import useCreatePayload from "@/services/useCreatePayload";
import { useWallet } from "../layout";
import { Wallet } from "../../services/near-wallet";
// @ts-ignore
const CreateDealPage = () => {
  const [accountId, setAccountId] = useState("");
  const [derivationPath, setDerivationPath] = useState("");
  const web3 = useEthereumProvider("https://rpc2.sepolia.org");
  const derivedAddress = useDeriveAddress(web3, accountId, derivationPath);
  const balance = useGetBalance(
    web3!,
    derivedAddress
      ? derivedAddress!.address
      : "0x3938d5d8CdA5863d5Bb7907A9cd64010229Bd564"
  );
  const createPayload = useCreatePayload();
  const [selectedItemHave, setSelectedItemHave] = useState("");
  const [selectedItemWant, setSelectedItemWant] = useState("");
  const wallet = useWallet();
  useEffect(() => {
    wallet.accountId ? setAccountId(wallet.accountId) : setAccountId("");
  }, []);

  const createPayloadButton = async () => {
    createPayload(
      derivedAddress!.address,
      "0x3938d5d8CdA5863d5Bb7907A9cd64010229Bd564",
      "1",
      web3,
      "https://rpc2.sepolia.org"
    ).then((result) => {
      console.log(result);
    });
  };

  const handleDerivationPathChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDerivationPath(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-[80%]">
        <CardHeader>
          <CardTitle className="text-xl">Create New OTC Deal</CardTitle>
          <CardContent className="text-sm">
            <p className="mb-4">
              An over-the-counter (OTC) deal is a transaction conducted outside
              of a formal exchange. It allows counterparties to negotiate
              directly with each other, offering more flexibility in terms of
              pricing and contract terms.
            </p>
            <div className="grid gap-2">
              <Label htmlFor="otc-deal-name">OTC Deal Name</Label>
              <Input
                placeholder="Enter the OTC deal name"
                onChange={(e) => handleDerivationPathChange(e)}
              />
              {derivedAddress?.address}
            </div>
            <div>Balance {balance?.balance} ETH</div>
            <div className="flex flex-row justify-between pt-5">
              <p className="w-[33%]">Select Token (HAVE)</p>
              <Input placeholder="Amount" className="max-w-[33%]" />
              <div className="min-w-[33%]">
                <Select onValueChange={(v) => setSelectedItemHave(v)}>
                  <SelectTrigger>
                    <SelectValue>{selectedItemHave}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="DAI">DAI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-row justify-between pt-5">
              <p className="w-[33%]">Select Token (WANT)</p>
              <Input placeholder="Amount" className="max-w-[33%]" />
              <div className="min-w-[33%]">
                <Select onValueChange={(v) => setSelectedItemWant(v)}>
                  <SelectTrigger>
                    <SelectValue>{selectedItemWant}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="DAI">DAI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </CardHeader>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={createPayloadButton}>seeeeend it</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateDealPage;
