import React from 'react';
import { motion } from 'motion/react';
import { Clock, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Art of Minimalist Living",
    excerpt: "Discover how to curate a home that reflects your inner peace and sophisticated taste. We explore the principles of minimalism and how they can be applied to modern interior design.",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1200&q=80",
    category: "Lifestyle",
    author: "Elena Rodriguez",
    date: "April 10, 2026",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mastering the Capsule Wardrobe",
    excerpt: "A guide to building a timeless collection of essentials that never go out of style. Learn how to select pieces that are versatile, high-quality, and uniquely you.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&q=80",
    category: "Fashion",
    author: "Sarah Jenkins",
    date: "April 08, 2026",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Tech Meets Elegance",
    excerpt: "How modern innovations are being integrated into luxury design seamlessly. We look at the latest smart home gadgets that don't compromise on aesthetic appeal.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80",
    category: "Innovation",
    author: "Michael Chen",
    date: "April 05, 2026",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "The Future of Sustainable Luxury",
    excerpt: "Exploring how premium brands are embracing eco-friendly practices without losing their exclusive appeal.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80",
    category: "Sustainability",
    author: "David Atten",
    date: "April 02, 2026",
    readTime: "10 min read"
  }
];

export default function Blog() {
  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 min-h-screen pt-24 pb-24 transition-colors">
      <SEO 
        title="Journal | Eminixstore" 
        description="Insights into the world of luxury, timeless style, and modern innovations."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold-500 font-bold uppercase tracking-[0.4em] text-xs mb-4"
          >
            Eminix Journal
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight mb-8"
          >
            Timeless <span className="italic font-light">Perspectives</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto relative"
          >
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full py-4 px-12 text-sm outline-none focus:ring-2 focus:ring-gold-500 transition-all dark:text-white shadow-sm"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </motion.div>
        </div>

        {/* Featured Post */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-[30rem] md:h-[40rem] rounded-[4rem] overflow-hidden mb-24 group shadow-2xl"
        >
          <img 
            src={BLOG_POSTS[0].image} 
            alt={BLOG_POSTS[0].title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/20 to-transparent opacity-80" />
          <div className="absolute bottom-12 left-12 right-12 text-white max-w-3xl">
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-gold-500 text-teal-900 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {BLOG_POSTS[0].category}
              </span>
              <span className="text-xs font-medium text-gray-300">{BLOG_POSTS[0].date}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight group-hover:text-gold-500 transition-colors">
              {BLOG_POSTS[0].title}
            </h2>
            <p className="text-gray-300 font-light mb-8 line-clamp-2 text-lg">
              {BLOG_POSTS[0].excerpt}
            </p>
            <Link to="#" className="inline-flex items-center space-x-2 text-gold-500 font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
              <span>Read Full Article</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {['All Stories', 'Fashion', 'Lifestyle', 'Innovation', 'Sustainability', 'Design'].map((cat, i) => (
            <button 
              key={i}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                i === 0 
                  ? 'bg-teal-800 text-white shadow-lg shadow-teal-800/20' 
                  : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-800 hover:border-gold-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {BLOG_POSTS.slice(1).map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden mb-8 relative shadow-lg">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-teal-800 dark:text-teal-400">
                  {post.category}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {post.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-gold-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-light line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link to="#" className="inline-flex items-center space-x-2 text-teal-800 dark:text-teal-400 font-bold uppercase tracking-widest text-xs group-hover:text-gold-500 transition-colors">
                  <span>Read More</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Teaser */}
        <div className="mt-24 text-center">
          <button className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white px-12 py-4 rounded-full font-bold hover:border-gold-500 transition-all shadow-sm">
            Load More Stories
          </button>
        </div>
      </div>
    </div>
  );
}
