import { useContext, useState, useCallback } from "react";
import Web3 from "web3";
import { FeeMarketEIP1559Transaction } from "@ethereumjs/tx";
import { Common } from "@ethereumjs/common";

const useCreatePayload = () => {
  //const { web3, chainId } = useContext(Web3Context);

  const createPayload = useCallback(
    async (
      sender: string,
      receiver: string,
      amount: string,
      web3: Web3 | null,
      chainRpc: string
    ) => {
      if (!web3) return;
      const common = new Common({ chain: 11155111});
      const nonce = await web3.eth.getTransactionCount(sender);
      const maxFeePerGas = await web3.eth.getGasPrice();
      const maxPriorityFeePerGas = await web3.eth.getMaxPriorityFeePerGas();

      const transactionData = {
        nonce,
        gasLimit: 21000, // Adjust based on the actual contract method being called
        maxFeePerGas,
        maxPriorityFeePerGas,
        to: receiver,
        value: BigInt(web3.utils.toWei(amount, "ether")),
        chain: chainRpc,
      };

      const transaction = FeeMarketEIP1559Transaction.fromTxData(
        transactionData,
        { common }
      );
      const payload = transaction.getMessageToSign(true);

      return { transaction, payload };
    },
    []
  );

  return createPayload;
};
export default useCreatePayload;