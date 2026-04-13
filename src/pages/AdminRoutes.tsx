import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from './admin/Dashboard';
import AdminProducts from './admin/Products';
import AdminOrders from './admin/Orders';
import AdminCustomers from './admin/Customers';
import AdminSettings from './admin/Settings';
import AdminCategories from './admin/Categories';
import AdminPlaceholder from './admin/Placeholder';

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="promotions" element={<AdminPlaceholder title="Promotions & Discounts" />} />
        <Route path="banners" element={<AdminPlaceholder title="Banner Management" />} />
        <Route path="analytics" element={<AdminPlaceholder title="Analytics & Reports" />} />
      </Routes>
    </AdminLayout>
  );
}
