import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 min-h-screen">
      <SEO 
        title="Contact Us | Eminixstore - Get in Touch" 
        description="Have questions? Contact the Eminixstore concierge team for support, inquiries, or feedback. We're here to help you."
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-teal-900 dark:text-white mb-6 tracking-tight"
          >
            Get in <span className="text-gold-500 italic font-light">Touch</span>
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light">
            Our concierge team is available 24/7 to assist you with any inquiries or special requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {[
              { icon: Phone, label: 'Call Us', value: '+1 (800) EMINIX-LUXE', sub: 'Mon-Fri, 9am-6pm EST' },
              { icon: Mail, label: 'Email Us', value: 'concierge@eminixstore.com', sub: 'Response within 24 hours' },
              { icon: MapPin, label: 'Visit Us', value: '721 Fifth Avenue', sub: 'New York, NY 10022' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <item.icon className="h-6 w-6 text-gold-500 mb-4" />
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</h3>
                <p className="text-lg font-bold text-teal-900 dark:text-teal-400 mb-1">{item.value}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="h-20 w-20 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="h-10 w-10 text-teal-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-teal-900 dark:text-white mb-2">Message Sent!</h2>
                  <p className="text-gray-500">Thank you for reaching out. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-[#FAF9F6] dark:bg-gray-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-[#FAF9F6] dark:bg-gray-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Message</label>
                    <textarea 
                      required
                      rows={6}
                      className="w-full bg-[#FAF9F6] dark:bg-gray-800 border-none rounded-3xl py-4 px-6 focus:ring-2 focus:ring-gold-500 outline-none transition-all resize-none"
                      placeholder="How can we help you today?"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-teal-900 text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-teal-800 transition-all shadow-lg shadow-teal-900/20 flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        <div className="text-center mt-16">
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
