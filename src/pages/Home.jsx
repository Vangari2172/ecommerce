import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, Shield, Award, Leaf, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '@/components/ProductCard.jsx';
import { products, categories, testimonials, IMAGES } from '@/data/mockData';
import { useTheme } from '@/context/ThemeContext.jsx';

gsap.registerPlugin(ScrollTrigger);

const featuredProducts = products.filter(p => p.featured);
const features = [
  { icon: Leaf, title: 'Sustainably Sourced', text: 'Every product traced back to responsible fisheries and farms committed to ocean health.' },
  { icon: Truck, title: 'Same-Day Delivery', text: 'Temperature-controlled logistics ensure your seafood arrives at peak freshness.' },
  { icon: Shield, title: 'Quality Guaranteed', text: 'Rigorous quality checks at every stage. Not satisfied? Full refund, no questions.' },
  { icon: Award, title: 'Expert Selection', text: 'Our master fishmongers hand-pick only the finest 5% of each day\'s catch.' },
];

export default function Home() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero__label', { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 });
      gsap.from('.hero__title', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 });
      gsap.from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.35 });
      gsap.from('.hero__cta > *', { y: 20, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 0.5 });
      gsap.from('.hero__stat', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.7 });

      // Wave animation
      gsap.to('.hero__wave', {
        x: '-25%',
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Scroll animations
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        const children = section.querySelectorAll('.section__header, .categories__grid, .featured__carousel, .offers-banner, .why-us__grid, .testimonials__track, .newsletter');
        if (children.length) {
          gsap.from(children, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    carouselRef.current.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };

  return (
    <div ref={heroRef} className="page" data-testid="home-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <img
            src={theme === 'dark' ? IMAGES.hero.dark : IMAGES.hero.light}
            alt="Ocean background"
          />
        </div>
        <div className="hero__content">
          <span className="hero__label">Premium Seafood Collection</span>
          <h1 className="hero__title">
            Ocean's Finest,<br />Delivered <em>Fresh</em>
          </h1>
          <p className="hero__subtitle">
            Premium seafood sourced from the world's cleanest waters.
            From ocean to your table in under 24 hours.
          </p>
          <div className="hero__cta">
            <Link to="/products" className="btn btn--primary btn--lg" data-testid="hero-shop-btn">
              Shop Now <ArrowRight />
            </Link>
            <Link to="/products" className="btn btn--secondary btn--lg" data-testid="hero-explore-btn">
              Explore Menu
            </Link>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-number">500+</div>
              <div className="hero__stat-label">Premium Products</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">24hr</div>
              <div className="hero__stat-label">Fresh Delivery</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">50k+</div>
              <div className="hero__stat-label">Happy Customers</div>
            </div>
          </div>
        </div>
        <svg className="hero__wave" viewBox="0 0 2880 120" preserveAspectRatio="none">
          <path d="M0,60 C480,120 960,0 1440,60 C1920,120 2400,0 2880,60 L2880,120 L0,120 Z" />
        </svg>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__label">Categories</span>
            <h2 className="section__title">Explore Our Selection</h2>
            <p className="section__subtitle">From the depths of the ocean to your plate, discover our curated categories of premium seafood.</p>
          </div>
          <div className="categories__grid">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="category-card"
                data-testid={`category-${cat.id}`}
              >
                <div className="category-card__image">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <div className="category-card__overlay" />
                <div className="category-card__content">
                  <div className="category-card__name">{cat.name}</div>
                  <div className="category-card__count">{cat.count} products</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <span className="section__label">Hand-Picked</span>
              <h2 className="section__title">Featured Products</h2>
            </div>
            <div className="featured__nav">
              <button className="featured__nav-btn" onClick={() => scrollCarousel(-1)} data-testid="carousel-prev" aria-label="Previous">
                <ChevronLeft />
              </button>
              <button className="featured__nav-btn" onClick={() => scrollCarousel(1)} data-testid="carousel-next" aria-label="Next">
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="featured__carousel">
            <div className="featured__track" ref={carouselRef}>
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS BANNER */}
      <section className="section">
        <div className="container">
          <div className="offers-banner" data-testid="offers-banner">
            <div className="offers-banner__content">
              <div className="offers-banner__label">Limited Time Offer</div>
              <h2 className="offers-banner__title">Free Delivery on Orders Over $75</h2>
              <p className="offers-banner__text">Plus, use code OCEAN10 for 10% off your first order.</p>
            </div>
            <Link to="/products" className="btn btn--primary btn--lg" data-testid="offers-shop-btn">
              Shop Now <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__label">Why Bombay Fish Suppliers</span>
            <h2 className="section__title">The Premium Difference</h2>
          </div>
          <div className="why-us__grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card" data-testid={`feature-card-${i}`}>
                <div className="feature-card__icon"><f.icon /></div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__label">Testimonials</span>
            <h2 className="section__title">What Our Customers Say</h2>
          </div>
          <div className="testimonials__track">
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-card" data-testid={`testimonial-${t.id}`}>
                <div className="testimonial-card__stars stars">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} fill="#F9A825" stroke="#F9A825" />
                  ))}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section">
        <div className="container">
          <div className="newsletter" data-testid="newsletter-section">
            <span className="section__label">Newsletter</span>
            <h2 className="section__title">Stay Fresh</h2>
            <p className="section__subtitle" style={{ margin: '0 auto' }}>
              Get exclusive deals, seasonal recipes, and early access to new arrivals.
            </p>
            <form className="newsletter__form" onSubmit={(e) => e.preventDefault()} data-testid="home-newsletter-form">
              <input type="email" placeholder="Enter your email" data-testid="home-newsletter-input" />
              <button type="submit" className="btn btn--primary" data-testid="home-newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
