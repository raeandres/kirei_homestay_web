/**
 * Enhanced Header Component
 * Navigation with responsive mobile menu
 */

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from '@/app/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';

// Navigation items
const navItems = [
  { name: 'Rooms', href: '#intro' },
  { name: 'About', href: '#about' },
  { name: 'Experiences', href: '#reviews' },
  { name: 'Amenities', href: '#amenities' },
  { name: 'Contact', href: '#contact' },
] as const;

interface HeaderProps {
  variant?: 'default' | 'glass';
}

export function Header({ variant = 'default' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  // Handle scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change (mobile)
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
    };

    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);

  // Dynamic header styles based on scroll and variant
  const headerClasses = {
    default: 'border-border/40',
    glass: 'border-white/10 bg-background/80',
  };

  const scrolledClasses = {
    default: 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm',
    glass: 'bg-transparent backdrop-blur-md shadow-none',
  };

  const containerClasses = {
    default: 'max-w-screen-2xl',
    glass: 'max-w-screen-2xl',
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? scrolledClasses[variant] : headerClasses[variant]
      }`}
    >
      <div className={`container px-4 sm:px-10 flex h-16 items-center justify-between ${containerClasses[variant]}`}>
        {/* Logo */}
        <Link href='/' className='mr-6 flex items-center space-x-2 transition-transform hover:scale-105 duration-300'>
          <span className='font-hina text-3xl lowercase leading-[0px] tracking-[0.2em] sm:inline-block text-foreground transition-colors'>
            kirei
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-6 text-xs text-stormy-blue font-medium'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='transition-all duration-300 hover:text-foreground/80 text-foreground/60 hover:underline underline-offset-4'
              title={`Go to ${item.name} section`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className='md:hidden'>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='h-10 w-10 rounded-full'>
                {isMobileMenuOpen ? (
                  <X className='h-6 w-6' aria-hidden='true' />
                ) : (
                  <Menu className='h-6 w-6' aria-hidden='true' />
                )}
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-[280px] sm:w-[320px] p-6 bg-background'
            >
              <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
              <div className='flex flex-col space-y-5 pt-6'>
                {navItems.map((item) => (
                  <SheetClose key={item.name} asChild>
                    <Link
                      href={item.href}
                      className='text-sm text-stormy-blue font-medium text-foreground/80 hover:text-foreground transition-all duration-200 hover:translate-x-1'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
