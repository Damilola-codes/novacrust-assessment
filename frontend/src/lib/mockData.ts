import { CryptoToken, FiatCurrency, WalletOption } from '@/types';

export const cryptoTokens: CryptoToken[] = [
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: '/ETH.png',
    color: '#627EEA',
  },
  {
    id: 'usdt-celo',
    symbol: 'USDT',
    name: 'USDT - CELO',
    network: 'CELO',
    icon: '/CRYPTO1.png',
    color: '#26A17B',
  },
  {
    id: 'usdt-ton',
    symbol: 'USDT',
    name: 'USDT - TON',
    network: 'TON',
    icon: '/CRYPTO1.png',
    color: '#26A17B',
  },
  {
    id: 'usdt-bnb',
    symbol: 'USDT',
    name: 'USDT - BNB',
    network: 'BNB',
    icon: '/BNB.png',
    color: '#26A17B',
  },
];

export const fiatCurrencies: FiatCurrency[] = [
  {
    id: 'ngn',
    symbol: 'NGN',
    name: 'Nigerian Naira',
    icon: '/NIG.png',
  },
  {
    id: 'usd',
    symbol: 'USD',
    name: 'US Dollar',
    icon: '/NIG.png',
  },
  {
    id: 'gbp',
    symbol: 'GBP',
    name: 'British Pound',
    icon: '/NIG.png',
  },
  {
    id: 'eur',
    symbol: 'EUR',
    name: 'Euro',
    icon: '/NIG.png',
  },
];

export const walletOptions: WalletOption[] = [
  {
    id: 'metamask',
    name: 'Metamask',
    icon: '/METAMASK.png',
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    icon: '/RAINBOW.png',
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '/WATERFLOW.png',
  },
  {
    id: 'other',
    name: 'Other Crypto Wallets',
    icon: '/Wallet.png',
    description: 'Binance, Coinbase, Bybit etc',
  },
];

export const bankOptions = [
  { id: 'bank1', name: 'First Bank' },
  { id: 'bank2', name: 'GTBank' },
  { id: 'bank3', name: 'Access Bank' },
  { id: 'bank4', name: 'Zenith Bank' },
];
