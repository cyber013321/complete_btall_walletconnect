import { useState } from 'react';
import { X, Wallet, Link2, Smartphone } from 'lucide-react';

interface WalletSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectInjected: () => void;
  onConnectWalletConnect: () => void;
  connecting: boolean;
}

export default function WalletSelectorModal({
  isOpen,
  onClose,
  onConnectInjected,
  onConnectWalletConnect,
  connecting,
}: WalletSelectorModalProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white/10 dark:bg-slate-900/20 border border-white/20 rounded-3xl shadow-2xl shadow-black/20 overflow-hidden backdrop-blur-2xl">
        {/* Gradient background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Connect Wallet</h2>
            <p className="text-sm font-semibold text-primary/70 uppercase tracking-widest mt-2">
              Choose your preferred connection method
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all duration-300"
            disabled={connecting}
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative p-6 space-y-4">
          {/* Injected Wallet Option */}
          <button
            onClick={onConnectInjected}
            disabled={connecting}
            onMouseEnter={() => setHoveredOption('injected')}
            onMouseLeave={() => setHoveredOption(null)}
            className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4 group
              ${hoveredOption === 'injected' ? 'border-blue-500/60 bg-blue-500/8' : 'border-primary/15 bg-primary/5 hover:border-blue-500/40'}
              ${connecting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0 group-hover:shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300">
              <Wallet size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-black text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">Browser Wallet</h3>
              <p className="text-xs font-semibold text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-300 mt-1">
                MetaMask, Trust Wallet, Coinbase, Phantom
              </p>
            </div>
            <div className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              <Link2 size={18} className="text-primary" />
            </div>
          </button>

          {/* WalletConnect Option */}
          <button
            onClick={onConnectWalletConnect}
            disabled={connecting}
            onMouseEnter={() => setHoveredOption('walletconnect')}
            onMouseLeave={() => setHoveredOption(null)}
            className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4 group
              ${hoveredOption === 'walletconnect' ? 'border-purple-500/60 bg-purple-500/8' : 'border-primary/15 bg-primary/5 hover:border-purple-500/40'}
              ${connecting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
              <Smartphone size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-black text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">WalletConnect</h3>
              <p className="text-xs font-semibold text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-300 mt-1">
                Connect 30+ wallets via QR code
              </p>
            </div>
            <div className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              <Link2 size={18} className="text-primary" />
            </div>
          </button>
        </div>

        {/* Connecting state */}
        {connecting && (
          <div className="relative px-6 pb-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-4 text-center border border-white/20 backdrop-blur-sm">
              <div className="inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
              <p className="text-sm font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Connecting...</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="relative px-6 pb-6 pt-2 border-t border-white/10">
          <p className="text-xs text-center font-semibold text-primary/60 uppercase tracking-widest">
            By connecting, you agree to our terms of service
          </p>
        </div>
      </div>
    </div>
  );
}
