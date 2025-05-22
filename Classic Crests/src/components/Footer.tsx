import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-[#C5A572]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="text-sm mt-4">Bringing legendary football moments back to life through authentic retro jerseys.</p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61573606148833" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#C5A572] hover:text-[#E3C28D] transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/classiccrests/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#C5A572] hover:text-[#E3C28D] transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#E3C28D]" aria-label="Home page">Home</Link></li>
              <li><Link to="/shop" className="hover:text-[#E3C28D]" aria-label="Shop page">Shop</Link></li>
              <li><Link to="/community" className="hover:text-[#E3C28D]" aria-label="Community page">Community</Link></li>
              <li><Link to="/about" className="hover:text-[#E3C28D]" aria-label="About Us page">About</Link></li>
              <li><Link to="/contact" className="hover:text-[#E3C28D]" aria-label="Contact page">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5" aria-hidden="true" />
                <a href="mailto:info@classiccrests.com" className="hover:text-[#E3C28D]">info@classiccrests.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" aria-hidden="true" />
                <a href="tel:+447949054063" className="hover:text-[#E3C28D]">+44 7949 054 063</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5" aria-hidden="true" />
                <address className="not-italic">2-24 York Street, Belfast, BT15 1AP</address>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to get special offers and updates.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-grow focus:ring-2 focus:ring-[#C5A572] focus:outline-none"
                aria-label="Email for newsletter"
                required
              />
              <button 
                type="submit"
                className="bg-[#C5A572] text-black px-4 py-2 rounded-lg hover:bg-[#E3C28D] transition"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Classic Crests. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;