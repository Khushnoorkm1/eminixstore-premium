import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';

const FAQS = [
  {
    category: 'Ordering',
    questions: [
      { q: 'How do I track my order?', a: 'Once your order is shipped, you will receive an email with a tracking number and a link to track your package.' },
      { q: 'Can I change or cancel my order?', a: 'We process orders quickly, but if you contact us within 1 hour of placing your order, we can usually make changes or cancellations.' },
    ]
  },
  {
    category: 'Shipping',
    questions: [
      { q: 'What are your shipping rates?', a: 'We offer free standard shipping on all orders over $500. For orders below $500, a flat rate of $25 applies.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location.' },
    ]
  },
  {
    category: 'Returns',
    questions: [
      { q: 'What is your return policy?', a: 'We offer a 30-day return policy for all unused items in their original packaging. Please visit our Return Policy page for more details.' },
      { q: 'How long does a refund take?', a: 'Refunds are typically processed within 5-7 business days after we receive and inspect your returned items.' },
    ]
  }
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState<string | null>(null);

  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 min-h-screen">
      <SEO 
        title="FAQ | Eminixstore - Frequently Asked Questions" 
        description="Find answers to common questions about ordering, shipping, returns, and more at Eminixstore."
      />

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gold-100 dark:bg-gold-900/30 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-gold-600" />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-teal-900 dark:text-white mb-6 tracking-tight"
          >
            Frequently Asked <span className="text-gold-500 italic font-light">Questions</span>
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">
            Everything you need to know about the Eminix experience.
          </p>
        </div>

        <div className="space-y-12">
          {FAQS.map((section, sIdx) => (
            <div key={sIdx}>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((item, qIdx) => {
                  const id = `${sIdx}-${qIdx}`;
                  const isOpen = activeIdx === id;
                  return (
                    <div 
                      key={qIdx}
                      className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all"
                    >
                      <button 
                        onClick={() => setActiveIdx(isOpen ? null : id)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left"
                      >
                        <span className="text-lg font-bold text-teal-900 dark:text-teal-400 pr-8">{item.q}</span>
                        {isOpen ? <Minus className="h-5 w-5 text-gold-500 flex-shrink-0" /> : <Plus className="h-5 w-5 text-gold-500 flex-shrink-0" />}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-8 pb-8"
                          >
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-24">
          <p className="text-gray-500 mb-8">Still have questions?</p>
          <Link 
            to="/contact"
            className="inline-block bg-teal-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-teal-800 transition-all shadow-xl shadow-teal-900/20 mb-12"
          >
            Contact Support
          </Link>
          <br />
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
