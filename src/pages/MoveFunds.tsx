import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowDown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Currency = {
  code: string;
  symbol: string;
  flag: string;
  locale: string;
};

const currencies: Record<string, Currency> = {
  GBP: { code: 'GBP', symbol: '£', flag: '🇬🇧', locale: 'en-GB' },
  EUR: { code: 'EUR', symbol: '€', flag: '🇪🇺', locale: 'de-DE' },
  USD: { code: 'USD', symbol: '$', flag: '🇺🇸', locale: 'en-US' },
  CAD: { code: 'CAD', symbol: '$', flag: '🇨🇦', locale: 'en-CA' },
  AUD: { code: 'AUD', symbol: '$', flag: '🇦🇺', locale: 'en-AU' },
  JPY: { code: 'JPY', symbol: '¥', flag: '🇯🇵', locale: 'ja-JP' },
  CHF: { code: 'CHF', symbol: '₣', flag: '🇨🇭', locale: 'de-CH' },
  SEK: { code: 'SEK', symbol: 'kr', flag: '🇸🇪', locale: 'sv-SE' },
  NOK: { code: 'NOK', symbol: 'kr', flag: '🇳🇴', locale: 'nb-NO' },
  DKK: { code: 'DKK', symbol: 'kr', flag: '🇩🇰', locale: 'da-DK' },
  PLN: { code: 'PLN', symbol: 'zł', flag: '🇵🇱', locale: 'pl-PL' },
  CZK: { code: 'CZK', symbol: 'Kč', flag: '🇨🇿', locale: 'cs-CZ' },
  HUF: { code: 'HUF', symbol: 'Ft', flag: '🇭🇺', locale: 'hu-HU' },
  RSD: { code: 'RSD', symbol: 'дин', flag: '🇷🇸', locale: 'sr-RS' },
};

export const MoveFunds: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<string>('GBP');
  
  const pensionBalance = 48750.00;
  const savingsBalance = 16250.00;

  const handleBack = () => {
    navigate('/pension-warning');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleNext = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && numAmount <= pensionBalance) {
      navigate('/review-transfer', { 
        state: { 
          amount: numAmount,
          pensionBalance,
          savingsBalance
        } 
      });
    }
  };

  const isValidAmount = () => {
    const numAmount = parseFloat(amount);
    return !isNaN(numAmount) && numAmount > 0 && numAmount <= pensionBalance;
  };

  const formatCurrency = (value: number) => {
    const selectedCurrency = currencies[currency];
    return `${selectedCurrency.symbol}${value.toLocaleString(selectedCurrency.locale, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  return (
    <div className="min-h-screen bg-black text-white max-w-[480px] mx-auto flex flex-col">
      <div className="px-4 py-6 flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center mb-8">
          <button 
            onClick={handleBack}
            className="w-12 h-12 rounded-full bg-[#211E1E] flex items-center justify-center hover:bg-[#2a2626] transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="flex-1 text-center text-lg font-medium pr-12">Move funds</h1>
        </header>

        {/* Amount Input Section */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-[#716860] text-base mb-4">Enter amount to move</p>
          <input
            type="tel"
            inputMode="decimal"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="text-6xl font-normal tracking-tight text-white bg-transparent border-none outline-none text-center w-full"
            style={{ caretColor: '#A488F5' }}
            autoFocus
          />
          
          {/* Currency Selector */}
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="mt-4 w-auto bg-[#211E1E] border-none text-white hover:bg-[#2a2626] transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currencies[currency].flag}</span>
                <SelectValue>
                  {currency} ({currencies[currency].symbol})
                </SelectValue>
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#211E1E] border-[#2a2626] text-white">
              {Object.entries(currencies).map(([code, curr]) => (
                <SelectItem 
                  key={code} 
                  value={code}
                  className="hover:bg-[#2a2626] focus:bg-[#2a2626] focus:text-white cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{curr.flag}</span>
                    <span>{code} ({curr.symbol})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Transfer Cards */}
        <div className="flex-1 space-y-4">
          {/* Move From Card */}
          <div className="bg-[#211E1E] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <p className="text-[#716860] text-sm">Move from</p>
                <p className="text-white text-base font-medium">Pension</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#716860] text-sm">Balance</p>
              <p className="text-white text-base font-medium">{formatCurrency(pensionBalance)}</p>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button className="w-10 h-10 bg-[#211E1E] rounded-full flex items-center justify-center border-4 border-black">
              <ArrowDown className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Move To Card */}
          <div className="bg-[#211E1E] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#A488F5] rounded-full flex items-center justify-center">
                <span className="text-2xl">🐷</span>
              </div>
              <div>
                <p className="text-[#716860] text-sm">Move to</p>
                <p className="text-white text-base font-medium">Savings</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#716860] text-sm">Balance</p>
              <p className="text-white text-base font-medium">{formatCurrency(savingsBalance)}</p>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-6">
          <Button 
            onClick={handleNext}
            disabled={!isValidAmount()}
            className={`w-full h-14 text-base rounded-xl font-medium ${
              isValidAmount() 
                ? 'bg-[#A488F5] hover:bg-[#9575e8] text-white' 
                : 'bg-[#2a2626] text-[#716860] cursor-not-allowed'
            }`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoveFunds;
