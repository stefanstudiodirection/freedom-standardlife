import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/a6daff8d7bd3b396d271e312de45b79311c1b63a?placeholderIfAbsent=true",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/f8ba64ad23f68d022a937317c7be6d0e67efc038?placeholderIfAbsent=true",
  },
  {
    id: "profile",
    label: "Profile",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/a7837c9af3a4010d10c1046ae1d5d96506f81c8a?placeholderIfAbsent=true",
  },
  {
    id: "help",
    label: "Help",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/54b011995275f1f095d5c9fad639ec7ff2f8013f?placeholderIfAbsent=true",
  },
];

export const BottomNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <nav className="items-center flex w-full text-sm text-white font-normal whitespace-nowrap text-center leading-[1.2] bg-black pt-4 pb-6 px-2 border-t-[rgba(113,104,96,0.30)] border-t border-solid fixed bottom-0 left-0 right-0 z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`self-stretch flex flex-col items-center flex-1 shrink basis-[0%] my-auto hover:opacity-80 transition-opacity ${
            activeTab === item.id ? "text-white" : "text-gray-400"
          }`}
          onClick={() => handleTabClick(item.id)}
          aria-pressed={activeTab === item.id}
        >
          <img src={item.icon} className="aspect-[1] object-contain w-6" alt="" />
          <span className={`mt-2 ${activeTab === item.id ? "text-white" : "text-gray-400"}`}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
