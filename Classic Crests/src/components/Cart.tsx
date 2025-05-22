import React, { useRef, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { 
    items, 
    isCartOpen, 
    toggleCart, 
    removeItem, 
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    formatPrice
  } = useCart();
  
  const cartRef = useRef<HTMLDivElement>(null);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isCartOpen) {
        toggleCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, toggleCart]);

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div 
        ref={cartRef}
        className="bg-white w-full max-w-md h-full flex flex-col shadow-xl transition-transform"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 id="cart-title" className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            Your Cart ({totalItems})
          </h2>
          <button 
            onClick={toggleCart}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Looks like you haven't added any jerseys to your cart yet.</p>
            <button 
              onClick={toggleCart}
              className="bg-[#C5A572] text-white px-6 py-2 rounded-full hover:bg-[#B08E5C] transition"
              aria-label="Continue shopping"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-500 text-sm">{item.year}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-2 py-1 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={clearCart}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                  aria-label="Clear cart"
                >
                  Clear Cart
                </button>
                <Link 
                  to="/checkout"
                  onClick={toggleCart}
                  className="px-4 py-2 bg-[#C5A572] text-white rounded-md hover:bg-[#B08E5C] transition text-center"
                  aria-label="Proceed to checkout"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;