// Crypto Converter Types

export interface CryptoToken {
  id: string;
  symbol: string;
  name: string;
  network?: string;
  icon: string;
  color: string;
}

export interface FiatCurrency {
  id: string;
  symbol: string;
  name: string;
  icon: string;
}

export interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface ConversionState {
  activeTab: 'crypto-to-cash' | 'cash-to-crypto' | 'crypto-to-fiat-loan';
  payAmount: string;
  receiveAmount: string;
  selectedPayToken: CryptoToken | null;
  selectedReceiveCurrency: FiatCurrency | null;
  selectedPayFrom: WalletOption | null;
  selectedPayTo: string;
}

export interface DropdownOption {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
}
