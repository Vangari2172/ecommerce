export function SkeletonCard() {
  return (
    <div className="skeleton skeleton--card" data-testid="skeleton-card">
      <div className="skeleton skeleton--image" />
      <div className="skeleton__body">
        <div className="skeleton skeleton--text" style={{ width: '40%', height: 10 }} />
        <div className="skeleton skeleton--title" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="skeleton skeleton--text" style={{ width: '30%' }} />
          <div className="skeleton skeleton--text" style={{ width: '15%' }} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="product-detail__grid" data-testid="skeleton-detail">
      <div>
        <div className="skeleton skeleton--image" style={{ aspectRatio: '1', borderRadius: 'var(--radius)' }} />
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton" style={{ width: 72, height: 72, borderRadius: 'var(--radius-sm)' }} />
          ))}
        </div>
      </div>
      <div>
        <div className="skeleton skeleton--text" style={{ width: '30%', height: 12 }} />
        <div className="skeleton skeleton--title" style={{ width: '70%', height: 32, marginBottom: 16 }} />
        <div className="skeleton skeleton--text" style={{ width: '25%', height: 14 }} />
        <div className="skeleton skeleton--title" style={{ width: '20%', height: 36, marginBottom: 24 }} />
        <div className="skeleton skeleton--text" style={{ width: '90%' }} />
        <div className="skeleton skeleton--text" style={{ width: '80%' }} />
        <div className="skeleton skeleton--text" style={{ width: '60%' }} />
        <div className="skeleton skeleton--button" style={{ marginTop: 24 }} />
      </div>
    </div>
  );
}

export function SkeletonCartItem() {
  return (
    <div className="cart-item" data-testid="skeleton-cart-item" style={{ opacity: 0.6 }}>
      <div className="skeleton" style={{ width: 80, height: 80, borderRadius: 'var(--radius-sm)' }} />
      <div>
        <div className="skeleton skeleton--title" style={{ width: '60%' }} />
        <div className="skeleton skeleton--text" style={{ width: '30%' }} />
      </div>
    </div>
  );
}
