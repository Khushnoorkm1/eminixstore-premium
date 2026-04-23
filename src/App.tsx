import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import Contact from './pages/Contact';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import { ShippingPolicy, ReturnPolicy, PrivacyPolicy, Terms } from './pages/Policies';
import AdminRoutes from './pages/AdminRoutes';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
      {!isAdminPath && <Navbar />}
      <main className={`flex-grow ${!isAdminPath ? 'pt-[112px] md:pt-[136px]' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
          <Route path="/returns" element={<ReturnPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <Chatbot />}
      {!isAdminPath && <WhatsAppButton />}
    </div>
  );
}
