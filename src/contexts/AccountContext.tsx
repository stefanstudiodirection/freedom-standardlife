import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AccountType = 'pension' | 'savings' | 'currentAccount';

export interface Account {
  id: AccountType;
  name: string;
  icon: string;
  balance: number;
  color: string;
}

interface AccountContextType {
  accounts: Record<AccountType, Account>;
  updateBalance: (accountId: AccountType, newBalance: number) => void;
  transferFunds: (from: AccountType, to: AccountType, amount: number) => void;
  getAccount: (accountId: AccountType) => Account;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const INITIAL_ACCOUNTS: Record<AccountType, Account> = {
  pension: {
    id: 'pension',
    name: 'Pension',
    icon: '💰',
    balance: 48750.00,
    color: '#FFFFFF'
  },
  savings: {
    id: 'savings',
    name: 'Savings',
    icon: '🐷',
    balance: 16250.00,
    color: '#A488F5'
  },
  currentAccount: {
    id: 'currentAccount',
    name: 'Current Account',
    icon: '💳',
    balance: 74500.00,
    color: '#60A5FA'
  }
};

const STORAGE_KEY = 'account_balances';

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Record<AccountType, Account>>(() => {
    // Load from localStorage on initialization
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          ...INITIAL_ACCOUNTS,
          pension: { ...INITIAL_ACCOUNTS.pension, balance: parsed.pension || INITIAL_ACCOUNTS.pension.balance },
          savings: { ...INITIAL_ACCOUNTS.savings, balance: parsed.savings || INITIAL_ACCOUNTS.savings.balance },
          currentAccount: { ...INITIAL_ACCOUNTS.currentAccount, balance: parsed.currentAccount || INITIAL_ACCOUNTS.currentAccount.balance }
        };
      } catch (e) {
        return INITIAL_ACCOUNTS;
      }
    }
    return INITIAL_ACCOUNTS;
  });

  // Persist to localStorage whenever accounts change
  useEffect(() => {
    const balances = {
      pension: accounts.pension.balance,
      savings: accounts.savings.balance,
      currentAccount: accounts.currentAccount.balance
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(balances));
  }, [accounts]);

  const updateBalance = (accountId: AccountType, newBalance: number) => {
    setAccounts(prev => ({
      ...prev,
      [accountId]: {
        ...prev[accountId],
        balance: newBalance
      }
    }));
  };

  const transferFunds = (from: AccountType, to: AccountType, amount: number) => {
    setAccounts(prev => ({
      ...prev,
      [from]: {
        ...prev[from],
        balance: prev[from].balance - amount
      },
      [to]: {
        ...prev[to],
        balance: prev[to].balance + amount
      }
    }));
  };

  const getAccount = (accountId: AccountType): Account => {
    return accounts[accountId];
  };

  return (
    <AccountContext.Provider value={{ accounts, updateBalance, transferFunds, getAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccounts must be used within an AccountProvider');
  }
  return context;
};
