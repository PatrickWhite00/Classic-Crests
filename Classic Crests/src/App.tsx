import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Star, Shield, Truck } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import Cart from './components/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Community from './pages/Community';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import AccountOrders from './pages/AccountOrders';
import OrderStatus from './pages/OrderStatus';
import Wishlist from './pages/Wishlist';
import Settings from './pages/Settings';
import CreateListing from './pages/CreateListing';
import CreatePost from './pages/CreatePost';

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[600px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=2000")'
      }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Relive Football's Greatest Moments</h1>
            <p className="text-xl mb-8">Authentic retro football jerseys from legendary teams and players.</p>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-[#C5A572] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#B08E5C] transition"
            >
              Shop Collection
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <Shield className="w-12 h-12 text-[#C5A572]" />
              <div>
                <h3 className="font-semibold text-lg">Authentic Products</h3>
                <p className="text-gray-600">100% genuine retro jerseys</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Truck className="w-12 h-12 text-[#C5A572]" />
              <div>
                <h3 className="font-semibold text-lg">Worldwide Shipping</h3>
                <p className="text-gray-600">Fast & secure delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Star className="w-12 h-12 text-[#C5A572]" />
              <div>
                <h3 className="font-semibold text-lg">Premium Quality</h3>
                <p className="text-gray-600">Carefully curated collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Jerseys</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard 
            id={1}
            image="https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjZMQyABRpadhrJvM4mVRI17uPgHyYwZint8Bo"
            name="Manchester United 1999 Home"
            price={89.99}
            year="1999"
          />
          <ProductCard 
            id={2}
            image="https://classicfootballkit.co.uk/cdn/shop/files/resize-0-main01665048889_768x768.jpg?v=1700235220"
            name="AC Milan 2007 Away"
            price={79.99}
            year="2007"
          />
          <ProductCard 
            id={3}
            image="https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjkLXnESunWVvdepfXcLkSa9w2Fm6ON345TQGH"
            name="Brazil 2002 Home"
            price={69.99}
            year="2002"
          />
          <ProductCard 
            id={4}
            image="https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjLrr3Y6RGQnRiZSGuxH2J1Uyw9gKa3Pfe7EN6"
            name="Netherlands 1988 Home"
            price={84.99}
            year="1988"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Era</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Browse 90s era football jerseys"
              onClick={() => navigate('/shop?era=90s')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate('/shop?era=90s');
                }
              }}
            >
              <img 
                src="https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjFpKEnSuNp5IjONfHQM4e29ubSnzLqZdDwv0V" 
                alt="90s Era"
                className="w-full h-full object-cover transition group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">90s Era</h3>
              </div>
            </div>
            <div 
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Browse 2000s era football jerseys"
              onClick={() => navigate('/shop?era=2000s')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate('/shop?era=2000s');
                }
              }}
            >
              <img 
                src="https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjamS9vmfqUXHe0cQJ5A6h2j4oqSxvKwmil1sz" 
                alt="2000s Era"
                className="w-full h-full object-cover transition group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">2000s Era</h3>
              </div>
            </div>
            <div 
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Browse 2010s era football jerseys"
              onClick={() => navigate('/shop?era=2010s')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate('/shop?era=2010s');
                }
              }}
            >
              <img 
                src="https://6w7yvz0yjw.ufs.sh/f/ryrByRsPLHsjr3EPvUbsPLHsj4wcquzBClJVYWeMm8Qdohn5" 
                alt="2010s Era"
                className="w-full h-full object-cover transition group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">2010s Era</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/community" element={<Community />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<Account />} />
              <Route path="/account/orders" element={<AccountOrders />} />
              <Route path="/order/:orderId" element={<OrderStatus />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/create-listing" element={<CreateListing />} />
            </Routes>
          </main>
          <Footer />
          <Cart />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;