/**
 * CategoriesPage component - Displays all available dataset categories
 * Allows users to browse categories and view related datasets
 */
import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CategoriesPage: React.FC = () => {
  // Sample categories with descriptions and dataset counts
  const categories = [
    {
      id: 'healthcare',
      name: 'Healthcare',
      description: 'Medical and healthcare related datasets including patient outcomes, provider metrics, and compliance records.',
      count: 12,
      icon: (
        <svg className="h-10 w-10 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9.5 7h.01M12.5 7h.01M15.5 7h.01M12 2v5" />
        </svg>
      ),
    },
    {
      id: 'finance',
      name: 'Finance',
      description: 'Financial industry datasets covering banking, investment, market trends, and regulatory compliance data.',
      count: 15,
      icon: (
        <svg className="h-10 w-10 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'legal',
      name: 'Legal',
      description: 'Legal datasets including case outcomes, compliance frameworks, jurisdictional patterns, and regulatory changes.',
      count: 8,
      icon: (
        <svg className="h-10 w-10 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
    {
      id: 'market-research',
      name: 'Market Research',
      description: 'Consumer behavior, market trends, and demographic insights for market analysis and business intelligence.',
      count: 18,
      icon: (
        <svg className="h-10 w-10 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      description: 'Manufacturing and supply chain datasets covering production metrics, logistics, and quality assurance data.',
      count: 9,
      icon: (
        <svg className="h-10 w-10 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      id: 'retail',
      name: 'Retail',
      description: 'Retail industry datasets covering sales patterns, customer engagement metrics, and inventory management data.',
      count: 11,
      icon: (
        <svg className="h-10 w-10 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      id: 'technology',
      name: 'Technology',
      description: 'Technology industry datasets covering usage patterns, development metrics, and technology adoption trends.',
      count: 14,
      icon: (
        <svg className="h-10 w-10 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'government',
      name: 'Government',
      description: 'Government and public sector datasets covering policy outcomes, public programs, and administrative records.',
      count: 7,
      icon: (
        <svg className="h-10 w-10 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dataset Categories</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse our dataset categories to find the specific industry data you need.
            All datasets are fully compliant with relevant regulations.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    {category.icon}
                  </div>
                  <CardTitle className="text-center">{category.name}</CardTitle>
                  <CardDescription className="text-center text-sm">
                    {category.count} datasets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-center">
                  <span className="text-sm text-gray-900 font-medium">Browse {category.name} Datasets</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Collections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Compliance Bundle</CardTitle>
                <CardDescription>Datasets focused on regulatory compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">A collection of datasets curated for compliance officers and legal teams. Includes regulatory frameworks and compliance records across industries.</p>
              </CardContent>
              <CardFooter>
                <Link href="/collection/compliance">
                  <a className="text-sm font-medium text-gray-900 hover:text-gray-700">View Collection →</a>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Market Intelligence</CardTitle>
                <CardDescription>Strategic market insights and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Comprehensive market data for business intelligence and strategic planning. Includes consumer behavior, market trends, and competitive analysis.</p>
              </CardContent>
              <CardFooter>
                <Link href="/collection/market-intelligence">
                  <a className="text-sm font-medium text-gray-900 hover:text-gray-700">View Collection →</a>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Industry Benchmarks</CardTitle>
                <CardDescription>Performance metrics across sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Benchmark datasets for comparing performance across industries. Includes operational metrics, financial indicators, and efficiency standards.</p>
              </CardContent>
              <CardFooter>
                <Link href="/collection/benchmarks">
                  <a className="text-sm font-medium text-gray-900 hover:text-gray-700">View Collection →</a>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* How to Get Started */}
        <div className="bg-gray-100 rounded-lg p-6 lg:p-8">
          <h2 className="text-2xl font-bold mb-4">How to Get Started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white font-bold mb-3">
                1
              </div>
              <h3 className="font-semibold">Browse Categories</h3>
              <p className="text-sm text-gray-600">Explore our categories to find datasets relevant to your industry and needs.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white font-bold mb-3">
                2
              </div>
              <h3 className="font-semibold">Review Dataset Details</h3>
              <p className="text-sm text-gray-600">Check dataset specifications, compliance information, and sample data.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white font-bold mb-3">
                3
              </div>
              <h3 className="font-semibold">Purchase and Access</h3>
              <p className="text-sm text-gray-600">Purchase datasets that meet your requirements and access them securely.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
