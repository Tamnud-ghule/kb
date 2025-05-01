/**
 * Navbar component - Responsive navigation bar for the landing page
 * Features mobile-friendly dropdown menu and smooth scrolling to sections
 */
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm z-10 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold tracking-tight">DataSecure</span>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('industries')} 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Industries
            </button>
            <button 
              onClick={() => scrollToSection('security')} 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Security
            </button>
            <button 
              onClick={() => scrollToSection('faqs')} 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              FAQs
            </button>
          </div>
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => scrollToSection('contact')} 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Contact Us
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMobileMenu}
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500" 
              aria-controls="mobile-menu" 
              aria-expanded="false"
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
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('industries')} 
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            Industries
          </button>
          <button 
            onClick={() => scrollToSection('security')} 
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            Security
          </button>
          <button 
            onClick={() => scrollToSection('faqs')} 
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            FAQs
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
