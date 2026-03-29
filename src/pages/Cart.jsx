import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ShieldCheck, ChevronRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext.jsx';
import { useToast } from '@/context/ToastContext.jsx';

export default function Cart() {
  const { items, removeItem, updateQty, subtotal, discount, shipping, total, coupon, applyCoupon, removeCoupon } = useCart();
  const { addToast } = useToast();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (success) {
      addToast('Coupon applied successfully!', 'success', 'Coupon Applied');
      setCouponCode('');
    } else {
      addToast('Invalid coupon code. Try OCEAN10, FRESH20, or SEAFOOD15.', 'error', 'Invalid Coupon');
    }
  };

  if (items.length === 0) {
    return (
      <div className="page" data-testid="cart-page">
        <div className="container section">
          <div className="empty-state" data-testid="empty-cart">
            <div className="empty-state__icon">
              <ShoppingBag />
            </div>
            <h3 className="empty-state__title">Your cart is empty</h3>
            <p className="empty-state__text">Looks like you haven't added any items to your cart yet. Explore our premium seafood collection.</p>
            <Link to="/products" className="btn btn--primary" data-testid="browse-products-btn">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page" data-testid="cart-page">
      <div className="container section">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__sep"><ChevronRight size={14} /></span>
          <span className="breadcrumb__current">Shopping Cart</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '2rem' }}>
          Shopping Cart <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>({items.length} items)</span>
        </h1>

        <div className="cart__layout">
          {/* Cart Items */}
          <div className="cart__items" data-testid="cart-items">
            {items.map(item => (
              <div key={`${item.id}-${item.weight}`} className="cart-item" data-testid={`cart-item-${item.id}`}>
                <Link to={`/product/${item.slug}`} className="cart-item__image">
                  <img src={item.images[0]} alt={item.name} />
                </Link>

                <div className="cart-item__info">
                  <Link to={`/product/${item.slug}`} className="cart-item__name">{item.name}</Link>
                  <div className="cart-item__meta">{item.weight}</div>
                </div>

                <div className="cart-item__bottom">
                  <div className="qty-selector">
                    <button className="qty-selector__btn" onClick={() => updateQty(item.id, item.weight, item.qty - 1)} disabled={item.qty <= 1} data-testid={`qty-minus-${item.id}`}>
                      <Minus />
                    </button>
                    <span className="qty-selector__value" data-testid={`qty-value-${item.id}`}>{item.qty}</span>
                    <button className="qty-selector__btn" onClick={() => updateQty(item.id, item.weight, item.qty + 1)} data-testid={`qty-plus-${item.id}`}>
                      <Plus />
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="cart-item__price" data-testid={`item-price-${item.id}`}>₹{(item.price * item.qty).toFixed(2)}</span>
                    <button className="cart-item__remove" onClick={() => { removeItem(item.id, item.weight); addToast(`${item.name} removed from cart`, 'info'); }} data-testid={`remove-item-${item.id}`}>
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary" data-testid="cart-summary">
            <h3 className="cart-summary__title">Order Summary</h3>

            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span data-testid="subtotal">₹{subtotal.toFixed(2)}</span>
            </div>

            {coupon && (
              <div className="cart-summary__row" style={{ color: 'var(--clr-success)' }}>
                <span>Discount ({coupon.label})</span>
                <span data-testid="discount">-₹{discount.toFixed(2)}</span>
              </div>
            )}

            <div className="cart-summary__row">
              <span>Shipping</span>
              <span data-testid="shipping">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>

            <div className="cart-summary__total">
              <span>Total</span>
              <span data-testid="total">₹{total.toFixed(2)}</span>
            </div>

            {/* Coupon */}
            <div className="cart-summary__coupon">
              {coupon ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--accent-tq-light)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Tag size={16} />
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{coupon.code}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--clr-success)' }}>{coupon.label}</span>
                  </div>
                  <button onClick={removeCoupon} style={{ color: 'var(--clr-error)', fontSize: '0.8rem', fontWeight: 600 }} data-testid="remove-coupon-btn">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="coupon">
                  <input
                    className="coupon__input"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    data-testid="coupon-input"
                  />
                  <button className="btn btn--tq btn--sm" onClick={handleApplyCoupon} data-testid="apply-coupon-btn">
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="cart-summary__checkout">
              <Link to="/checkout" className="btn btn--primary btn--full btn--lg" data-testid="checkout-btn">
                Proceed to Checkout
              </Link>
            </div>

            <div className="cart-summary__trust">
              <ShieldCheck size={16} />
              Secure checkout with 256-bit encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
