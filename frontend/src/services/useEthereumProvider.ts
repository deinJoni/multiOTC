// useEthereumProvider.ts
import { useEffect, useState } from 'react';
import Web3 from "web3";

const useEthereumProvider = (chainRpc: string) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    const web3Instance = new Web3(chainRpc);
    setWeb3(web3Instance);
  }, [chainRpc]);

  return web3;
};

export default useEthereumProvider;
