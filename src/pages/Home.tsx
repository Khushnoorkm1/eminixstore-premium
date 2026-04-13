import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { SAMPLE_PRODUCTS } from '../data/products';
import { Truck, ShieldCheck, RotateCcw, Headphones, ArrowRight, Zap, Clock, Star, Sparkles, Gift, Crown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

const CATEGORIES = [
  { name: 'Apparel', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80', count: 120, label: 'Haute Couture', gridClass: 'md:col-span-2 md:row-span-2' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', count: 85, label: 'Timeless Pieces', gridClass: 'md:col-span-1 md:row-span-1' },
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80', count: 45, label: 'Tech Innovations', gridClass: 'md:col-span-1 md:row-span-2' },
  { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80', count: 60, label: 'Modern Living', gridClass: 'md:col-span-1 md:row-span-1' },
];

export default function Home() {
  const featuredProducts = SAMPLE_PRODUCTS.filter(p => p.isFeatured).slice(0, 4);
  const trendingProducts = SAMPLE_PRODUCTS.slice(0, 4);
  const flashDeals = SAMPLE_PRODUCTS.slice(4, 8);
  const recommendedProducts = SAMPLE_PRODUCTS.slice(2, 6);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 transition-colors overflow-x-hidden">
      <SEO />
      
      <motion.div style={{ scale, opacity }}>
        <Hero />
      </motion.div>

      {/* Trust Badges Section */}
      <section className="py-16 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Global Concierge', desc: 'Complimentary shipping on all orders' },
              { icon: ShieldCheck, title: 'Secure Checkout', desc: 'Encrypted premium transactions' },
              { icon: RotateCcw, title: 'Timeless Guarantee', desc: '30-day returns for peace of mind' },
              { icon: Headphones, title: 'Elite Support', desc: '24/7 dedicated personal concierge' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center space-x-4 p-6 rounded-2xl transition-all group">
                <div className="bg-teal-800/10 dark:bg-teal-900/30 p-3 rounded-xl group-hover:bg-gold-500/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-teal-800 dark:text-teal-400 group-hover:text-gold-500 transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">{feature.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Curated Collections</h2>
              <p className="text-gray-500 dark:text-gray-400 font-light">Explore our handpicked selection of masterpieces</p>
            </div>
            <Link to="/shop" className="text-teal-800 dark:text-teal-400 font-bold flex items-center space-x-2 hover:text-gold-500 transition-colors">
              <span className="text-sm uppercase tracking-widest">View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-[800px] md:h-[600px]">
            {CATEGORIES.map((cat, i) => (
              <Link key={i} to={`/shop?cat=${cat.name}`} className={`group relative rounded-[2rem] overflow-hidden ${cat.gridClass}`}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-[10px] text-gold-500 font-bold uppercase tracking-[0.3em] mb-2">{cat.count} Pieces</p>
                  <h3 className="text-2xl font-bold tracking-tight">{cat.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="py-24 bg-white dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gold-500/10 p-3 rounded-2xl">
                <Zap className="h-6 w-6 text-gold-500 fill-current" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Limited Drops</h2>
                <p className="text-gray-500 dark:text-gray-400 font-light">Exclusive pieces at exceptional values</p>
              </div>
            </div>
            
            {/* Countdown Timer */}
            <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-gold-500">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Ends In:</span>
              </div>
              <div className="flex items-center space-x-3">
                {[
                  { label: 'HRS', value: timeLeft.hours },
                  { label: 'MIN', value: timeLeft.minutes },
                  { label: 'SEC', value: timeLeft.seconds }
                ].map((unit, i) => (
                  <React.Fragment key={i}>
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tighter w-8">
                        {unit.value.toString().padStart(2, '0')}
                      </p>
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{unit.label}</p>
                    </div>
                    {i < 2 && <span className="text-gray-300 dark:text-gray-600 font-bold mb-3">:</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {flashDeals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended for You (AI Suggestions) */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center space-x-2 text-teal-800 dark:text-teal-400 mb-2">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">AI Personalized</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recommended for You</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Program Teaser */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-900 to-teal-950 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <Crown className="w-full h-full text-gold-500" />
            </div>
            <div className="max-w-2xl relative z-10">
              <span className="bg-gold-500/20 text-gold-500 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">Eminix Elite</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Elevate Your Lifestyle with <span className="text-gold-500">Eminix Rewards</span></h2>
              <p className="text-gray-400 text-lg font-light mb-12 leading-relaxed">
                Join our exclusive loyalty program and earn points on every purchase. Unlock early access to drops, private sales, and complimentary concierge services.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/5 p-2 rounded-lg">
                    <Gift className="h-5 w-5 text-gold-500" />
                  </div>
                  <span className="text-white text-sm font-medium">Earn Points</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/5 p-2 rounded-lg">
                    <Star className="h-5 w-5 text-gold-500" />
                  </div>
                  <span className="text-white text-sm font-medium">VIP Access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/5 p-2 rounded-lg">
                    <Truck className="h-5 w-5 text-gold-500" />
                  </div>
                  <span className="text-white text-sm font-medium">Free Shipping</span>
                </div>
              </div>
              <button className="bg-gold-500 text-teal-900 px-12 py-5 rounded-full font-bold hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/20">
                Join Eminix Elite
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[30rem] rounded-[4rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80" 
              alt="Promo" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-teal-900/60 backdrop-blur-[1px]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-gold-500 font-bold tracking-[0.4em] uppercase text-xs mb-6"
              >
                Limited Edition
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-7xl font-bold text-white mb-10 tracking-tight"
              >
                The Eminix <br /> <span className="italic font-light">Signature</span> Series
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/shop" className="bg-gold-500 text-teal-900 px-12 py-5 rounded-full font-bold hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/20">
                  Explore Collection
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Trending Now</h2>
              <p className="text-gray-500 dark:text-gray-400 font-light">What the world is talking about</p>
            </div>
            <Link to="/shop" className="text-teal-800 dark:text-teal-400 font-bold flex items-center space-x-2 hover:text-gold-500 transition-colors">
              <span className="text-sm uppercase tracking-widest">Explore All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join the Eminix Circle</h2>
            <p className="text-gray-400 mb-10 font-light">Subscribe to receive exclusive offers, early access to new collections, and personalized shopping recommendations.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow bg-white/5 border border-white/10 rounded-full py-4 px-8 text-white placeholder-gray-500 focus:ring-2 focus:ring-gold-500 outline-none transition-all"
              />
              <button className="bg-gold-500 text-teal-900 px-10 py-4 rounded-full font-bold hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20">
                Subscribe
              </button>
            </form>
            <p className="mt-6 text-xs text-gray-500">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
