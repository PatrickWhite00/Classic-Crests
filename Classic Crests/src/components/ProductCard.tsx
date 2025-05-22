import React, { useState } from 'react';
import { ShoppingCart, X, Star, Shield, ArrowLeft, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  year: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, price, year }) => {
  const { addItem } = useCart();
  const [expanded, setExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeError, setShowSizeError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering any parent click events
    
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    
    setShowSizeError(false);
    addItem({ id, image, name, price, year });
    setSelectedSize(''); // Reset size after adding to cart
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value);
    setShowSizeError(false);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
    setShowSizeError(false);
  };

  // Generate a description based on the jersey name
  const getDescription = () => {
    const team = name.split(' ').slice(0, -2).join(' ');
    return `This authentic ${year} ${team} jersey is a collector's piece that captures a significant moment in football history. Made with premium materials and featuring the iconic design from that season, this jersey is perfect for fans and collectors alike. Each jersey comes with a certificate of authenticity and is carefully inspected to ensure the highest quality.`;
  };

  // If expanded, show detailed view
  if (expanded) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden col-span-1 md:col-span-2 lg:col-span-3 transition-all duration-300">
        <div className="relative">
          <button
            onClick={toggleExpanded}
            className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            aria-label="Close detailed view"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <img 
              src={image} 
              alt={`${name} football jersey from ${year}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-[#C5A572] text-white px-3 py-1">
              {year}
            </div>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-[#C5A572]" fill="#C5A572" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(24 reviews)</span>
            </div>
            
            <p className="text-3xl font-bold mb-4">£{price}</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700 mb-4">{getDescription()}</p>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#C5A572] mt-1" />
                  <p className="text-sm text-gray-600">100% Authentic Guarantee</p>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-[#C5A572] mt-1" />
                  <p className="text-sm text-gray-600">Collector's Item</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mt-auto">
              {showSizeError && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Please select a size before adding to cart</span>
                </div>
              )}
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <select 
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent ${
                      showSizeError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={selectedSize}
                    onChange={handleSizeChange}
                    aria-label="Select size"
                  >
                    <option value="">Select Size</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">X-Large</option>
                  </select>
                </div>
                <button 
                  className="flex-1 bg-[#C5A572] text-white p-3 rounded-lg hover:bg-[#B08E5C] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Add ${name} to cart`}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default compact view
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={toggleExpanded}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleExpanded();
        }
      }}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={`${name} football jersey from ${year}`}
          className="w-full h-full object-cover transition group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 bg-[#C5A572] text-white px-3 py-1">
          {year}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">£{price}</span>
          <button 
            className="bg-[#C5A572] text-white p-2 rounded-full hover:bg-[#B08E5C] transition"
            aria-label={`View ${name} details to add to cart`}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded();
            }}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;