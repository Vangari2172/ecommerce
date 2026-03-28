import { Link } from 'react-router-dom';
import { Check, Package, Truck, MapPin, ChevronRight } from 'lucide-react';

const trackingSteps = [
  { id: 1, title: 'Order Placed', time: 'Jan 10, 2024 - 2:30 PM', desc: 'Your order has been confirmed and is being prepared.', icon: Check, status: 'done' },
  { id: 2, title: 'Packed & Ready', time: 'Jan 10, 2024 - 5:15 PM', desc: 'Your seafood has been carefully packed in temperature-controlled packaging.', icon: Package, status: 'done' },
  { id: 3, title: 'Out for Delivery', time: 'Jan 11, 2024 - 9:00 AM', desc: 'Your order is on its way! Estimated arrival: 11:00 AM - 12:00 PM.', icon: Truck, status: 'active' },
  { id: 4, title: 'Delivered', time: 'Estimated: Jan 11, 2024', desc: 'Your order will be delivered to your doorstep.', icon: MapPin, status: 'pending' },
];

export default function OrderTracking() {
  return (
    <div className="page" data-testid="order-tracking-page">
      <div className="container section">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__sep"><ChevronRight size={14} /></span>
          <Link to="/profile">Profile</Link>
          <span className="breadcrumb__sep"><ChevronRight size={14} /></span>
          <span className="breadcrumb__current">Track Order</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '2rem' }}>Track Your Order</h1>

        <div className="tracking">
          <div className="tracking__order-info" data-testid="tracking-info">
            <div className="tracking__order-id">
              Order ID: <span>ORD-2024-001</span>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>Jan 10, 2024</span>
              <span style={{ padding: '0.2rem 0.75rem', borderRadius: 20, background: 'rgba(2, 136, 209, 0.1)', color: 'var(--clr-info)', fontSize: '0.8rem', fontWeight: 600 }}>
                In Transit
              </span>
            </div>
          </div>

          <div className="tracking__timeline" data-testid="tracking-timeline">
            {trackingSteps.map(step => (
              <div
                key={step.id}
                className={`tracking__step tracking__step--${step.status}`}
                data-testid={`tracking-step-${step.id}`}
              >
                <div className="tracking__step-dot">
                  <step.icon size={14} />
                </div>
                <div>
                  <div className="tracking__step-title">{step.title}</div>
                  <div className="tracking__step-time">{step.time}</div>
                  <div className="tracking__step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
