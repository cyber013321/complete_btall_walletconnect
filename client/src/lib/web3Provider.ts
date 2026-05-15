/**
 * Universal Web3 provider detector.
 * Handles MetaMask, Trust Wallet, Coinbase Wallet, and any EIP-1193 compatible wallet.
 */

export interface Web3Provider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  sendAsync?: (payload: any, callback: (err: any, response: any) => void) => void;
  send?: (payload: any, callback: (err: any, response: any) => void) => void;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
  isMetaMask?: boolean;
  isTrust?: boolean;
  isCoinbaseWallet?: boolean;
  selectedAddress?: string;
  chainId?: string;
}

function findProvider(): Web3Provider | null {
  if (typeof window === 'undefined') return null;

  const win = window as any;

  // 1. Standard EIP-1193 provider (MetaMask, modern Trust Wallet, Rainbow, etc.)
  if (win.ethereum?.request) {
    return win.ethereum;
  }

  // 2. Trust Wallet older versions
  if (win.trustwallet?.request) {
    return win.trustwallet;
  }

  // 3. Coinbase Wallet
  if (win.coinbaseWalletExtension?.request) {
    return win.coinbaseWalletExtension;
  }

  // 4. Legacy web3 provider (old Trust Wallet, old MetaMask)
  if (win.web3?.currentProvider?.request) {
    return win.web3.currentProvider;
  }

  // 5. Any object with a request method at the top level
  const possibleKeys = ['ethereum', 'trustwallet', 'coinbaseWalletExtension', 'binancechain', 'web3'];
  for (const key of possibleKeys) {
    const obj = win[key];
    if (obj && typeof obj.request === 'function') {
      return obj;
    }
    if (obj?.currentProvider && typeof obj.currentProvider.request === 'function') {
      return obj.currentProvider;
    }
  }

  return null;
}

/**
 * Normalizes any provider to the EIP-1193 `request` interface.
 * Falls back to `sendAsync` for legacy providers.
 */
export function getNormalizedProvider(): Web3Provider | null {
  const provider = findProvider();
  if (!provider) return null;

  // Already has request method
  if (typeof provider.request === 'function') {
    return provider;
  }

  // Legacy: wrap sendAsync into request
  if (typeof provider.sendAsync === 'function' || typeof provider.send === 'function') {
    const sendFn = provider.sendAsync || provider.send;
    return {
      ...provider,
      request: async (args: { method: string; params?: any[] }) => {
        return new Promise((resolve, reject) => {
          sendFn.call(
            provider,
            { jsonrpc: '2.0', id: Date.now(), method: args.method, params: args.params },
            (err: any, response: any) => {
              if (err) return reject(err);
              if (response.error) return reject(new Error(response.error.message));
              resolve(response.result);
            }
          );
        });
      },
    };
  }

  return null;
}

/**
 * Waits for a provider to be injected by the wallet browser.
 * Trust Wallet and some mobile wallets inject slightly after page load.
 */
export function waitForProvider(maxWaitMs = 5000): Promise<Web3Provider | null> {
  return new Promise((resolve) => {
    // Check immediately
    const immediate = getNormalizedProvider();
    if (immediate) return resolve(immediate);

    // Listen for the ethereum initialization event
    const onInit = () => {
      cleanup();
      resolve(getNormalizedProvider());
    };
    window.addEventListener('ethereum#initialized', onInit, { once: true });

    // Poll every 200ms
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 200;
      const provider = getNormalizedProvider();
      if (provider) {
        cleanup();
        resolve(provider);
      }
      if (elapsed >= maxWaitMs) {
        cleanup();
        resolve(null);
      }
    }, 200);

    function cleanup() {
      clearInterval(interval);
      window.removeEventListener('ethereum#initialized', onInit);
    }
  });
}
