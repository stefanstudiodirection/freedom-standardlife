import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAccounts, AccountType } from '@/contexts/AccountContext';

export const SelectSource: React.FC = () => {
  const navigate = useNavigate();
  const { accounts } = useAccounts();

  const handleBack = () => {
    navigate('/');
  };

  const handleSelectAccount = (accountId: AccountType) => {
    if (accounts[accountId].balance > 0) {
      navigate('/select-destination', { state: { sourceAccount: accountId } });
    }
  };

  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', { 
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
          <h1 className="flex-1 text-center text-lg font-medium pr-12">Select source account</h1>
        </header>

        <p className="text-[#716860] text-base mb-6 text-center">Choose which account to move money from</p>

        {/* Account Cards */}
        <div className="space-y-4">
          {Object.values(accounts).map((account) => (
            <button
              key={account.id}
              onClick={() => handleSelectAccount(account.id)}
              disabled={account.balance === 0}
              className={`w-full bg-[#211E1E] rounded-lg p-4 flex items-center justify-between transition-all ${
                account.balance > 0 
                  ? 'hover:bg-[#2a2626] active:scale-98 cursor-pointer' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: account.color }}
                >
                  <span className="text-2xl">{account.icon}</span>
                </div>
                <div className="text-left">
                  <p className="text-white text-base font-medium">{account.name}</p>
                  <p className="text-[#716860] text-sm">
                    {account.balance === 0 ? 'Insufficient balance' : 'Available to transfer'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-lg font-medium">{formatCurrency(account.balance)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectSource;
