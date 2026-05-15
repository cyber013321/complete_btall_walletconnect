import { useState, useEffect, useCallback } from 'react';
import { X, Wallet, Smartphone, ExternalLink, Globe } from 'lucide-react';

interface WalletInfo {
  name: string;
  icon?: string;
  provider: any;
}

interface WalletSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (provider: any) => void;
}

const MOBILE_WALLETS = [
  { name: 'Trust Wallet', installLink: 'https://trustwallet.com/download' },
  { name: 'MetaMask', installLink: 'https://metamask.io/download/' },
  { name: 'Coinbase Wallet', installLink: 'https://www.coinbase.com/wallet' },
  { name: 'OKX Wallet', installLink: 'https://www.okx.com/download' },
];

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export default function WalletSelector({ isOpen, onClose, onConnect }: WalletSelectorProps) {
  const [detected, setDetected] = useState<WalletInfo[]>([]);
  const [activeTab, setActiveTab] = useState<'detected' | 'mobile'>('detected');
  const [hasBrowserWallet, setHasBrowserWallet] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    // Check for browser wallet
    const eth = (window as any).ethereum;
    const hasWallet = !!eth;
    setHasBrowserWallet(hasWallet);

    const d: WalletInfo[] = [];

    // Detect wallet type from window.ethereum flags
    if (eth) {
      if (eth.isMetaMask) d.push({ name: 'MetaMask', provider: eth });
      else if (eth.isTrust) d.push({ name: 'Trust Wallet', provider: eth });
      else if (eth.isCoinbaseWallet) d.push({ name: 'Coinbase Wallet', provider: eth });
      else if (eth.isPhantom) d.push({ name: 'Phantom', provider: eth });
      else d.push({ name: 'Browser Wallet', provider: eth });
    }

    setDetected(d);
    setDebugInfo(`window.ethereum=${hasWallet}, userAgent=${navigator.userAgent.slice(0, 50)}`);

    // Auto-switch to mobile tab on mobile devices
    if (isMobileDevice() && d.length === 0) {
      setActiveTab('mobile');
    }
  }, [isOpen]);

  const handleConnectBrowser = useCallback(async () => {
    const eth = (window as any).ethereum;
    if (!eth) {
      alert('No wallet found. Please install MetaMask or Trust Wallet.');
      return;
    }
    onConnect(eth);
    onClose();
  }, [onConnect, onClose]);

  const handleConnectDetected = useCallback((wallet: WalletInfo) => {
    onConnect(wallet.provider);
    onClose();
  }, [onConnect, onClose]);

  const handleMobileOpen = useCallback((walletName: string) => {
    const url = window.location.href;
    let deepLink = '';

    switch (walletName) {
      case 'Trust Wallet':
        deepLink = `https://link.trustwallet.com/open_url?coin_id=20000714&url=${encodeURIComponent(url)}`;
        break;
      case 'MetaMask':
        deepLink = `https://metamask.app.link/dapp/${encodeURIComponent(url.replace(/^https?:\/\//, ''))}`;
        break;
      case 'Coinbase Wallet':
        deepLink = `https://go.cb-w.com/dapp?url=${encodeURIComponent(url)}`;
        break;
      case 'OKX Wallet':
        deepLink = `https://www.okx.com/download?deeplink=${encodeURIComponent(url)}`;
        break;
    }

    if (deepLink) {
      window.location.href = deepLink;
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-card border border-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Wallet size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-base font-black text-foreground">Connect Wallet</h2>
              <p className="text-xs text-muted-foreground font-black">Select a wallet to continue</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-accent transition-colors text-muted-foreground">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border shrink-0">
          <button
            onClick={() => setActiveTab('detected')}
            className={`flex-1 py-3 text-xs font-black transition-colors ${
              activeTab === 'detected'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center justify-center gap-1">
              <Globe size={14} />
              Browser ({detected.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex-1 py-3 text-xs font-black transition-colors ${
              activeTab === 'mobile'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center justify-center gap-1">
              <Smartphone size={14} />
              Mobile
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 min-h-0">
          {activeTab === 'detected' && (
            <div className="space-y-3">
              {/* Always show Browser Wallet button if window.ethereum exists */}
              {hasBrowserWallet && (
                <button
                  onClick={handleConnectBrowser}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <Wallet size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-foreground text-sm">Browser Wallet</div>
                    <div className="text-xs text-muted-foreground font-black">Use installed wallet extension</div>
                  </div>
                </button>
              )}

              {/* Individual detected wallets */}
              {detected.map((w, i) => (
                <button
                  key={i}
                  onClick={() => handleConnectDetected(w)}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Wallet size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-foreground text-sm">{w.name}</div>
                    <div className="text-xs text-muted-foreground font-black">Detected</div>
                  </div>
                  <ExternalLink size={14} className="text-muted-foreground shrink-0" />
                </button>
              ))}

              {detected.length === 0 && !hasBrowserWallet && (
                <div className="text-center py-6">
                  <Wallet size={32} className="mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground font-black text-sm">No browser wallet detected</p>
                  <p className="text-xs text-muted-foreground mt-1 px-2">
                    On mobile? Switch to the Mobile tab above.
                  </p>
                  <div className="mt-4 space-y-2">
                    <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary font-black hover:underline">
                      Install MetaMask
                    </a>
                    <a href="https://trustwallet.com/download" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary font-black hover:underline">
                      Install Trust Wallet
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'mobile' && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground font-black text-center px-2">
                Tap a wallet to open it. If you have the app installed, it will load this page.
              </p>

              {MOBILE_WALLETS.map((w) => (
                <button
                  key={w.name}
                  onClick={() => handleMobileOpen(w.name)}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Smartphone size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-foreground text-sm">{w.name}</div>
                    <div className="text-xs text-muted-foreground font-black">Open in app</div>
                  </div>
                  <ExternalLink size={14} className="text-muted-foreground shrink-0" />
                </button>
              ))}

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground font-black text-center mb-2">
                  Or use the browser inside your wallet app
                </p>
                <div className="bg-accent/50 p-3 rounded-xl">
                  <p className="text-xs text-foreground font-black break-all text-center">
                    {window.location.href}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Debug info (tiny, only visible for troubleshooting) */}
        {debugInfo && (
          <div className="px-4 py-1 border-t border-border/50 bg-accent/20">
            <p className="text-[10px] text-muted-foreground/50 font-mono truncate">{debugInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
}
