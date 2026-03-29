import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext.jsx';
import { useToast } from '@/context/ToastContext.jsx';

export default function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (isLogin) {
        login(form.email, form.password);
        addToast('Welcome back!', 'success', 'Logged In');
      } else {
        signup(form.name, form.email, form.password);
        addToast('Account created successfully!', 'success', 'Welcome');
      }
      setLoading(false);
      navigate('/profile');
    }, 800);
  };

  return (
    <div className="page auth" data-testid={isLogin ? 'login-page' : 'signup-page'}>
      <div className="auth__card">
        <div className="auth__header">
          <h2 className="auth__title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="auth__subtitle">
            {isLogin ? 'Sign in to access your account' : 'Join Bombay Fish Suppliers for the freshest seafood'}
          </p>
        </div>

        <form onSubmit={handleSubmit} data-testid="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input form-input--bordered"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required={!isLogin}
                data-testid="auth-name-input"
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input form-input--bordered"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              data-testid="auth-email-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input form-input--bordered"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                data-testid="auth-password-input"
                style={{ paddingRight: '3rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                data-testid="toggle-password-btn"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
              <a href="#" style={{ fontSize: '0.85rem', color: 'var(--accent-tq)' }}>Forgot password?</a>
            </div>
          )}

          <button
            type="submit"
            className={`btn btn--primary btn--full btn--lg ${loading ? 'btn--loading' : ''}`}
            disabled={loading}
            data-testid="auth-submit-btn"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="auth__footer">
          {isLogin ? (
            <>Don't have an account? <Link to="/signup" data-testid="switch-to-signup">Sign Up</Link></>
          ) : (
            <>Already have an account? <Link to="/login" data-testid="switch-to-login">Sign In</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
