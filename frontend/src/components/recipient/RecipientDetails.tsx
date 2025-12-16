'use client';

import { useState } from 'react';
import { Button, Input, Dropdown } from '@/components/ui';
import PhoneInput, { countryCodes, CountryCode } from '@/components/ui/PhoneInput';

type RecipientStep = 'bank' | 'contact';

interface BankOption {
  id: string;
  label: string;
}

const bankOptions: BankOption[] = [
  { id: 'first-bank', label: 'First Bank' },
  { id: 'gtbank', label: 'GTBank' },
  { id: 'access', label: 'Access Bank' },
  { id: 'zenith', label: 'Zenith Bank' },
  { id: 'uba', label: 'UBA' },
  { id: 'kuda', label: 'Kuda Bank' },
  { id: 'opay', label: 'OPay' },
];

interface RecipientDetailsProps {
  onBack: () => void;
  onNext: () => void;
}

const RecipientDetails = ({ onBack, onNext }: RecipientDetailsProps) => {
  const [step, setStep] = useState<RecipientStep>('bank');
  
  // Bank details state
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Contact details state
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>(countryCodes[0]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate account verification
  const verifyAccount = async (accNumber: string) => {
    if (accNumber.length === 10 && selectedBank) {
      setIsVerifying(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAccountName('ODUTUGA GBEKE');
      setIsVerifying(false);
    } else {
      setAccountName('');
    }
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setAccountNumber(value);
    if (value.length === 10) {
      verifyAccount(value);
    } else {
      setAccountName('');
    }
  };

  const validateBankStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedBank) {
      newErrors.bank = 'Please select a bank';
    }
    if (!accountNumber || accountNumber.length < 10) {
      newErrors.accountNumber = 'Please enter a valid 10-digit account number';
    }
    if (!accountName) {
      newErrors.accountName = 'Account could not be verified';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    const phoneDigits = phoneNumber.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (step === 'bank') {
      if (validateBankStep()) {
        setStep('contact');
        setErrors({});
      }
    } else {
      if (validateContactStep()) {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        onNext();
      }
    }
  };

  const handleBack = () => {
    if (step === 'contact') {
      setStep('bank');
      setErrors({});
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="flex items-center px-4 sm:px-6 pt-6 pb-4">
            <button
              type="button"
              onClick={handleBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back"
            >
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="flex-1 text-center text-lg font-semibold text-[#013941] pr-7">
              Recipient details
            </h1>
          </div>

          {/* Form Content */}
          <div className="px-4 sm:px-6 pb-6">
            {step === 'bank' ? (
              /* Bank Details Step */
              <div className="space-y-4">
                {/* Bank Dropdown */}
                <Dropdown
                  label="Bank"
                  placeholder="Select an option"
                  options={bankOptions}
                  value={selectedBank}
                  onChange={(option) => {
                    setSelectedBank(option as BankOption);
                    if (errors.bank) setErrors((prev) => ({ ...prev, bank: '' }));
                  }}
                />
                {errors.bank && (
                  <p className="text-sm text-red-600 -mt-2">{errors.bank}</p>
                )}

                {/* Account Number Input */}
                <div>
                  <label className="block text-sm font-medium text-[#013941] mb-2">
                    Account number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                    placeholder="Enter your account number"
                    className={`
                      w-full px-4 py-3.5 rounded-xl border transition-all
                      focus:outline-none focus:ring-2 focus:ring-[#0D2B2A]/10
                      ${errors.accountNumber ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#0D2B2A]'}
                    `}
                    maxLength={10}
                  />
                  {errors.accountNumber && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.accountNumber}</p>
                  )}
                </div>

                {/* Account Name Display */}
                <div>
                  <label className="block text-sm font-medium text-[#013941] mb-2">
                    Account name
                  </label>
                  <div className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50">
                    {isVerifying ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        <span>Verifying...</span>
                      </div>
                    ) : accountName ? (
                      <span className="text-gray-900 font-medium">{accountName}</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Contact Details Step */
              <div className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-[#013941] mb-2">
                    Recipient email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="Enter recipient email"
                    className={`
                      w-full px-4 py-3.5 rounded-xl border transition-all
                      focus:outline-none focus:ring-2 focus:ring-[#0D2B2A]/10
                      ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#0D2B2A]'}
                    `}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number Input */}
                <PhoneInput
                  label="Recipient phone number"
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  countryCode={countryCode}
                  onCountryCodeChange={setCountryCode}
                  error={errors.phone}
                />
              </div>
            )}

            {/* Next Button */}
            <div className="mt-8">
              <Button
                fullWidth
                size="lg"
                onClick={handleNext}
                isLoading={isSubmitting}
                disabled={step === 'bank' && (!selectedBank || !accountNumber || !accountName)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Powered by <span className="font-semibold text-[#0D2B2A]">NovaCrust</span>
        </p>
      </div>
    </div>
  );
};

export default RecipientDetails;
