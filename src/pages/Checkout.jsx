import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Check, CreditCard, Wallet, Banknote, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext.jsx';
import { useToast } from '@/context/ToastContext.jsx';
import { deliverySlots, mockAddresses } from '@/data/mockData';

const steps = ['Address', 'Delivery', 'Payment', 'Confirmation'];

export default function Checkout() {
  const { items, subtotal, discount, shipping, total, coupon, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0]?.id || null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [orderId] = useState(`ORD-${Date.now().toString(36).toUpperCase()}`);
  const [formData, setFormData] = useState({ fullName: 'John Doe', phone: '(305) 555-0123', address: '123 Ocean Drive, Apt 4B', city: 'Miami', state: 'FL', zip: '33139' });

  if (items.length === 0 && step < 3) {
    return (
      <div className="page" data-testid="checkout-page">
        <div className="container section">
          <div className="empty-state">
            <h3 className="empty-state__title">Your cart is empty</h3>
            <p className="empty-state__text">Add some items before checking out.</p>
            <Link to="/products" className="btn btn--primary">Shop Now</Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(3);
      clearCart();
      addToast('Order placed successfully!', 'success', 'Order Confirmed');
    }, 2000);
  };

  const canProceed = () => {
    if (step === 0) return formData.fullName && formData.address && formData.city;
    if (step === 1) return selectedSlot && selectedTime;
    if (step === 2) return paymentMethod;
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div data-testid="checkout-step-address">
            <h3 className="checkout__form-title">Delivery Address</h3>
            {mockAddresses.length > 0 && (
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {mockAddresses.map(addr => (
                  <div
                    key={addr.id}
                    className={`address-card ${selectedAddress === addr.id ? 'address-card--active' : ''}`}
                    onClick={() => { setSelectedAddress(addr.id); setFormData({ fullName: addr.fullName, phone: addr.phone, address: addr.address, city: addr.city, state: addr.state, zip: addr.zip }); }}
                    data-testid={`address-${addr.id}`}
                  >
                    <div className="address-card__name">{addr.name} {addr.isDefault && <span style={{ fontSize: '0.7rem', color: 'var(--accent-tq)' }}>Default</span>}</div>
                    <div className="address-card__text">{addr.fullName} - {addr.address}, {addr.city}, {addr.state} {addr.zip}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="checkout__form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input form-input--bordered" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} data-testid="checkout-name-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input form-input--bordered" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} data-testid="checkout-phone-input" />
              </div>
              <div className="form-group checkout__form-full">
                <label className="form-label">Address</label>
                <input className="form-input form-input--bordered" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} data-testid="checkout-address-input" />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input className="form-input form-input--bordered" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} data-testid="checkout-city-input" />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">State</label>
                  <input className="form-input form-input--bordered" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} data-testid="checkout-state-input" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">ZIP</label>
                  <input className="form-input form-input--bordered" value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} data-testid="checkout-zip-input" />
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div data-testid="checkout-step-delivery">
            <h3 className="checkout__form-title">Select Delivery Slot</h3>
            <div className="checkout__slots">
              {deliverySlots.map(slot => (
                <div key={slot.id}>
                  <div
                    className={`checkout__slot ${selectedSlot === slot.id ? 'checkout__slot--active' : ''}`}
                    onClick={() => { setSelectedSlot(slot.id); setSelectedTime(slot.times[0]); }}
                    data-testid={`slot-${slot.id}`}
                  >
                    <div className="checkout__slot-day">{slot.day}, {slot.date}</div>
                    <div className="checkout__slot-time">{slot.times.length} slots available</div>
                  </div>
                  {selectedSlot === slot.id && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                      {slot.times.map(time => (
                        <button
                          key={time}
                          className={`weight-selector__option ${selectedTime === time ? 'weight-selector__option--active' : ''}`}
                          onClick={() => setSelectedTime(time)}
                          data-testid={`time-${time.replace(/\s/g, '-')}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div data-testid="checkout-step-payment">
            <h3 className="checkout__form-title">Payment Method</h3>
            <div className="checkout__payment-methods">
              {[
                { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex' },
                { id: 'upi', icon: Wallet, label: 'UPI / Digital Wallet', desc: 'Google Pay, Apple Pay' },
                { id: 'cod', icon: Banknote, label: 'Cash on Delivery', desc: 'Pay when you receive' },
              ].map(method => (
                <div
                  key={method.id}
                  className={`checkout__payment-method ${paymentMethod === method.id ? 'checkout__payment-method--active' : ''}`}
                  onClick={() => setPaymentMethod(method.id)}
                  data-testid={`payment-${method.id}`}
                >
                  <div className="checkout__payment-method-left">
                    <div className="checkout__payment-method-icon"><method.icon /></div>
                    <div>
                      <div className="checkout__payment-method-label">{method.label}</div>
                      <div className="checkout__payment-method-desc">{method.desc}</div>
                    </div>
                  </div>
                  <div className="checkout__payment-method-radio" />
                </div>
              ))}
            </div>

            <div className="checkout__summary">
              <div className="checkout__summary-title">Order Summary</div>
              {items.map(item => (
                <div key={`${item.id}-${item.weight}`} className="checkout__summary-item">
                  <span>{item.name} x{item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              {coupon && (
                <div className="checkout__summary-item" style={{ color: 'var(--clr-success)' }}>
                  <span>Discount ({coupon.label})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="checkout__summary-item">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="checkout__summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="order-success" data-testid="order-success">
            <div className="order-success__icon"><Check /></div>
            <h2 className="order-success__title">Order Confirmed!</h2>
            <p className="order-success__text">Thank you for your order. You will receive a confirmation email shortly.</p>
            <p className="order-success__order-id" data-testid="order-id">Order ID: {orderId}</p>
            <div className="order-success__details">
              <div className="order-success__detail-row"><span>Payment</span><span style={{ textTransform: 'capitalize' }}>{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI / Digital Wallet' : 'Credit Card'}</span></div>
              <div className="order-success__detail-row"><span>Delivery</span><span>{deliverySlots.find(s => s.id === selectedSlot)?.day || 'N/A'}, {selectedTime}</span></div>
              <div className="order-success__detail-row"><span>Address</span><span>{formData.address}, {formData.city}</span></div>
            </div>
            <div className="order-success__actions">
              <Link to="/orders" className="btn btn--primary" data-testid="track-order-btn">Track Order</Link>
              <Link to="/products" className="btn btn--secondary" data-testid="continue-shopping-btn">Continue Shopping</Link>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="page" data-testid="checkout-page">
      <div className="container section">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__sep"><ChevronRight size={14} /></span>
          <Link to="/cart">Cart</Link>
          <span className="breadcrumb__sep"><ChevronRight size={14} /></span>
          <span className="breadcrumb__current">Checkout</span>
        </div>

        <div className="checkout">
          {/* Steps */}
          <div className="checkout__steps" data-testid="checkout-steps">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`checkout__step ${i === step ? 'checkout__step--active' : ''} ${i < step ? 'checkout__step--done' : ''}`}
              >
                <div className="checkout__step-circle">
                  {i < step ? <Check size={18} /> : i + 1}
                </div>
                <span className="checkout__step-label">{s}</span>
              </div>
            ))}
          </div>

          <div className="checkout__form">
            {renderStep()}

            {step < 3 && (
              <div className="checkout__footer">
                <button
                  className="btn btn--ghost"
                  onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/cart')}
                  data-testid="checkout-back-btn"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                {step < 2 ? (
                  <button
                    className="btn btn--primary"
                    disabled={!canProceed()}
                    onClick={() => setStep(s => s + 1)}
                    data-testid="checkout-next-btn"
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    className={`btn btn--primary ${processing ? 'btn--loading' : ''}`}
                    disabled={!canProceed() || processing}
                    onClick={handlePlaceOrder}
                    data-testid="place-order-btn"
                  >
                    Place Order - ${total.toFixed(2)}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
