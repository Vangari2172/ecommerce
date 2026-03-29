import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us - Bombay Fish Suppliers</title>
        <meta name="description" content="Contact Bombay Fish Suppliers for fresh seafood orders and inquiries. Call us or email for premium seafood delivery." />
      </Helmet>
      
      <div className="page">
        <div className="container">
          <div className="page__header">
            <h1 className="page__title">Contact Us</h1>
            <p className="page__subtitle">Get in touch for fresh seafood orders and inquiries</p>
          </div>

          <div className="contact">
            <div className="contact__grid">
              <div className="contact__info">
                <div className="contact__card">
                  <div className="contact__card-header">
                    <Mail className="contact__icon" />
                    <h3>Email Us</h3>
                  </div>
                  <div className="contact__card-content">
                    <p>For orders and general inquiries:</p>
                    <a href="mailto:test@test.com" className="contact__link">test@test.com</a>
                    <p>For wholesale and bulk orders:</p>
                    <a href="mailto:wholesale@test.com" className="contact__link">wholesale@test.com</a>
                  </div>
                </div>

                <div className="contact__card">
                  <div className="contact__card-header">
                    <Phone className="contact__icon" />
                    <h3>Call Us</h3>
                  </div>
                  <div className="contact__card-content">
                    <p>Orders and Customer Service:</p>
                    <a href="tel:+919876543210" className="contact__link">+91 98765 43210</a>
                    <p>Wholesale Inquiries:</p>
                    <a href="tel:+911122334455" className="contact__link">+91 11 2233 4455</a>
                    <p>Office Landline:</p>
                    <a href="tel:+912233445566" className="contact__link">+91 22 3344 5566</a>
                  </div>
                </div>

                <div className="contact__card">
                  <div className="contact__card-header">
                    <MapPin className="contact__icon" />
                    <h3>Visit Us</h3>
                  </div>
                  <div className="contact__card-content">
                    <p>Main Store & Office:</p>
                    <address className="contact__address">
                      Crawford Market, Building No. 42<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </address>
                    <p>Warehouse:</p>
                    <address className="contact__address">
                      Sassoon Dock, Colaba<br />
                      Mumbai, Maharashtra 400005<br />
                      India
                    </address>
                  </div>
                </div>

                <div className="contact__card">
                  <div className="contact__card-header">
                    <Clock className="contact__icon" />
                    <h3>Business Hours</h3>
                  </div>
                  <div className="contact__card-content">
                    <div className="contact__hours">
                      <div className="contact__hours-row">
                        <span>Monday - Saturday:</span>
                        <span>6:00 AM - 9:00 PM</span>
                      </div>
                      <div className="contact__hours-row">
                        <span>Sunday:</span>
                        <span>6:00 AM - 12:00 PM</span>
                      </div>
                      <div className="contact__hours-row">
                        <span>Wholesale Orders:</span>
                        <span>24/7 Hotline Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact__form-section">
                <div className="contact__form-card">
                  <h3>Send us a Message</h3>
                  <form className="contact__form">
                    <div className="form__group">
                      <label htmlFor="name" className="form__label">Full Name *</label>
                      <input type="text" id="name" name="name" className="form__input" required />
                    </div>
                    
                    <div className="form__group">
                      <label htmlFor="email" className="form__label">Email Address *</label>
                      <input type="email" id="email" name="email" className="form__input" required />
                    </div>
                    
                    <div className="form__group">
                      <label htmlFor="phone" className="form__label">Phone Number</label>
                      <input type="tel" id="phone" name="phone" className="form__input" />
                    </div>
                    
                    <div className="form__group">
                      <label htmlFor="subject" className="form__label">Subject *</label>
                      <select id="subject" name="subject" className="form__select" required>
                        <option value="">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="wholesale">Wholesale Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="complaint">Complaint</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="form__group">
                      <label htmlFor="message" className="form__label">Message *</label>
                      <textarea id="message" name="message" rows="5" className="form__textarea" required></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn--primary btn--full">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
