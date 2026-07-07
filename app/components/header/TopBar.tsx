import React from 'react';
import type { SocialMedia } from './types';
import { Container } from '../ui/Container';

interface TopBarProps {
  phoneNumber: string;
  guaranteeText: string;
  socialMedia: SocialMedia[];
}

export function TopBar({ phoneNumber, guaranteeText, socialMedia }: TopBarProps) {
  return (
    <div className="section-red text-white text-sm py-1">
      <Container className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {socialMedia.map((social) => (
            <a
              key={social.name}
              href={social.url}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label={social.name}
            >
              <span className="sr-only">{social.name}</span>
              <span className="text-lg">
                {social.icon === 'facebook' && 'f'}
                {social.icon === 'twitter' && '𝕏'}
                {social.icon === 'youtube' && '▶'}
                {social.icon === 'instagram' && '📷'}
              </span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <span>{guaranteeText}</span>
          <span className="font-semibold">{phoneNumber}</span>
        </div>
      </Container>
    </div>
  );
}
