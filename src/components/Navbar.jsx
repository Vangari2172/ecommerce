import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Sun, Moon, Menu, X, User, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';
import { useCart } from '@/context/CartContext.jsx';
import { useWishlist } from '@/context/WishlistContext.jsx';
import { useAuth } from '@/context/AuthContext.jsx';
import gsap from 'gsap';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.navbar__mobile-links a', { x: 30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' });
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/products?category=fresh-fish', label: 'Fresh Fish' },
    { to: '/products?category=shellfish', label: 'Shellfish' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('?')[0]) && (location.search === '' || location.search === path.split('?')[1]);
  };

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} data-testid="navbar">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo" data-testid="navbar-logo">
            Ocean<span>Harvest</span>
          </Link>

          <div className="navbar__nav">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar__link ${isActive(link.to) ? 'navbar__link--active' : ''}`}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar__actions">
            <button
              className="navbar__btn"
              onClick={() => navigate('/search')}
              data-testid="nav-search-btn"
              aria-label="Search"
            >
              <Search />
            </button>

            <button
              className="navbar__btn"
              onClick={() => navigate('/wishlist')}
              data-testid="nav-wishlist-btn"
              aria-label="Wishlist"
            >
              <Heart />
              {wishlistItems.length > 0 && (
                <span className="navbar__cart-count">{wishlistItems.length}</span>
              )}
            </button>

            <button
              className="navbar__btn"
              onClick={() => navigate('/cart')}
              data-testid="nav-cart-btn"
              aria-label="Cart"
            >
              <ShoppingBag />
              {itemCount > 0 && (
                <span className="navbar__cart-count" data-testid="cart-count">{itemCount}</span>
              )}
            </button>

            <button
              className="navbar__theme-toggle"
              onClick={toggleTheme}
              data-testid="theme-toggle-btn"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>

            <button
              className="navbar__btn"
              onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
              data-testid="nav-user-btn"
              aria-label="User"
              style={{ display: 'none' }}
            >
              <User />
            </button>

            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(true)}
              data-testid="hamburger-btn"
              aria-label="Menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`overlay ${mobileOpen ? 'overlay--active' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`} data-testid="mobile-menu">
        <button className="navbar__mobile-close" onClick={() => setMobileOpen(false)} data-testid="mobile-menu-close">
          <X />
        </button>

        <div className="navbar__mobile-links">
          {[...navLinks,
            { to: '/wishlist', label: 'Wishlist' },
            { to: '/cart', label: 'Cart' },
            { to: isAuthenticated ? '/profile' : '/login', label: isAuthenticated ? 'Profile' : 'Sign In' },
          ].map(link => (
            <Link key={link.to + link.label} to={link.to} data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}>
              {link.label}
              <ChevronRight style={{ float: 'right', width: 18, height: 18, opacity: 0.4 }} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
