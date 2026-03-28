import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ChevronRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext.jsx';
import { useCart } from '@/context/CartContext.jsx';
import { useToast } from '@/context/ToastContext.jsx';

export default function Wishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { addToast } = useToast();

  const handleMoveToCart = (product) => {
    addItem(product, product.weight);
    removeItem(product.id);
    addToast(`${product.name} moved to cart`, 'success', 'Moved to Cart');
  };

  if (items.length === 0) {
    return (
      <div className="page" data-testid="wishlist-page">
        <div className="container section">
          <div className="empty-state" data-testid="empty-wishlist">
            <div className="empty-state__icon"><Heart /></div>
            <h3 className="empty-state__title">Your wishlist is empty</h3>
            <p className="empty-state__text">Save items you love for later. Start exploring our collection.</p>
            <Link to="/products" className="btn btn--primary" data-testid="browse-wishlist-btn">Browse Products</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page" data-testid="wishlist-page">
      <div className="container section">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__sep"><ChevronRight size={14} /></span>
          <span className="breadcrumb__current">Wishlist</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '2rem' }}>
          Wishlist <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>({items.length} items)</span>
        </h1>
        <div className="wishlist__grid">
          {items.map(product => (
            <div key={product.id} className="product-card" data-testid={`wishlist-item-${product.id}`}>
              <div className="product-card__image">
                <Link to={`/product/${product.slug}`}>
                  <img src={product.images[0]} alt={product.name} loading="lazy" />
                </Link>
              </div>
              <div className="product-card__info">
                <div className="product-card__category">{product.category.replace(/-/g, ' ')}</div>
                <Link to={`/product/${product.slug}`} className="product-card__name">{product.name}</Link>
                <div className="product-card__price">${product.price.toFixed(2)}</div>
              </div>
              <div className="wishlist__item-actions">
                <button
                  className="btn btn--primary btn--sm"
                  style={{ flex: 1 }}
                  onClick={() => handleMoveToCart(product)}
                  data-testid={`move-to-cart-${product.id}`}
                >
                  <ShoppingBag size={16} /> Move to Cart
                </button>
                <button
                  className="btn btn--sm"
                  style={{ color: 'var(--clr-error)', border: '1.5px solid var(--border-subtle)', borderRadius: '4px', padding: '0.5rem' }}
                  onClick={() => { removeItem(product.id); addToast('Removed from wishlist', 'info'); }}
                  data-testid={`remove-wishlist-${product.id}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
