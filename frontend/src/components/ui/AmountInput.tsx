'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface TokenOption {
  id: string;
  symbol: string;
  name?: string;
  icon: string; // Image path
  color?: string;
}

interface AmountInputProps {
  label: string;
  amount: string;
  onAmountChange: (value: string) => void;
  selectedToken: TokenOption | null;
  onTokenSelect: (token: TokenOption) => void;
  tokenOptions: TokenOption[];
  searchable?: boolean;
  readonly?: boolean;
}

const AmountInput = ({
  label,
  amount,
  onAmountChange,
  selectedToken,
  onTokenSelect,
  tokenOptions,
  searchable = true,
  readonly = false,
}: AmountInputProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen, searchable]);

  const filteredTokens = searchQuery
    ? tokenOptions.filter(
        (token) =>
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tokenOptions;

  const handleTokenSelect = (token: TokenOption) => {
    onTokenSelect(token);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  // Helper to render icon (image or fallback)
  const renderIcon = (icon: string, size: number = 24) => {
    if (icon.startsWith('/')) {
      return (
        <Image
          src={icon}
          alt=""
          width={size}
          height={size}
          className="rounded-full object-cover"
        />
      );
    }
    return <span className="text-sm">{icon}</span>;
  };

  return (
    <div className="relative border border-gray-200 rounded-3xl p-4 bg-white hover:border-gray-300 transition-colors focus-within:border-[#0D2B2A] focus-within:ring-2 focus-within:ring-[#0D2B2A]/10">
      <label className="block text-sm text-gray-500 mb-2">{label}</label>
      
      <div className="flex items-center justify-between gap-4">
        {/* Amount Input */}
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            // Allow only numbers and decimal point
            if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
              onAmountChange(value);
            }
          }}
          placeholder="0.00"
          readOnly={readonly}
          className={`
            text-2xl font-semibold text-gray-900 bg-transparent outline-none w-full
            placeholder:text-gray-300
            ${readonly ? 'cursor-default' : ''}
          `}
          aria-label={`${label} amount`}
        />

        {/* Token Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors border border-gray-200"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            {selectedToken ? (
              <>
                <span className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
                  {renderIcon(selectedToken.icon, 24)}
                </span>
                <span className="font-medium text-gray-900">{selectedToken.symbol}</span>
              </>
            ) : (
              <span className="text-gray-500">Select</span>
            )}
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden">
              {/* Search */}
              {searchable && (
                <div className="p-2 border-b border-gray-100">
                  <div className="relative">
                    <svg
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-[#0D2B2A]"
                    />
                  </div>
                </div>
              )}

              {/* Token List */}
              <div className="max-h-48 overflow-y-auto">
                {filteredTokens.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-gray-500 text-center">
                    No tokens found
                  </div>
                ) : (
                  filteredTokens.map((token) => (
                    <button
                      key={token.id}
                      type="button"
                      onClick={() => handleTokenSelect(token)}
                      className={`
                        w-full px-3 py-2.5 text-left flex items-center gap-2.5
                        hover:bg-gray-50 transition-colors
                        ${selectedToken?.id === token.id ? 'bg-gray-50' : ''}
                      `}
                      role="option"
                      aria-selected={selectedToken?.id === token.id}
                    >
                      <span className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                        {renderIcon(token.icon, 24)}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {token.name || token.symbol}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AmountInput;
