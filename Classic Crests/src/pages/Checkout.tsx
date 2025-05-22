import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Truck, ShieldCheck, AlertCircle, Check } from 'lucide-react';

// Define the checkout steps
enum CheckoutStep {
  SHIPPING = 'shipping',
  PAYMENT = 'payment',
  REVIEW = 'review',
  CONFIRMATION = 'confirmation'
}

// Define the shipping method options
interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
}

const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivery within 5-7 business days',
    price: 4.99,
    estimatedDelivery: '5-7 business days'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivery within 2-3 business days',
    price: 9.99,
    estimatedDelivery: '2-3 business days'
  },
  {
    id: 'next-day',
    name: 'Next Day Delivery',
    description: 'Order before 2pm for next day delivery',
    price: 14.99,
    estimatedDelivery: 'Next business day'
  }
];

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // State for checkout process
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.SHIPPING);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United Kingdom'
  });
  
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>(shippingMethods[0].id);
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      navigate('/shop');
    }
  }, [items, navigate, orderComplete]);

  // Calculate total with shipping
  const getSelectedShippingMethod = () => {
    return shippingMethods.find(method => method.id === selectedShippingMethod) || shippingMethods[0];
  };
  
  const shippingCost = getSelectedShippingMethod().price;
  const orderTotal = totalPrice + shippingCost;

  // Handle form changes
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Form validation
  const validateShippingInfo = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
    for (const field of requiredFields) {
      if (!shippingInfo[field as keyof typeof shippingInfo]) {
        setError(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Validate phone format (simple check)
    const phoneRegex = /^\+?[0-9\s\-()]{8,}$/;
    if (!phoneRegex.test(shippingInfo.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }
    
    // Validate postal code (UK format)
    const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    if (shippingInfo.country === 'United Kingdom' && !ukPostcodeRegex.test(shippingInfo.postalCode)) {
      setError('Please enter a valid UK postal code');
      return false;
    }
    
    setError(null);
    return true;
  };
  
  const validatePaymentInfo = () => {
    // Validate card name
    if (!paymentInfo.cardName.trim()) {
      setError('Please enter the name on your card');
      return false;
    }
    
    // Validate card number (simple check for 16 digits)
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }
    
    // Validate expiry date (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(paymentInfo.expiryDate)) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    
    // Check if card is expired
    const [month, year] = paymentInfo.expiryDate.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const currentDate = new Date();
    if (expiryDate < currentDate) {
      setError('Your card has expired');
      return false;
    }
    
    // Validate CVV (3 or 4 digits)
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!cvvRegex.test(paymentInfo.cvv)) {
      setError('Please enter a valid CVV code');
      return false;
    }
    
    setError(null);
    return true;
  };

  // Handle step navigation
  const goToNextStep = () => {
    setError(null);
    
    if (currentStep === CheckoutStep.SHIPPING) {
      if (validateShippingInfo()) {
        setCurrentStep(CheckoutStep.PAYMENT);
      }
    } else if (currentStep === CheckoutStep.PAYMENT) {
      if (validatePaymentInfo()) {
        setCurrentStep(CheckoutStep.REVIEW);
      }
    } else if (currentStep === CheckoutStep.REVIEW) {
      placeOrder();
    }
  };
  
  const goToPreviousStep = () => {
    setError(null);
    
    if (currentStep === CheckoutStep.PAYMENT) {
      setCurrentStep(CheckoutStep.SHIPPING);
    } else if (currentStep === CheckoutStep.REVIEW) {
      setCurrentStep(CheckoutStep.PAYMENT);
    }
  };

  // Place order
  const placeOrder = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random order ID
      const newOrderId = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(newOrderId);
      
      // Clear the cart
      clearCart();
      
      // Show confirmation
      setCurrentStep(CheckoutStep.CONFIRMATION);
      setOrderComplete(true);
    } catch (err) {
      setError('There was a problem processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Handle card number input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setPaymentInfo(prev => ({ ...prev, cardNumber: formattedValue }));
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  // Handle expiry date input
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setPaymentInfo(prev => ({ ...prev, expiryDate: formattedValue }));
  };

  // Render checkout steps
  const renderShippingStep = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={shippingInfo.firstName}
              onChange={handleShippingInfoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={shippingInfo.lastName}
              onChange={handleShippingInfoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={shippingInfo.email}
              onChange={handleShippingInfoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleShippingInfoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingInfoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingInfoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              County/State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingInfo.state}
              onChange={handleShippingInfoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code *
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={shippingInfo.postalCode}
              onChange={handleShippingInfoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country *
          </label>
          <select
            id="country"
            name="country"
            value={shippingInfo.country}
            onChange={handleShippingInfoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
            required
          >
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Italy">Italy</option>
            <option value="Spain">Spain</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Belgium">Belgium</option>
          </select>
        </div>
        
        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
          <div className="space-y-3">
            {shippingMethods.map(method => (
              <label 
                key={method.id} 
                className={`block p-4 border rounded-lg cursor-pointer transition ${
                  selectedShippingMethod === method.id 
                    ? 'border-[#C5A572] bg-[#C5A572]/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={method.id}
                    checked={selectedShippingMethod === method.id}
                    onChange={() => setSelectedShippingMethod(method.id)}
                    className="mt-1 text-[#C5A572] focus:ring-[#C5A572]"
                  />
                  <div className="ml-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{method.name}</span>
                      <span className="font-semibold">£{method.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Estimated delivery: {method.estimatedDelivery}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderPaymentStep = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Payment Information</h2>
        
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
            Name on Card *
          </label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={paymentInfo.cardName}
            onChange={handlePaymentInfoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Card Number *
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
              required
            />
            <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date (MM/YY) *
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleExpiryDateChange}
              maxLength={5}
              placeholder="MM/YY"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV *
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handlePaymentInfoChange}
              maxLength={4}
              placeholder="123"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A572] focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveCard"
            name="saveCard"
            checked={paymentInfo.saveCard}
            onChange={handlePaymentInfoChange}
            className="h-4 w-4 text-[#C5A572] focus:ring-[#C5A572] border-gray-300 rounded"
          />
          <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
            Save this card for future purchases
          </label>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <div className="flex items-center gap-2 text-gray-700">
            <ShieldCheck className="w-5 h-5 text-[#C5A572]" />
            <p className="text-sm">Your payment information is secure and encrypted</p>
          </div>
        </div>
      </div>
    );
  };
  
  const renderReviewStep = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Review Your Order</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Shipping Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name:</p>
              <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact:</p>
              <p>{shippingInfo.email}</p>
              <p>{shippingInfo.phone}</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-600">Address:</p>
            <p>{shippingInfo.address}</p>
            <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
            <p>{shippingInfo.country}</p>
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-600">Shipping Method:</p>
            <p>{getSelectedShippingMethod().name} - £{getSelectedShippingMethod().price.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Estimated delivery: {getSelectedShippingMethod().estimatedDelivery}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Payment Information</h3>
          <div>
            <p className="text-sm text-gray-600">Card:</p>
            <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">Name on Card:</p>
            <p>{paymentInfo.cardName}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold mb-3">Order Summary</h3>
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
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>£{shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>£{orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderConfirmationStep = () => {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
        <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8 inline-block mx-auto">
          <p className="text-sm text-gray-600">Order Number:</p>
          <p className="text-xl font-semibold">{orderId}</p>
        </div>
        
        <p className="mb-6">
          A confirmation email has been sent to <span className="font-semibold">{shippingInfo.email}</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate(`/order/${orderId}`)}
            className="px-6 py-3 bg-[#C5A572] text-white rounded-lg hover:bg-[#B08E5C] transition"
          >
            View Order Status
          </button>
        </div>
      </div>
    );
  };

  // Render checkout progress
  const renderCheckoutProgress = () => {
    const steps = [
      { id: CheckoutStep.SHIPPING, label: 'Shipping' },
      { id: CheckoutStep.PAYMENT, label: 'Payment' },
      { id: CheckoutStep.REVIEW, label: 'Review' }
    ];
    
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step.id
                      ? 'bg-[#C5A572] text-white'
                      : steps.indexOf(steps.find(s => s.id === currentStep)!) > index
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {steps.indexOf(steps.find(s => s.id === currentStep)!) > index ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-sm mt-1">{step.label}</span>
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={`flex-1 h-1 mx-2 ${
                    steps.indexOf(steps.find(s => s.id === currentStep)!) > index
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          {currentStep !== CheckoutStep.CONFIRMATION && renderCheckoutProgress()}
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              {currentStep === CheckoutStep.SHIPPING && renderShippingStep()}
              {currentStep === CheckoutStep.PAYMENT && renderPaymentStep()}
              {currentStep === CheckoutStep.REVIEW && renderReviewStep()}
              {currentStep === CheckoutStep.CONFIRMATION && renderConfirmationStep()}
            </div>
            
            {currentStep !== CheckoutStep.CONFIRMATION && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                {currentStep !== CheckoutStep.SHIPPING && (
                  <button
                    onClick={goToPreviousStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    disabled={isProcessing}
                  >
                    Back
                  </button>
                )}
                
                <button
                  onClick={goToNextStep}
                  className={`px-6 py-2 bg-[#C5A572] text-white rounded-lg hover:bg-[#B08E5C] transition ${
                    currentStep === CheckoutStep.SHIPPING ? 'ml-auto' : ''
                  }`}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : currentStep === CheckoutStep.REVIEW ? (
                    'Place Order'
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            )}
          </div>
          
          {currentStep !== CheckoutStep.CONFIRMATION && (
            <div className="text-center text-sm text-gray-600 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A572]" />
              <span>Your information is secure and encrypted</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;