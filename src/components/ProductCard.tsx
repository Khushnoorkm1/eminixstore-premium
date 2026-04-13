import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye, X, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = isInWishlist(product.id);
  const displayImage = product.images?.find(img => img.isPrimary)?.url || product.image;

  const handleQuickViewAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsQuickViewOpen(false);
    setQuantity(1);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img 
            src={displayImage} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.discount && (
              <span className="bg-gold-500 text-teal-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                -{product.discount}%
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-teal-800 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                EXCLUSIVE
              </span>
            )}
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button 
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-full transition-colors shadow-lg ${
                isWishlisted 
                  ? 'bg-gold-500 text-teal-900' 
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-teal-800 hover:text-white'
              }`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={() => setIsQuickViewOpen(true)}
              className="p-3 bg-white dark:bg-gray-800 rounded-full text-gray-900 dark:text-white hover:bg-teal-800 hover:text-white transition-colors shadow-lg"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-bold text-teal-800 dark:text-teal-400 uppercase tracking-[0.2em]">{product.category}</p>
            <div className="flex items-center text-gold-500">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 ml-1">{product.rating}</span>
            </div>
          </div>
          
          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 hover:text-teal-800 dark:hover:text-teal-400 transition-colors tracking-tight">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tighter">${product.price.toFixed(2)}</span>
              {product.discount && (
                <span className="text-xs text-gray-400 line-through">
                  ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                </span>
              )}
            </div>
            
            <button 
              onClick={() => addToCart(product)}
              className="flex items-center space-x-2 bg-teal-800 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/10"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {isQuickViewOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setIsQuickViewOpen(false)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-50 dark:bg-gray-800">
                <img 
                  src={displayImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/2 p-10 flex flex-col">
                <div className="mb-6">
                  <span className="text-teal-800 dark:text-teal-400 font-bold text-xs uppercase tracking-[0.3em]">{product.category}</span>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4 tracking-tight">{product.name}</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gold-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200 dark:text-gray-700'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{product.reviewsCount} Reviews</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white tracking-tighter">${product.price.toFixed(2)}</span>
                    {product.discount && (
                      <span className="text-xl text-gray-400 line-through">
                        ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 font-light">
                    {product.description}
                  </p>
                </div>

                <div className="mt-auto space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center border border-gray-100 dark:border-gray-700 rounded-full px-4 py-2">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-teal-800 dark:text-gray-400 transition-colors">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-6 font-bold text-gray-900 dark:text-white">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-teal-800 dark:text-gray-400 transition-colors">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button 
                      onClick={handleQuickViewAdd}
                      className="flex-1 bg-teal-800 text-white py-4 rounded-full font-bold hover:bg-teal-900 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-teal-800/20"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                  <Link 
                    to={`/product/${product.id}`} 
                    className="block text-center text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    onClick={() => setIsQuickViewOpen(false)}
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
