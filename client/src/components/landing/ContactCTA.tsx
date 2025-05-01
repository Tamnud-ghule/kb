/**
 * ContactCTA component - Call-to-action section with primary and secondary buttons
 * Encourages users to engage with the service through clear action prompts
 */
import React from 'react';

const ContactCTA: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Data Strategy?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Take the first step toward more secure, compliant, and valuable data resources for your organization.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm transition-colors">
            Schedule a 15-Minute Call
          </button>
          <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm transition-colors">
            Get Free Preview
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
