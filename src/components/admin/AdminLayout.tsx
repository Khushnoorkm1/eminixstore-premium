import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  ShoppingCart, 
  Users, 
  Ticket, 
  Image as ImageIcon, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  Sun,
  Moon,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { logout } from '../../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: Tag, label: 'Categories', path: '/admin/categories' },
  { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { icon: Ticket, label: 'Promotions', path: '/admin/promotions' },
  { icon: ImageIcon, label: 'Banners', path: '/admin/banners' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Protect admin routes
  if (!profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="h-20 w-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <X className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
          <p className="text-gray-400 font-light">You do not have permission to access the admin panel. Please contact the administrator if you believe this is an error.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-teal-800 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-900 transition-all"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-gray-950 transition-colors duration-300 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } hidden lg:block`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-800">
            <Link to="/admin" className="flex items-center space-x-2 overflow-hidden">
              <span className={`text-xl font-extrabold tracking-tighter text-teal-800 dark:text-teal-400 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>EMINIX</span>
              <span className={`text-xl font-light tracking-tighter text-gold-500 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>ADMIN</span>
              {!isSidebarOpen && <span className="text-xl font-extrabold tracking-tighter text-teal-800 dark:text-teal-400">E</span>}
            </Link>
          </div>

          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
            <Link
              to="/"
              className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group mb-4"
            >
              <ChevronRight className="h-5 w-5 flex-shrink-0 rotate-180" />
              {isSidebarOpen && <span className="text-sm font-bold">Back to Store</span>}
            </Link>
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all group ${
                    isActive 
                      ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-400' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-teal-800 dark:text-teal-400' : 'group-hover:text-teal-800 dark:group-hover:text-teal-400'}`} />
                  {isSidebarOpen && <span className="text-sm font-bold truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <button 
              onClick={() => { logout(); navigate('/'); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all`}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm font-bold">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Topbar */}
        <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:flex items-center bg-gray-50 dark:bg-gray-800 rounded-full px-4 py-1.5 border border-gray-100 dark:border-gray-700">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none outline-none text-sm dark:text-white w-48 lg:w-64"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-gold-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </button>
            <div className="h-8 w-px bg-gray-100 dark:bg-gray-800 mx-2 hidden sm:block"></div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">{user?.displayName}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">Administrator</p>
              </div>
              <img src={user?.photoURL || ''} alt="" className="h-9 w-9 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
