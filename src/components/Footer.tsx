import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white pt-20 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-3">
            <Link to="/" className="flex items-center space-x-1 mb-6">
              <span className="text-2xl font-extrabold tracking-tighter text-white">EMINIX</span>
              <span className="text-2xl font-light tracking-tighter text-gold-500">STORE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              The ultimate destination for the modern connoisseur. Curating a sophisticated blend of physical and digital excellence since 2026.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-teal-900 transition-all">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-teal-900 transition-all">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-gold-500 transition-colors">Our Story</Link></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Careers</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-gold-500 transition-colors">All Products</Link></li>
              <li><Link to="/collections" className="hover:text-gold-500 transition-colors">Collections</Link></li>
              <li><Link to="/shop?sort=newest" className="hover:text-gold-500 transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?sort=popularity" className="hover:text-gold-500 transition-colors">Best Sellers</Link></li>
              <li><Link to="/shop?sort=sale" className="hover:text-gold-500 transition-colors">Deals</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/faq" className="hover:text-gold-500 transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-gold-500 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-gold-500 transition-colors">Return Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gold-500 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Connect</h4>
            <p className="text-gray-400 text-sm mb-6">Subscribe to receive exclusive offers and early access to new drops.</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all"
              />
              <button className="bg-gold-500 text-teal-900 rounded-full px-6 py-3 text-sm font-bold hover:bg-gold-400 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>


        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500">© 2026 Eminixstore. Crafted with Timeless Elegance.</p>
          <div className="flex items-center space-x-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 opacity-30 grayscale invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 opacity-30 grayscale invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3 opacity-30 grayscale invert" />
          </div>
        </div>
      </div>
    </footer>
  );
}
