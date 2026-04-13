import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, MapPin, CheckCircle2, Smartphone, Building2, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { sendEmail, emailTemplates } from '../lib/email';
import SEO from '../components/SEO';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(2);
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call and save to Firestore
      if (user) {
        const orderRef = await addDoc(collection(db, 'orders'), {
          userId: user.uid,
          items,
          total,
          status: 'pending',
          address: formData,
          createdAt: new Date().toISOString()
        });

        // Send order confirmation email
        if (formData.email) {
          sendEmail(
            formData.email,
            'Order Confirmed - Eminixstore',
            emailTemplates.orderConfirmation(orderRef.id, total)
          );
        }
      }
      
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-[#FAF9F6] dark:bg-gray-950">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="h-24 w-24 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center mb-6 shadow-sm"
        >
          <CheckCircle2 className="h-12 w-12 text-teal-700 dark:text-teal-400" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Order Confirmed!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md font-light">Thank you for your purchase. Your order has been placed successfully and will be processed shortly. A confirmation email has been sent to {formData.email}.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-teal-800 text-white px-10 py-4 rounded-full font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 pt-10 pb-20 transition-colors min-h-screen">
      <SEO title="Checkout | Eminixstore" description="Complete your purchase securely at Eminixstore." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 tracking-tight">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-8 mb-10">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-teal-800 dark:text-teal-400' : 'text-gray-400'}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold border-2 ${step >= 1 ? 'border-teal-800 bg-teal-50 dark:bg-teal-900/20 dark:border-teal-400' : 'border-gray-200 dark:border-gray-800'}`}>1</div>
                <span className="font-bold">Shipping</span>
              </div>
              <div className="h-px w-12 bg-gray-200 dark:bg-gray-800" />
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-teal-800 dark:text-teal-400' : 'text-gray-400'}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold border-2 ${step >= 2 ? 'border-teal-800 bg-teal-50 dark:bg-teal-900/20 dark:border-teal-400' : 'border-gray-200 dark:border-gray-800'}`}>2</div>
                <span className="font-bold">Payment</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {!user && step === 1 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 mb-8">
                  <p className="text-blue-800 dark:text-blue-300 text-sm font-medium mb-2">Checking out as a guest?</p>
                  <p className="text-blue-600 dark:text-blue-400 text-xs mb-4">Create an account later to track your order and earn 500 loyalty points.</p>
                  <button type="button" className="text-teal-800 dark:text-teal-400 text-xs font-bold uppercase tracking-widest hover:underline">Sign In Instead</button>
                </div>
              )}

              {step === 1 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">First Name</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-gold-500 outline-none dark:text-white transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Last Name</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-gold-500 outline-none dark:text-white transition-all shadow-sm" />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-gold-500 outline-none dark:text-white transition-all shadow-sm" />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Street Address</label>
                    <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-gold-500 outline-none dark:text-white transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">City</label>
                    <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-gold-500 outline-none dark:text-white transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">ZIP / Postal Code</label>
                    <input required name="zip" value={formData.zip} onChange={handleInputChange} className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-gold-500 outline-none dark:text-white transition-all shadow-sm" />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm group hover:border-teal-800 transition-all cursor-pointer" onClick={() => setFormData({...formData, paymentMethod: 'card'})}>
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-6 w-6 text-teal-800 dark:text-teal-400" />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">Credit / Debit Card</p>
                        <p className="text-xs text-gray-500 font-light">Secure payment via Stripe / Razorpay</p>
                      </div>
                    </div>
                    <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="h-5 w-5 text-teal-800 focus:ring-teal-800" />
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm group hover:border-teal-800 transition-all cursor-pointer" onClick={() => setFormData({...formData, paymentMethod: 'upi'})}>
                    <div className="flex items-center space-x-4">
                      <Smartphone className="h-6 w-6 text-teal-800 dark:text-teal-400" />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">UPI / PhonePe / Google Pay</p>
                        <p className="text-xs text-gray-500 font-light">Instant payment via UPI apps</p>
                      </div>
                    </div>
                    <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} className="h-5 w-5 text-teal-800 focus:ring-teal-800" />
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm group hover:border-teal-800 transition-all cursor-pointer" onClick={() => setFormData({...formData, paymentMethod: 'cod'})}>
                    <div className="flex items-center space-x-4">
                      <Truck className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">Cash on Delivery</p>
                        <p className="text-xs text-gray-500 font-light">Pay when you receive your order</p>
                      </div>
                    </div>
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="h-5 w-5 text-teal-800 focus:ring-teal-800" />
                  </div>
                </div>
              )}

              <div className="pt-8 flex justify-between items-center">
                {step === 2 && (
                  <button type="button" onClick={() => setStep(1)} className="text-gray-500 font-bold hover:text-gray-900 dark:hover:text-white transition-colors">
                    Back to Shipping
                  </button>
                )}
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="bg-teal-800 text-white px-10 py-4 rounded-full font-bold hover:bg-teal-900 transition-all flex items-center space-x-2 ml-auto shadow-lg shadow-teal-800/20"
                >
                  {isProcessing ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{step === 1 ? 'Continue to Payment' : 'Complete Purchase'}</span>
                      <CheckCircle2 className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Order Summary</h3>
              <div className="space-y-4 mb-8">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 font-light">{item.name} x {item.quantity}</span>
                    <span className="font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-teal-800 dark:text-teal-400 tracking-tighter">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-800 flex items-start space-x-3">
                <ShieldCheck className="h-5 w-5 text-teal-700 dark:text-teal-400 mt-0.5" />
                <p className="text-xs text-teal-800 dark:text-teal-300 leading-relaxed font-light">Your data is protected by industry-standard encryption. We never store your full credit card details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
