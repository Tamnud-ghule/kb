/**
 * Homepage component for the Data Marketplace
 * Displays featured datasets and main navigation
 */
import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HomePage: React.FC = () => {
  // Sample featured datasets
  const featuredDatasets = [
    {
      id: 1,
      title: 'Healthcare Industry Metrics',
      description: 'Comprehensive healthcare industry data including patient outcomes, costs, and provider metrics.',
      category: 'Healthcare',
      price: '$2,499',
    },
    {
      id: 2,
      title: 'Financial Compliance Dataset',
      description: 'Banking and financial industry compliance records and regulatory frameworks.',
      category: 'Finance',
      price: '$1,999',
    },
    {
      id: 3,
      title: 'Consumer Behavior Analytics',
      description: 'Anonymized consumer behavior data with demographic insights and purchasing patterns.',
      category: 'Market Research',
      price: '$3,499',
    },
    {
      id: 4,
      title: 'Legal Precedent Collection',
      description: 'Structured legal case data with outcomes, jurisdictions, and compliance implications.',
      category: 'Legal',
      price: '$2,799',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Secure Enterprise Data Marketplace
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Access compliant, encrypted datasets tailored for your industry needs.
              </p>
            </div>
            <div className="space-x-4">
              <Button className="bg-gray-900 text-white">
                Browse Datasets
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Browse by Category
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg">
                Explore our comprehensive collection of enterprise-grade datasets.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8">
              <Link href="/category/healthcare">
                <div className="flex flex-col items-center p-4 sm:p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                  <svg className="h-8 w-8 mb-2 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span className="font-medium">Healthcare</span>
                </div>
              </Link>
              <Link href="/category/finance">
                <div className="flex flex-col items-center p-4 sm:p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                  <svg className="h-8 w-8 mb-2 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Finance</span>
                </div>
              </Link>
              <Link href="/category/legal">
                <div className="flex flex-col items-center p-4 sm:p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                  <svg className="h-8 w-8 mb-2 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <span className="font-medium">Legal</span>
                </div>
              </Link>
              <Link href="/category/market-research">
                <div className="flex flex-col items-center p-4 sm:p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                  <svg className="h-8 w-8 mb-2 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Market Research</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Datasets Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Featured Datasets
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg">
              Our most popular and comprehensive datasets across industries.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDatasets.map((dataset) => (
              <Card key={dataset.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>{dataset.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    Category: {dataset.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{dataset.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="font-medium">{dataset.price}</div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline">View All Datasets</Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Find Exactly What You Need
              </h2>
              <p className="text-gray-500 md:text-lg">
                Our advanced search allows you to filter by industry, compliance requirements, data freshness, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-gray-900 text-white">Advanced Search</Button>
                <Button variant="outline">Custom Dataset Request</Button>
              </div>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg">
              <div className="space-y-2 text-center mb-4">
                <h3 className="text-xl font-bold">Recent Additions</h3>
                <p className="text-sm text-gray-500">New datasets added in the last 30 days</p>
              </div>
              <ul className="space-y-2">
                <li className="p-3 bg-white rounded-md flex justify-between items-center">
                  <span>Global Supply Chain Metrics</span>
                  <span className="text-sm bg-gray-200 px-2 py-1 rounded">New</span>
                </li>
                <li className="p-3 bg-white rounded-md flex justify-between items-center">
                  <span>Pharmaceutical Industry Compliance</span>
                  <span className="text-sm bg-gray-200 px-2 py-1 rounded">New</span>
                </li>
                <li className="p-3 bg-white rounded-md flex justify-between items-center">
                  <span>Retail Banking Customer Insights</span>
                  <span className="text-sm bg-gray-200 px-2 py-1 rounded">New</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
