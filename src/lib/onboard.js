import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import metamaskSDK from "@web3-onboard/metamask";
import walletConnectModule from '@web3-onboard/walletconnect';

const INFURA_KEY = '57e5a85d6baa492cbe4bed28672ceebd';

const injected = injectedModule();

const metamaskSDKWallet = metamaskSDK({
  options: {
    dappMetadata: {
      name: "Example Web3-Onboard Dapp",
    },
  },
});

const walletConnect = walletConnectModule({
  version: 2,
  // Replace with your apiKey
  projectId: '7ccbd81817b60baae6f518d1e3679fe2',
  dappUrl: 'https://localhost:5173/'
});

const wallets = [
  injected,
  metamaskSDKWallet,
  walletConnect
];

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`
  },
  {
    id: 11155111,
    token: 'ETH',
    label: 'Sepolia',
    rpcUrl: 'https://rpc.sepolia.org/'
  },
  {
    id: '0x13881',
    token: 'MATIC',
    label: 'Polygon - Mumbai',
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com'
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'Binance',
    rpcUrl: 'https://bsc-dataseed.binance.org/'
  },
  {
    id: '0xA',
    token: 'OETH',
    label: 'OP Mainnet',
    rpcUrl: 'https://mainnet.optimism.io'
  },
  {
    id: '0xA4B1',
    token: 'ARB-ETH',
    label: 'Arbitrum',
    rpcUrl: 'https://rpc.ankr.com/arbitrum'
  },
  {
    id: '0xa4ec',
    token: 'ETH',
    label: 'Celo',
    rpcUrl: 'https://1rpc.io/celo'
  },
  {
    id: 666666666,
    token: 'DEGEN',
    label: 'Degen',
    rpcUrl: 'https://rpc.degen.tips'
  },
  {
    id: 2192,
    token: 'SNAXETH',
    label: 'SNAX Chain',
    rpcUrl: 'https://mainnet.snaxchain.io'
  }
];

const appMetadata = {
  name: 'Connect Wallet Example',
  icon: '<svg>My App Icon</svg>',
  description: 'Example showcasing how to connect a wallet.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
  ]
};

const onboard = Onboard({
  wallets,
  chains,
  appMetadata
});

export default onboard;
