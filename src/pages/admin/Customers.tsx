import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Filter,
  X,
  User as UserIcon,
  Shield,
  MapPin,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const initialCustomers = [
  { id: 'CUS-101', name: 'Alexander Pierce', email: 'alex@example.com', phone: '+1 (555) 123-4567', orders: 12, spent: 4590.00, joined: 'Jan 12, 2026', status: 'Active' },
  { id: 'CUS-102', name: 'Sophia Loren', email: 'sophia@example.com', phone: '+1 (555) 987-6543', orders: 8, spent: 2840.00, joined: 'Feb 05, 2026', status: 'Active' },
  { id: 'CUS-103', name: 'Marcus Aurelius', email: 'marcus@example.com', phone: '+1 (555) 456-7890', orders: 5, spent: 1250.00, joined: 'Mar 20, 2026', status: 'Inactive' },
  { id: 'CUS-104', name: 'Elena Gilbert', email: 'elena@example.com', phone: '+1 (555) 234-5678', orders: 15, spent: 6120.00, joined: 'Apr 15, 2026', status: 'Active' },
  { id: 'CUS-105', name: 'Damon Salvatore', email: 'damon@example.com', phone: '+1 (555) 876-5432', orders: 3, spent: 890.00, joined: 'May 22, 2026', status: 'Active' },
  { id: 'CUS-106', name: 'Bonnie Bennett', email: 'bonnie@example.com', phone: '+1 (555) 345-6789', orders: 7, spent: 1450.00, joined: 'Jun 30, 2026', status: 'Active' },
  { id: 'CUS-107', name: 'Caroline Forbes', email: 'caroline@example.com', phone: '+1 (555) 765-4321', orders: 10, spent: 3200.00, joined: 'Jul 18, 2026', status: 'Active' },
];

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        joined: doc.data().createdAt?.toDate().toLocaleDateString() || 'N/A'
      }));
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (customer: any = null) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingCustomer(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Customer Directory</h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">View and manage your customer base and their purchasing history.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-teal-800 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search customers by name or email..." 
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden min-h-[400px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10">
            <Loader2 className="h-10 w-10 text-teal-800 animate-spin" />
          </div>
        ) : null}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Orders</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Spent</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Joined</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-teal-800/10 flex items-center justify-center text-teal-800 dark:text-teal-400 font-bold text-sm">
                        {customer.displayName ? customer.displayName.split(' ').map((n: string) => n[0]).join('') : customer.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{customer.displayName || 'Guest User'}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                        <Mail className="h-3 w-3" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                        <Phone className="h-3 w-3" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-900 dark:text-white font-bold">{customer.ordersCount || 0}</td>
                  <td className="px-8 py-4 text-sm font-bold text-teal-800 dark:text-teal-400">${(customer.totalSpent || 0).toLocaleString()}</td>
                  <td className="px-8 py-4 text-sm text-gray-600 dark:text-gray-400 font-light">{customer.joined}</td>
                  <td className="px-8 py-4">
                    <button 
                      onClick={() => handleOpenModal(customer)}
                      className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">Showing 1 to 7 of {filteredCustomers.length} customers</p>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-100 dark:border-gray-800 rounded-lg text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="h-8 w-8 bg-teal-800 text-white rounded-lg text-xs font-bold">1</button>
            <button className="p-2 border border-gray-100 dark:border-gray-800 rounded-lg text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30" disabled>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Customer Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white dark:bg-gray-950 z-[70] rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-teal-800 dark:text-teal-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                    </h2>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                      {editingCustomer ? `ID: ${editingCustomer.id}` : 'Create a new customer profile'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="text" 
                        defaultValue={editingCustomer?.name}
                        placeholder="Alexander Pierce"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-800 dark:text-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="email" 
                        defaultValue={editingCustomer?.email}
                        placeholder="alex@example.com"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-800 dark:text-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="text" 
                        defaultValue={editingCustomer?.phone}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-800 dark:text-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Status</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select 
                        defaultValue={editingCustomer?.status || 'Active'}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-800 dark:text-white transition-all appearance-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Shipping Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                    <textarea 
                      rows={3}
                      placeholder="721 Fifth Avenue, New York, NY 10022"
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-800 dark:text-white transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="bg-teal-50 dark:bg-teal-900/10 p-6 rounded-3xl border border-teal-100 dark:border-teal-900/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="h-4 w-4 text-teal-800 dark:text-teal-400" />
                    <h4 className="text-xs font-bold text-teal-800 dark:text-teal-400 uppercase tracking-widest">Customer Stats</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Total Orders</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{editingCustomer?.orders || 0}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Total Spent</p>
                      <p className="text-xl font-bold text-teal-800 dark:text-teal-400">${(editingCustomer?.spent || 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-gray-50 dark:border-gray-800 flex items-center justify-end space-x-4">
                <button 
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button className="bg-teal-800 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20">
                  {editingCustomer ? 'Update Profile' : 'Create Customer'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
