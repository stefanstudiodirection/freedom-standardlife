import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAccounts, AccountType } from "@/contexts/AccountContext";
import { ArrowLeft } from "lucide-react";

const accountConfig: Record<AccountType, {
  display: string;
  subtitle: string;
  showCard: boolean;
  actions?: { label: string; icon: React.ReactNode; }[];
  moveFundsButton?: boolean;
}> = {
  currentAccount: {
    display: "Current account",
    subtitle: "Funds available to spend",
    showCard: true,
    actions: [
      { label: "Transfer", icon: <span /> },
      { label: "Request", icon: <span /> },
      { label: "Exchange", icon: <span /> },
      { label: "Top up", icon: <span /> },
      { label: "Withdraw", icon: <span /> },
    ],
  },
  savings: {
    display: "Savings account",
    subtitle: "High Interest Savings (Tax Free)",
    showCard: false,
    moveFundsButton: true
  },
  pension: {
    display: "Pension",
    subtitle: "Your Pension and Investments",
    showCard: false,
    moveFundsButton: true
  }
};

function formatCurrency(value: number) {
  return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date: Date) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.toLocaleString('en-GB', { month: 'short' });
  const year = d.getFullYear();
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  return `${day} ${month} ${year}, ${time}`;
}

const AccountDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { accounts, transactions } = useAccounts();
  const accountId = (id as AccountType);

  if (!accountId || !(accountId in accounts)) {
    return <div className="text-white p-8">Invalid account</div>;
  }

  const config = accountConfig[accountId];
  const account = accounts[accountId];
  const filteredTransactions = transactions
    .filter(t => t.account === accountId)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleMoveFunds = () => {
    navigate('/select-destination', {
      state: {
        sourceAccount: accountId
      }
    });
  };


  return (
    <div className="min-h-screen bg-black text-white max-w-[480px] mx-auto flex flex-col">
      <div className="px-4 py-6 flex flex-col flex-1">
        <button className="mb-4" onClick={() => navigate('/')}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <div className="mb-2 text-sm opacity-50">{config.display}</div>
          <div className="text-2xl mb-1 font-semibold">{config.display}</div>
          <div className="mb-4 text-sm opacity-80">{config.subtitle}</div>
          <div className="rounded-lg bg-[#181818] flex items-center justify-between px-4 py-3 mb-4">
            <div className="flex items-center gap-2">{/* TODO: Icon if needed */}
              <span className="font-medium">Balance</span>
            </div>
            <div className="text-lg ml-2 font-semibold">{formatCurrency(account.balance)}</div>
          </div>
          {config.showCard && (
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl p-4 flex flex-col items-start justify-center mb-4">
              <div className="mb-2 text-white font-semibold">Peter Smith</div>
              <div className="flex gap-2 text-white mb-2 items-center">
                <span className="tracking-widest text-lg font-mono">•••• 4562</span>
                {/* Optionally add ellipsis/menu icon here */}
              </div>
              <div className="flex justify-between w-full mb-1">
                <span className="text-xs font-mono text-white opacity-80">Valid 04/28</span>
                <span className="text-xs font-mono text-white opacity-80">CVV ***</span>
              </div>
              <div className="flex justify-between w-full mt-2 items-center">
                <span className="text-white font-medium text-xs">Mercer</span>
                <span className="text-white font-bold text-xs">freedom</span>
              </div>
            </div>
          )}
          {/* Actions */}
          {config.actions && (
            <div className="flex w-full justify-between gap-2 mb-6">
              {config.actions.map(action => (
                <div key={action.label} className="flex flex-col items-center text-yellow-300 text-xs font-medium gap-1 w-full">
                  <button className="bg-[#181818] w-12 h-12 rounded-lg flex items-center justify-center mb-1"><span className="text-lg">{action.icon}</span></button>
                  {action.label}
                </div>
              ))}
            </div>
          )}
          {config.moveFundsButton && (
            <button onClick={handleMoveFunds} className="w-full py-3 bg-[#A488F5] rounded-lg mb-4 font-semibold text-black text-base">Move funds</button>
          )}
          {/* TRANSACTIONS */}
          <div className="mt-6">
            <div className="font-semibold mb-3">Transactions</div>
            {filteredTransactions.length === 0 ? (
              <div className="opacity-50 text-sm">No transactions</div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredTransactions.map(tr => (
                  <div key={tr.id} className="flex items-center justify-between bg-[#181818] rounded-lg px-3 py-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-0.5">
                        {tr.type === "withdrawal" && <span className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center">↓</span>}
                        {tr.type === "topup" && <span className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center">↑</span>}
                        {tr.type === "transfer" && <span className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center">⇄</span>}
                        <span className="font-bold text-xs">{tr.type.charAt(0).toUpperCase() + tr.type.slice(1)}</span>
                      </div>
                      <span className="text-xs opacity-70">{formatDate(tr.date)}</span>
                    </div>
                    <div className={`text-right text-base font-medium ${tr.amount > 0 ? 'text-[#A488F5]' : 'text-white'}`}>
                      {tr.amount > 0 ? '+ ' : '- '}{formatCurrency(Math.abs(tr.amount))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
