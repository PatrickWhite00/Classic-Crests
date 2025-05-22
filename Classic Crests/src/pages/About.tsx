import React, { useState } from 'react';
import { Trophy, Users, History, Award, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const About = () => {
  const [showAuthError, setShowAuthError] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (isAuthenticated) {
      setShowAuthError(true);
      // Hide error after 3 seconds
      setTimeout(() => setShowAuthError(false), 3000);
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="py-16">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-cover bg-center -mt-16" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=2000")'
      }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-xl">Preserving football heritage through authentic vintage jerseys, one classic at a time.</p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Classic Crests, we're passionate about preserving football's rich heritage. Our mission is to bring iconic moments in football history back to life through carefully curated, authentic vintage jerseys. Each piece in our collection tells a story of triumph, passion, and sporting excellence.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg text-center">
              <Trophy className="w-12 h-12 text-[#C5A572] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the finest authentic vintage jerseys make it into our collection</p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center">
              <Users className="w-12 h-12 text-[#C5A572] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Our specialists verify each item's authenticity and condition</p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center">
              <History className="w-12 h-12 text-[#C5A572] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rich History</h3>
              <p className="text-gray-600">Each jersey comes with its own historical context and story</p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center">
              <Award className="w-12 h-12 text-[#C5A572] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Guaranteed Authentic</h3>
              <p className="text-gray-600">100% authenticity guarantee on all our products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/481312761_9402728919770438_6597783875514332653_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=u13hJQIk0ooQ7kNvwEt6VhC&_nc_oc=AdmyNPVoOLM3fD3NqupuM-MWBM_QNR8zWW2Lxe-VMxKlgbMzW95COY5aA8LCAUufsjc&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=GveWneLl8IC4qWvMHNwxwA&oh=00_AfG9vTT1N1XwiyO4spxH0DiRh2U7RlDYHxrfie233ft_RA&oe=68028DFD" 
              alt="Classic Crests Collection"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">The Classic Crests Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Classic Crests was developed as part of my final year computing project at Ulster University in 2024. Inspired by a personal passion for football culture and the growing global interest in retro fashion, the platform was designed to offer a unique space for enthusiasts to discover, purchase, and engage with vintage football jerseys from around the world.
              </p>
              <p>
                The idea stemmed from the recognition that, while retro football shirts have become increasingly popular, there was a lack of dedicated, user-focused platforms that combined e-commerce with storytelling and community engagement. Classic Crests aims to fill that gap by offering a curated experience that goes beyond a simple online store.
              </p>
              <p>
                Throughout the development process, I focused on building a well-organised and authentic catalogue of vintage jerseys, complete with detailed historical context. Each listing is carefully researched to highlight the moments, players, and cultural relevance behind the shirt, transforming every purchase into a piece of football history.
              </p>
              <p>
                As a university project, Classic Crests not only demonstrates technical and design capabilities but also reflects a commitment to preserving football heritage and delivering value to a passionate community of fans and collectors.
              </p>
              <p className="text-right italic mt-6">
                - Patrick White
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#C5A572] text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8">Be the first to know about new arrivals, exclusive offers, and football history</p>
          {showAuthError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center justify-center gap-2 max-w-md mx-auto">
              <AlertCircle className="w-4 h-4" />
              <span>You already have an account!</span>
            </div>
          )}
          <button 
            onClick={handleSignUp}
            className="inline-block bg-white text-[#C5A572] px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
            aria-label="Sign up for an account"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;