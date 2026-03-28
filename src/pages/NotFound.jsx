import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="page not-found" data-testid="not-found-page">
      <div className="not-found__code">404</div>
      <h2 className="not-found__title">Lost at Sea</h2>
      <p className="not-found__text">
        The page you're looking for has drifted away into the deep ocean. Let's navigate you back to safe waters.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn--primary" data-testid="go-home-btn">
          <Home size={18} /> Back to Home
        </Link>
        <Link to="/products" className="btn btn--secondary" data-testid="go-shop-btn">
          <ArrowLeft size={18} /> Browse Products
        </Link>
      </div>

      <svg className="not-found__wave" viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path d="M0,60 C480,120 960,0 1440,60 C1920,120 2400,0 2880,60 L2880,120 L0,120 Z" />
      </svg>
    </div>
  );
}
