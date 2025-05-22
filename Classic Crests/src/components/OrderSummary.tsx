import React from 'react';
import { useCart } from '../contexts/CartContext';

interface OrderSummaryProps {
  showShipping?: boolean;
  shippingCost?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  showShipping = false,
  shippingCost = 0
}) => {
  const { items, totalPrice } = useCart();
  
  const orderTotal = showShipping ? totalPrice + shippingCost : totalPrice;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>
      
      <div className="max-h-60 overflow-y-auto mb-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">{item.year}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">£{item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>£{totalPrice.toFixed(2)}</span>
        </div>
        
        {showShipping && (
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>£{shippingCost.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>£{orderTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;