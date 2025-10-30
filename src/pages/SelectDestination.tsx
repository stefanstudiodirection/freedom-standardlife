import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAccounts, AccountType } from '@/contexts/AccountContext';

export const SelectDestination: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accounts } = useAccounts();
  const { sourceAccount } = location.state as { sourceAccount: AccountType };

  const handleBack = () => {
    navigate('/select-source');
  };

  const handleSelectAccount = (accountId: AccountType) => {
    navigate('/move-funds', { 
      state: { 
        sourceAccount, 
        destinationAccount: accountId 
      } 
    });
  };

  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString('en-GB', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  // Filter out the source account
  const availableAccounts = Object.values(accounts).filter(
    account => account.id !== sourceAccount
  );

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
          <h1 className="flex-1 text-center text-lg font-medium pr-12">Select destination account</h1>
        </header>

        <p className="text-[#716860] text-base mb-6 text-center">Choose where to move the money to</p>

        {/* Selected Source Account */}
        <div className="mb-6">
          <p className="text-[#716860] text-sm mb-2">Moving from:</p>
          <div className="bg-[#211E1E] rounded-lg p-4 flex items-center gap-3 border-2 border-[#A488F5]">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: accounts[sourceAccount].color }}
            >
              <span className="text-2xl">{accounts[sourceAccount].icon}</span>
            </div>
            <div>
              <p className="text-white text-base font-medium">{accounts[sourceAccount].name}</p>
              <p className="text-[#716860] text-sm">{formatCurrency(accounts[sourceAccount].balance)}</p>
            </div>
          </div>
        </div>

        {/* Destination Account Cards */}
        <p className="text-[#716860] text-sm mb-3">Select destination:</p>
        <div className="space-y-4">
          {availableAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => handleSelectAccount(account.id)}
              className="w-full bg-[#211E1E] rounded-lg p-4 flex items-center justify-between hover:bg-[#2a2626] active:scale-98 transition-all cursor-pointer"
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
                  <p className="text-[#716860] text-sm">Current balance</p>
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

export default SelectDestination;
