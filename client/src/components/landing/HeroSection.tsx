/**
 * HeroSection component - Full-viewport landing section with main headline and CTAs
 * Features a grayscale gradient background with primary and secondary action buttons
 */
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <header className="relative min-h-screen flex items-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/10 to-gray-900/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Enterprise-Grade Data, <br className="hidden sm:block"/>Zero Risk.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-10">
          On-demand, fully compliant datasets—collected, validated, encrypted, and delivered by security-first experts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm transition-colors">
            Get Your Free Preview
          </button>
          <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm transition-colors">
            Speak with a Data Specialist
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
