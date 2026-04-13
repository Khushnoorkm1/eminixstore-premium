import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut, ChevronRight, ShoppingBag, CheckCircle2, Truck, Crown } from 'lucide-react';
import { motion } from 'motion/react';
import { logout, db } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, doc, getDoc, updateDoc } from 'firebase/firestore';
import { sendEmail, emailTemplates } from '../lib/email';

const ProfileHome = () => {
  const { user, profile } = useAuth();
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrderCount(snapshot.size);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
        <img src={user?.photoURL || ''} alt="" className="h-24 w-24 rounded-full border-4 border-[#FAF9F6] dark:border-gray-800 shadow-lg" />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{user?.displayName}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-light">{user?.email}</p>
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
            <span className="bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {profile?.role || 'Customer'}
            </span>
            <span className="bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Eminix Member
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Crown className="h-16 w-16 text-gold-500" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Loyalty Points</h3>
          <p className="text-3xl font-bold text-gold-500 mb-2">1,250</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Points Available</p>
          <div className="mt-6">
            <button className="text-teal-800 dark:text-teal-400 text-xs font-bold hover:underline">Redeem Rewards</button>
          </div>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Recent Orders</h3>
          {orderCount > 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-light">You have {orderCount} orders in your history.</p>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-light">You haven't placed any orders yet.</p>
          )}
          <Link to="/account/orders" className="text-teal-800 dark:text-teal-400 text-sm font-bold hover:underline">View All Orders</Link>
        </div>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Shipping Address</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-light">No address saved yet.</p>
          <button className="text-teal-800 dark:text-teal-400 text-sm font-bold hover:underline">Add Address</button>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) return <div className="py-20 text-center"><div className="h-8 w-8 border-4 border-teal-800 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <Package className="h-12 w-12 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">No orders yet</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8 font-light">When you place an order, it will appear here.</p>
        <Link to="/shop" className="bg-teal-800 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Order History</h2>
      {orders.map((order) => (
        <div key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Order ID</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">#{order.id.slice(0, 8).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Date</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Total</p>
              <p className="text-sm font-bold text-teal-800 dark:text-teal-400">${order.total.toFixed(2)}</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-400 text-[10px] font-bold uppercase tracking-widest">
              {order.status || 'Pending'}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-800">
            <div className="flex -space-x-2">
              {order.items.slice(0, 3).map((item: any, idx: number) => (
                <div key={idx} className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden bg-gray-100 shadow-sm">
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                  +{order.items.length - 3}
                </div>
              )}
            </div>
            <Link 
              to={`/account/orders/${order.id}`}
              className="flex items-center space-x-2 text-sm font-bold text-teal-800 dark:text-teal-400 hover:underline transition-all"
            >
              <span>Track Package</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    const docRef = doc(db, 'orders', orderId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [orderId]);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!order || isUpdating) return;
    setIsUpdating(true);
    try {
      const docRef = doc(db, 'orders', order.id);
      await updateDoc(docRef, { status: newStatus });
      
      if (order.address.email) {
        const subject = newStatus === 'Shipped' ? 'Your Order has Shipped! - Eminixstore' : 'Order Delivered - Eminixstore';
        const template = newStatus === 'Shipped' ? emailTemplates.shippingConfirmation(order.id) : emailTemplates.deliveryConfirmation(order.id);
        
        await sendEmail(order.address.email, subject, template);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="py-20 text-center"><div className="h-8 w-8 border-4 border-teal-800 border-t-transparent rounded-full animate-spin mx-auto" /></div>;
  if (!order) return <div className="py-20 text-center text-gray-500">Order not found</div>;

  const steps = [
    { label: 'Order Placed', date: new Date(order.createdAt).toLocaleDateString(), completed: true },
    { label: 'Processing', date: 'In Progress', completed: true },
    { label: 'Shipped', date: order.status === 'Shipped' || order.status === 'Delivered' ? 'Completed' : 'Pending', completed: order.status === 'Shipped' || order.status === 'Delivered' },
    { label: 'Out for Delivery', date: order.status === 'Delivered' ? 'Completed' : 'Pending', completed: order.status === 'Delivered' },
    { label: 'Delivered', date: order.status === 'Delivered' ? 'Completed' : 'Pending', completed: order.status === 'Delivered' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Track Order #{order.id.slice(0, 8).toUpperCase()}</h2>
        <div className="flex items-center space-x-4">
            {order.status === 'pending' && (
                <button 
                    onClick={() => handleUpdateStatus('Shipped')}
                    disabled={isUpdating}
                    className="text-xs bg-teal-800 text-white px-4 py-2 rounded-full font-bold hover:bg-teal-900 transition-all disabled:opacity-50"
                >
                    {isUpdating ? 'Updating...' : 'Simulate Shipping'}
                </button>
            )}
            {order.status === 'Shipped' && (
                <button 
                    onClick={() => handleUpdateStatus('Delivered')}
                    disabled={isUpdating}
                    className="text-xs bg-gold-600 text-white px-4 py-2 rounded-full font-bold hover:bg-gold-700 transition-all disabled:opacity-50"
                >
                    {isUpdating ? 'Updating...' : 'Simulate Delivery'}
                </button>
            )}
            <Link to="/account/orders" className="text-sm font-bold text-teal-800 dark:text-teal-400 hover:underline">Back to Orders</Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <Package className="h-32 w-32" />
        </div>
        
        <div className="relative z-10 space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-6 relative">
              {idx !== steps.length - 1 && (
                <div className={`absolute left-4 top-8 w-0.5 h-12 ${step.completed ? 'bg-teal-800' : 'bg-gray-100 dark:bg-gray-800'}`} />
              )}
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 z-10 ${
                step.completed ? 'bg-teal-800 border-teal-800 text-white' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-300'
              }`}>
                {step.completed ? <CheckCircle2 className="h-4 w-4" /> : <div className="h-2 w-2 rounded-full bg-current" />}
              </div>
              <div>
                <p className={`font-bold ${step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{step.label}</p>
                <p className="text-xs text-gray-500 font-light">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gold-50 dark:bg-gold-900/10 rounded-2xl p-6 border border-gold-100 dark:border-gold-900/20">
        <div className="flex items-start space-x-4">
            <Truck className="h-6 w-6 text-gold-600" />
            <div>
                <p className="font-bold text-gray-900 dark:text-white">Shipping Address</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-light mt-1">
                    {order.address.firstName} {order.address.lastName}<br />
                    {order.address.address}<br />
                    {order.address.city}, {order.address.zip}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const { user, profile } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage('');
    
    try {
      const userRef = doc(db, 'users', user!.uid);
      await updateDoc(userRef, { displayName });
      setMessage('Profile updated successfully!');
      // In a real app, we might also call updateProfile(auth.currentUser, { displayName })
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Account Settings</h2>
      
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
        <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-md">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Display Name</label>
            <input 
              type="text" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-[#FAF9F6] dark:bg-gray-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-teal-800 outline-none dark:text-white transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              value={user?.email || ''} 
              disabled
              className="w-full bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl py-4 px-6 text-gray-400 cursor-not-allowed"
            />
            <p className="text-[10px] text-gray-400 font-light italic">Email cannot be changed for security reasons.</p>
          </div>
          
          {message && (
            <p className={`text-sm font-bold ${message.includes('success') ? 'text-teal-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <button 
            type="submit"
            disabled={isUpdating}
            className="bg-teal-800 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 disabled:opacity-50"
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Preferences</h3>
        <div className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-gray-800">
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">Email Notifications</p>
            <p className="text-xs text-gray-500 font-light">Receive updates about your orders and exclusive offers.</p>
          </div>
          <div className="h-6 w-11 bg-teal-800 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
          </div>
        </div>
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">Two-Factor Authentication</p>
            <p className="text-xs text-gray-500 font-light">Add an extra layer of security to your account.</p>
          </div>
          <div className="h-6 w-11 bg-gray-200 dark:bg-gray-800 rounded-full relative cursor-pointer">
            <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Account() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] dark:bg-gray-950"><div className="h-12 w-12 border-4 border-teal-800 border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-[#FAF9F6] dark:bg-gray-950">
        <div className="h-24 w-24 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <User className="h-10 w-10 text-gray-200" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Account Access</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md font-light">Please login to view your profile, track orders, and manage your Eminix membership.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-teal-800 text-white px-10 py-4 rounded-full font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const navItems = [
    { icon: User, label: 'Profile', path: '/account' },
    { icon: Package, label: 'Orders', path: '/account/orders' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: Settings, label: 'Settings', path: '/account/settings' }
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-gray-950 pt-10 pb-20 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="space-y-1">
              {navItems.map(item => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`h-5 w-5 ${location.pathname === item.path ? 'text-teal-800 dark:text-teal-400' : 'text-gray-400'}`} />
                    <span className="font-bold text-sm">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-30" />
                </Link>
              ))}
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all mt-4"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-bold text-sm">Logout</span>
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <Routes>
              <Route index element={<ProfileHome />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:orderId" element={<TrackOrder />} />
              <Route path="settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
