'use client';

import { useState } from 'react';
import { CryptoConverter } from '@/components/converter';
import { RecipientDetails } from '@/components/recipient';

type AppStep = 'converter' | 'recipient' | 'success';

export default function Home() {
  const [step, setStep] = useState<AppStep>('converter');

  if (step === 'recipient') {
    return (
      <RecipientDetails
        onBack={() => setStep('converter')}
        onNext={() => setStep('success')}
      />
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Transaction Submitted!</h1>
            <p className="text-gray-600 mb-6">Your conversion request has been submitted successfully.</p>
            <button
              onClick={() => setStep('converter')}
              className="w-full py-3 bg-[#0D2B2A] text-white font-semibold rounded-full hover:bg-[#164544] transition-colors"
            >
              Start New Conversion
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <CryptoConverter onContinue={() => setStep('recipient')} />;
}
