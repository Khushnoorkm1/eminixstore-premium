import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Search, SlidersHorizontal, ArrowRight, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

// Sample Category Data
const COLLECTIONS = [
  {
    id: 'apparel',
    name: 'Haute Couture',
    description: 'Exquisite garments tailored for the modern silhouette.',
    image: 'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?w=800&q=80',
    count: 124,
    featured: true,
  },
  {
    id: 'accessories',
    name: 'Timeless Accessories',
    description: 'The finishing touches that define your unique elegance.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
    count: 86,
    featured: true,
  },
  {
    id: 'electronics',
    name: 'Tech Innovations',
    description: 'Cutting-edge technology meets sophisticated design.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    count: 52,
    featured: false,
  },
  {
    id: 'home-decor',
    name: 'Modern Living',
    description: 'Transform your space into a sanctuary of style.',
    image: 'https://images.unsplash.com/photo-1513519247388-193ad513d746?w=800&q=80',
    count: 210,
    featured: true,
  },
  {
    id: 'beauty',
    name: 'Radiant Beauty',
    description: 'Curated skincare and cosmetics for a natural glow.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    count: 95,
    featured: false,
  },
  {
    id: 'shoes',
    name: 'Footwear Excellence',
    description: 'Step into luxury with our handcrafted shoe collection.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    count: 78,
    featured: false,
  },
  {
    id: 'watches',
    name: 'Watchmaking Art',
    description: 'Precision instruments that transcend time.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
    count: 42,
    featured: true,
  },
  {
    id: 'perfumes',
    name: 'Fragrance Library',
    description: 'Enchanting scents that linger in the memory.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    count: 36,
    featured: false,
  },
  {
    id: 'jewelry',
    name: 'Fine Jewelry',
    description: 'Sparkling masterpieces crafted with precious stones.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    count: 64,
    featured: false,
  },
  {
    id: 'wellness',
    name: 'Wellness Essentials',
    description: 'Nurture your body and soul with premium wellness.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    count: 48,
    featured: false,
  },
  {
    id: 'luggage',
    name: 'Travel Luxe',
    description: 'Sophisticated travel gear for the global explorer.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    count: 29,
    featured: false,
  },
  {
    id: 'food',
    name: 'Gourmet Selection',
    description: 'Exquisite flavors for the discerning palate.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    count: 112,
    featured: false,
  },
];

export default function Collections() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const filteredCollections = useMemo(() => {
    let result = COLLECTIONS.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === 'products-desc') result.sort((a, b) => b.count - a.count);
    if (sortBy === 'products-asc') result.sort((a, b) => a.count - b.count);

    return result;
  }, [searchQuery, sortBy]);

  const featuredCollections = COLLECTIONS.filter(c => c.featured);

  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 min-h-screen transition-colors">
      <SEO 
        title="Collections | Eminixstore - Discover Our World" 
        description="Explore our curated premium collections across elegant categories. Haute couture, timeless accessories, and modern living essentials."
      />

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80" 
            alt="Collections Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-teal-900/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-900/20 to-[#FAF9F6] dark:to-gray-950" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 text-gold-500/80 text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            <Link to="/" className="hover:text-gold-500 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">Collections</span>
          </motion.nav>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
          >
            Discover Our <span className="italic font-light text-gold-500">World</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Curated premium products across elegant categories, designed for the modern connoisseur.
          </motion.p>
        </div>
      </section>

      {/* Filters & Sorting Bar */}
      <section className="sticky top-16 z-40 bg-[#FAF9F6]/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Search within collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full py-3 pl-12 pr-6 focus:ring-2 focus:ring-gold-500 outline-none dark:text-white transition-all shadow-sm"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Sort By:</span>
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full py-2.5 px-6 text-sm font-bold text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-gold-500 outline-none shadow-sm cursor-pointer"
              >
                <option value="popularity">Popularity</option>
                <option value="products-desc">Most Products</option>
                <option value="products-asc">Least Products</option>
                <option value="name-asc">A to Z</option>
                <option value="name-desc">Z to A</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Collections Section */}
      <section className="py-24 bg-white dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center space-x-2 text-teal-800 dark:text-teal-400 mb-2">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Handpicked</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Popular Collections</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCollections.map((collection, idx) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={collection.image} 
                  alt={collection.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <p className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{collection.count} Products</p>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{collection.name}</h3>
                  <Link 
                    to={`/shop?cat=${encodeURIComponent(collection.name)}`}
                    className="flex items-center space-x-2 text-white text-xs font-bold uppercase tracking-widest group/btn"
                  >
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Collections Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">All Collections</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light">Explore our full range of premium categories, each curated with excellence in mind.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredCollections.map((collection, idx) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group"
              >
                <Link to={`/shop?cat=${encodeURIComponent(collection.name)}`} className="block">
                  <div className="aspect-[16/10] rounded-[3rem] overflow-hidden mb-6 relative border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                    <img 
                      src={collection.image} 
                      alt={collection.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-teal-900/10 group-hover:bg-teal-900/0 transition-colors" />
                    
                    <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                      <p className="text-[10px] font-bold text-teal-800 dark:text-teal-400 uppercase tracking-widest">{collection.count} Items</p>
                    </div>
                  </div>
                  
                  <div className="px-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-teal-800 dark:group-hover:text-teal-400 transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-light leading-relaxed mb-6">
                      {collection.description}
                    </p>
                    <div className="flex items-center space-x-2 text-gold-600 dark:text-gold-500 text-xs font-bold uppercase tracking-widest">
                      <span>Explore Collection</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredCollections.length === 0 && (
            <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800">
              <Search className="h-12 w-12 text-gray-200 dark:text-gray-800 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No collections found</h3>
              <p className="text-gray-500 dark:text-gray-400 font-light">Try adjusting your search query.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 bg-teal-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Sparkles className="w-full h-full text-gold-500" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Can't find what you're <span className="text-gold-500">looking for?</span></h2>
          <p className="text-gray-400 text-lg font-light mb-12 max-w-2xl mx-auto">
            Our personal shopping concierge is here to help you find the perfect piece from our global network of artisans.
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-gold-500 text-teal-900 px-12 py-5 rounded-full font-bold hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/20"
          >
            Contact Concierge
          </Link>
        </div>
      </section>
    </div>
  );
}
