import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from './admin/Dashboard';
import AdminProducts from './admin/Products';
import AdminOrders from './admin/Orders';
import AdminCustomers from './admin/Customers';
import AdminSettings from './admin/Settings';
import AdminCategories from './admin/Categories';
import AdminBanners from './admin/Banners';
import AdminPromotions from './admin/Promotions';
import AdminAnalytics from './admin/Analytics';
import AdminLogin from './admin/Login';
import AdminPlaceholder from './admin/Placeholder';
import { useAuth } from '../context/AuthContext';

export default function AdminRoutes() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-teal-800/30 border-t-teal-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      
      {/* Protected Admin Routes */}
      <Route 
        path="*" 
        element={
          profile?.role === 'admin' ? (
            <AdminLayout>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="promotions" element={<AdminPromotions />} />
                <Route path="banners" element={<AdminBanners />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </AdminLayout>
          ) : (
            <Navigate to="/admin/login" replace />
          )
        } 
      />
    </Routes>
  );
}
