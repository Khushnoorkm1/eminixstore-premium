import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';

const orders = [
  { id: 'ORD-7281', customer: 'Alexander Pierce', email: 'alex@example.com', date: 'Oct 12, 2026', amount: 499.00, status: 'Delivered', items: 2 },
  { id: 'ORD-7282', customer: 'Sophia Loren', email: 'sophia@example.com', date: 'Oct 12, 2026', amount: 1250.00, status: 'Shipped', items: 3 },
  { id: 'ORD-7283', customer: 'Marcus Aurelius', email: 'marcus@example.com', date: 'Oct 11, 2026', amount: 89.00, status: 'Pending', items: 1 },
  { id: 'ORD-7284', customer: 'Elena Gilbert', email: 'elena@example.com', date: 'Oct 11, 2026', amount: 340.00, status: 'Cancelled', items: 2 },
  { id: 'ORD-7285', customer: 'Damon Salvatore', email: 'damon@example.com', date: 'Oct 10, 2026', amount: 2100.00, status: 'Delivered', items: 5 },
  { id: 'ORD-7286', customer: 'Bonnie Bennett', email: 'bonnie@example.com', date: 'Oct 10, 2026', amount: 150.00, status: 'Pending', items: 1 },
  { id: 'ORD-7287', customer: 'Caroline Forbes', email: 'caroline@example.com', date: 'Oct 09, 2026', amount: 560.00, status: 'Shipped', items: 2 },
];

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter(o => 
    (o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || o.status === statusFilter)
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="h-3 w-3" />;
      case 'Shipped': return <Truck className="h-3 w-3" />;
      case 'Pending': return <Clock className="h-3 w-3" />;
      case 'Cancelled': return <XCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-50 dark:bg-green-900/20 text-green-600';
      case 'Shipped': return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600';
      case 'Pending': return 'bg-gold-50 dark:bg-gold-900/20 text-gold-600';
      case 'Cancelled': return 'bg-red-50 dark:bg-red-900/20 text-red-600';
      default: return 'bg-gray-50 dark:bg-gray-900/20 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Order Management</h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">Track and manage customer orders and fulfillment.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Printer className="h-4 w-4" />
            <span>Print Batch</span>
          </button>
          <button className="bg-teal-800 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders by ID or customer name..." 
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-50 dark:bg-gray-800 p-1 rounded-xl">
            {['All', 'Pending', 'Shipped', 'Delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === status 
                    ? 'bg-white dark:bg-gray-700 text-teal-800 dark:text-teal-400 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Items</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-8 py-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{order.id}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{order.date}</p>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{order.customer}</p>
                      <p className="text-[10px] text-gray-400 font-light">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-600 dark:text-gray-400 font-light">{order.items} items</td>
                  <td className="px-8 py-4 text-sm font-bold text-teal-800 dark:text-teal-400">${order.amount.toFixed(2)}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center w-fit space-x-1.5 ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-teal-800 dark:hover:text-teal-400 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
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
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">Showing 1 to 7 of {filteredOrders.length} orders</p>
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
