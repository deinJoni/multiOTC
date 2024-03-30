import { useState, useEffect } from 'react';
import Web3 from 'web3';

// This interface is optional but recommended for better type checking and autocompletion
interface BalanceResult {
  balance: number | null;
  error: string | null;
}

const useGetBalance = (web3: Web3, accountId: string): BalanceResult => {
  const [balanceResult, setBalanceResult] = useState<BalanceResult>({
    balance: null,
    error: null,
  });

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // Ensure accountId is valid to avoid unnecessary errors
        if (!web3.utils.isAddress(accountId)) {
          throw new Error("Invalid Ethereum address.");
        }

        const balanceWei = await web3.eth.getBalance(accountId);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        
        setBalanceResult({ balance: parseFloat(balanceEth), error: null });
      } catch (error: any) {
        setBalanceResult({ balance: null, error: error.message });
      }
    };

    fetchBalance();
  }, [web3, accountId]); // Re-run the effect if web3 instance or accountId changes

  return balanceResult;
};

export default useGetBalance;
