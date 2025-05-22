import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Package, Truck, CheckCircle, Clock, AlertCircle, Search, ChevronRight } from 'lucide-react';

// Define order status types
enum OrderStatusType {
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

// Define order summary interface
interface OrderSummary {
  id: string;
  date: string;
  status: OrderStatusType;
  total: number;
  itemCount: number;
}

// Mock orders data (in a real app, this would come from an API)
const mockOrders: OrderSummary[] = [
  {
    id: 'CC-123456',
    date: '2025-04-15T10:30:00Z',
    status: OrderStatusType.DELIVERED,
    total: 164.97,
    itemCount: 2
  },
  {
    id: 'CC-234567',
    date: '2025-04-17T14:45:00Z',
    status: OrderStatusType.SHIPPED,
    total: 104.98,
    itemCount: 1
  }
];

const AccountOrders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<OrderSummary[]>([]);

  useEffect(() => {
    // Fetch orders from localStorage
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
          const ordersData = JSON.parse(storedOrders);
          const ordersList = Object.values(ordersData).map((order: any) => ({
            id: order.id,
            date: order.date,
            status: order.status,
            total: order.total,
            itemCount: order.items.length
          }));
          
          // Sort orders by date (newest first)
          ordersList.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
          
          setOrders(ordersList);
        } else {
          setOrders(mockOrders);
        }
      } catch (err) {
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  // Filter orders based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredOrders(orders);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = orders.filter(order => 
      order.id.toLowerCase().includes(query)
    );
    
    setFilteredOrders(filtered);
  }, [orders, searchQuery]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/login', { state: { redirect: '/account/orders' } });
    }
  }, [isAuthenticated, loading, navigate]);

  // Get status badge based on order status
  const getStatusBadge = (status: OrderStatusType) => {
    switch (status) {
      case OrderStatusType.PROCESSING:
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            <Clock className="w-3 h-3" />
            Processing
          </span>
        );
      case OrderStatusType.SHIPPED:
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
            <Truck className="w-3 h-3" />
            Shipped
          </span>
        );
      case OrderStatusType.DELIVERED:
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            <CheckCircle className="w-3 h-3" />
            Delivered
          </span>
        );
      case OrderStatusType.CANCELLED:
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs">
            <AlertCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-[#C5A572] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by order number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {filteredOrders.map(order => (
                  <Link
                    key={order.id}
                    to={`/order/${order.id}`}
                    className="block p-6 hover:bg-gray-50 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="font-semibold">Order #{order.id}</h2>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Placed on {formatDate(order.date)}</p>
                        <p className="text-sm text-gray-600">{order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}</p>
                      </div>
                      <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
                        <span className="font-bold">£{order.total.toFixed(2)}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              {searchQuery ? (
                <>
                  <h2 className="text-xl font-semibold mb-2">No orders found</h2>
                  <p className="text-gray-600 mb-6">No orders match your search criteria.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-6 py-2 bg-[#C5A572] text-white rounded-lg hover:bg-[#B08E5C] transition"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                  <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                  <Link
                    to="/shop"
                    className="px-6 py-2 bg-[#C5A572] text-white rounded-lg hover:bg-[#B08E5C] transition"
                  >
                    Start Shopping
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountOrders;