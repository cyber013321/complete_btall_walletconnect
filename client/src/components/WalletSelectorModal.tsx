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

      <div className="relative w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-black text-foreground">Connect Wallet</h2>
            <p className="text-sm text-muted-foreground font-black mt-1">
              Choose your preferred connection method
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-accent text-muted-foreground transition-colors"
            disabled={connecting}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Injected Wallet Option */}
          <button
            onClick={onConnectInjected}
            disabled={connecting}
            onMouseEnter={() => setHoveredOption('injected')}
            onMouseLeave={() => setHoveredOption(null)}
            className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4
              ${hoveredOption === 'injected' ? 'border-primary bg-primary/5' : 'border-border bg-accent/30'}
              ${connecting ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary/50 cursor-pointer'}
            `}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0">
              <Wallet size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-black text-foreground">Browser Wallet</h3>
              <p className="text-xs text-muted-foreground font-black mt-0.5">
                MetaMask, Trust Wallet, Coinbase, Phantom
              </p>
            </div>
            <div className="shrink-0">
              <Link2 size={18} className="text-muted-foreground" />
            </div>
          </button>

          {/* WalletConnect Option */}
          <button
            onClick={onConnectWalletConnect}
            disabled={connecting}
            onMouseEnter={() => setHoveredOption('walletconnect')}
            onMouseLeave={() => setHoveredOption(null)}
            className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4
              ${hoveredOption === 'walletconnect' ? 'border-primary bg-primary/5' : 'border-border bg-accent/30'}
              ${connecting ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary/50 cursor-pointer'}
            `}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shrink-0">
              <Smartphone size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-black text-foreground">WalletConnect</h3>
              <p className="text-xs text-muted-foreground font-black mt-0.5">
                Connect 30+ wallets via QR code
              </p>
            </div>
            <div className="shrink-0">
              <Link2 size={18} className="text-muted-foreground" />
            </div>
          </button>
        </div>

        {/* Connecting state */}
        {connecting && (
          <div className="px-6 pb-6">
            <div className="bg-primary/10 rounded-2xl p-4 text-center">
              <div className="inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
              <p className="text-sm font-black text-primary">Connecting...</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          <p className="text-xs text-center text-muted-foreground font-black">
            By connecting, you agree to our terms of service
          </p>
        </div>
      </div>
    </div>
  );
}
