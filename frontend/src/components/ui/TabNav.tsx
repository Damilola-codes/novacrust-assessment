'use client';

interface TabItem {
  id: string;
  label: string;
}

interface TabNavProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

const TabNav = ({ tabs, activeTab, onChange }: TabNavProps) => {
  return (
    <div className="flex w-full bg-gray-100 rounded-full p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`
            flex-1 px-2 sm:px-3 md:px-4 py-2 text-[10px] sm:text-xs md:text-sm font-medium rounded-full transition-all duration-200
            text-center whitespace-nowrap
            ${
              activeTab === tab.id
                ? 'bg-[#013941] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }
          `}
          role="tab"
          aria-selected={activeTab === tab.id}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNav;
