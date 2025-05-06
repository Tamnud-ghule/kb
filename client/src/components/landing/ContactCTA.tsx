/**
 * ContactCTA component - Contact form with call scheduling option
 * Allows users to send messages and schedule calls with the team
 */
import React, { useState } from 'react';
import { Calendar, Clock, Loader2, Mail, User, Building } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { InsertContactRequest } from '@shared/schema';

const ContactCTA: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<InsertContactRequest, 'id'>>({ 
    name: '',
    email: '',
    company: '',
    message: '',
    scheduleCall: false,
    preferredDate: undefined
  });
  
  const [showCallOptions, setShowCallOptions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const contactMutation = useMutation({
    mutationFn: async (data: Omit<InsertContactRequest, 'id'>) => {
      const res = await apiRequest('POST', '/api/contact', data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully",
        description: formData.scheduleCall 
          ? "We'll contact you shortly to confirm your call." 
          : "Thank you for your message. Our team will get back to you soon.",
      });
      
      // Reset form
      setFormData({ 
        name: '',
        email: '',
        company: '',
        message: '',
        scheduleCall: false,
        preferredDate: undefined
      });
      setShowForm(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Make a copy of form data to transform the date properly
    const submissionData = {...formData};
    
    // Convert preferredDate string to a Date object if it exists
    if (submissionData.preferredDate && typeof submissionData.preferredDate === 'string') {
      submissionData.preferredDate = new Date(submissionData.preferredDate);
    }
    
    contactMutation.mutate(submissionData);
  };
  
  const handleScheduleCall = () => {
    setShowCallOptions(true);
    setShowForm(true);
    setFormData(prev => ({ ...prev, scheduleCall: true }));
  };
  
  const handleContactTeam = () => {
    setShowCallOptions(false);
    setShowForm(true);
    setFormData(prev => ({ ...prev, scheduleCall: false }));
  };
  
  return (
    <section id="contact" className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Data Strategy?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Take the first step toward more secure, compliant, and valuable data resources for your organization.
        </p>
        
        {!showForm ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button 
              onClick={handleScheduleCall}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm transition-colors"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a 15-Minute Call
            </button>
            <button 
              onClick={handleContactTeam}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Team
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-10">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {showCallOptions ? 'Schedule a Call' : 'Contact Us'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Full Name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="company" className="block text-left text-sm font-medium text-gray-700">Company</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company || ''}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Your Organization"
                  />
                </div>
              </div>
              
              {showCallOptions && (
                <div className="space-y-2">
                  <label htmlFor="preferredDate" className="block text-left text-sm font-medium text-gray-700">Preferred Date & Time</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="datetime-local"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate?.toString() || ''}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-left text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  placeholder={showCallOptions ? "Please tell us about your data needs and any specific topics you'd like to discuss." : "How can we help you?"}
                ></textarea>
              </div>
              
              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactCTA;
