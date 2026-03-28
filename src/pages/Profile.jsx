import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Package, MapPin, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext.jsx';
import { useToast } from '@/context/ToastContext.jsx';
import { mockOrders, mockAddresses } from '@/data/mockData';

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  if (!isAuthenticated) {
    return (
      <div className="page" data-testid="profile-page">
        <div className="container section">
          <div className="empty-state">
            <div className="empty-state__icon"><User /></div>
            <h3 className="empty-state__title">Sign in to view your profile</h3>
            <p className="empty-state__text">Access your orders, addresses, and account settings.</p>
            <Link to="/login" className="btn btn--primary" data-testid="login-redirect-btn">Sign In</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'info', 'Goodbye');
    navigate('/');
  };

  const menuItems = [
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'account', label: 'Account Settings', icon: User },
  ];

  return (
    <div className="page" data-testid="profile-page">
      <div className="container section">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__sep"><ChevronRight size={14} /></span>
          <span className="breadcrumb__current">My Account</span>
        </div>

        <div className="profile__layout">
          {/* Sidebar */}
          <aside className="profile__sidebar" data-testid="profile-sidebar">
            <div className="profile__user">
              <div className="profile__avatar">{user.initials}</div>
              <div className="profile__name">{user.name}</div>
              <div className="profile__email">{user.email}</div>
            </div>
            <div className="profile__menu">
              {menuItems.map(item => (
                <div
                  key={item.id}
                  className={`profile__menu-item ${activeTab === item.id ? 'profile__menu-item--active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                  data-testid={`profile-tab-${item.id}`}
                >
                  <item.icon /> {item.label}
                </div>
              ))}
              <div className="profile__menu-item" onClick={handleLogout} data-testid="logout-btn" style={{ color: 'var(--clr-error)' }}>
                <LogOut /> Sign Out
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="profile__content">
            {activeTab === 'orders' && (
              <div data-testid="orders-section">
                <div className="profile__section">
                  <h3 className="profile__section-title">Order History</h3>
                  {mockOrders.length === 0 ? (
                    <div className="empty-state" style={{ padding: '2rem 0' }}>
                      <h3 className="empty-state__title">No orders yet</h3>
                      <p className="empty-state__text">Your order history will appear here.</p>
                      <Link to="/products" className="btn btn--primary btn--sm">Start Shopping</Link>
                    </div>
                  ) : (
                    mockOrders.map(order => (
                      <div key={order.id} className="order-card" data-testid={`order-${order.id}`}>
                        <div className="order-card__header">
                          <span className="order-card__id">{order.id}</span>
                          <span className={`order-card__status order-card__status--${order.status}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="order-card__items">
                          {order.items.map(item => (
                            <div key={item.id} className="order-card__item-img">
                              <img src={item.image} alt={item.name} />
                            </div>
                          ))}
                        </div>
                        <div className="order-card__footer">
                          <span className="order-card__date">{order.date}</span>
                          <span className="order-card__total">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div data-testid="addresses-section">
                <div className="profile__section">
                  <h3 className="profile__section-title">Saved Addresses</h3>
                  <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                    {mockAddresses.map(addr => (
                      <div key={addr.id} className="address-card" data-testid={`saved-address-${addr.id}`}>
                        <div className="address-card__name">
                          {addr.name} {addr.isDefault && <span style={{ fontSize: '0.7rem', color: 'var(--accent-tq)' }}>Default</span>}
                        </div>
                        <div className="address-card__text">
                          {addr.fullName}<br />
                          {addr.address}<br />
                          {addr.city}, {addr.state} {addr.zip}<br />
                          {addr.phone}
                        </div>
                        <div className="address-card__actions">
                          <button data-testid={`edit-address-${addr.id}`}>Edit</button>
                          <button>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div data-testid="account-section">
                <div className="profile__section">
                  <h3 className="profile__section-title">Account Settings</h3>
                  <div className="checkout__form-grid">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input className="form-input form-input--bordered" defaultValue={user.name} data-testid="profile-name-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input form-input--bordered" defaultValue={user.email} data-testid="profile-email-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-input form-input--bordered" defaultValue="(305) 555-0123" data-testid="profile-phone-input" />
                    </div>
                  </div>
                  <button className="btn btn--primary" style={{ marginTop: '1.5rem' }} data-testid="save-profile-btn">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
