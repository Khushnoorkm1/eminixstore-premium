import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_SLIDES = [
  {
    id: 1,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?w=1920&q=80',
    title: 'Timeless Elegance',
    subtitle: 'Curated for the Modern Soul',
    desc: 'Discover Eminixstore\'s exclusive collection of premium essentials, where luxury meets minimalism.'
  },
  {
    id: 2,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    title: 'Signature Series',
    subtitle: 'Excellence in Every Detail',
    desc: 'Handpicked masterpieces designed to elevate your lifestyle and define your presence.'
  },
  {
    id: 3,
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-studio-41158-large.mp4',
    title: 'Modern Luxury',
    subtitle: 'Redefining Premium',
    desc: 'Experience the fusion of traditional craftsmanship and contemporary design.'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-teal-950">
      {/* Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {slide.type === 'video' ? (
            <video
              src={slide.url}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <img 
              src={slide.url} 
              alt={slide.title} 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] text-gold-500 uppercase bg-gold-500/10 rounded-full border border-gold-500/20 backdrop-blur-sm"
            >
              {slide.subtitle}
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight leading-[1] mb-8">
              {slide.title.split(' ')[0]} <span className="text-gold-500 italic font-light">{slide.title.split(' ')[1]}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-lg font-light">
              {slide.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/shop" 
                className="group flex items-center justify-center space-x-3 bg-gold-500 hover:bg-gold-400 text-teal-950 px-10 py-5 rounded-full font-bold transition-all transform hover:scale-105 shadow-2xl shadow-gold-500/30"
              >
                <span className="uppercase tracking-widest text-sm">Shop Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/collections" 
                className="flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-bold transition-all"
              >
                <ShoppingBag className="h-5 w-5 text-gold-500" />
                <span className="uppercase tracking-widest text-sm">Explore Collections</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-12 flex items-center space-x-6 z-20">
        <div className="flex space-x-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(i);
              }}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                currentSlide === i ? 'w-12 bg-gold-500' : 'w-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-gold-500 hover:text-teal-950 text-white transition-all backdrop-blur-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-gold-500 hover:text-teal-950 text-white transition-all backdrop-blur-md"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50"
      >
        <span className="text-[10px] text-white uppercase tracking-[0.3em] font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold-500 to-transparent" />
      </motion.div>
    </div>
  );
}
