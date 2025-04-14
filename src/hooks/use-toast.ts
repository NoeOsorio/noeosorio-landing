import { useState } from 'react';

interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, variant = 'default' }: Toast) => {
    setToasts((current) => [...current, { title, description, variant }]);
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 5000);
  };

  return { toast, toasts };
} 