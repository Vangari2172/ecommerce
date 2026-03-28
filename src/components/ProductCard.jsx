import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext.jsx';
import { useWishlist } from '@/context/WishlistContext.jsx';
import { useToast } from '@/context/ToastContext.jsx';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product, product.weight);
    addToast(`${product.name} added to your cart`, 'success');
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleItem(product);
    addToast(
      wishlisted ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`,
      wishlisted ? 'info' : 'success',
      wishlisted ? 'Removed' : 'Added to Wishlist'
    );
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.slug}`)}
      data-testid={`product-card-${product.id}`}
    >
      {product.badge && (
        <span className={`badge badge--${product.badge} product-card__badge`} data-testid={`badge-${product.badge}`}>
          {product.badge}
        </span>
      )}

      <button
        className={`product-card__wishlist ${wishlisted ? 'product-card__wishlist--active' : ''}`}
        onClick={handleWishlist}
        data-testid={`wishlist-btn-${product.id}`}
        aria-label="Toggle wishlist"
      >
        <Heart fill={wishlisted ? 'currentColor' : 'none'} />
      </button>

      <div className="product-card__image">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
        />
        <div className="product-card__actions">
          <button
            className="btn btn--primary btn--full btn--sm"
            onClick={handleAddToCart}
            data-testid={`add-to-cart-btn-${product.id}`}
          >
            <ShoppingBag /> Add to Cart
          </button>
        </div>
      </div>

      <div className="product-card__info">
        <div className="product-card__category">{product.category.replace(/-/g, ' ')}</div>
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__bottom">
          <div className="product-card__price">
            ${product.price.toFixed(2)}
            {product.originalPrice && (
              <span className="product-card__price-original">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="product-card__rating">
            <Star fill="#F9A825" stroke="#F9A825" />
            {product.rating}
          </div>
        </div>
      </div>
    </div>
  );
}
