import React from 'react';

interface AccountCardProps {
  type: 'current' | 'savings' | 'pension';
  title: string;
  subtitle: string;
  amount: React.ReactNode;
  primaryAction?: string;
  primaryIcon?: string;
  secondaryIcon?: string;
  onCardClick?: () => void; // Entire card
  onPrimary?: () => void;   // Primary button (savings, pension)
  onSecondary?: () => void; // Secondary button (savings, pension)
}

export const AccountCard: React.FC<AccountCardProps> = ({
  type,
  title,
  subtitle,
  amount,
  primaryAction,
  primaryIcon,
  secondaryIcon,
  onCardClick,
  onPrimary,
  onSecondary,
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
  const getTextColor = () => type === 'pension' ? 'text-white' : 'text-[#211E1E]';

  // Entire card clickable only for current account
  const outerProps = type === 'current' && onCardClick
    ? { onClick: onCardClick, style: { cursor: 'pointer' } }
    : {};

  return (
    <article className={`w-full ${getBackgroundColor()} p-4 rounded-[9.142px] ${type === 'pension' ? 'rounded-[9px]' : ''}`} {...outerProps}>
      <div className={`flex w-full items-stretch gap-${type === 'pension' ? '5' : '1'} ${getTextColor()} font-normal justify-between`}>
        <div className={type === 'current' ? 'w-[188px]' : ''}>
          <h2 className={`${getTextColor()} text-[28px] leading-none`}>{title}</h2>
          <p className={`${getTextColor()} text-base leading-none mt-3`}>{subtitle}</p>
        </div>
        <div className="flex flex-col text-[27px] tracking-[0.55px] leading-none">
          <div className={getTextColor()}>{amount}</div>
        </div>
      </div>
      {/* Action Row for savings/pension ONLY */}
      {(type === 'savings' || type === 'pension') && (
        <div className="flex w-full gap-[40px_100px] justify-between mt-3">
          <button
            className="items-center flex gap-1.5 text-sm text-white font-normal leading-none bg-black pl-2.5 pr-3 py-2 rounded-[30.472px] hover:bg-gray-800 transition-colors"
            onClick={onPrimary}
            type="button"
          >
            {primaryIcon && (
              <img src={primaryIcon} className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto" alt="" />
            )}
            <span className="text-white self-stretch my-auto">{primaryAction}</span>
          </button>
          <button
            className="justify-center items-center flex min-h-8 gap-2 w-8 h-8 bg-black px-2 rounded-[400px] hover:bg-gray-800 transition-colors"
            onClick={onSecondary}
            aria-label="Account info"
            type="button"
          >
            {secondaryIcon && (
              <img src={secondaryIcon} className="aspect-[1] object-contain w-4 self-stretch my-auto" alt="" />
            )}
          </button>
        </div>
      )}
    </article>
  );
};
