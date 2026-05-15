import type { EthereumProvider as EthereumProviderType } from '@walletconnect/ethereum-provider';

const PROJECT_ID = '3a08f94815bfc8bf78bee35d8954e662';

let providerInstance: any = null;

export async function getWalletConnectProvider(): Promise<any> {
  if (providerInstance) return providerInstance;

  const { EthereumProvider } = await import('@walletconnect/ethereum-provider');
  providerInstance = await EthereumProvider.init({
    projectId: PROJECT_ID,
    chains: [1, 56, 137, 43114],
    showQrModal: true,
    methods: [
      'eth_sendTransaction',
      'eth_sign',
      'personal_sign',
      'eth_signTypedData',
      'wallet_switchEthereumChain',
      'wallet_addEthereumChain',
    ],
    events: ['chainChanged', 'accountsChanged', 'disconnect'],
    qrModalOptions: {
      themeMode: 'light',
      themeVariables: {
        '--wcm-z-index': '9999',
        '--wcm-accent-color': '#3b82f6',
      },
    },
  });

  return providerInstance;
}

export function resetWalletConnectProvider() {
  providerInstance = null;
}

export { PROJECT_ID };
