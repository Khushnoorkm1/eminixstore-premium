import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Globe, Users, Heart } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 min-h-screen">
      <SEO 
        title="About Us | Eminixstore - Our Story" 
        description="Learn about Eminixstore's journey, our commitment to luxury, and our mission to bring premium craftsmanship to your doorstep."
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80" 
            alt="About Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-teal-900/40 backdrop-blur-[1px]" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Our <span className="text-gold-500 italic font-light">Story</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Crafting elegance since 2018. A journey of passion, precision, and premium quality.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-teal-900 dark:text-teal-400 mb-6">The Eminix Philosophy</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              At Eminixstore, we believe that luxury isn't just about a price tag—it's about the story behind the product, the craftsmanship in every stitch, and the experience of owning something truly exceptional.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Founded in the heart of innovation, our mission has always been to bridge the gap between traditional artistry and modern sophistication. We curate pieces that aren't just products, but legacies.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" 
              alt="Office" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Stats/Values */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
          {[
            { icon: Globe, label: 'Global Reach', value: '50+ Countries' },
            { icon: Users, label: 'Happy Clients', value: '100k+' },
            { icon: Award, label: 'Design Awards', value: '12' },
            { icon: Heart, label: 'Sustainability', value: '100% Eco' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] text-center shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <item.icon className="h-8 w-8 text-gold-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-teal-900 dark:text-teal-400 mb-1">{item.value}</h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-teal-800 dark:text-teal-400 font-bold uppercase tracking-widest hover:text-gold-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
