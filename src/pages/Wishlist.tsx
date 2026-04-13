import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 pt-10 pb-20 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
          <div className="h-12 w-12 bg-gold-50 dark:bg-gold-900/20 rounded-full flex items-center justify-center shadow-sm">
            <Heart className="h-6 w-6 text-gold-500 fill-current" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">My Wishlist</h1>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <Heart className="h-12 w-12 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Your wishlist is empty</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 font-light">Save items you love to your wishlist and they'll appear here.</p>
            <Link to="/shop" className="bg-teal-800 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20">
              Start Exploring
            </Link>
          </div>
        )}

        <div className="mt-20 p-10 bg-teal-900 rounded-3xl relative overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?w=1200&q=80" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Ready to complete your collection?</h2>
              <p className="text-teal-100 font-light">Enjoy exclusive benefits and early access as an Eminix member.</p>
            </div>
            <Link to="/shop" className="bg-gold-500 text-teal-900 px-8 py-4 rounded-full font-bold hover:bg-gold-400 transition-all flex items-center space-x-2 shadow-lg shadow-gold-500/20">
              <span>Continue Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
