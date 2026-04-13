import React from 'react';
import { Tag, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';

const categories = [
  { id: 1, name: 'Apparel', description: 'Haute Couture and premium clothing', products: 120, status: 'Active' },
  { id: 2, name: 'Accessories', description: 'Timeless luxury pieces', products: 85, status: 'Active' },
  { id: 3, name: 'Electronics', description: 'High-end tech innovations', products: 45, status: 'Active' },
  { id: 4, name: 'Home Decor', description: 'Modern living essentials', products: 60, status: 'Active' },
];

export default function AdminCategories() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Categories</h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">Organize your products into curated collections.</p>
        </div>
        <button className="bg-teal-800 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Products</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                        <Tag className="h-4 w-4 text-teal-800 dark:text-teal-400" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-600 dark:text-gray-400 font-light max-w-xs truncate">{cat.description}</td>
                  <td className="px-8 py-4 text-sm font-bold text-gray-900 dark:text-white">{cat.products}</td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-green-50 dark:bg-green-900/20 text-green-600">
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-teal-800 dark:hover:text-teal-400 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
