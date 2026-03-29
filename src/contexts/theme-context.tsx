/**
 * Theme Context - Manages light/dark mode and design tokens
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

// ==========================================
// Theme Types
// ==========================================

export type Theme = 'light' | 'dark';
export type FontSize = 'sm' | 'base' | 'lg' | 'xl';
export type ColorScheme = 'default' | 'warm' | 'cool' | 'earthy';

export interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  fontSize: FontSize;
  isReducedMotion: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setFontSize: (size: FontSize) => void;
  toggleReducedMotion: () => void;
}

// ==========================================
// Default Theme Configuration
// ==========================================

export const DEFAULT_THEME: Theme = 'light';
export const DEFAULT_COLOR_SCHEME: ColorScheme = 'default';
export const DEFAULT_FONT_SIZE: FontSize = 'base';

// ==========================================
// Theme Provider Component
// ==========================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Theme state
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(DEFAULT_COLOR_SCHEME);
  const [fontSize, setFontSize] = useState<FontSize>(DEFAULT_FONT_SIZE);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    setIsHydrated(true);

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
    }

    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsReducedMotion(true);
    }

    // Load saved preferences from localStorage
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        setThemeState(savedTheme as Theme);
      }

      const savedColorScheme = localStorage.getItem('colorScheme');
      if (savedColorScheme && ['default', 'warm', 'cool', 'earthy'].includes(savedColorScheme)) {
        setColorScheme(savedColorScheme as ColorScheme);
      }

      const savedFontSize = localStorage.getItem('fontSize');
      if (savedFontSize && ['sm', 'base', 'lg', 'xl'].includes(savedFontSize)) {
        setFontSize(savedFontSize as FontSize);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem('theme', theme);
      localStorage.setItem('colorScheme', colorScheme);
      localStorage.setItem('fontSize', fontSize);
    } catch {
      // Ignore localStorage errors
    }
  }, [theme, colorScheme, fontSize, isHydrated]);

  // Apply theme class to document
  useEffect(() => {
    if (!isHydrated) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Set data-theme attribute for CSS targeting
    root.setAttribute('data-theme', theme);
  }, [theme, isHydrated]);

  // Theme actions
  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    setColorScheme(scheme);
    // This would update CSS variables based on scheme
  }, []);

  const setFontSize = useCallback((size: FontSize) => {
    setFontSize(size);
    // Update root font size
    const root = window.document.documentElement;
    const sizes = { sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem' };
    root.style.fontSize = sizes[size];
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setIsReducedMotion(prev => !prev);
  }, []);

  // Don't render until hydrated to prevent mismatch
  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        fontSize,
        isReducedMotion,
        toggleTheme,
        setTheme,
        setColorScheme,
        setFontSize,
        toggleReducedMotion,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// ==========================================
// Theme Hooks
// ==========================================

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Default values for when context is not available
    return {
      theme: DEFAULT_THEME,
      colorScheme: DEFAULT_COLOR_SCHEME,
      fontSize: DEFAULT_FONT_SIZE,
      isReducedMotion: false,
      toggleTheme: () => {},
      setTheme: () => {},
      setColorScheme: () => {},
      setFontSize: () => {},
      toggleReducedMotion: () => {},
    };
  }
  return context;
}

// ==========================================
// Font Size Helper Hook
// ==========================================

export function useFontSize() {
  const { fontSize, setFontSize } = useTheme();

  const fontSizeClass = `text-${fontSize === 'sm' ? 'sm' : fontSize === 'lg' ? 'lg' : fontSize === 'xl' ? 'xl' : 'base'}`;

  return { fontSize, setFontSize, fontSizeClass };
}

// ==========================================
// Theme Styles Helper
// ==========================================

export function getThemeStyles(theme: Theme) {
  return {
    background: theme === 'dark' ? 'bg-background-dark' : 'bg-background',
    foreground: theme === 'dark' ? 'text-foreground-dark' : 'text-foreground',
    card: theme === 'dark' ? 'bg-card-dark' : 'bg-card',
    border: theme === 'dark' ? 'border-border-dark' : 'border-border',
  };
}
