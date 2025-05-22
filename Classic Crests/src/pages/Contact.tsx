import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe, Facebook, Instagram, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    // Show success message
    setShowSuccess(true);
    setIsSubmitting(false);

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="py-16">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-cover bg-center -mt-16" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=2000")'
      }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl">Get in touch with our team of football jersey experts.</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-200 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
          <CheckCircle className="w-5 h-5" />
          <span>Message sent successfully! We'll get back to you soon.</span>
        </div>
      )}

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Phone className="w-10 h-10 text-[#C5A572] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">+44 7949 054 063</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Mail className="w-10 h-10 text-[#C5A572] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600">info@classiccrests.com</p>
            <p className="text-gray-600">support@classiccrests.com</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <MapPin className="w-10 h-10 text-[#C5A572] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-gray-600">2-24 York Street</p>
            <p className="text-gray-600">Belfast, BT15 1AP</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C5A572] text-white py-3 rounded-lg font-semibold hover:bg-[#B08E5C] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent border-white mr-2"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Additional Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#C5A572] mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageSquare className="w-6 h-6 text-[#C5A572] mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Customer Support</h3>
                  <p className="text-gray-600">Our team is available during business hours to assist you with any questions about our vintage jerseys.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Globe className="w-6 h-6 text-[#C5A572] mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">International Inquiries</h3>
                  <p className="text-gray-600">We handle requests from collectors and enthusiasts worldwide. Don't hesitate to reach out, regardless of your location.</p>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Connect With Us</h3>
                <div className="flex items-center gap-6">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61573606148833" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-gray-700 hover:text-[#C5A572] transition-colors"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="w-6 h-6" />
                    <span>Facebook</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/classiccrests/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-gray-700 hover:text-[#C5A572] transition-colors"
                    aria-label="Visit our Instagram page"
                  >
                    <Instagram className="w-6 h-6" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;