import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/context/ToastContext.jsx';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      addToast('You have been subscribed to our newsletter!', 'success', 'Subscribed');
      setEmail('');
    }
  };

  return (
    <footer className="footer" data-testid="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo"><span>Bombay Fish Suppliers</span></Link>
            <p className="footer__desc">
              Premium seafood sourced from the world's cleanest waters. 
              Delivered fresh to your doorstep with care and precision.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="Twitter" data-testid="social-twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" data-testid="social-instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="Facebook" data-testid="social-facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer__col-title">Quick Links</h4>
            <div className="footer__links">
              <Link to="/products" data-testid="footer-link-shop">Shop All</Link>
              <Link to="/products?category=fresh-fish">Fresh Fish</Link>
              <Link to="/products?category=shellfish">Shellfish</Link>
              <Link to="/products?category=sashimi">Sashimi Grade</Link>
              <Link to="/products?category=specialty">Specialty</Link>
            </div>
          </div>

          <div>
            <h4 className="footer__col-title">Support</h4>
            <div className="footer__links">
              <Link to="/profile">My Account</Link>
              <Link to="/orders">Track Order</Link>
              <Link to="/cart">Shopping Cart</Link>
              <Link to="/wishlist">Wishlist</Link>
              <a href="#">Contact Us</a>
            </div>
          </div>

          <div className="footer__newsletter">
            <h4 className="footer__col-title">Stay Fresh</h4>
            <p>Get exclusive deals, recipes, and updates delivered to your inbox.</p>
            <form className="footer__newsletter-form" onSubmit={handleSubscribe} data-testid="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="newsletter-email-input"
                required
              />
              <button type="submit" data-testid="newsletter-submit-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <p>2026 Bombay Fish Suppliers. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
