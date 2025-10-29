import React from 'react';
import { useToast } from '../contexts/ToastContext';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 space-y-3">
      {toasts.map((toast) => {
        const color =
          toast.type === 'success'
            ? 'bg-green-100 text-green-800 border-l-4 border-green-500'
            : toast.type === 'error'
            ? 'bg-red-100 text-red-800 border-l-4 border-red-500'
            : 'bg-blue-100 text-blue-800 border-l-4 border-blue-500';

        return (
          <div
            key={toast.id}
            className={`px-6 py-3 rounded-lg shadow-lg flex justify-between items-center ${color}`}
          >
            <span>{toast.message}</span>
            <button
              className="ml-4 font-bold"
              onClick={() => removeToast(toast.id)}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;