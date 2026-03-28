import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('ocean-cart');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function loadCouponFromStorage() {
  try {
    const saved = localStorage.getItem('ocean-coupon');
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCartFromStorage);
  const [coupon, setCoupon] = useState(loadCouponFromStorage);

  useEffect(() => {
    localStorage.setItem('ocean-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (coupon) localStorage.setItem('ocean-coupon', JSON.stringify(coupon));
    else localStorage.removeItem('ocean-coupon');
  }, [coupon]);

  function saveCart(items) {
    localStorage.setItem('ocean-cart', JSON.stringify(items));
  }

  const addItem = useCallback((product, weight) => {
    setItems(prev => {
      let next;
      const exists = prev.find(i => i.id === product.id && i.weight === weight);
      if (exists) {
        next = prev.map(i =>
          i.id === product.id && i.weight === weight
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      } else {
        next = [...prev, { ...product, weight, qty: 1 }];
      }
      saveCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((id, weight) => {
    setItems(prev => {
      const next = prev.filter(i => !(i.id === id && i.weight === weight));
      saveCart(next);
      return next;
    });
  }, []);

  const updateQty = useCallback((id, weight, qty) => {
    if (qty < 1) return;
    setItems(prev => {
      const next = prev.map(i => (i.id === id && i.weight === weight ? { ...i, qty } : i));
      saveCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
    localStorage.removeItem('ocean-cart');
    localStorage.removeItem('ocean-coupon');
  }, []);

  const applyCoupon = useCallback((code) => {
    const validCoupons = {
      'OCEAN10': { discount: 0.1, label: '10% Off' },
      'FRESH20': { discount: 0.2, label: '20% Off' },
      'SEAFOOD15': { discount: 0.15, label: '15% Off' },
    };
    const found = validCoupons[code.toUpperCase()];
    if (found) {
      setCoupon({ code: code.toUpperCase(), ...found });
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountAmount = coupon ? subtotal * coupon.discount : 0;
  const shipping = subtotal > 75 ? 0 : 9.99;
  const total = subtotal - discountAmount + shipping;
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      coupon, applyCoupon, removeCoupon,
      subtotal, discount: discountAmount, shipping, total, itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
