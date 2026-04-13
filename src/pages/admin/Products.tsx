import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  Star,
  X
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../data/products';
import { motion, AnimatePresence } from 'motion/react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ProductImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

function SortableImage({ image, onRemove, onSetPrimary }: { 
  image: ProductImage, 
  onRemove: (id: string) => void,
  onSetPrimary: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 shadow-sm"
    >
      <img 
        src={image.url} 
        alt="" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      
      {/* Drag Handle Overlay */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      {/* Controls */}
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSetPrimary(image.id);
          }}
          className={`p-1.5 rounded-lg transition-all ${image.isPrimary ? 'bg-gold-500 text-white' : 'bg-white/90 dark:bg-gray-900/90 text-gray-400 hover:text-gold-500'}`}
          title="Set as primary"
        >
          <Star className={`h-3.5 w-3.5 ${image.isPrimary ? 'fill-current' : ''}`} />
        </button>
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(image.id);
          }}
          className="p-1.5 bg-white/90 dark:bg-gray-900/90 text-gray-400 hover:text-red-500 rounded-lg transition-all"
          title="Remove image"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {image.isPrimary && (
        <div className="absolute bottom-2 left-2 bg-gold-500 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10">
          Primary
        </div>
      )}
    </div>
  );
}

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    stock: '',
    sku: '',
    category: 'Apparel',
    images: [] as ProductImage[],
    variants: [] as { type: string, values: string }[]
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.images.findIndex((img) => img.id === active.id);
        const newIndex = prev.images.findIndex((img) => img.id === over.id);
        return {
          ...prev,
          images: arrayMove(prev.images, oldIndex, newIndex),
        };
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ProductImage[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      isPrimary: formData.images.length === 0 && false // Will set first one as primary if none exist
    }));

    setFormData(prev => {
      const updatedImages = [...prev.images, ...newImages];
      // If no image is primary, set the first one
      if (updatedImages.length > 0 && !updatedImages.some(img => img.isPrimary)) {
        updatedImages[0].isPrimary = true;
      }
      return { ...prev, images: updatedImages };
    });
  };

  const removeImage = (id: string) => {
    setFormData(prev => {
      const updatedImages = prev.images.filter(img => img.id !== id);
      // If we removed the primary image, set a new one
      if (updatedImages.length > 0 && !updatedImages.some(img => img.isPrimary)) {
        updatedImages[0].isPrimary = true;
      }
      return { ...prev, images: updatedImages };
    });
  };

  const setPrimaryImage = (id: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map(img => ({
        ...img,
        isPrimary: img.id === id
      }))
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { type: '', values: '' }]
    }));
  };

  const updateVariant = (index: number, field: 'type' | 'values', value: string) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';
    
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.trim().length < 10) newErrors.description = 'Description must be at least 10 characters';
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (formData.salePrice && parseFloat(formData.salePrice) >= parseFloat(formData.price)) {
      newErrors.salePrice = 'Sale price must be less than base price';
    } else if (formData.salePrice && parseFloat(formData.salePrice) <= 0) {
      newErrors.salePrice = 'Sale price must be positive';
    }
    
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock is required';
    }
    
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    
    // Validate variants
    formData.variants.forEach((v, i) => {
      if (!v.type.trim() || !v.values.trim()) {
        newErrors[`variant_${i}`] = 'Both type and values are required for variants';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProduct = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Saving Product:', formData);
      setIsAddModalOpen(false);
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        salePrice: '',
        stock: '',
        sku: '',
        category: 'Apparel',
        images: [],
        variants: []
      });
      alert('Product saved successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedProductIds.length === filteredProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map(p => p.id));
    }
  };

  const toggleSelectProduct = (id: string) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Deleting Products:', selectedProductIds);
      setSelectedProductIds([]);
      setIsDeleteModalOpen(false);
      alert('Products deleted successfully!');
    } catch (error) {
      console.error('Error deleting products:', error);
      alert('Failed to delete products.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = SAMPLE_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Product Management</h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">Manage your inventory, prices, and product details.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-teal-800 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedProductIds.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-8 border border-gray-800 dark:border-gray-200"
          >
            <div className="flex items-center space-x-2">
              <span className="h-6 w-6 bg-teal-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                {selectedProductIds.length}
              </span>
              <span className="text-sm font-bold">Products Selected</span>
            </div>
            <div className="h-8 w-px bg-gray-700 dark:bg-gray-200"></div>
            <div className="flex items-center space-x-4">
              <button className="text-sm font-bold hover:text-teal-400 dark:hover:text-teal-800 transition-colors">Export Selected</button>
              <button 
                onClick={() => setIsDeleteModalOpen(true)}
                className="text-sm font-bold text-red-500 hover:text-red-400 transition-colors flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Selected</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products by name, category, or SKU..." 
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          <select className="bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2.5 px-4 text-sm font-bold outline-none dark:text-white">
            <option>All Categories</option>
            <option>Apparel</option>
            <option>Accessories</option>
            <option>Electronics</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-8 py-4 w-10">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-teal-800 focus:ring-teal-800 cursor-pointer"
                    checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredProducts.map((product) => (
                <tr key={product.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${selectedProductIds.includes(product.id) ? 'bg-teal-50/50 dark:bg-teal-900/10' : ''}`}>
                  <td className="px-8 py-4">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-teal-800 focus:ring-teal-800 cursor-pointer"
                      checked={selectedProductIds.includes(product.id)}
                      onChange={() => toggleSelectProduct(product.id)}
                    />
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={product.image} alt="" className="h-12 w-12 rounded-xl object-cover border border-gray-100 dark:border-gray-800" />
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{product.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">SKU: {product.id.slice(0, 8).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm font-bold text-teal-800 dark:text-teal-400">${product.price.toFixed(2)}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${product.rating > 4 ? 'bg-green-500' : 'bg-gold-500'}`}></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-light">42 in stock</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-green-50 dark:bg-green-900/20 text-green-600">
                      Active
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
        
        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">Showing 1 to 10 of {filteredProducts.length} products</p>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-100 dark:border-gray-800 rounded-lg text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30" disabled>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="h-8 w-8 bg-teal-800 text-white rounded-lg text-xs font-bold">1</button>
            <button className="h-8 w-8 border border-gray-100 dark:border-gray-800 rounded-lg text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">2</button>
            <button className="p-2 border border-gray-100 dark:border-gray-800 rounded-lg text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden p-8 text-center"
            >
              <div className="h-20 w-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Delete Products?</h3>
              <p className="text-gray-500 dark:text-gray-400 font-light mb-8">
                Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-white">{selectedProductIds.length}</span> selected products? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleBulkDelete}
                  disabled={isSubmitting}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <span>Delete All</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Product Modal (Simplified) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Add New Product</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Product Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white ${errors.name ? 'ring-2 ring-red-500' : ''}`} 
                      placeholder="e.g. Eminix Signature Watch" 
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Category</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white"
                    >
                      <option>Apparel</option>
                      <option>Accessories</option>
                      <option>Electronics</option>
                      <option>Home Decor</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Base Price ($)</label>
                    <input 
                      type="number" 
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white ${errors.price ? 'ring-2 ring-red-500' : ''}`} 
                      placeholder="0.00" 
                    />
                    {errors.price && <p className="text-[10px] text-red-500 font-bold">{errors.price}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Sale Price ($)</label>
                    <input 
                      type="number" 
                      name="salePrice"
                      value={formData.salePrice}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white ${errors.salePrice ? 'ring-2 ring-red-500' : ''}`} 
                      placeholder="0.00 (Optional)" 
                    />
                    {errors.salePrice && <p className="text-[10px] text-red-500 font-bold">{errors.salePrice}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Stock Quantity</label>
                    <input 
                      type="number" 
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white ${errors.stock ? 'ring-2 ring-red-500' : ''}`} 
                      placeholder="0" 
                    />
                    {errors.stock && <p className="text-[10px] text-red-500 font-bold">{errors.stock}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">SKU</label>
                    <input 
                      type="text" 
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white ${errors.sku ? 'ring-2 ring-red-500' : ''}`} 
                      placeholder="EMX-WATCH-001" 
                    />
                    {errors.sku && <p className="text-[10px] text-red-500 font-bold">{errors.sku}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4} 
                    className={`w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 outline-none dark:text-white resize-none ${errors.description ? 'ring-2 ring-red-500' : ''}`} 
                    placeholder="Describe the product features and details..."
                  ></textarea>
                  {errors.description && <p className="text-[10px] text-red-500 font-bold">{errors.description}</p>}
                </div>

                {/* Variants Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Product Variants</label>
                    <button 
                      type="button"
                      onClick={addVariant}
                      className="text-[10px] font-bold text-teal-800 dark:text-teal-400 uppercase tracking-widest flex items-center space-x-1 hover:underline"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add Variant</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.variants.map((variant, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-end space-x-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl relative group">
                          <div className="flex-1 space-y-2">
                            <label className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Type (e.g. Size)</label>
                            <input 
                              type="text" 
                              value={variant.type}
                              onChange={(e) => updateVariant(index, 'type', e.target.value)}
                              className="w-full bg-white dark:bg-gray-900 border-none rounded-lg py-2 px-3 text-xs outline-none dark:text-white" 
                              placeholder="Size, Color, etc."
                            />
                          </div>
                          <div className="flex-[2] space-y-2">
                            <label className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Values (comma separated)</label>
                            <input 
                              type="text" 
                              value={variant.values}
                              onChange={(e) => updateVariant(index, 'values', e.target.value)}
                              className="w-full bg-white dark:bg-gray-900 border-none rounded-lg py-2 px-3 text-xs outline-none dark:text-white" 
                              placeholder="S, M, L or Red, Blue"
                            />
                          </div>
                          <button 
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        {errors[`variant_${index}`] && <p className="text-[10px] text-red-500 font-bold ml-2">{errors[`variant_${index}`]}</p>}
                      </div>
                    ))}
                    {formData.variants.length === 0 && (
                      <p className="text-xs text-gray-500 italic text-center py-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">No variants added yet.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Product Images</label>
                  
                  <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <SortableContext 
                        items={formData.images.map(img => img.id)}
                        strategy={rectSortingStrategy}
                      >
                        {formData.images.map((image) => (
                          <SortableImage 
                            key={image.id} 
                            image={image} 
                            onRemove={removeImage}
                            onSetPrimary={setPrimaryImage}
                          />
                        ))}
                      </SortableContext>
                      
                      <label className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center hover:border-teal-800 dark:hover:border-teal-400 transition-all cursor-pointer group bg-gray-50/50 dark:bg-gray-800/20">
                        <Upload className="h-6 w-6 text-gray-300 group-hover:text-teal-800 dark:group-hover:text-teal-400 mb-2" />
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-teal-800 dark:group-hover:text-teal-400 uppercase tracking-widest">Upload</span>
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </DndContext>
                  
                  {formData.images.length > 0 && (
                    <p className="text-[10px] text-gray-400 italic">
                      Drag and drop to reorder. Click the star to set as primary image.
                    </p>
                  )}
                </div>
              </div>
              <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex justify-end space-x-4">
                <button 
                  onClick={() => setIsAddModalOpen(false)} 
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProduct}
                  disabled={isSubmitting}
                  className="bg-teal-800 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Product</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
