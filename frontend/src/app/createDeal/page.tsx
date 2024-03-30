"use client"
import React from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useWallet } from "@/wallets/wallet-selector";

const CreateDealPage = () => {
  // Add your code for creating a deal here

  const { viewMethod, callMethod } = useWallet();

  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-[50%]">
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
              <Input id="otc-deal-name" placeholder="Enter the OTC deal name" />
            </div>
          </CardContent>
        </CardHeader>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Create Escrow Account</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateDealPage;
