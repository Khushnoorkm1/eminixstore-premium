import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
import { useAuth } from './AuthContext';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { user } = useAuth();

  // Load wishlist from Firestore or LocalStorage
  useEffect(() => {
    if (user) {
      const wishlistRef = doc(db, 'wishlists', user.uid);
      const unsubscribe = onSnapshot(wishlistRef, (docSnap) => {
        if (docSnap.exists()) {
          setWishlist(docSnap.data().items || []);
        } else {
          setWishlist([]);
        }
      });
      return () => unsubscribe();
    } else {
      const savedWishlist = localStorage.getItem('elite_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    }
  }, [user]);

  // Persist to LocalStorage for guest users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('elite_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = async (product: Product) => {
    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    
    if (user) {
      const wishlistRef = doc(db, 'wishlists', user.uid);
      await setDoc(wishlistRef, { items: updatedWishlist }, { merge: true });
    }
  };

  const removeFromWishlist = async (productId: string) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);

    if (user) {
      const wishlistRef = doc(db, 'wishlists', user.uid);
      await setDoc(wishlistRef, { items: updatedWishlist }, { merge: true });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
