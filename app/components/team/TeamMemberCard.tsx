import React from 'react';
import type { TeamMember } from './types/team';
import { cn } from '../ui/cn';

interface TeamMemberCardProps extends TeamMember {
  className?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  image,
  bio,
  className = '',
}) => {
  return (
    <div className={cn(
      'rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1',
      className
    )}>
      <div className="aspect-w-3 aspect-h-4 bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-red-600 text-sm font-medium mb-3">{role}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
