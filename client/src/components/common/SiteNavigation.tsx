/**
 * SiteNavigation component - Global navigation that appears on all pages
 * Provides navigation between landing page and marketplace
 */
import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';

const SiteNavigation: React.FC = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isMarketplaceRoute = location.startsWith('/marketplace') || 
                            location.startsWith('/datasets') || 
                            location.startsWith('/dataset/') ||
                            location.startsWith('/category/');

  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <span className={`text-sm hover:text-gray-300 cursor-pointer ${location === '/' ? 'font-medium' : ''}`}>
                Landing Page
              </span>
            </Link>
            <Link href="/marketplace">
              <span className={`text-sm hover:text-gray-300 cursor-pointer ${isMarketplaceRoute ? 'font-medium' : ''}`}>
                Data Marketplace
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
            <a href="#" className="hover:text-gray-300">Support</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-300 hover:text-white" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <svg 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link href="/">
              <span className="block text-white hover:text-gray-300 cursor-pointer">
                Landing Page
              </span>
            </Link>
            <Link href="/marketplace">
              <span className="block text-white hover:text-gray-300 cursor-pointer">
                Data Marketplace
              </span>
            </Link>
            <div className="block text-white hover:text-gray-300 cursor-pointer">About</div>
            <div className="block text-white hover:text-gray-300 cursor-pointer">Contact</div>
            <div className="block text-white hover:text-gray-300 cursor-pointer">Support</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteNavigation;
