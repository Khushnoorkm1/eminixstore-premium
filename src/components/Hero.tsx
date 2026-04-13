import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-teal-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?w=1920&q=80" 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-900/40 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-gold-500 uppercase bg-gold-500/10 rounded-full border border-gold-500/20">
            Curated Masterpieces 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Timeless <span className="text-gold-500 italic">Elegance</span> for the Modern Soul.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-lg font-light">
            Discover Eminixstore's exclusive collection of premium essentials, where luxury meets minimalism in every detail.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/shop" 
              className="group flex items-center justify-center space-x-2 bg-gold-500 hover:bg-gold-400 text-teal-900 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-gold-500/20"
            >
              <span>Explore Collection</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/shop?featured=true" 
              className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all"
            >
              <ShoppingBag className="h-5 w-5 text-gold-500" />
              <span>New Arrivals</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements for Visual Interest */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 hidden lg:block"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gold-500/20 flex items-center justify-center">
              <span className="text-gold-500 font-bold">15+</span>
            </div>
            <div>
              <p className="text-white font-bold">Exclusive Drops</p>
              <p className="text-gray-400 text-sm">Limited Edition</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
