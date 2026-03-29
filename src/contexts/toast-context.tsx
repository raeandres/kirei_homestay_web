/**
 * Toast Context - Manages toast notification state
 */

import React, { createContext, useContext, useCallback, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import { generateId } from '@/lib/utils';
import type { ToastMessage, ToastVariant } from '@/lib/types';

// ==========================================
// Toast Context Type
// ==========================================

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (options: {
    title?: string;
    description: string;
    variant?: ToastVariant;
    duration?: number;
    action?: ToastMessage['action'];
  }) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
  success: (description: string, title?: string) => string;
  error: (description: string, title?: string) => string;
  info: (description: string, title?: string) => string;
}

// ==========================================
// Toast Provider Component
// ==========================================

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const DEFAULT_DURATION = 5000;
const MAX_TOASTS = 3;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  // Add toast with auto-dismiss
  const showToast = useCallback((options: {
    title?: string;
    description: string;
    variant?: ToastVariant;
    duration?: number;
    action?: ToastMessage['action'];
  }) => {
    const id = generateId('toast');
    const toastMessage: ToastMessage = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant || 'default',
      duration: options.duration || DEFAULT_DURATION,
      action: options.action,
    };

    setToasts(prev => {
      // Remove existing toast with same description if it exists
      const filtered = prev.filter(t => t.description !== options.description);
      // Add new toast at the beginning, limit to MAX_TOASTS
      return [toastMessage, ...filtered].slice(0, MAX_TOASTS);
    });

    // Auto dismiss if duration is set
    if (toastMessage.duration) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, toastMessage.duration);
    }

    return id;
  }, []);

  // Dismiss specific toast
  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Clear all toasts
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Variant helpers
  const success = useCallback((description: string, title?: string) => {
    return showToast({ title, description, variant: 'success' });
  }, [showToast]);

  const error = useCallback((description: string, title?: string) => {
    return showToast({ title, description, variant: 'destructive' });
  }, [showToast]);

  const info = useCallback((description: string, title?: string) => {
    return showToast({ title, description, variant: 'info' });
  }, [showToast]);

  // Remove toast when duration expires (cleanup)
  useEffect(() => {
    const timeoutIds = new Map<string, NodeJS.Timeout>();

    toasts.forEach(toast => {
      if (toast.duration && !timeoutIds.has(toast.id)) {
        const timeoutId = setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== toast.id));
        }, toast.duration);
        timeoutIds.set(toast.id, timeoutId);
      }
    });

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [toasts]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        clearToasts,
        success,
        error,
        info,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

// ==========================================
// Toast Hook
// ==========================================

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback for when context is not available
    return {
      toasts: [] as ToastMessage[],
      showToast: () => '',
      dismissToast: () => {},
      clearToasts: () => {},
      success: () => '',
      error: () => '',
      info: () => '',
    };
  }
  return context;
}

// ==========================================
// Toast Styles Helper
// ==========================================

export function getToastVariantStyles(variant: ToastVariant) {
  const styles = {
    default: {
      background: 'bg-background',
      border: 'border-border',
      text: 'text-foreground',
      icon: 'text-primary',
    },
    destructive: {
      background: 'bg-destructive',
      border: 'border-destructive',
      text: 'text-destructive-foreground',
      icon: 'text-white',
    },
    success: {
      background: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: 'text-green-600 dark:text-green-400',
    },
    info: {
      background: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'text-blue-600 dark:text-blue-400',
    },
  };

  return styles[variant] || styles.default;
}
