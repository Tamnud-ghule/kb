/**
 * DatasetCatalog component - Displays filterable catalog of available datasets
 * Allows sorting, filtering, and pagination of the dataset collection
 */
import React, { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const DatasetCatalog: React.FC = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Sample dataset catalog
  const datasets = [
    {
      id: 1,
      title: 'Healthcare Industry Metrics',
      description: 'Comprehensive healthcare industry data including patient outcomes, costs, and provider metrics.',
      category: 'Healthcare',
      price: '$2,499',
      compliance: ['HIPAA', 'GDPR', 'CCPA'],
      recordCount: '2.3 million',
    },
    {
      id: 2,
      title: 'Financial Compliance Dataset',
      description: 'Banking and financial industry compliance records and regulatory frameworks.',
      category: 'Finance',
      price: '$1,999',
      compliance: ['GLBA', 'PCI-DSS', 'SOX'],
      recordCount: '1.8 million',
    },
    {
      id: 3,
      title: 'Consumer Behavior Analytics',
      description: 'Anonymized consumer behavior data with demographic insights and purchasing patterns.',
      category: 'Market Research',
      price: '$3,499',
      compliance: ['GDPR', 'CCPA'],
      recordCount: '4.2 million',
    },
    {
      id: 4,
      title: 'Legal Precedent Collection',
      description: 'Structured legal case data with outcomes, jurisdictions, and compliance implications.',
      category: 'Legal',
      price: '$2,799',
      compliance: ['GDPR'],
      recordCount: '1.5 million',
    },
    {
      id: 5,
      title: 'Manufacturing Supply Chain Data',
      description: 'Global manufacturing supply chain patterns, logistics, and efficiency metrics.',
      category: 'Manufacturing',
      price: '$3,299',
      compliance: ['ISO 27001'],
      recordCount: '2.8 million',
    },
    {
      id: 6,
      title: 'Retail Industry Benchmarks',
      description: 'Retail industry performance metrics, customer engagement data, and sales patterns.',
      category: 'Retail',
      price: '$2,199',
      compliance: ['PCI-DSS', 'CCPA'],
      recordCount: '3.1 million',
    },
    {
      id: 7,
      title: 'Healthcare Provider Performance',
      description: 'Performance metrics for healthcare providers including patient satisfaction and outcomes.',
      category: 'Healthcare',
      price: '$1,899',
      compliance: ['HIPAA', 'GDPR'],
      recordCount: '1.7 million',
    },
    {
      id: 8,
      title: 'Financial Markets Historical Data',
      description: 'Historical financial market data with pricing, volumes, and market events.',
      category: 'Finance',
      price: '$4,299',
      compliance: ['GDPR'],
      recordCount: '5.3 million',
    },
  ];

  // Available categories
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Market Research', label: 'Market Research' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Retail', label: 'Retail' },
  ];

  // Compliance filters
  const complianceOptions = [
    { id: 'hipaa', label: 'HIPAA' },
    { id: 'gdpr', label: 'GDPR' },
    { id: 'ccpa', label: 'CCPA' },
    { id: 'pci', label: 'PCI-DSS' },
    { id: 'sox', label: 'SOX' },
    { id: 'iso', label: 'ISO 27001' },
  ];

  // Filter datasets
  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || dataset.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dataset Catalog</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse our comprehensive collection of enterprise-grade datasets. All datasets are fully compliant 
            with relevant regulations and available in multiple formats.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <Input
                id="search"
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <Select defaultValue="relevance">
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Compliance Filters</p>
            <div className="flex flex-wrap gap-4">
              {complianceOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox id={option.id} />
                  <label htmlFor={option.id} className="text-sm text-gray-600 cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            {filteredDatasets.length} {filteredDatasets.length === 1 ? 'dataset' : 'datasets'} found
          </p>
        </div>

        {/* Dataset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredDatasets.map((dataset) => (
            <Card key={dataset.id} className="overflow-hidden h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle>{dataset.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Category: {dataset.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-700 mb-4">{dataset.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {dataset.compliance.map((compliance, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {compliance}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">{dataset.recordCount} records</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="font-medium">{dataset.price}</div>
                <Link href={`/dataset/${dataset.id}`}>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-100">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetCatalog;
