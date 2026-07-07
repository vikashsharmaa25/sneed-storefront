import React from 'react';

interface HeaderProps {
  breadcrumbs: { label: string; path?: string }[];
}

export const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => (
  <header className="bg-white border-b  py-3">
    <nav className="flex items-center gap-2 text-sm text-gray-600">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>/</span>}
          {breadcrumb.path ? (
            <a href={breadcrumb.path} className="hover:text-gray-900 cursor-pointer">
              {breadcrumb.label}
            </a>
          ) : (
            <span className="text-gray-900">{breadcrumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  </header>
);
