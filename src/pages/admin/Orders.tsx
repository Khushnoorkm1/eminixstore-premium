import React, { useState, useEffect } from 'react';
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
  XCircle,
  X,
  Package,
  CreditCard,
  MapPin,
  User as UserIcon,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { adminService } from '../../services/adminService';

const orders = [
  { 
    id: 'ORD-7281', 
    customer: 'Alexander Pierce', 
    email: 'alex@example.com', 
    date: 'Oct 12, 2026', 
    amount: 499.00, 
    status: 'Delivered', 
    items: 2,
    phone: '+1 (555) 123-4567',
    address: '721 Fifth Avenue, New York, NY 10022',
    paymentMethod: 'Visa ending in 4242',
    orderItems: [
      { id: 1, name: 'Premium Silk Scarf', price: 250.00, quantity: 1, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=200&q=80' },
      { id: 2, name: 'Leather Card Holder', price: 249.00, quantity: 1, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&q=80' }
    ]
  },
  { 
    id: 'ORD-7282', 
    customer: 'Sophia Loren', 
    email: 'sophia@example.com', 
    date: 'Oct 12, 2026', 
    amount: 1250.00, 
    status: 'Shipped', 
    items: 3,
    phone: '+1 (555) 987-6543',
    address: 'Via Condotti 10, Rome, Italy',
    paymentMethod: 'Mastercard ending in 8888',
    orderItems: [
      { id: 3, name: 'Gold Signet Ring', price: 850.00, quantity: 1, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80' },
      { id: 4, name: 'Velvet Evening Bag', price: 400.00, quantity: 1, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?w=200&q=80' }
    ]
  },
  { id: 'ORD-7283', customer: 'Marcus Aurelius', email: 'marcus@example.com', date: 'Oct 11, 2026', amount: 89.00, status: 'Pending', items: 1 },
  { id: 'ORD-7284', customer: 'Elena Gilbert', email: 'elena@example.com', date: 'Oct 11, 2026', amount: 340.00, status: 'Cancelled', items: 2 },
  { id: 'ORD-7285', customer: 'Damon Salvatore', email: 'damon@example.com', date: 'Oct 10, 2026', amount: 2100.00, status: 'Delivered', items: 5 },
  { id: 'ORD-7286', customer: 'Bonnie Bennett', email: 'bonnie@example.com', date: 'Oct 10, 2026', amount: 150.00, status: 'Pending', items: 1 },
  { id: 'ORD-7287', customer: 'Caroline Forbes', email: 'caroline@example.com', date: 'Oct 09, 2026', amount: 560.00, status: 'Shipped', items: 2 },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getOrders();
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      await fetchOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

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
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden min-h-[400px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-10 w-10 text-teal-800 animate-spin" />
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading Orders...</p>
            </div>
          </div>
        ) : null}
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
                  <td className="px-8 py-4 text-sm font-bold text-teal-800 dark:text-teal-400">${typeof order.amount === 'number' ? order.amount.toFixed(2) : (order.total || 0).toFixed(2)}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center w-fit space-x-1.5 ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-gray-400 hover:text-teal-800 dark:hover:text-teal-400 transition-colors"
                      >
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

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-white dark:bg-gray-950 z-[70] rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-teal-800 dark:text-teal-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Order {selectedOrder.id}</h2>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Placed on {selectedOrder.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 ${getStatusClass(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span>{selectedOrder.status}</span>
                  </span>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-grow overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Order Items */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">Order Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.orderItems ? selectedOrder.orderItems.map((item: any) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                        <div className="flex-grow">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-teal-800 dark:text-teal-400">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    )) : (
                      <p className="text-sm text-gray-500 italic">Item details not available for this mock order.</p>
                    )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-bold text-gray-900 dark:text-white">${selectedOrder.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-green-600 font-bold">Free</span>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-gray-900 dark:text-white">Total</span>
                      <span className="font-extrabold text-teal-800 dark:text-teal-400">${selectedOrder.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Customer & Shipping */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center space-x-2">
                      <UserIcon className="h-4 w-4 text-gold-500" />
                      <span>Customer</span>
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedOrder.customer}</p>
                      <p className="text-xs text-gray-500 mb-2">{selectedOrder.email}</p>
                      <p className="text-xs text-gray-500">{selectedOrder.phone || 'No phone provided'}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gold-500" />
                      <span>Shipping Address</span>
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {selectedOrder.address || 'Address details not available.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-gold-500" />
                      <span>Payment</span>
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedOrder.paymentMethod || 'Payment method details not available.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-gray-50 dark:border-gray-800 flex items-center justify-end space-x-4">
                <select 
                  className="px-4 py-2.5 rounded-xl text-sm font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 outline-none"
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button 
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'Shipped')}
                  className="bg-teal-800 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20"
                >
                  Fulfill Order
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
