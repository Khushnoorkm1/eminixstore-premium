import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, ShieldCheck, FileText, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';

interface PolicyPageProps {
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

const PolicyLayout: React.FC<PolicyPageProps> = ({ title, icon: Icon, content }) => (
  <div className="bg-[#FAF9F6] dark:bg-gray-950 min-h-screen">
    <SEO title={`${title} | Eminixstore`} description={`Read our ${title} to understand how we operate and protect your interests.`} />
    
    <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-6">
          <Icon className="h-8 w-8 text-teal-600" />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-teal-900 dark:text-white mb-6 tracking-tight"
        >
          {title}
        </motion.h1>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 p-10 md:p-16 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 prose dark:prose-invert max-w-none"
      >
        {content}
      </motion.div>

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

export const ShippingPolicy = () => (
  <PolicyLayout 
    title="Shipping Policy" 
    icon={Truck}
    content={
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">1. Shipping Methods & Costs</h3>
          <p className="text-gray-600 dark:text-gray-400">We offer free standard shipping on all orders over $500. For orders below this amount, a flat rate of $25 is applied. Express shipping is available for a flat rate of $50.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">2. Processing Time</h3>
          <p className="text-gray-600 dark:text-gray-400">Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the following business day.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">3. Delivery Estimates</h3>
          <p className="text-gray-600 dark:text-gray-400">Standard shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on the destination and customs processing.</p>
        </section>
      </div>
    }
  />
);

export const ReturnPolicy = () => (
  <PolicyLayout 
    title="Return & Refund" 
    icon={RefreshCw}
    content={
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">1. 30-Day Returns</h3>
          <p className="text-gray-600 dark:text-gray-400">We want you to be completely satisfied with your purchase. You can return any unused items in their original packaging within 30 days of delivery.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">2. Refund Process</h3>
          <p className="text-gray-600 dark:text-gray-400">Once we receive and inspect your return, we will process your refund within 5-7 business days. The refund will be issued to your original payment method.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">3. Non-Returnable Items</h3>
          <p className="text-gray-600 dark:text-gray-400">For hygiene reasons, certain items like earrings and intimate apparel cannot be returned unless they are defective.</p>
        </section>
      </div>
    }
  />
);

export const PrivacyPolicy = () => (
  <PolicyLayout 
    title="Privacy Policy" 
    icon={ShieldCheck}
    content={
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">1. Data Collection</h3>
          <p className="text-gray-600 dark:text-gray-400">We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact our support team.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">2. Use of Information</h3>
          <p className="text-gray-600 dark:text-gray-400">We use your information to process orders, personalize your experience, and improve our services. We never sell your personal data to third parties.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">3. Security</h3>
          <p className="text-gray-600 dark:text-gray-400">We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.</p>
        </section>
      </div>
    }
  />
);

export const Terms = () => (
  <PolicyLayout 
    title="Terms & Conditions" 
    icon={FileText}
    content={
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">1. Acceptance of Terms</h3>
          <p className="text-gray-600 dark:text-gray-400">By accessing and using Eminixstore, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">2. Intellectual Property</h3>
          <p className="text-gray-600 dark:text-gray-400">All content on this website, including text, graphics, logos, and images, is the property of Eminixstore and is protected by international copyright laws.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-4">3. Limitation of Liability</h3>
          <p className="text-gray-600 dark:text-gray-400">Eminixstore shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the website or products purchased from us.</p>
        </section>
      </div>
    }
  />
);
