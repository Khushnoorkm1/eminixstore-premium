import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../data/products';
import { Star, ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw, ChevronRight, Minus, Plus, MessageSquare, Send, CheckCircle2, Award, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, orderBy, Timestamp } from 'firebase/firestore';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isARModalOpen, setIsARModalOpen] = useState(false);

  const product = SAMPLE_PRODUCTS.find(p => p.id === id);
  const [mainImage, setMainImage] = useState(product?.image || '');
  const relatedProducts = SAMPLE_PRODUCTS.filter(p => p.category === product?.category && p.id !== id).slice(0, 4);

  useEffect(() => {
    if (product) {
      const primary = product.images?.find(img => img.isPrimary);
      setMainImage(primary?.url || product.image);
    }
  }, [product]);

  useEffect(() => {
    if (!id) return;

    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', id),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id || !newReview.comment.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        productId: id,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userPhoto: user.photoURL || '',
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: Timestamp.now(),
        isModerated: false
      });
      setNewReview({ rating: 5, comment: '' });
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Link to="/shop" className="text-blue-600 font-bold hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating;

  const totalReviews = reviews.length > 0 ? reviews.length : product.reviewsCount;

  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 pt-10 pb-20 transition-colors">
      <SEO 
        title={`${product.name} | Eminixstore`}
        description={product.description}
        image={product.image}
        productData={product}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-10">
          <Link to="/" className="hover:text-teal-800 dark:hover:text-teal-400 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/shop" className="hover:text-teal-800 dark:hover:text-teal-400 transition-colors">Shop</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm relative group cursor-zoom-in">
              <motion.img 
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 100 }}
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover origin-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6">
                {product.discount && (
                  <span className="bg-gold-500 text-teal-900 text-xs font-bold px-4 py-2 rounded-full shadow-xl">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {(product.images && product.images.length > 0 
                ? product.images.map(img => img.url) 
                : [product.image, product.image, product.image, product.image]
              ).map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${mainImage === img ? 'border-gold-500' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <span className="text-teal-800 dark:text-teal-400 font-bold text-xs uppercase tracking-[0.3em]">{product.category}</span>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4 tracking-tight">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(Number(averageRating)) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                  ))}
                  <span className="text-sm font-bold text-gray-900 dark:text-white ml-2">{averageRating}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500 font-medium">{totalReviews} Reviews</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white tracking-tighter">${product.price.toFixed(2)}</span>
                {product.discount && (
                  <span className="text-xl text-gray-400 line-through">
                    ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-teal-700 dark:text-teal-400 text-sm font-bold flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1" />
                In Stock - Ready to ship
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-10 font-light">
              {product.description}
            </p>

            {/* Actions */}
            <div className="space-y-6 mb-12">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full px-4 py-3 justify-between sm:justify-start">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-teal-800 dark:text-gray-400 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="mx-6 font-bold text-gray-900 dark:text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-teal-800 dark:text-gray-400 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button 
                  onClick={() => {
                    for(let i=0; i<quantity; i++) addToCart(product);
                    navigate('/cart');
                  }}
                  className="flex-1 bg-teal-800 text-white py-4 rounded-full font-bold hover:bg-teal-900 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-teal-800/20"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{t('product.addToCart')}</span>
                </button>
              </div>

              {/* AR Try-On Button */}
              {(product.category === 'Accessories' || product.category === 'Apparel' || product.category === 'Electronics') && (
                <button 
                  onClick={() => setIsARModalOpen(true)}
                  className="w-full bg-white dark:bg-gray-900 border-2 border-gold-500 text-gold-500 py-4 rounded-full font-bold hover:bg-gold-500 hover:text-teal-900 transition-all flex items-center justify-center space-x-2 group"
                >
                  <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
                  <span>{t('product.tryOn')}</span>
                </button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-50 dark:border-gray-800">
                <div className="bg-teal-50 dark:bg-teal-900/20 p-2 rounded-lg">
                  <Truck className="h-5 w-5 text-teal-800 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest">Free Express</p>
                  <p className="text-[9px] text-gray-500">Delivery in 2-3 days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-50 dark:border-gray-800">
                <div className="bg-gold-50 dark:bg-gold-900/20 p-2 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-gold-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest">Secure Payment</p>
                  <p className="text-[9px] text-gray-500">100% SSL Encrypted</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-50 dark:border-gray-800">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest">Easy Returns</p>
                  <p className="text-[9px] text-gray-500">30-day money back</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-50 dark:border-gray-800">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest">Authentic</p>
                  <p className="text-[9px] text-gray-500">100% Genuine Pieces</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <div className="flex border-b border-gray-100 dark:border-gray-800 mb-8">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${
                  activeTab === tab ? 'text-teal-800' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500" />
                )}
              </button>
            ))}
          </div>
          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="prose prose-blue max-w-none text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Material', value: 'Premium Grade' },
                  { label: 'Weight', value: 'Lightweight' },
                  { label: 'Dimensions', value: 'Standard Elite' },
                  { label: 'Warranty', value: '2 Years International' }
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <span className="text-gray-500 font-medium">{spec.label}</span>
                    <span className="text-gray-900 dark:text-white font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-12">
                {/* Review Form */}
                {user ? (
                  <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Write a Review</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Rating:</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                               key={star}
                              type="button"
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                              className={`p-1 transition-colors ${star <= newReview.rating ? 'text-gold-500' : 'text-gray-300 dark:text-gray-700'}`}
                            >
                              <Star className={`h-6 w-6 ${star <= newReview.rating ? 'fill-current' : ''}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="relative">
                        <textarea
                          required
                          placeholder="Share your experience with this product..."
                          className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-gold-500 outline-none min-h-[120px] dark:text-white transition-all"
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-teal-800 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-900 transition-all flex items-center space-x-2 disabled:opacity-50 shadow-lg shadow-teal-800/20"
                      >
                        {isSubmitting ? (
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Submit Review</span>
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl text-center">
                    <p className="text-blue-700 dark:text-blue-300 font-medium">Please login to write a review.</p>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-8">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="flex space-x-4 pb-8 border-b border-gray-100 dark:border-gray-800 last:border-0">
                        <img src={review.userPhoto || `https://ui-avatars.com/api/?name=${review.userName}`} alt="" className="h-12 w-12 rounded-full border border-gray-100 dark:border-gray-800" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white">{review.userName}</h4>
                              <div className="flex items-center text-gold-500 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">
                              {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Just now'}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <MessageSquare className="h-12 w-12 text-gray-200 dark:text-gray-800 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* AR Try-On Modal */}
      <AnimatePresence>
        {isARModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsARModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-gray-950 w-full max-w-4xl h-[80vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">AR Virtual Try-On</h3>
                  <p className="text-xs text-gold-500 font-bold uppercase tracking-widest mt-1">Eminix Vision Pro</p>
                </div>
                <button 
                  onClick={() => setIsARModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <CheckCircle2 className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex-grow relative bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-12 text-center">
                <div className="max-w-md">
                  <div className="bg-gold-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Sparkles className="h-12 w-12 text-gold-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AR Experience Coming Soon</h4>
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-8">
                    We are currently refining our augmented reality experience to ensure it meets the Eminix standard of excellence. Soon you'll be able to see how this {product.name} looks in your space or on your person with perfect precision.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                      <p className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-1">Precision</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">99.9% Accuracy</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                      <p className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-1">Lighting</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Real-time HDR</p>
                    </div>
                  </div>
                </div>
                
                {/* Simulated Camera Feed Background */}
                <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                  <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent animate-pulse" />
                </div>
              </div>

              <div className="p-8 bg-teal-900 text-white flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={product.image} alt="" className="h-12 w-12 rounded-xl object-cover border border-white/10" />
                  <div>
                    <p className="text-xs font-bold text-gold-500 uppercase tracking-widest">Selected Item</p>
                    <p className="text-sm font-bold">{product.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsARModalOpen(false)}
                  className="bg-gold-500 text-teal-900 px-8 py-3 rounded-full font-bold hover:bg-gold-400 transition-all"
                >
                  Notify Me
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
