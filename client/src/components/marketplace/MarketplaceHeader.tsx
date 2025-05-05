/**
 * MarketplaceHeader component - Navigation header for the data marketplace
 * Provides navigation links, search, and user controls
 */
import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MarketplaceHeader: React.FC = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Searching for:', searchQuery);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Datasets', href: '/datasets' },
    { label: 'Categories', href: '/categories' },
    { label: 'Compliance', href: '/compliance' },
    { label: 'Custom Solutions', href: '/custom-solutions' },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold text-gray-900 cursor-pointer">DataSecure</span>
              </Link>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location === item.href ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>

          {/* Search */}
          <div className="flex-1 flex items-center justify-center px-2 md:ml-6 md:justify-end">
            <div className="max-w-lg w-full">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search datasets..."
                  className="sm:text-sm border-gray-300 rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="absolute inset-y-0 right-0 flex items-center mr-1"
                >
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Button>
              </form>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Link href="/contact">
              <Button variant="outline" size="sm" className="mr-2">
                Contact Us
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gray-900 text-white hover:bg-gray-800" size="sm">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${location === item.href ? 'border-gray-900 text-gray-900 bg-gray-50' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <Link href="/contact">
              <Button variant="outline" size="sm" className="mr-2 w-full">
                Contact Us
              </Button>
            </Link>
          </div>
          <div className="mt-3 px-4">
            <Link href="/login">
              <Button className="bg-gray-900 text-white hover:bg-gray-800" size="sm" className="w-full">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MarketplaceHeader;
