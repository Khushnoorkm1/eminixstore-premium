import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const FREE_SHIPPING_THRESHOLD = 500;
  const shippingCost = total >= FREE_SHIPPING_THRESHOLD ? 0 : 25;
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#FAF9F6] dark:bg-gray-950">
        <div className="h-24 w-24 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <ShoppingBag className="h-10 w-10 text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Your bag is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-center max-w-md font-light">Looks like you haven't added any premium items to your collection yet. Start browsing our exclusive shop.</p>
        <Link to="/shop" className="bg-teal-800 text-white px-10 py-4 rounded-full font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 pt-10 pb-20 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Abandoned Cart Reminder */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gold-50 dark:bg-gold-900/10 border border-gold-100 dark:border-gold-900/20 p-4 rounded-2xl mb-8 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-gold-500 p-2 rounded-lg">
              <Zap className="h-4 w-4 text-teal-900" />
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              Don't let your favorites slip away! <span className="font-light text-gray-500">Complete your purchase now and get 5% extra loyalty points.</span>
            </p>
          </div>
          <button className="text-xs font-bold text-gold-600 hover:underline uppercase tracking-widest">Limited Time Offer</button>
        </motion.div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 tracking-tight">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-8">
            {/* Free Shipping Progress */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-teal-800 dark:text-teal-400" />
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {total >= FREE_SHIPPING_THRESHOLD 
                      ? "You've unlocked COMPLIMENTARY shipping!" 
                      : `Add $${remaining.toFixed(2)} more for COMPLIMENTARY shipping`}
                  </p>
                </div>
                <span className="text-xs font-bold text-teal-800 dark:text-teal-400">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-teal-800 dark:bg-teal-400 rounded-full"
                />
              </div>
            </div>

            <AnimatePresence>
              {items.map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-gray-100 last:border-0"
                >
                  <div className="h-32 w-32 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex-shrink-0 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{item.name}</h3>
                    <p className="text-xs text-teal-800 dark:text-teal-400 font-bold uppercase tracking-widest mb-4">Eminix Selection</p>
                    <div className="flex items-center justify-center sm:justify-start space-x-4">
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 bg-white dark:bg-gray-900">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-teal-800 dark:text-gray-400 transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="mx-4 text-sm font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-teal-800 dark:text-gray-400 transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs text-gray-400 mt-1 font-light">${item.price.toFixed(2)} each</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 sticky top-24 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "text-teal-700 dark:text-teal-400 font-bold" : "font-bold text-gray-900 dark:text-white"}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Estimated Tax</span>
                  <span className="font-bold text-gray-900 dark:text-white">$0.00</span>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-teal-800 dark:text-teal-400 tracking-tighter">${(total + shippingCost).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-teal-800 text-white py-4 rounded-full font-bold hover:bg-teal-900 transition-all flex items-center justify-center space-x-2 mb-6 shadow-lg shadow-teal-800/20"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                  <ShieldCheck className="h-4 w-4 text-teal-700 dark:text-teal-400" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                  <ShoppingBag className="h-4 w-4 text-gold-500" />
                  <span>Eminix Rewards: Earn {Math.floor(total)} points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
