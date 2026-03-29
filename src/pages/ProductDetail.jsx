import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ChevronRight, Minus, Plus } from 'lucide-react';
import gsap from 'gsap';
import ProductCard from '@/components/ProductCard.jsx';
import { SkeletonDetail } from '@/components/Skeleton.jsx';
import { products, reviews as allReviews } from '@/data/mockData';
import { useCart } from '@/context/CartContext.jsx';
import { useWishlist } from '@/context/WishlistContext.jsx';
import { useToast } from '@/context/ToastContext.jsx';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const pageRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setActiveImage(0);
    setQty(1);
    setActiveTab('description');
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    if (product) setSelectedWeight(product.weight);
  }, [product]);

  useEffect(() => {
    if (!loading && pageRef.current) {
      gsap.from('.product-detail__gallery', { x: -30, opacity: 0, duration: 0.6, ease: 'power2.out' });
      gsap.from('.product-detail__info > *', { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.15 });
    }
  }, [loading]);

  if (!product && !loading) {
    return (
      <div className="page">
        <div className="container section">
          <div className="empty-state">
            <h3 className="empty-state__title">Product not found</h3>
            <p className="empty-state__text">The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn btn--primary">Browse Products</Link>
          </div>
        </div>
      </div>
    );
  }

  const productReviews = allReviews.filter(r => r.productId === product?.id);
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  const wishlisted = product ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, selectedWeight);
    addToast(`${qty} x ${product.name} added to your cart`, 'success');
    gsap.from('.navbar__cart-count', { scale: 1.5, duration: 0.3, ease: 'back.out(3)' });
  };

  const handleWishlist = () => {
    toggleItem(product);
    addToast(
      wishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      wishlisted ? 'info' : 'success'
    );
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'storage', label: 'Storage Tips' },
  ];

  return (
    <div className="page" ref={pageRef} data-testid="product-detail-page">
      <div className="container section">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__sep"><ChevronRight size={14} /></span>
          <Link to="/products">Shop</Link>
          <span className="breadcrumb__sep"><ChevronRight size={14} /></span>
          <span className="breadcrumb__current">{product?.name || '...'}</span>
        </div>

        {loading ? <SkeletonDetail /> : (
          <>
            <div className="product-detail__grid">
              {/* Gallery */}
              <div className="product-detail__gallery" data-testid="product-gallery">
                <div className="product-detail__main-image" data-testid="main-product-image">
                  <img src={product.images[activeImage]} alt={product.name} />
                  {product.badge && (
                    <span className={`badge badge--${product.badge}`} style={{ position: 'absolute', top: 16, left: 16 }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="product-detail__thumbs">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      className={`product-detail__thumb ${activeImage === i ? 'product-detail__thumb--active' : ''}`}
                      onClick={() => setActiveImage(i)}
                      data-testid={`thumb-${i}`}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="product-detail__info">
                <span className="product-detail__category">{product.category.replace(/-/g, ' ')}</span>
                <h1 className="product-detail__name" data-testid="product-name">{product.name}</h1>

                <div className="product-detail__rating" data-testid="product-rating">
                  <div className="stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} fill={i < Math.round(product.rating) ? '#F9A825' : 'none'} stroke="#F9A825" />
                    ))}
                  </div>
                  <span>{product.rating} ({product.reviewCount} reviews)</span>
                </div>

                <div className="product-detail__price" data-testid="product-price">
                  ₹{product.price.toFixed(2)}
                  {product.originalPrice && (
                    <span className="product-detail__price-original">₹{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                <p className="product-detail__weight-label">Weight / Size</p>
                <div className="weight-selector" data-testid="weight-selector">
                  {product.weightOptions.map(w => (
                    <button
                      key={w}
                      className={`weight-selector__option ${selectedWeight === w ? 'weight-selector__option--active' : ''}`}
                      onClick={() => setSelectedWeight(w)}
                      data-testid={`weight-${w}`}
                    >
                      {w}
                    </button>
                  ))}
                </div>

                <div className="product-detail__actions">
                  <div className="qty-selector" data-testid="qty-selector">
                    <button className="qty-selector__btn" onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1} data-testid="qty-minus">
                      <Minus />
                    </button>
                    <span className="qty-selector__value" data-testid="qty-value">{qty}</span>
                    <button className="qty-selector__btn" onClick={() => setQty(q => q + 1)} data-testid="qty-plus">
                      <Plus />
                    </button>
                  </div>
                  <button
                    className="btn btn--primary product-detail__add-cart"
                    onClick={handleAddToCart}
                    data-testid="add-to-cart-detail-btn"
                  >
                    <ShoppingBag /> Add to Cart - ₹{(product.price * qty).toFixed(2)}
                  </button>
                  <button
                    className={`product-detail__add-wishlist ${wishlisted ? 'product-detail__add-wishlist--active' : ''}`}
                    onClick={handleWishlist}
                    data-testid="wishlist-detail-btn"
                  >
                    <Heart fill={wishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Tabs */}
                <div className="product-detail__tabs" data-testid="product-tabs">
                  <div className="tabs__header">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        className={`tabs__tab ${activeTab === tab.id ? 'tabs__tab--active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        data-testid={`tab-${tab.id}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div className="tabs__content">
                    {activeTab === 'description' && (
                      <p className="product-detail__desc">{product.description}</p>
                    )}
                    {activeTab === 'nutrition' && (
                      <div className="product-detail__nutrition">
                        {Object.entries(product.nutrition).map(([key, val]) => (
                          <div key={key} className="product-detail__nutrient">
                            <div className="product-detail__nutrient-value">{val}</div>
                            <div className="product-detail__nutrient-label">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeTab === 'storage' && (
                      <ul className="product-detail__storage">
                        {product.storageTips.map((tip, i) => <li key={i}>{tip}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <section className="section" style={{ paddingTop: '3rem' }}>
              <div className="reviews" data-testid="reviews-section">
                <div className="reviews__header">
                  <div className="reviews__summary">
                    <span className="reviews__summary-score">{product.rating}</span>
                    <div>
                      <div className="stars">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} fill={i < Math.round(product.rating) ? '#F9A825' : 'none'} stroke="#F9A825" />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{product.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
                <div className="reviews__list">
                  {productReviews.length > 0 ? productReviews.map(review => (
                    <div key={review.id} className="review-card" data-testid={`review-${review.id}`}>
                      <div className="review-card__header">
                        <div className="review-card__author">
                          <div className="review-card__avatar">{review.initials}</div>
                          <div>
                            <div className="review-card__name">{review.author}</div>
                            <div className="stars stars--sm">
                              {Array.from({ length: review.rating }, (_, i) => (
                                <Star key={i} fill="#F9A825" stroke="#F9A825" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="review-card__date">{review.date}</span>
                      </div>
                      <p className="review-card__text">{review.text}</p>
                    </div>
                  )) : (
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No reviews yet for this product.</p>
                  )}
                </div>
              </div>
            </section>

            {/* Related Products */}
            {related.length > 0 && (
              <section className="section" style={{ paddingTop: 0 }}>
                <div className="related__header">
                  <h2>Related Products</h2>
                  <Link to={`/products?category=${product.category}`} className="btn btn--ghost" data-testid="view-all-related">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="shop__grid">
                  {related.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
