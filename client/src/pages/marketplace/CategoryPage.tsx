/**
 * Category page for browsing datasets by category
 */
import React from 'react';
import { useRoute } from 'wouter';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import DatasetCatalog from '@/components/marketplace/DatasetCatalog';

const CategoryPage: React.FC = () => {
  const [_, params] = useRoute('/category/:name');
  const categoryName = params?.name;
  
  return (
    <MarketplaceLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{categoryName ? decodeURIComponent(categoryName) : 'Category'} Datasets</h1>
          <p className="text-gray-600 mb-8">
            Browse our collection of high-quality datasets for the {categoryName ? decodeURIComponent(categoryName) : ''} industry.
          </p>
          <DatasetCatalog />
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default CategoryPage;
