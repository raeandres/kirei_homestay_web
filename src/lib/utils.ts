// ==========================================
// Core Utility Functions
// ==========================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ==========================================
// CSS & Styling Utilities
// ==========================================

/**
 * Merge class names with Tailwind CSS class merging
 * Handles conflicts and deduplication automatically
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate unique CSS class names
 */
export function generateClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format class names with conditionals
 */
export function formatClasses(
  base: string,
  conditions: Record<string, boolean>
): string {
  const extraClasses = Object.entries(conditions)
    .filter(([_, condition]) => condition)
    .map(([className]) => className)
    .join(' ');
  return cn(base, extraClasses);
}

// ==========================================
// Date & Time Utilities
// ==========================================

/**
 * Format date to readable string
 */
export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(date);
}

/**
 * Format date to short string (e.g., "Jan 1, 2024")
 */
export function formatDateShort(date: Date): string {
  return formatDate(date, { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Format date to time string
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

/**
 * Calculate date range in days
 */
export function getDaysInRange(start: Date, end: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const diff = end.getTime() - start.getTime();
  return Math.round(diff / oneDay);
}

/**
 * Check if date is in the past
 */
export function isDateInPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * Check if date range overlaps with another range
 */
export function isDateRangeOverlapping(
  range1: { start: Date; end: Date },
  range2: { start: Date; end: Date }
): boolean {
  return range1.start < range2.end && range1.end > range2.start;
}

/**
 * Generate disabled dates (past dates + specific dates)
 */
export function generateDisabledDates(excludedDates: Date[] = []): Date | { before: Date } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (excludedDates.length === 0) {
    return { before: today };
  }

  // Merge excluded dates with past dates
  const allExcluded = [...excludedDates.map(d => new Date(d)), today];
  return { before: new Date(Math.min(...allExcluded.map(d => d.getTime()))) };
}

// ==========================================
// Number & Currency Utilities
// ==========================================

/**
 * Format number with locale-specific separators
 */
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat('en-US', options).format(value);
}

/**
 * Format price with currency symbol
 */
export function formatPrice(
  amount: number,
  currency: { code: string; symbol: string },
  options?: Intl.NumberFormatOptions
): string {
  const formatted = formatNumber(amount, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  });
  return `${currency.symbol}${formatted}`;
}

/**
 * Convert SGD to another currency
 */
export function convertCurrency(
  amountSGD: number,
  rate: number,
  decimalPlaces = 2
): number {
  return Number((amountSGD * rate).toFixed(decimalPlaces));
}

/**
 * Generate price range string
 */
export function formatPriceRange(
  min: number,
  max: number,
  currency: { code: string; symbol: string }
): string {
  if (min === max) {
    return formatPrice(min, currency);
  }
  return `${formatPrice(min, currency)} - ${formatPrice(max, currency)}`;
}

// ==========================================
// String Utilities
// ==========================================

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Generate slug from string
 */
export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate string with ellipsis
 */
export function truncate(
  str: string,
  maxLength: number,
  ellipsis = '...'
): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Generate random ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 15)}`;
}

// ==========================================
// Array Utilities
// ==========================================

/**
 * Group array by key
 */
export function groupBy<T>(
  array: T[],
  key: keyof T | ((item: T) => string)
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : (item[key] as string);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) return [];
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

/**
 * Shuffle array
 */
export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: TimeoutId | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ==========================================
// Object Utilities
// ==========================================

/**
 * Deep merge objects
 */
export function deepMerge<T extends object, U extends object>(
  target: T,
  source: U
): T & U {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (key in target && isObject(target[key])) {
          (output as any)[key] = deepMerge(target[key], source[key]);
        } else {
          (output as any)[key] = source[key];
        }
      } else {
        (output as any)[key] = source[key];
      }
    });
  }
  return output;
}

/**
 * Check if value is an object
 */
export function isObject(item: unknown): item is Record<string, unknown> {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Safely get nested object value
 */
export function getNestedValue<T>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T | undefined {
  return path
    .split('.')
    .reduce((current, key) => (current as Record<string, unknown>)?.[key], obj) as T | undefined;
}

// ==========================================
// Validation Utilities
// ==========================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (international format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-]{10,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate date string (ISO format)
 */
export function isValidDateString(dateStr: string): boolean {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

// ==========================================
// DOM & Browser Utilities
// ==========================================

/**
 * Check if running in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get element by ID safely
 */
export function safeGetElementById<T extends HTMLElement>(id: string): T | null {
  return isBrowser() ? document.getElementById(id) as T : null;
}

/**
 * Scroll to element
 */
export function scrollToElement(
  id: string,
  options?: ScrollIntoViewOptions
): void {
  if (isBrowser()) {
    const element = safeGetElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', ...options });
    }
  }
}

/**
 * Scroll to top with smooth animation
 */
export function scrollToTop(): void {
  if (isBrowser()) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Get viewport dimensions
 */
export function getViewport(): { width: number; height: number } {
  if (!isBrowser()) {
    return { width: 0, height: 0 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

// ==========================================
// Storage Utilities
// ==========================================

/**
 * Get item from localStorage
 */
export function getLocalStorage<T>(key: string): T | null {
  if (!isBrowser()) return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

/**
 * Set item in localStorage
 */
export function setLocalStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore errors
  }
}

/**
 * Remove item from localStorage
 */
export function removeLocalStorage(key: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
}

/**
 * Clear all localStorage
 */
export function clearLocalStorage(): void {
  if (!isBrowser()) return;
  try {
    localStorage.clear();
  } catch {
    // Ignore errors
  }
}

// ==========================================
// Clipboard Utilities
// ==========================================

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isBrowser()) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

// ==========================================
// Animation Utilities
// ==========================================

/**
 * Get animation duration from CSS variable
 */
export function getAnimationDuration(element: HTMLElement): number {
  const style = window.getComputedStyle(element);
  const duration = style.getPropertyValue('transition-duration');
  return parseFloat(duration) * 1000 || 0;
}

/**
 * Wait for animation to complete
 */
export function waitForAnimation(
  element: HTMLElement,
  timeout = 5000
): Promise<void> {
  return new Promise((resolve, reject) => {
    const duration = getAnimationDuration(element);
    if (duration === 0) {
      resolve();
      return;
    }
    setTimeout(resolve, Math.min(duration, timeout));
  });
}

// ==========================================
// File Export
// ==========================================

export * from './types';
