import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', title = '') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type, title, exiting: false }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300);
  }, []);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container" data-testid="toast-container">
        {toasts.map(toast => {
          const Icon = icons[toast.type] || CheckCircle;
          return (
            <div
              key={toast.id}
              className={`toast toast--${toast.type} ${toast.exiting ? 'toast--exiting' : ''}`}
              data-testid={`toast-${toast.type}`}
            >
              <Icon className="toast__icon" />
              <div className="toast__content">
                {toast.title && <div className="toast__title">{toast.title}</div>}
                <div className="toast__message">{toast.message}</div>
              </div>
              <button className="toast__close" onClick={() => removeToast(toast.id)} data-testid="toast-close">
                <X />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
