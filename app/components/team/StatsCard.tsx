import React from 'react';
import type { StatsCardProps } from './types/team';

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, value, label }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

export default StatsCard;
