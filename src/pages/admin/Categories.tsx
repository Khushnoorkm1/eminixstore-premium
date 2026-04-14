import React, { useState, useEffect } from 'react';
import { Tag, Plus, MoreVertical, Edit, Trash2, X, Image as ImageIcon, LayoutGrid, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { adminService } from '../../services/adminService';

const initialCategories = [
  { id: 1, name: 'Apparel', description: 'Haute Couture and premium clothing', products: 120, status: 'Active', image: 'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?w=400&q=80' },
  { id: 2, name: 'Accessories', description: 'Timeless luxury pieces', products: 85, status: 'Active', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&q=80' },
  { id: 3, name: 'Electronics', description: 'High-end tech innovations', products: 45, status: 'Active', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80' },
  { id: 4, name: 'Home Decor', description: 'Modern living essentials', products: 60, status: 'Active', image: 'https://images.unsplash.com/photo-1513519247388-193ad513d746?w=400&q=80' },
];

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    status: 'Active'
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (category: any = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name || '',
        description: category.description || '',
        image: category.image || '',
        status: category.status || 'Active'
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        image: '',
        status: 'Active'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  const handleSaveCategory = async () => {
    if (!formData.name.trim()) return;
    
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        await adminService.updateCategory(editingCategory.id, formData);
      } else {
        await adminService.addCategory(formData);
      }
      await fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await adminService.deleteCategory(id);
        await fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Categories</h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">Organize your products into curated collections.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-teal-800 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden min-h-[300px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10">
            <Loader2 className="h-10 w-10 text-teal-800 animate-spin" />
          </div>
        ) : null}
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
                      <div className="h-12 w-12 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <img src={cat.image} alt="" className="h-full w-full object-cover" />
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
                      <button 
                        onClick={() => handleOpenModal(cat)}
                        className="p-2 text-gray-400 hover:text-teal-800 dark:hover:text-teal-400 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(cat.id)}
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
      </div>

      {/* Category Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl bg-white dark:bg-gray-950 z-[70] rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center">
                    <LayoutGrid className="h-6 w-6 text-teal-800 dark:text-teal-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {editingCategory ? 'Edit Category' : 'Add New Category'}
                    </h2>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                      {editingCategory ? `ID: ${editingCategory.id}` : 'Create a new product collection'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Category Name</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Haute Couture"
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-800 dark:text-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of this collection..."
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl py-3 px-6 text-sm outline-none focus:ring-2 focus:ring-teal-800 dark:text-white transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Category Image</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="aspect-video rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center space-y-2 hover:border-teal-800 transition-colors cursor-pointer group relative overflow-hidden">
                      {formData.image ? (
                        <>
                          <img src={formData.image} alt="" className="h-full w-full object-cover rounded-2xl" />
                          <button 
                            onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, image: '' }); }}
                            className="absolute top-2 right-2 p-1 bg-white/80 dark:bg-gray-900/80 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-8 w-8 text-gray-300 group-hover:text-teal-800 transition-colors" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upload Image</span>
                          <input 
                            type="text" 
                            placeholder="Or paste URL"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          />
                        </>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Status</label>
                        <select 
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl py-3 px-6 text-sm outline-none focus:ring-2 focus:ring-teal-800 dark:text-white transition-all appearance-none"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Products Count</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{editingCategory?.products || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-gray-50 dark:border-gray-800 flex items-center justify-end space-x-4">
                <button 
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveCategory}
                  disabled={isSubmitting}
                  className="bg-teal-800 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingCategory ? 'Update Category' : 'Create Category'}</span>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
