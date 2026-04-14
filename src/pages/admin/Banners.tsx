import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  Upload, 
  Video, 
  Image as ImageIcon, 
  Move,
  Check,
  X,
  Save,
  Play,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { adminService } from '../../services/adminService';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Banner {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  subtitle: string;
  desc: string;
  isActive: boolean;
}

const INITIAL_BANNERS: Banner[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?w=1920&q=80',
    title: 'Timeless Elegance',
    subtitle: 'Curated for the Modern Soul',
    desc: 'Discover Eminixstore\'s exclusive collection of premium essentials, where luxury meets minimalism.',
    isActive: true
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    title: 'Signature Series',
    subtitle: 'Excellence in Every Detail',
    desc: 'Handpicked masterpieces designed to elevate your lifestyle and define your presence.',
    isActive: true
  },
  {
    id: '3',
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-studio-41158-large.mp4',
    title: 'Modern Luxury',
    subtitle: 'Redefining Premium',
    desc: 'Experience the fusion of traditional craftsmanship and contemporary design.',
    isActive: true
  }
];

function SortableBannerItem({ 
  banner, 
  onEdit, 
  onDelete, 
  onToggleActive 
}: { 
  banner: Banner, 
  onEdit: (b: Banner) => void,
  onDelete: (id: string) => void,
  onToggleActive: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: banner.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`bg-white dark:bg-gray-900 rounded-3xl border ${isDragging ? 'border-teal-500 shadow-2xl' : 'border-gray-100 dark:border-gray-800 shadow-sm'} p-6 flex items-center space-x-6 group transition-all`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
        <Move className="h-5 w-5 text-gray-400" />
      </div>

      <div className="relative h-24 w-40 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
        {banner.type === 'video' ? (
          <div className="relative h-full w-full">
            <video src={banner.url} className="h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-6 w-6 text-white fill-current" />
            </div>
          </div>
        ) : (
          <img src={banner.url} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
        )}
        <div className="absolute top-2 left-2">
          {banner.type === 'video' ? (
            <div className="bg-blue-500 text-white p-1 rounded-md shadow-lg">
              <Video className="h-3 w-3" />
            </div>
          ) : (
            <div className="bg-teal-800 text-white p-1 rounded-md shadow-lg">
              <ImageIcon className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-3 mb-1">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white truncate tracking-tight">{banner.title}</h4>
          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${banner.isActive ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
            {banner.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <p className="text-xs text-gold-500 font-bold uppercase tracking-widest mb-2">{banner.subtitle}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-light line-clamp-1">{banner.desc}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button 
          onClick={() => onToggleActive(banner.id)}
          className={`p-2.5 rounded-xl transition-all ${banner.isActive ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/10' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          title={banner.isActive ? 'Deactivate' : 'Activate'}
        >
          <Check className="h-5 w-5" />
        </button>
        <button 
          onClick={() => onEdit(banner)}
          className="p-2.5 text-gray-400 hover:text-teal-800 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button 
          onClick={() => onDelete(banner.id)}
          className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default function BannerManagement() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getBanners();
      setBanners(data as Banner[] || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [formData, setFormData] = useState<Partial<Banner>>({
    type: 'image',
    url: '',
    title: '',
    subtitle: '',
    desc: '',
    isActive: true
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = banners.findIndex((i) => i.id === active.id);
      const newIndex = banners.findIndex((i) => i.id === over.id);
      const newBanners = arrayMove(banners, oldIndex, newIndex).map((b, idx) => ({ ...b, order: idx }));
      setBanners(newBanners);
      
      try {
        await adminService.saveBanners(newBanners);
      } catch (error) {
        console.error('Error saving banner order:', error);
      }
    }
  };

  const handleOpenModal = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData(banner);
    } else {
      setEditingBanner(null);
      setFormData({
        type: 'image',
        url: '',
        title: '',
        subtitle: '',
        desc: '',
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await adminService.deleteBanner(id);
        setBanners(prev => prev.filter(b => b.id !== id));
      } catch (error) {
        console.error('Error deleting banner:', error);
      }
    }
  };

  const handleToggleActive = async (id: string) => {
    const updatedBanners = banners.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b);
    setBanners(updatedBanners);
    try {
      await adminService.saveBanners(updatedBanners);
    } catch (error) {
      console.error('Error toggling banner status:', error);
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (editingBanner) {
        const updatedBanners = banners.map(b => b.id === editingBanner.id ? { ...b, ...formData } as Banner : b);
        await adminService.saveBanners(updatedBanners);
        setBanners(updatedBanners);
      } else {
        const newBanner: Banner = {
          ...formData,
          id: Math.random().toString(36).substring(7),
          order: banners.length
        } as Banner;
        const newBanners = [...banners, newBanner];
        await adminService.saveBanners(newBanners);
        setBanners(newBanners);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving banner:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Banner Management</h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">Control the hero section of your homepage. Drag to reorder slides.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-teal-800 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Slide</span>
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/20 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 min-h-[400px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10">
            <Loader2 className="h-10 w-10 text-teal-800 animate-spin" />
          </div>
        ) : null}
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="space-y-4">
            <SortableContext 
              items={banners.map(b => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {banners.map((banner) => (
                <SortableBannerItem 
                  key={banner.id} 
                  banner={banner} 
                  onEdit={handleOpenModal}
                  onDelete={handleDelete}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>

        {banners.length === 0 && (
          <div className="text-center py-20">
            <div className="h-20 w-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No banners found</h3>
            <p className="text-gray-500 dark:text-gray-400 font-light mb-8">Start by adding your first hero slide.</p>
            <button 
              onClick={() => handleOpenModal()}
              className="bg-teal-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-900 transition-all"
            >
              Create First Banner
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {editingBanner ? 'Edit Banner Slide' : 'Add New Banner Slide'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar space-y-6">
                <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                  <button 
                    onClick={() => setFormData(prev => ({ ...prev, type: 'image' }))}
                    className={`flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${formData.type === 'image' ? 'bg-white dark:bg-gray-700 text-teal-800 dark:text-teal-400 shadow-sm' : 'text-gray-500'}`}
                  >
                    <ImageIcon className="h-4 w-4" />
                    <span>Image Slide</span>
                  </button>
                  <button 
                    onClick={() => setFormData(prev => ({ ...prev, type: 'video' }))}
                    className={`flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold transition-all ${formData.type === 'video' ? 'bg-white dark:bg-gray-700 text-teal-800 dark:text-teal-400 shadow-sm' : 'text-gray-500'}`}
                  >
                    <Video className="h-4 w-4" />
                    <span>Video Slide</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{formData.type === 'video' ? 'Video URL' : 'Image URL'}</label>
                  <div className="relative">
                    <Upload className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                      placeholder={formData.type === 'video' ? 'https://example.com/video.mp4' : 'https://example.com/image.jpg'}
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3.5 pl-12 pr-4 outline-none dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Main Headline</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. Timeless Elegance"
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3.5 px-4 outline-none dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Sub-headline</label>
                    <input 
                      type="text" 
                      value={formData.subtitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                      placeholder="e.g. Curated for You"
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3.5 px-4 outline-none dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    value={formData.desc}
                    onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
                    rows={3}
                    placeholder="Brief description for the slide..."
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3.5 px-4 outline-none dark:text-white resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-teal-50 dark:bg-teal-900/10 rounded-2xl border border-teal-100 dark:border-teal-900/20">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-teal-900 dark:text-teal-400">Active Status</p>
                    <p className="text-xs text-teal-800/60 dark:text-teal-400/60">Should this slide be visible on the homepage?</p>
                  </div>
                  <button 
                    onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                    className={`relative w-12 h-6 rounded-full transition-all ${formData.isActive ? 'bg-teal-800' : 'bg-gray-300 dark:bg-gray-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isActive ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex justify-end space-x-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="bg-teal-800 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20 flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </>
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
