import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Sun, Moon, Menu, X, User, ChevronRight, Home, Info, Mail } from 'lucide-react';
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
    // { to: '/products?category=fresh-fish', label: 'Fresh Fish' },
    // { to: '/products?category=shellfish', label: 'Shellfish' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
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
            <img src="/src/assets/images/logo.webp" alt="logo" className="navbar__logo-img" />
            <span>Bombay Fish Suppliers</span>
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
              {wishlistItems.length >0 && (
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
              {itemCount >0 && (
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
          {[
            { to: '/', label: 'Home', icon: <Home /> },
            { to: '/products', label: 'Shop', icon: <ShoppingBag /> },
            { to: '/about', label: 'About', icon: <Info /> },
            { to: '/contact', label: 'Contact', icon: <Mail /> },
            { to: '/wishlist', label: 'Wishlist', icon: <Heart />, badge: wishlistItems.length },
            { to: isAuthenticated ? '/profile' : '/login', label: isAuthenticated ? 'Profile' : 'Sign In', icon: <User /> },
            { 
              label: theme === 'dark' ? 'Light Mode' : 'Dark Mode', 
              icon: theme === 'dark' ? <Sun /> : <Moon />,
              onClick: toggleTheme 
            },
          ].map(link => (
            <div key={link.to + link.label} className="navbar__mobile-action">
              <button
                onClick={() => {
                  if (link.onClick) {
                    link.onClick();
                  } else {
                    navigate(link.to);
                  }
                  setMobileOpen(false);
                }}
                className="navbar__mobile-action-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '1rem',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '1rem 1.25rem'
                }}
              >
                <span className="navbar__mobile-action-icon">{link.icon}</span>
                <span className="navbar__mobile-action-text">{link.label}</span>
                {link.badge > 0 && (
                  <span className="navbar__mobile-action-badge">{link.badge}</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
