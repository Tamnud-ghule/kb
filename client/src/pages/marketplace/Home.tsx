/**
 * Marketplace Home page
 */
import React from 'react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import HomePage from '@/components/marketplace/HomePage';

const MarketplaceHomePage: React.FC = () => {
  return (
    <MarketplaceLayout>
      <HomePage />
    </MarketplaceLayout>
  );
};

export default MarketplaceHomePage;
