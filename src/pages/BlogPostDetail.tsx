import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, User, Calendar, ArrowLeft, Share2, Facebook, Twitter, Instagram } from 'lucide-react';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/blog';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

export default function BlogPostDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const post = BLOG_POSTS.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
        <Link to="/blog" className="text-teal-800 dark:text-teal-400 font-bold hover:underline">Return to Journal</Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 min-h-screen pt-24 pb-24 transition-colors">
      <SEO 
        title={`${post.title} | ${t('nav.blog')}`}
        description={post.excerpt}
        image={post.image}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center space-x-2 text-gray-500 hover:text-teal-800 dark:hover:text-teal-400 transition-colors mb-12 group"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Journal</span>
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <span className="bg-gold-500 text-teal-900 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {post.category}
              </span>
              <div className="flex items-center space-x-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readTime}
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <img 
                src={`https://ui-avatars.com/api/?name=${post.author}&background=006D5B&color=fff`} 
                alt={post.author} 
                className="h-10 w-10 rounded-full" 
              />
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{post.author}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Premium Contributor</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="aspect-[21/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Body */}
          <div className="lg:col-span-8">
            <article className="prose prose-lg dark:prose-invert prose-teal max-w-none">
              <div className="markdown-body">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </article>

            {/* Tags */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                {['Luxury', 'Style', 'Eminix', 'Lifestyle'].map((tag, i) => (
                  <span key={i} className="px-4 py-1.5 bg-gray-50 dark:bg-gray-900 text-gray-500 rounded-full text-xs font-medium">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Share */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6 border-l-2 border-gold-500 pl-4">Share This Story</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, color: 'text-blue-600' },
                  { icon: Twitter, color: 'text-sky-500' },
                  { icon: Instagram, color: 'text-pink-600' },
                  { icon: Share2, color: 'text-teal-800' },
                ].map((social, i) => (
                  <button key={i} className={`p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 transition-all hover:scale-110 ${social.color}`}>
                    <social.icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-teal-900 p-8 rounded-[2.5rem] text-white">
              <h4 className="text-xl font-bold mb-4 tracking-tight">Stay Inspired</h4>
              <p className="text-gray-400 text-xs font-light mb-6">Join 10,000+ others receiving our weekly style journal.</p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your luxury email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-1 focus:ring-gold-500 transition-all"
                />
                <button className="w-full bg-gold-500 text-teal-900 py-3 rounded-2xl text-xs font-bold hover:bg-gold-400 transition-all">Subscribe</button>
              </form>
            </div>

            {/* Related */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest border-l-2 border-gold-500 pl-4">Keep Reading</h4>
              {relatedPosts.map((r, i) => (
                <Link key={i} to={`/blog/${r.id}`} className="group flex space-x-4">
                  <div className="h-16 w-16 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                    <img src={r.image} alt={r.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-gold-500 transition-colors leading-snug">{r.title}</h5>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{r.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
