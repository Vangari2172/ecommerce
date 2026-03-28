import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard.jsx';
import { products } from '@/data/mockData';

export default function Search() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    return products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, [query]);

  const results = useMemo(() => {
    if (!searched || !query) return [];
    return products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [searched, query]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (query.trim()) setSearched(true);
  };

  const handleSelectSuggestion = (product) => {
    setQuery(product.name);
    setSearched(true);
  };

  return (
    <div className="page" data-testid="search-page">
      <div className="container section">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '0.5rem' }}>Search</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Find your favorite premium seafood</p>
        </div>

        <form className="search__bar" onSubmit={handleSearch} data-testid="search-form">
          <div className="search__icon"><SearchIcon /></div>
          <input
            className="search__input"
            placeholder="Search for salmon, lobster, prawns..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearched(false); }}
            autoFocus
            data-testid="search-input"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); setSearched(false); }}
              style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              data-testid="search-clear-btn"
            >
              <X size={18} />
            </button>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && !searched && (
            <div className="search__suggestions" data-testid="search-suggestions">
              {suggestions.map(p => (
                <div
                  key={p.id}
                  className="search__suggestion"
                  onClick={() => handleSelectSuggestion(p)}
                  data-testid={`suggestion-${p.id}`}
                >
                  <div className="search__suggestion-img">
                    <img src={p.images[0]} alt={p.name} />
                  </div>
                  <div>
                    <div className="search__suggestion-name">{p.name}</div>
                    <div className="search__suggestion-price">${p.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Results */}
        {searched && (
          <>
            <p className="search__results-title" data-testid="results-count">
              {results.length > 0
                ? <>Found <span>{results.length}</span> results for "{query}"</>
                : `No results found for "${query}"`
              }
            </p>

            {results.length > 0 ? (
              <div className="shop__grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
                {results.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="empty-state" data-testid="no-results">
                <div className="empty-state__icon"><SearchIcon /></div>
                <h3 className="empty-state__title">No results found</h3>
                <p className="empty-state__text">Try different keywords or browse our categories.</p>
                <Link to="/products" className="btn btn--primary">Browse All Products</Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
