import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const WishlistContext = createContext();

function loadWishlistFromStorage() {
  try {
    const saved = localStorage.getItem('ocean-wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function saveWishlist(items) {
  localStorage.setItem('ocean-wishlist', JSON.stringify(items));
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(loadWishlistFromStorage);

  useEffect(() => {
    saveWishlist(items);
  }, [items]);

  const addItem = useCallback((product) => {
    setItems(prev => {
      if (prev.find(i => i.id === product.id)) return prev;
      const next = [...prev, product];
      saveWishlist(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== id);
      saveWishlist(next);
      return next;
    });
  }, []);

  const toggleItem = useCallback((product) => {
    setItems(prev => {
      let next;
      if (prev.find(i => i.id === product.id)) {
        next = prev.filter(i => i.id !== product.id);
      } else {
        next = [...prev, product];
      }
      saveWishlist(next);
      return next;
    });
  }, []);

  const isInWishlist = useCallback((id) => {
    return items.some(i => i.id === id);
  }, [items]);

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
