import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/context/ThemeContext.jsx';
import { CartProvider } from '@/context/CartContext.jsx';
import { WishlistProvider } from '@/context/WishlistContext.jsx';
import { AuthProvider } from '@/context/AuthContext.jsx';
import { ToastProvider } from '@/context/ToastContext.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import Home from '@/pages/Home.jsx';
import Products from '@/pages/Products.jsx';
import ProductDetail from '@/pages/ProductDetail.jsx';
import Cart from '@/pages/Cart.jsx';
import Checkout from '@/pages/Checkout.jsx';
import Wishlist from '@/pages/Wishlist.jsx';
import Search from '@/pages/Search.jsx';
import Auth from '@/pages/Auth.jsx';
import Profile from '@/pages/Profile.jsx';
import OrderTracking from '@/pages/OrderTracking.jsx';
import About from '@/pages/About.jsx';
import Contact from '@/pages/Contact.jsx';
import NotFound from '@/pages/NotFound.jsx';
import '@/styles/main.scss';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <ToastProvider>
                <BrowserRouter>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:slug" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<Auth />} />
                    <Route path="/signup" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<OrderTracking />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </BrowserRouter>
              </ToastProvider>
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
