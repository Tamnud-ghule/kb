/**
 * Category page for browsing datasets by category
 */
import React from 'react';
import { useRoute } from 'wouter';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import DatasetCatalog from '@/components/marketplace/DatasetCatalog';
import { Button } from '@/components/ui/button';

const CategoryPage: React.FC = () => {
  // Get the category from the URL
  const [match, params] = useRoute('/category/:name');
  const categoryName = params?.name || '';

  // Format category name for display
  const formatCategoryName = (name: string) => {
    switch (name) {
      case 'finance':
        return 'Finance & Banking';
      case 'healthcare':
        return 'Healthcare & Medical';
      case 'retail':
        return 'Retail & E-commerce';
      case 'logistics':
        return 'Logistics & Supply Chain';
      case 'realestate':
        return 'Real Estate & Property';
      case 'technology':
        return 'Technology & Innovation';
      case 'manufacturing':
        return 'Manufacturing & Production';
      case 'energy':
        return 'Energy & Utilities';
      case 'marketing':
        return 'Marketing & Advertising';
      default:
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  const displayName = formatCategoryName(categoryName);

  return (
    <MarketplaceLayout>
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start">
          <div>
            <div className="flex items-center mb-2">
              <a href="/categories" className="text-gray-500 hover:text-gray-900 mr-2">
                Categories
              </a>
              <svg className="w-4 h-4 text-gray-500 mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900">{displayName}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{displayName} Datasets</h1>
            <p className="text-gray-500 max-w-2xl">
              Browse our collection of high-quality {displayName.toLowerCase()} datasets for your business intelligence needs.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-gray-900 text-white">Request Custom Dataset</Button>
          </div>
        </div>

        {/* Using the DatasetCatalog component with category filter*/}
        <DatasetCatalog />
      </div>
    </MarketplaceLayout>
  );
};

export default CategoryPage;
