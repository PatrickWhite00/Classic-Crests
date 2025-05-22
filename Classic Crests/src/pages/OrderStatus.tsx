import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Package, Truck, CheckCircle, Clock, AlertCircle, ChevronRight, ArrowLeft } from 'lucide-react';

// Define order status types
enum OrderStatusType {
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

// Define order interface
interface Order {
  id: string;
  date: string;
  status: OrderStatusType;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  shippingMethod: {
    name: string;
    price: number;
    estimatedDelivery: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
  subtotal: number;
  shipping: number;
  total: number;
}

// Mock orders data (in a real app, this would come from an API)
const mockOrders: Record<string, Order> = {
  'CC-123456': {
    id: 'CC-123456',
    date: '2025-04-15T10:30:00Z',
    status: OrderStatusType.DELIVERED,
    items: [
      {
        id: 1,
        name: 'Manchester United 1999 Home',
        price: 89.99,
        quantity: 1,
        image: 'https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjZMQyABRpadhrJvM4mVRI17uPgHyYwZint8Bo'
      },
      {
        id: 3,
        name: 'Brazil 2002 Home',
        price: 69.99,
        quantity: 1,
        image: 'https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjkLXnESunWVvdepfXcLkSa9w2Fm6ON345TQGH'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'London',
      postalCode: 'SW1A 1AA',
      country: 'United Kingdom'
    },
    shippingMethod: {
      name: 'Standard Shipping',
      price: 4.99,
      estimatedDelivery: '5-7 business days'
    },
    trackingNumber: 'TRK9876543210',
    estimatedDelivery: '2025-04-22',
    subtotal: 159.98,
    shipping: 4.99,
    total: 164.97
  },
  'CC-234567': {
    id: 'CC-234567',
    date: '2025-04-17T14:45:00Z',
    status: OrderStatusType.SHIPPED,
    items: [
      {
        id: 5,
        name: 'Real Madrid 2000 Away',
        price: 94.99,
        quantity: 1,
        image: 'https://footsoccerpro.co/wp-content/uploads/2021/08/MAILLOT-RETRO-VINTAGE-REAL-MADRID-AWAY-1999-2000-1.jpg'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'London',
      postalCode: 'SW1A 1AA',
      country: 'United Kingdom'
    },
    shippingMethod: {
      name: 'Express Shipping',
      price: 9.99,
      estimatedDelivery: '2-3 business days'
    },
    trackingNumber: 'TRK1234567890',
    estimatedDelivery: '2025-04-21',
    subtotal: 94.99,
    shipping: 9.99,
    total: 104.98
  }
};

const OrderStatus = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch order details
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (orderId && mockOrders[orderId]) {
          setOrder(mockOrders[orderId]);
        } else {
          setError('Order not found. Please check your order ID and try again.');
        }
      } catch (err) {
        setError('Failed to load order details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/login', { state: { redirect: `/order/${orderId}` } });
    }
  }, [isAuthenticated, loading, navigate, orderId]);

  // Get status icon based on order status
  const getStatusIcon = (status: OrderStatusType) => {
    switch (status) {
      case OrderStatusType.PROCESSING:
        return <Clock className="w-6 h-6 text-blue-500" />;
      case OrderStatusType.SHIPPED:
        return <Truck className="w-6 h-6 text-orange-500" />;
      case OrderStatusType.DELIVERED:
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case OrderStatusType.CANCELLED:
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Package className="w-6 h-6 text-gray-500" />;
    }
  };

  // Get status text based on order status
  const getStatusText = (status: OrderStatusType) => {
    switch (status) {
      case OrderStatusType.PROCESSING:
        return 'Your order is being processed';
      case OrderStatusType.SHIPPED:
        return 'Your order has been shipped';
      case OrderStatusType.DELIVERED:
        return 'Your order has been delivered';
      case OrderStatusType.CANCELLED:
        return 'Your order has been cancelled';
      default:
        return 'Order status unknown';
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
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-center gap-3 text-red-600 mb-4">
              <AlertCircle className="w-8 h-8" />
              <h2 className="text-xl font-bold">Error</h2>
            </div>
            <p className="text-center text-gray-700 mb-6">{error}</p>
            <div className="flex justify-center">
              <Link
                to="/account/orders"
                className="px-6 py-2 bg-[#C5A572] text-white rounded-lg hover:bg-[#B08E5C] transition"
              >
                View All Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              to="/account/orders"
              className="flex items-center text-gray-600 hover:text-[#C5A572] transition"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Orders
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            {/* Order Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Order #{order.id}</h1>
                  <p className="text-gray-600">Placed on {formatDate(order.date)}</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  {getStatusIcon(order.status)}
                  <span className="font-medium">{getStatusText(order.status)}</span>
                </div>
              </div>
            </div>
            
            {/* Order Progress */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold mb-6">Order Progress</h2>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 z-0"></div>
                
                <div className="relative z-10 space-y-8">
                  <div className="flex items-start">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${order.status !== OrderStatusType.CANCELLED ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div className="ml-4 pt-3">
                      <h3 className="font-semibold">Order Confirmed</h3>
                      <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      order.status === OrderStatusType.PROCESSING || order.status === OrderStatusType.SHIPPED || order.status === OrderStatusType.DELIVERED
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Package className="w-8 h-8" />
                    </div>
                    <div className="ml-4 pt-3">
                      <h3 className="font-semibold">Processing</h3>
                      <p className="text-sm text-gray-600">
                        {order.status === OrderStatusType.PROCESSING
                          ? 'Your order is being prepared'
                          : order.status === OrderStatusType.SHIPPED || order.status === OrderStatusType.DELIVERED
                            ? 'Your order has been processed'
                            : 'Pending'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      order.status === OrderStatusType.SHIPPED || order.status === OrderStatusType.DELIVERED
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Truck className="w-8 h-8" />
                    </div>
                    <div className="ml-4 pt-3">
                      <h3 className="font-semibold">Shipped</h3>
                      {order.status === OrderStatusType.SHIPPED || order.status === OrderStatusType.DELIVERED ? (
                        <>
                          <p className="text-sm text-gray-600">Your order is on its way</p>
                          {order.trackingNumber && (
                            <div className="mt-2">
                              <p className="text-sm font-medium">Tracking Number:</p>
                              <p className="text-sm text-blue-600">{order.trackingNumber}</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-gray-600">Pending</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      order.status === OrderStatusType.DELIVERED
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div className="ml-4 pt-3">
                      <h3 className="font-semibold">Delivered</h3>
                      {order.status === OrderStatusType.DELIVERED ? (
                        <p className="text-sm text-gray-600">Your order has been delivered</p>
                      ) : (
                        <p className="text-sm text-gray-600">
                          {order.estimatedDelivery
                            ? `Estimated delivery: ${formatDate(order.estimatedDelivery)}`
                            : 'Pending'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Details */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>
              
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-100">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>£{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>£{order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>£{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Shipping Information */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-3">Shipping Method</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{order.shippingMethod.name}</p>
                  <p className="text-sm text-gray-600">{order.shippingMethod.estimatedDelivery}</p>
                  <p className="mt-2 font-medium">£{order.shippingMethod.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Need Help?
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#C5A572] text-white rounded-lg hover:bg-[#B08E5C] transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;