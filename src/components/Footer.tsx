import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Send, 
  Heart,
  ArrowUp
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'Collections', href: '/collections' },
      { name: 'New Arrivals', href: '/shop?sort=newest' },
      { name: 'Best Sellers', href: '/shop?sort=popularity' },
      { name: 'Deals', href: '/shop?sort=sale' },
    ],
    support: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping Policy', href: '/shipping' },
      { name: 'Return & Refund Policy', href: '/returns' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Track Order', href: '/account/orders' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/about' },
      { name: 'Careers', href: '#' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-[#001A16] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-3 space-y-8">
            <Link to="/" onClick={scrollToTop} className="flex items-center space-x-1 group">
              <span className="text-3xl font-extrabold tracking-tighter text-white group-hover:text-[#D4AF37] transition-colors">EMINIX</span>
              <span className="text-3xl font-light tracking-tighter text-[#D4AF37]">STORE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
              Timeless Elegance, Curated with Trust. We bring you the finest selection of premium products designed for the modern connoisseur.
            </p>
            <div className="flex items-center space-x-5">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'Youtube' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8 border-l-2 border-[#D4AF37] pl-4">Shop</h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.href} 
                    onClick={scrollToTop}
                    className="text-sm text-gray-400 hover:text-[#D4AF37] transition-all duration-300 font-light flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#D4AF37] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8 border-l-2 border-[#D4AF37] pl-4">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.href} 
                    onClick={scrollToTop}
                    className="text-sm text-gray-400 hover:text-[#D4AF37] transition-all duration-300 font-light flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#D4AF37] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8 border-l-2 border-[#D4AF37] pl-4">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.href} 
                    onClick={scrollToTop}
                    className="text-sm text-gray-400 hover:text-[#D4AF37] transition-all duration-300 font-light flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#D4AF37] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-white tracking-tight mb-2">Stay Updated</h4>
              <p className="text-xs text-gray-400 font-light mb-6">Get exclusive offers and latest updates delivered to your inbox.</p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                </div>
                <button className="w-full bg-[#D4AF37] text-[#001A16] rounded-xl px-6 py-3 text-sm font-bold hover:bg-[#C4A030] transition-all shadow-lg shadow-[#D4AF37]/10 flex items-center justify-center space-x-2 group">
                  <span>Subscribe</span>
                  <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              © 2026 Eminixstore. All Rights Reserved.
            </p>
            <p className="text-[10px] text-gray-600 flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              <span>in India</span>
            </p>
          </div>

          <div className="flex items-center space-x-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3 invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4 invert" />
            <div className="text-[10px] font-bold text-white border border-white/20 px-2 py-1 rounded tracking-tighter">COD</div>
          </div>

          <button 
            onClick={scrollToTop}
            className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#001A16] transition-all group"
          >
            <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
