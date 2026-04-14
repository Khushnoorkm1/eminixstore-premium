import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Ticket, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Calendar,
  Clock,
  Tag,
  Percent,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { adminService } from '../../services/adminService';

const INITIAL_PROMOTIONS = [
  { id: 'PROM-001', code: 'WELCOME20', type: 'Percentage', value: '20%', status: 'Active', usage: '145/500', expiry: 'Dec 31, 2026' },
  { id: 'PROM-002', code: 'FESTIVE50', type: 'Fixed Amount', value: '$50.00', status: 'Active', usage: '89/200', expiry: 'Oct 31, 2026' },
  { id: 'PROM-003', code: 'FREESHIP', type: 'Free Shipping', value: '100%', status: 'Inactive', usage: '1024/∞', expiry: 'Expired' },
  { id: 'PROM-004', code: 'GOLDMEMBER', type: 'Percentage', value: '15%', status: 'Active', usage: '42/∞', expiry: 'No Expiry' },
];

export default function AdminPromotions() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage',
    discount: '',
    status: 'Active',
    expiry: ''
  });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getPromotions();
      setPromotions(data || []);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.code.trim()) return;
    setIsSubmitting(true);
    try {
      await adminService.addPromotion({
        ...formData,
        discount: parseFloat(formData.discount)
      });
      await fetchPromotions();
      setIsModalOpen(false);
      setFormData({
        code: '',
        type: 'percentage',
        discount: '',
        status: 'Active',
        expiry: ''
      });
    } catch (error) {
      console.error('Error saving promotion:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await adminService.deletePromotion(id);
        await fetchPromotions();
      } catch (error) {
        console.error('Error deleting promotion:', error);
      }
    }
  };

  const filteredPromotions = promotions.filter(p => 
    p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Promotions & Discounts</h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">Create and manage coupon codes and promotional offers.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-800 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search coupons by code or type..." 
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Promotions Table */}
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
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Coupon Code</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Value</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Usage</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expiry</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredPromotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gold-50 dark:bg-gold-900/20 rounded-xl">
                        <Ticket className="h-4 w-4 text-gold-500" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white font-mono">{promo.code}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-light">{promo.type}</span>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-sm font-bold text-teal-800 dark:text-teal-400">
                      {promo.type === 'percentage' ? `${promo.discount}%` : `$${promo.discount}`}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>Used</span>
                        <span>{promo.usageCount || 0}</span>
                      </div>
                      <div className="h-1 w-24 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-800 rounded-full" style={{ width: `${Math.min((promo.usageCount || 0) / (promo.limit || 100) * 100, 100)}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>{promo.expiry}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      promo.status === 'Active' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-teal-800 dark:hover:text-teal-400 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(promo.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">Showing 1 to 4 of {filteredPromotions.length} coupons</p>
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
      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Create New Coupon</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Coupon Code</label>
                  <input 
                    type="text" 
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. SUMMER2026"
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3.5 px-4 outline-none dark:text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Type</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3.5 px-4 outline-none dark:text-white"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Value</label>
                    <input 
                      type="number" 
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      placeholder="0"
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3.5 px-4 outline-none dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Expiry Date</label>
                  <input 
                    type="date" 
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3.5 px-4 outline-none dark:text-white"
                  />
                </div>
              </div>

              <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex justify-end space-x-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="bg-teal-800 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span>Create Coupon</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
