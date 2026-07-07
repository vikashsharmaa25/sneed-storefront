import React, { useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

// Newsletter Section Component
const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="bg-linear-to-r from-red-800 to-red-900 py-16 px-8 block">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-opacity-20 p-4 rounded-full">
            <Mail className="w-12 h-12 text-white" />
          </div>
        </div>

        <h2 className="text-white text-2xl font-bold mb-3">
          Subscribe to Our Mailing List
        </h2>

        <p className="text-white text-sm mb-8 opacity-90 max-w-2xl mx-auto">
          Get updates, insights, trends, and customer success stories using our inkjet coding and marking equipment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:flex-1 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-white border border-white bg-white"
          />
          <button
            onClick={handleSubscribe}
            className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Performance Guarantee', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Sitemap', href: '#' }
  ];

  const resources = [
    { name: 'Industries', href: '#' },
    { name: 'Applications', href: '#' },
    { name: 'Solutions', href: '#' },
    { name: 'Help Desk', href: '#' },
    { name: 'Join Mailing List', href: '#' }
  ];

  const policies = [
    { name: 'Policies', href: '#' },
    { name: 'Cookie Settings', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="title-heading font-bold text-lg mb-4">
              Sneed Coding Solutions
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 title-heading shrink-0 mt-1" />
                <div className="text-sm">
                  <p>22315 Gosling Road</p>
                  <p>Spring, TX 77389</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 title-heading" />
                <span className="text-sm">833-826-3464</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 title-heading" />
                <span className="text-sm">Contact Us</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              {policies.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2025, Sneed Coding Solutions. All rights reserved.</p>
            <p className="text-center md:text-right max-w-2xl">
              All manufacturers' names, symbols and descriptions are used for reference purposes only, and it is not implied that any part listed is the product of these manufacturers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Component that combines both
const NewsletterFooter: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-end">
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default NewsletterFooter;