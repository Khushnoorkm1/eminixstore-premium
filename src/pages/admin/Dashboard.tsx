import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Calendar,
  Loader2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { adminService } from '../../services/adminService';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const salesData = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 198 },
  { name: 'Mar', sales: 2000, orders: 150 },
  { name: 'Apr', sales: 2780, orders: 190 },
  { name: 'May', sales: 1890, orders: 120 },
  { name: 'Jun', sales: 2390, orders: 170 },
  { name: 'Jul', sales: 3490, orders: 210 },
];

const topProducts = [
  { name: 'Eminix Signature Watch', sales: 120, revenue: 59880, color: '#006D5B' },
  { name: 'Luxury Silk Scarf', sales: 98, revenue: 14700, color: '#D4AF37' },
  { name: 'Tech Pro Earbuds', sales: 85, revenue: 21250, color: '#1a1a1a' },
  { name: 'Minimalist Leather Wallet', sales: 72, revenue: 6480, color: '#4a4a4a' },
];

const recentOrders = [
  { id: 'ORD-7281', customer: 'Alexander Pierce', date: 'Oct 12, 2026', amount: 499.00, status: 'Delivered' },
  { id: 'ORD-7282', customer: 'Sophia Loren', date: 'Oct 12, 2026', amount: 1250.00, status: 'Shipped' },
  { id: 'ORD-7283', customer: 'Marcus Aurelius', date: 'Oct 11, 2026', amount: 89.00, status: 'Pending' },
  { id: 'ORD-7284', customer: 'Elena Gilbert', date: 'Oct 11, 2026', amount: 340.00, status: 'Cancelled' },
  { id: 'ORD-7285', customer: 'Damon Salvatore', date: 'Oct 10, 2026', amount: 2100.00, status: 'Delivered' },
];

const trafficData = [
  { name: 'Direct', value: 45, color: '#006D5B' },
  { name: 'Social', value: 25, color: '#D4AF37' },
  { name: 'Referral', value: 15, color: '#1a1a1a' },
  { name: 'Email', value: 15, color: '#4a4a4a' },
];

const StatCard = ({ title, value, change, icon: Icon, isPositive }: any) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-2xl">
        <Icon className="h-6 w-6 text-teal-800 dark:text-teal-400" />
      </div>
      <div className={`flex items-center space-x-1 text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <span>{isPositive ? '+' : '-'}{change}%</span>
        {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      </div>
    </div>
    <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    conversion: 3.42
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch total orders
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const totalOrders = ordersSnapshot.size;
      const totalRevenue = ordersSnapshot.docs.reduce((acc, doc) => acc + (doc.data().total || 0), 0);

      // Fetch total customers
      const customersSnapshot = await getDocs(collection(db, 'users'));
      const totalCustomers = customersSnapshot.size;

      // Fetch recent orders
      const recentQ = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(5));
      const recentSnapshot = await getDocs(recentQ);
      const recentData = recentSnapshot.docs.map(doc => ({
        id: doc.id,
        customer: doc.data().customerName || 'Guest',
        date: doc.data().createdAt?.toDate().toLocaleDateString() || 'N/A',
        amount: doc.data().total || 0,
        status: doc.data().status || 'Pending'
      }));

      setStats({
        revenue: totalRevenue,
        orders: totalOrders,
        customers: totalCustomers,
        conversion: 3.42
      });
      setRecentOrders(recentData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/20 dark:bg-gray-900/20 backdrop-blur-[2px]">
          <Loader2 className="h-10 w-10 text-teal-800 animate-spin" />
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">Welcome back, here's what's happening with Eminixstore today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Calendar className="h-4 w-4" />
            <span>Oct 1, 2026 - Oct 12, 2026</span>
          </button>
          <button className="bg-teal-800 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} change="12.5" icon={DollarSign} isPositive={true} />
        <StatCard title="Total Orders" value={stats.orders.toLocaleString()} change="8.2" icon={ShoppingBag} isPositive={true} />
        <StatCard title="Total Customers" value={stats.customers.toLocaleString()} change="3.1" icon={Users} isPositive={true} />
        <StatCard title="Conversion Rate" value={`${stats.conversion}%`} change="1.4" icon={TrendingUp} isPositive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Sales Performance</h3>
            <select className="bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-xs font-bold px-3 py-1.5 outline-none dark:text-white">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006D5B" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#006D5B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#006D5B" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Traffic Sources</h3>
          <div className="space-y-6">
            {trafficData.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-500 dark:text-gray-400 uppercase tracking-widest">{item.name}</span>
                  <span className="text-gray-900 dark:text-white">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-4 bg-teal-50 dark:bg-teal-900/10 rounded-2xl border border-teal-100 dark:border-teal-900/20">
            <p className="text-[10px] text-teal-800 dark:text-teal-400 font-bold uppercase tracking-widest mb-1">Top Insight</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-light">Direct traffic increased by 15% this week.</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Recent Orders</h3>
          <button className="text-teal-800 dark:text-teal-400 text-sm font-bold hover:underline">View All Orders</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-8 py-4 text-sm font-bold text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-8 py-4 text-sm text-gray-600 dark:text-gray-400 font-light">{order.customer}</td>
                  <td className="px-8 py-4 text-sm text-gray-600 dark:text-gray-400 font-light">{order.date}</td>
                  <td className="px-8 py-4 text-sm font-bold text-teal-800 dark:text-teal-400">${order.amount.toFixed(2)}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' :
                      order.status === 'Shipped' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' :
                      order.status === 'Pending' ? 'bg-gold-50 dark:bg-gold-900/20 text-gold-600' :
                      'bg-red-50 dark:bg-red-900/20 text-red-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
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
      </div>
    </div>
  );
}
