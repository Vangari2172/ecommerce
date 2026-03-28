import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import ProductCard from '@/components/ProductCard.jsx';
import { SkeletonCard } from '@/components/Skeleton.jsx';
import { products, categories } from '@/data/mockData';

const ITEMS_PER_PAGE = 9;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageRef = useRef(null);

  const activeCategory = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'popular';
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeCategory, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, sortBy, priceMin, priceMax]);

  useEffect(() => {
    if (!loading && pageRef.current) {
      gsap.from('.product-card', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
      });
    }
  }, [loading, currentPage]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory) result = result.filter(p => p.category === activeCategory);
    if (priceMin) result = result.filter(p => p.price >= Number(priceMin));
    if (priceMax) result = result.filter(p => p.price <= Number(priceMax));

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return result;
  }, [activeCategory, sortBy, priceMin, priceMax]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('category', cat);
    else params.delete('category');
    setSearchParams(params);
  };

  const setSort = (val) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', val);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
    setPriceMin('');
    setPriceMax('');
  };

  return (
    <div className="page" ref={pageRef} data-testid="products-page">
      <div className="container section">
        {/* Breadcrumb */}
        <div className="breadcrumb" data-testid="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__sep"><ChevronRight size={14} /></span>
          <span className="breadcrumb__current">
            {activeCategory ? categories.find(c => c.id === activeCategory)?.name || 'Shop' : 'All Products'}
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '2rem' }}>
          {activeCategory ? categories.find(c => c.id === activeCategory)?.name || 'Shop' : 'All Products'}
        </h1>

        <div className="shop__layout">
          {/* Sidebar Filters */}
          <aside className="shop__sidebar">
            <div className={`filters ${filtersOpen ? 'filters--open' : ''}`} data-testid="filters-panel">
              <div className="filters__close">
                <span>Filters</span>
                <button onClick={() => setFiltersOpen(false)} data-testid="filters-close-btn"><X /></button>
              </div>

              <div className="filters__section">
                <div className="filters__title">Category</div>
                <div
                  className={`filters__option ${!activeCategory ? 'filters__option--active' : ''}`}
                  onClick={() => setCategory('')}
                  data-testid="filter-all"
                >
                  All Products
                </div>
                {categories.map(cat => (
                  <div
                    key={cat.id}
                    className={`filters__option ${activeCategory === cat.id ? 'filters__option--active' : ''}`}
                    onClick={() => setCategory(cat.id)}
                    data-testid={`filter-${cat.id}`}
                  >
                    {cat.name} ({cat.count})
                  </div>
                ))}
              </div>

              <div className="filters__section">
                <div className="filters__title">Price Range</div>
                <div className="filters__price-range">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    data-testid="price-min-input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    data-testid="price-max-input"
                  />
                </div>
              </div>

              {(activeCategory || priceMin || priceMax) && (
                <button className="filters__clear" onClick={clearFilters} data-testid="clear-filters-btn">
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div className="shop__main">
            <div className="shop__toolbar">
              <div className="shop__count" data-testid="product-count">
                Showing <span>{filtered.length}</span> products
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  className="shop__filter-toggle"
                  onClick={() => setFiltersOpen(true)}
                  data-testid="filter-toggle-btn"
                >
                  <SlidersHorizontal /> Filters
                </button>
                <div className="shop__sort">
                  <label>Sort by:</label>
                  <select value={sortBy} onChange={(e) => setSort(e.target.value)} data-testid="sort-select">
                    <option value="popular">Most Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="shop__grid">
                {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : paginated.length === 0 ? (
              <div className="empty-state" data-testid="empty-products">
                <div className="empty-state__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="80" height="80">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                  </svg>
                </div>
                <h3 className="empty-state__title">No products found</h3>
                <p className="empty-state__text">Try adjusting your filters or browse all products.</p>
                <button className="btn btn--primary" onClick={clearFilters} data-testid="clear-empty-btn">View All Products</button>
              </div>
            ) : (
              <>
                <div className="shop__grid">
                  {paginated.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
                {totalPages > 1 && (
                  <div className="pagination" data-testid="pagination">
                    <button
                      className="pagination__btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      data-testid="page-prev"
                    >
                      <ChevronRight style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        className={`pagination__btn ${currentPage === i + 1 ? 'pagination__btn--active' : ''}`}
                        onClick={() => setCurrentPage(i + 1)}
                        data-testid={`page-${i + 1}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      className="pagination__btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      data-testid="page-next"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
