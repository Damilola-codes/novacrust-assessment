'use client';

import { useState } from 'react';
import { Button, TabNav, AmountInput, Dropdown } from '@/components/ui';
import { cryptoTokens, fiatCurrencies, walletOptions } from '@/lib/mockData';
import { CryptoToken, FiatCurrency, WalletOption } from '@/types';

type TabType = 'crypto-to-cash' | 'cash-to-crypto' | 'crypto-to-fiat-loan';

const tabs = [
  { id: 'crypto-to-cash', label: 'Crypto to cash' },
  { id: 'cash-to-crypto', label: 'Cash to crypto' },
  { id: 'crypto-to-fiat-loan', label: 'Crypto to fiat loan' },
];

interface CryptoConverterProps {
  onContinue?: () => void;
}

const CryptoConverter = ({ onContinue }: CryptoConverterProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('crypto-to-cash');
  const [payAmount, setPayAmount] = useState('1.00');
  const [receiveAmount, setReceiveAmount] = useState('1.00');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoToken | null>(cryptoTokens[0]);
  const [selectedFiat, setSelectedFiat] = useState<FiatCurrency | null>(fiatCurrencies[0]);
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null);
  const [selectedPayTo, setSelectedPayTo] = useState<{ id: string; label: string } | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  // Format crypto tokens for AmountInput
  const cryptoOptions = cryptoTokens.map((token) => ({
    id: token.id,
    symbol: token.symbol,
    name: token.name,
    icon: token.icon,
    color: token.color,
  }));

  // Format fiat for AmountInput
  const fiatOptions = fiatCurrencies.map((fiat) => ({
    id: fiat.id,
    symbol: fiat.symbol,
    name: fiat.name,
    icon: fiat.icon,
    color: '#4A5568',
  }));

  // Format wallet options for Dropdown
  const walletDropdownOptions = walletOptions.map((wallet) => ({
    id: wallet.id,
    label: wallet.name,
    sublabel: wallet.description,
    icon: wallet.icon,
  }));

  // Pay to options (bank accounts, etc.)
  const payToOptions = [
    { id: 'bank1', label: 'First Bank - ****1234' },
    { id: 'bank2', label: 'GTBank - ****5678' },
    { id: 'bank3', label: 'Access Bank - ****9012' },
  ];

  const handleConvert = async () => {
    setIsConverting(true);
    // Simulate conversion
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsConverting(false);
    // Navigate to recipient details
    if (onContinue) {
      onContinue();
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-md sm:max-w-lg">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tab Navigation */}
          <div className="px-4 sm:px-6 pt-6 pb-4">
            <TabNav
              tabs={tabs}
              activeTab={activeTab}
              onChange={handleTabChange}
            />
          </div>

          {/* Form Content */}
          <div className="px-4 sm:px-6 pb-6 space-y-4">
            {/* You Pay Input */}
            <AmountInput
              label="You pay"
              amount={payAmount}
              onAmountChange={setPayAmount}
              selectedToken={
                selectedCrypto
                  ? {
                      id: selectedCrypto.id,
                      symbol: selectedCrypto.symbol,
                      name: selectedCrypto.name,
                      icon: selectedCrypto.icon,
                      color: selectedCrypto.color,
                    }
                  : null
              }
              onTokenSelect={(token) => {
                const crypto = cryptoTokens.find((c) => c.id === token.id);
                setSelectedCrypto(crypto || null);
              }}
              tokenOptions={cryptoOptions}
              searchable={true}
            />

            {/* You Receive Input */}
            <AmountInput
              label="You receive"
              amount={receiveAmount}
              onAmountChange={setReceiveAmount}
              selectedToken={
                selectedFiat
                  ? {
                      id: selectedFiat.id,
                      symbol: selectedFiat.symbol,
                      name: selectedFiat.name,
                      icon: selectedFiat.icon,
                      color: '#4A5568',
                    }
                  : null
              }
              onTokenSelect={(token) => {
                const fiat = fiatCurrencies.find((f) => f.id === token.id);
                setSelectedFiat(fiat || null);
              }}
              tokenOptions={fiatOptions}
              searchable={false}
            />

            {/* Pay From Dropdown */}
            <Dropdown
              label="Pay from"
              placeholder="Select an option"
              options={walletDropdownOptions}
              value={
                selectedWallet
                  ? {
                      id: selectedWallet.id,
                      label: selectedWallet.name,
                      sublabel: selectedWallet.description,
                      icon: selectedWallet.icon,
                    }
                  : null
              }
              onChange={(option) => {
                const wallet = walletOptions.find((w) => w.id === option.id);
                setSelectedWallet(wallet || null);
              }}
            />

            {/* Pay To Dropdown */}
            <Dropdown
              label="Pay to"
              placeholder="Select an option"
              options={payToOptions}
              value={selectedPayTo}
              onChange={setSelectedPayTo}
            />

            {/* Convert Button */}
            <div className="pt-2">
              <Button
                fullWidth
                size="lg"
                onClick={handleConvert}
                isLoading={isConverting}
                disabled={!selectedWallet || !selectedPayTo}
              >
                Convert now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoConverter;
