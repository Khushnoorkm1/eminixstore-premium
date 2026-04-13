import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SAMPLE_PRODUCTS, Product } from '../data/products';
import { Star, Filter, X, ChevronDown, SlidersHorizontal, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from '../components/ProductCard';

const CATEGORIES = Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.category)));
const PRICE_RANGES = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 to $100', min: 50, max: 100 },
  { label: '$100 to $200', min: 100, max: 200 },
  { label: '$200 to $500', min: 200, max: 500 },
  { label: 'Over $500', min: 500, max: Infinity },
];
const RATINGS = [4, 3, 2, 1];
const COLORS = [
  { name: 'Teal', hex: '#006D5B' },
  { name: 'Gold', hex: '#D4AF37' },
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Silver', hex: '#c0c0c0' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get filters from URL
  const selectedCategories = searchParams.getAll('cat');
  const selectedPriceRanges = searchParams.getAll('price');
  const selectedRatings = searchParams.getAll('rating');
  const selectedColors = searchParams.getAll('color');
  const searchQuery = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'featured';

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...SAMPLE_PRODUCTS];

    // Search
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Price
    if (selectedPriceRanges.length > 0) {
      result = result.filter(p => {
        return selectedPriceRanges.some(rangeLabel => {
          const range = PRICE_RANGES.find(r => r.label === rangeLabel);
          if (!range) return false;
          return p.price >= range.min && p.price <= range.max;
        });
      });
    }

    // Rating
    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings.map(Number));
      result = result.filter(p => p.rating >= minRating);
    }

    // Color (Mocked logic)
    if (selectedColors.length > 0) {
      // In a real app, products would have a color property
      // For now, we'll just filter based on a mock condition
      result = result.filter((_, i) => selectedColors.length > 0); 
    }

    // Sort
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchQuery, selectedCategories, selectedPriceRanges, selectedRatings, sortBy]);

  const toggleFilter = (type: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentValues = newParams.getAll(type);
    
    if (currentValues.includes(value)) {
      const filtered = currentValues.filter(v => v !== value);
      newParams.delete(type);
      filtered.forEach(v => newParams.append(type, v));
    } else {
      newParams.append(type, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 min-h-screen pt-10 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Eminix Collections</h1>
            <p className="text-gray-500 dark:text-gray-400 font-light">Showing {filteredProducts.length} curated masterpieces</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-64">
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-gold-500 outline-none dark:text-white transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value) newParams.set('q', e.target.value);
                  else newParams.delete('q');
                  setSearchParams(newParams);
                }}
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
            </div>
            
            <select 
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full py-2.5 px-6 text-sm font-bold text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-gold-500 outline-none shadow-sm"
              value={sortBy}
              onChange={(e) => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set('sort', e.target.value);
                setSearchParams(newParams);
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden p-2.5 bg-teal-800 text-white rounded-full shadow-lg shadow-teal-800/20"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0 space-y-10">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Categories</h3>
              <div className="space-y-3">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter('cat', cat)}
                      />
                      <div className="h-5 w-5 border-2 border-gray-200 dark:border-gray-800 rounded-md peer-checked:bg-teal-800 peer-checked:border-teal-800 transition-all" />
                      <svg className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 left-1 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-teal-800 transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Price Range</h3>
              <div className="space-y-3">
                {PRICE_RANGES.map(range => (
                  <label key={range.label} className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={selectedPriceRanges.includes(range.label)}
                        onChange={() => toggleFilter('price', range.label)}
                      />
                      <div className="h-5 w-5 border-2 border-gray-200 dark:border-gray-800 rounded-md peer-checked:bg-teal-800 peer-checked:border-teal-800 transition-all" />
                      <svg className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 left-1 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-teal-800 transition-colors">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Minimum Rating</h3>
              <div className="space-y-3">
                {RATINGS.map(rating => (
                  <label key={rating} className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={selectedRatings.includes(rating.toString())}
                        onChange={() => toggleFilter('rating', rating.toString())}
                      />
                      <div className="h-5 w-5 border-2 border-gray-200 dark:border-gray-800 rounded-md peer-checked:bg-teal-800 peer-checked:border-teal-800 transition-all" />
                      <svg className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 left-1 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3 flex items-center text-gold-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < rating ? 'fill-current' : 'text-gray-200 dark:text-gray-800'}`} />
                      ))}
                      <span className="ml-2 text-xs text-gray-500">& Up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Color</h3>
              <div className="flex flex-wrap gap-3">
                {COLORS.map(color => (
                  <button
                    key={color.name}
                    onClick={() => toggleFilter('color', color.name)}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${selectedColors.includes(color.name) ? 'border-teal-800 scale-110' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {(selectedCategories.length > 0 || selectedPriceRanges.length > 0 || selectedRatings.length > 0 || selectedColors.length > 0) && (
              <button 
                onClick={clearFilters}
                className="text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-widest flex items-center gap-2"
              >
                <X className="h-3 w-3" />
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
                <Search className="h-12 w-12 text-gray-200 dark:text-gray-800 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Try adjusting your filters or search query.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-teal-800 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-gray-950 z-[70] md:hidden p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-900 rounded-full">
                  <X className="h-5 w-5 text-gray-900 dark:text-white" />
                </button>
              </div>

              <div className="space-y-10">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Categories</h3>
                  <div className="space-y-4">
                    {CATEGORIES.map(cat => (
                      <label key={cat} className="flex items-center group cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="peer sr-only"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleFilter('cat', cat)}
                        />
                        <div className="h-6 w-6 border-2 border-gray-200 dark:border-gray-800 rounded-md peer-checked:bg-teal-800 peer-checked:border-teal-800 transition-all flex items-center justify-center">
                          <svg className="h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="ml-4 text-gray-600 dark:text-gray-400">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Price Range</h3>
                  <div className="space-y-4">
                    {PRICE_RANGES.map(range => (
                      <label key={range.label} className="flex items-center group cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="peer sr-only"
                          checked={selectedPriceRanges.includes(range.label)}
                          onChange={() => toggleFilter('price', range.label)}
                        />
                        <div className="h-6 w-6 border-2 border-gray-200 dark:border-gray-800 rounded-md peer-checked:bg-teal-800 peer-checked:border-teal-800 transition-all flex items-center justify-center">
                          <svg className="h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="ml-4 text-gray-600 dark:text-gray-400">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Minimum Rating</h3>
                  <div className="space-y-4">
                    {RATINGS.map(rating => (
                      <label key={rating} className="flex items-center group cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="peer sr-only"
                          checked={selectedRatings.includes(rating.toString())}
                          onChange={() => toggleFilter('rating', rating.toString())}
                        />
                        <div className="h-6 w-6 border-2 border-gray-200 dark:border-gray-800 rounded-md peer-checked:bg-teal-800 peer-checked:border-teal-800 transition-all flex items-center justify-center">
                          <svg className="h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="ml-4 flex items-center text-gold-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-current' : 'text-gray-200 dark:text-gray-800'}`} />
                          ))}
                          <span className="ml-2 text-sm text-gray-500">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-teal-800 text-white py-4 rounded-full font-bold shadow-lg shadow-teal-800/20"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={() => { clearFilters(); setIsFilterOpen(false); }}
                  className="w-full border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white py-4 rounded-full font-bold"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
