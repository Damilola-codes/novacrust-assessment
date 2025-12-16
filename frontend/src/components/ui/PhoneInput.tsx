'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface CountryCode {
  code: string;
  dialCode: string;
  flag: string;
  isImage?: boolean;
}

const countryCodes: CountryCode[] = [
  { code: 'NG', dialCode: '+234', flag: '/NIG.png', isImage: true },
  { code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', dialCode: '+44', flag: '🇬🇧' },
  { code: 'GH', dialCode: '+233', flag: '🇬🇭' },
  { code: 'KE', dialCode: '+254', flag: '🇰🇪' },
  { code: 'ZA', dialCode: '+27', flag: '🇿🇦' },
];

interface PhoneInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  countryCode: CountryCode;
  onCountryCodeChange: (code: CountryCode) => void;
  placeholder?: string;
  error?: string;
}

const PhoneInput = ({
  label,
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  placeholder = '000 - 000 - 00000',
  error,
}: PhoneInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatPhoneNumber = (input: string) => {
    // Remove non-digits
    const digits = input.replace(/\D/g, '');
    // Format as XXX - XXX - XXXXX
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} - ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} - ${digits.slice(3, 6)} - ${digits.slice(6, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  const renderFlag = (country: CountryCode, size: number = 20) => {
    if (country.isImage) {
      return (
        <Image
          src={country.flag}
          alt={country.code}
          width={size}
          height={size}
          className="rounded-full object-cover"
        />
      );
    }
    return <span className="text-base">{country.flag}</span>;
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[#013941] mb-2">
        {label}
      </label>
      <div
        className={`
          flex items-center border rounded-xl overflow-hidden transition-all
          ${error ? 'border-red-300' : 'border-gray-200 focus-within:border-[#0D2B2A] focus-within:ring-2 focus-within:ring-[#0D2B2A]/10'}
        `}
      >
        {/* Country Code Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-3 py-3.5 border-r border-gray-200 hover:bg-gray-50 transition-colors"
          >
            {renderFlag(countryCode)}
            <span className="text-sm text-gray-700">{countryCode.dialCode}</span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              {countryCodes.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onCountryCodeChange(country);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors
                    ${countryCode.code === country.code ? 'bg-gray-50' : ''}
                  `}
                >
                  {renderFlag(country)}
                  <span className="text-sm text-gray-700">{country.dialCode}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 px-3 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none"
          maxLength={17}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default PhoneInput;
export { countryCodes };
export type { CountryCode };
