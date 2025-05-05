/**
 * Datasets page for browsing all available datasets
 */
import React from 'react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import DatasetCatalog from '@/components/marketplace/DatasetCatalog';

const DatasetsPage: React.FC = () => {
  return (
    <MarketplaceLayout>
      <DatasetCatalog />
    </MarketplaceLayout>
  );
};

export default DatasetsPage;
