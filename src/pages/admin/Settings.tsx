import React from 'react';
import { 
  Store, 
  CreditCard, 
  Truck, 
  Globe, 
  Shield, 
  Bell, 
  Mail,
  Save,
  Palette
} from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Store Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 font-light">Configure your store's general information, payments, and preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* General Information */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
              <Store className="h-5 w-5 text-teal-800 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">General Information</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Store Name</label>
                <input type="text" defaultValue="Eminixstore" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Support Email</label>
                <input type="email" defaultValue="support@eminixstore.com" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Store Currency</label>
                <select className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Timezone</label>
                <select className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white">
                  <option>(GMT-05:00) Eastern Time</option>
                  <option>(GMT+00:00) London</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Store Description</label>
              <textarea rows={3} className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white resize-none" defaultValue="Premium Shopping, Timeless Elegance. A minimalist and luxurious e-commerce experience for curated masterpieces."></textarea>
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-gold-50 dark:bg-gold-900/20 rounded-xl">
              <CreditCard className="h-5 w-5 text-gold-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Payment Settings</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-blue-600">Stripe</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Stripe Payments</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest">Connected</p>
                </div>
              </div>
              <button className="text-xs font-bold text-teal-800 dark:text-teal-400 hover:underline">Configure</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-teal-800">COD</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Cash on Delivery</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest">Disabled</p>
                </div>
              </div>
              <button className="text-xs font-bold text-teal-800 dark:text-teal-400 hover:underline">Enable</button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Palette className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Appearance</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Primary Color</label>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-[#006D5B] border border-gray-200 dark:border-gray-700"></div>
                  <input type="text" defaultValue="#006D5B" className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white font-mono text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Accent Color</label>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-[#D4AF37] border border-gray-200 dark:border-gray-700"></div>
                  <input type="text" defaultValue="#D4AF37" className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white font-mono text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="bg-teal-800 text-white px-10 py-4 rounded-full font-bold hover:bg-teal-900 transition-all shadow-xl shadow-teal-800/20 flex items-center space-x-2">
            <Save className="h-5 w-5" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
