import React from 'react';
import type { TabProps } from './types';

export const Tabs: React.FC<TabProps> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="border-b">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab
              ? 'text-red-600'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
