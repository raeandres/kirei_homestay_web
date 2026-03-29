/**
 * Enhanced Footer Component
 */

import Link from 'next/link';
import {
  Instagram,
  Facebook,
  MessageSquare,
  Film,
  HomeIcon,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Social links configuration
const socialLinks = [
  {
    name: 'Airbnb',
    href: 'https://www.airbnb.com.sg/rooms/1364997919482714933?guests=1&adults=4&pets=2&s=67&unique_share_id=0d245e15-131c-48e4-bd7a-200c585b4fcc',
    icon: HomeIcon,
    ariaLabel: 'Visit our Airbnb listing',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61558711286570',
    icon: Facebook,
    ariaLabel: 'Visit our Facebook page',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/kireihouse.ph',
    icon: Instagram,
    ariaLabel: 'Visit our Instagram profile',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/639175069965',
    icon: MessageSquare,
    ariaLabel: 'Contact us on WhatsApp',
  },
  {
    name: 'Email',
    href: 'mailto:info@kireihouse.ph',
    icon: Mail,
    ariaLabel: 'Email us',
  },
] as const;

// Contact information
const contactInfo = {
  phone: '+63 917 506 9965',
  email: 'info@kireihouse.ph',
  address: 'Quezon City, Philippines',
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t border-border/40 bg-background/95 py-12 transition-colors duration-300'>
      <div className='container px-10 max-w-screen-2xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <Link href='/' className='inline-block'>
              <span className='font-hina text-3xl lowercase tracking-[0.2em] text-foreground'>
                kirei
              </span>
            </Link>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              Experience slow, intentional living at Kirei House PH.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='text-sm font-semibold text-foreground uppercase tracking-wider'>
              Quick Links
            </h3>
            <ul className='space-y-2'>
              {[
                { name: 'Home', href: '/' },
                { name: 'Rooms', href: '#intro' },
                { name: 'About', href: '#about' },
                { name: 'Amenities', href: '#amenities' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2'
                  >
                    <span className='w-1.5 h-1.5 rounded-full bg-primary/50' />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h3 className='text-sm font-semibold text-foreground uppercase tracking-wider'>
              Contact Us
            </h3>
            <div className='space-y-3 text-sm text-muted-foreground'>
              <div className='flex items-center gap-3'>
                <Phone className='h-4 w-4 text-primary' />
                <a href={`tel:${contactInfo.phone}`} className='hover:text-foreground transition-colors'>
                  {contactInfo.phone}
                </a>
              </div>
              <div className='flex items-center gap-3'>
                <Mail className='h-4 w-4 text-primary' />
                <a href={`mailto:${contactInfo.email}`} className='hover:text-foreground transition-colors'>
                  {contactInfo.email}
                </a>
              </div>
              <div className='flex items-center gap-3'>
                <MapPin className='h-4 w-4 text-primary' />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className='space-y-4'>
            <h3 className='text-sm font-semibold text-foreground uppercase tracking-wider'>
              Follow Us
            </h3>
            <div className='flex flex-wrap gap-3'>
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.name === 'Facebook' ? '_blank' : undefined}
                  rel={link.name === 'Facebook' ? 'noopener noreferrer' : undefined}
                  aria-label={link.ariaLabel || `Visit ${link.name}`}
                  className='group flex items-center justify-center h-10 w-10 rounded-full border border-input bg-background transition-all duration-300 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:shadow-md'
                >
                  <link.icon className='h-5 w-5 transition-transform group-hover:scale-110 duration-300' />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-border/40 pt-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='text-sm text-muted-foreground text-center md:text-left'>
              <p>&copy; {currentYear} Kirei House PH. All rights reserved.</p>
            </div>
            <div className='flex items-center space-x-6 text-xs text-muted-foreground'>
              <Link href='#' className='hover:text-foreground transition-colors'>
                Privacy Policy
              </Link>
              <Link href='#' className='hover:text-foreground transition-colors'>
                Terms of Service
              </Link>
              <Link href='#' className='hover:text-foreground transition-colors'>
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
