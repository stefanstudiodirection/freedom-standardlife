import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAccounts, AccountType } from '@/contexts/AccountContext';

const SelectDestination: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accounts } = useAccounts();

  if (!location.state?.sourceAccount) {
    navigate('/', { replace: true });
    return null;
  }

  const sourceAccount = location.state.sourceAccount as AccountType;
  
  // Filter out the source account from destinations
  const availableDestinations = (Object.keys(accounts) as AccountType[])
    .filter(accountId => accountId !== sourceAccount);

  const handleDestinationSelect = (destinationAccount: AccountType) => {
    navigate('/move-funds', {
      state: {
        sourceAccount,
        destinationAccount
      }
    });
  };

  const accountLabels: Record<AccountType, string> = {
    currentAccount: 'Current Account',
    savings: 'Savings',
    pension: 'Pension'
  };

  return (
    <div className="min-h-screen bg-black text-white max-w-[480px] mx-auto flex flex-col">
      <div className="px-4 py-6">
        <button className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold mb-6">Select destination</h1>
        <div className="space-y-3">
          {availableDestinations.map(accountId => {
            const account = accounts[accountId];
            return (
              <button
                key={accountId}
                onClick={() => handleDestinationSelect(accountId)}
                className="w-full bg-[#211E1E] rounded-lg p-4 flex items-center justify-between hover:bg-[#2a2626] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: account.color }}
                  >
                    <span className="text-2xl">{account.icon}</span>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">{accountLabels[accountId]}</p>
                    <p className="text-[#716860] text-sm">£{account.balance.toFixed(2)}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectDestination;
