import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Filter
} from 'lucide-react';

const customers = [
  { id: 'CUS-101', name: 'Alexander Pierce', email: 'alex@example.com', phone: '+1 (555) 123-4567', orders: 12, spent: 4590.00, joined: 'Jan 12, 2026', status: 'Active' },
  { id: 'CUS-102', name: 'Sophia Loren', email: 'sophia@example.com', phone: '+1 (555) 987-6543', orders: 8, spent: 2840.00, joined: 'Feb 05, 2026', status: 'Active' },
  { id: 'CUS-103', name: 'Marcus Aurelius', email: 'marcus@example.com', phone: '+1 (555) 456-7890', orders: 5, spent: 1250.00, joined: 'Mar 20, 2026', status: 'Inactive' },
  { id: 'CUS-104', name: 'Elena Gilbert', email: 'elena@example.com', phone: '+1 (555) 234-5678', orders: 15, spent: 6120.00, joined: 'Apr 15, 2026', status: 'Active' },
  { id: 'CUS-105', name: 'Damon Salvatore', email: 'damon@example.com', phone: '+1 (555) 876-5432', orders: 3, spent: 890.00, joined: 'May 22, 2026', status: 'Active' },
  { id: 'CUS-106', name: 'Bonnie Bennett', email: 'bonnie@example.com', phone: '+1 (555) 345-6789', orders: 7, spent: 1450.00, joined: 'Jun 30, 2026', status: 'Active' },
  { id: 'CUS-107', name: 'Caroline Forbes', email: 'caroline@example.com', phone: '+1 (555) 765-4321', orders: 10, spent: 3200.00, joined: 'Jul 18, 2026', status: 'Active' },
];

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Customer Directory</h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">View and manage your customer base and their purchasing history.</p>
        </div>
        <button className="bg-teal-800 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2">
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
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
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
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{customer.name}</p>
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
                  <td className="px-8 py-4 text-sm text-gray-900 dark:text-white font-bold">{customer.orders}</td>
                  <td className="px-8 py-4 text-sm font-bold text-teal-800 dark:text-teal-400">${customer.spent.toLocaleString()}</td>
                  <td className="px-8 py-4 text-sm text-gray-600 dark:text-gray-400 font-light">{customer.joined}</td>
                  <td className="px-8 py-4">
                    <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
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
    </div>
  );
}
