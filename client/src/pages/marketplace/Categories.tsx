/**
 * Categories page for browsing all dataset categories
 */
import React from 'react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import CategoriesPage from '@/components/marketplace/CategoriesPage';

const Categories: React.FC = () => {
  return (
    <MarketplaceLayout>
      <CategoriesPage />
    </MarketplaceLayout>
  );
};

export default Categories;
