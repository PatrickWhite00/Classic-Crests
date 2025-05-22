import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Package, Heart, Settings, LogOut, CreditCard, ShoppingBag } from 'lucide-react';

const Account = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          {/* User Profile Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#C5A572] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">Member since April 2025</p>
              </div>
            </div>
          </div>
          
          {/* Account Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link 
              to="/account/orders" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <Package className="w-12 h-12 text-[#C5A572] mb-4" />
              <h3 className="text-lg font-semibold mb-2">My Orders</h3>
              <p className="text-gray-600">View and track your orders</p>
            </Link>
            
            <Link 
              to="/account/wishlist" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <Heart className="w-12 h-12 text-[#C5A572] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Wishlist</h3>
              <p className="text-gray-600">View your saved items</p>
            </Link>
            
            <Link 
              to="/account/settings" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <Settings className="w-12 h-12 text-[#C5A572] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
              <p className="text-gray-600">Update your profile and preferences</p>
            </Link>
          </div>
          
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <Link 
                to="/account/orders" 
                className="text-[#C5A572] hover:text-[#B08E5C] font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="divide-y divide-gray-200">
              <div className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">Order #CC-345678</h3>
                    <p className="text-sm text-gray-600">Placed on April 19, 2025</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Processing</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">2 items</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">£189.97</span>
                    <Link 
                      to="/order/CC-345678" 
                      className="text-[#C5A572] hover:text-[#B08E5C] font-medium"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">Order #CC-234567</h3>
                    <p className="text-sm text-gray-600">Placed on April 18, 2025</p>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Shipped</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">1 item</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">£104.98</span>
                    <Link 
                      to="/order/CC-234567" 
                      className="text-[#C5A572] hover:text-[#B08E5C] font-medium"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Account Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link 
              to="/account/payment-methods" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <CreditCard className="w-10 h-10 text-[#C5A572]" />
                <div>
                  <h3 className="text-lg font-semibold">Payment Methods</h3>
                  <p className="text-gray-600">Manage your saved payment methods</p>
                </div>
              </div>
            </Link>
            
            <Link 
              to="/account/addresses" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <ShoppingBag className="w-10 h-10 text-[#C5A572]" />
                <div>
                  <h3 className="text-lg font-semibold">Addresses</h3>
                  <p className="text-gray-600">Manage your shipping addresses</p>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Logout Button */}
          <div className="text-center">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 mx-auto"
            >
              <LogOut className="w-5 h-5" />
              {isLoggingOut ? 'Logging out...' : 'Log Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;