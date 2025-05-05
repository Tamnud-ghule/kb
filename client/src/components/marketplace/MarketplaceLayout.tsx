/**
 * MarketplaceLayout component - Layout wrapper for marketplace pages
 * Provides consistent header, footer, and layout for all marketplace pages
 */
import React from 'react';
import MarketplaceHeader from './MarketplaceHeader';
import MarketplaceFooter from './MarketplaceFooter';

interface MarketplaceLayoutProps {
  children: React.ReactNode;
}

const MarketplaceLayout: React.FC<MarketplaceLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MarketplaceHeader />
      <main className="flex-grow">
        {children}
      </main>
      <MarketplaceFooter />
    </div>
  );
};

export default MarketplaceLayout;
