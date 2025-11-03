import React from 'react';
import { MercerLogo } from './MercerLogo';
import { ArrowRight } from 'lucide-react';

interface AccountCardProps {
  type: 'current' | 'savings' | 'pension';
  accountName: string;
  subtitle: string;
  balance: React.ReactNode;
  onClick: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  type,
  accountName,
  subtitle,
  balance,
  onClick
}) => {

  const getBackgroundColor = () => {
    switch (type) {
      case 'current':
        return 'bg-[#E4B33D]';
      case 'savings':
        return 'bg-[#A488F5]';
      case 'pension':
        return 'bg-[rgba(33,30,30,1)]';
      default:
        return 'bg-gray-500';
    }
  };

  const getTextColor = () => {
    return type === 'pension' ? 'text-white' : 'text-[#211E1E]';
  };

  const getPaddingClass = () => {
    if (type === 'pension' || type === 'savings') {
      return 'p-4 pb-[40px]';
    }
    return 'p-4';
  };

  const getZIndex = () => {
    switch (type) {
      case 'pension':
        return 'z-10';
      case 'savings':
        return 'z-20';
      case 'current':
        return 'z-30';
      default:
        return 'z-0';
    }
  };

  return (
    <article 
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      className={`w-full ${getBackgroundColor()} ${getPaddingClass()} ${getZIndex()} rounded-[9px] cursor-pointer transition-opacity relative`}
    >
      {/* Top section: Logo | Balance */}
      <div className="flex justify-between items-start mb-3">
        <MercerLogo className={getTextColor()} />
        <div className={`text-[20px] ${getTextColor()} font-normal leading-none tracking-[0.55px]`}>
          {balance}
        </div>
      </div>

      {/* Middle section: Account name + Subtitle */}
      <div>
        <h2 className={`${getTextColor()} text-[18px] font-medium leading-tight`}>
          {accountName}
        </h2>
        <p className={`${getTextColor()} text-sm mt-1 leading-tight`}>
          {subtitle}
        </p>
      </div>

      {/* Bottom section: Only for Current Account */}
      {type === 'current' && (
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#211E1E]/10">
          <span className="text-sm text-[#211E1E]">Funds available to spend</span>
          <button 
            className="flex items-center gap-1 text-sm text-[#211E1E] font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            See more
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </article>
  );
};
