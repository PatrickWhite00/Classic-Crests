import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  year: string;
}

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  // Mock wishlist data - in a real app, this would come from an API
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Manchester United 1999 Home",
      price: 89.99,
      image: "https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjZMQyABRpadhrJvM4mVRI17uPgHyYwZint8Bo",
      year: "1999"
    },
    {
      id: 2,
      name: "AC Milan 2007 Away",
      price: 79.99,
      image: "https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjIhi7CB4hF8MAmcZiO0l4YHoD3BVyrNjpw6SL",
      year: "2007"
    }
  ]);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const moveToCart = (item: WishlistItem) => {
    addItem(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>

          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Save items you'd like to purchase later!</p>
              <button 
                onClick={() => navigate('/shop')}
                className="bg-[#C5A572] text-white px-6 py-2 rounded-lg hover:bg-[#B08E5C] transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {wishlistItems.map(item => (
                  <div key={item.id} className="p-6 flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-gray-600">{item.year}</p>
                      <p className="text-lg font-bold mt-2">£{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => moveToCart(item)}
                        className="p-2 text-[#C5A572] hover:text-[#B08E5C] transition"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <ShoppingCart className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;