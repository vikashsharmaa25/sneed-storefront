import React from 'react';
import type { TeamHeroProps } from './types/team';

const TeamHero: React.FC<TeamHeroProps> = ({
  image,
  title = 'Meet The Team',
  subtitle = 'Passionate professionals dedicated to innovation and excellence, working together to bring your vision to life',
}) => {
  return (
    <div className="relative h-screen section-red overflow-hidden">
      <img
        src={image}
        alt="Team"
        className="w-full h-full object-contain opacity-80"
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-red-600/30"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg max-w-2xl text-center px-4">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default TeamHero;
