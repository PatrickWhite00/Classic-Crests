import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  year: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (price: number) => string;
  createOrder: (shippingInfo: any, shippingMethod: any) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const EXCHANGE_RATES = {
  GBP: 1,
  EUR: 1.17,
  USD: 1.27
};

const CURRENCY_SYMBOLS = {
  GBP: '£',
  EUR: '€',
  USD: '$'
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState('GBP');

  // Load cart and currency preference from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }

    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Calculate totals
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const price = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);

  // Save currency preference to localStorage
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const formatPrice = (price: number): string => {
    const convertedPrice = price * EXCHANGE_RATES[currency as keyof typeof EXCHANGE_RATES];
    return `${CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]}${convertedPrice.toFixed(2)}`;
  };

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
    // Open cart when adding items
    setIsCartOpen(true);
  };

  const removeItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const createOrder = (shippingInfo: any, shippingMethod: any) => {
    // Generate a unique order ID
    const orderId = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Create the order object
    const order = {
      id: orderId,
      date: new Date().toISOString(),
      status: 'processing',
      items: [...items],
      shippingAddress: shippingInfo,
      shippingMethod: shippingMethod,
      subtotal: totalPrice,
      shipping: shippingMethod.price,
      total: totalPrice + shippingMethod.price
    };

    // Get existing orders from localStorage
    const existingOrders = localStorage.getItem('orders');
    const orders = existingOrders ? JSON.parse(existingOrders) : {};
    
    // Add new order
    orders[orderId] = order;
    
    // Save updated orders to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear the cart
    clearCart();
    
    return orderId;
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    toggleCart,
    totalItems,
    totalPrice,
    currency,
    setCurrency,
    formatPrice,
    createOrder
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};