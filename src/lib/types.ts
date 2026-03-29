// ==========================================
// Shared Type Definitions
// ==========================================

// ==========================================
// Booking & Reservation Types
// ==========================================

export interface BookingData {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  children: number;
  pets: number;
  totalNights: number;
  totalPrice: number;
  paymentMethod: 'card' | 'qr';
}

export interface BookingFormValues {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
  children: number;
  pets: number;
}

export interface RoomAvailability {
  roomName: string;
  isAvailable: boolean;
  calendarSource: string;
}

export interface CalendarRange {
  from: Date | undefined;
  to: Date | undefined;
}

// ==========================================
// Property & Room Types
// ==========================================

export interface PropertyCardContent {
  location: string;
  guests: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  basePriceSGD: number;
  reviews: string;
  stars: number;
}

export interface PropertyGalleryContent {
  teaserDescription1: string;
  teaserDescription2: string;
  propertyDetailsTitle: string;
  propertyDescription: string;
  spaceDescription: string;
  guestsPreferenceList: string[];
  guestsPreferenceFooterNote: string;
  guestsAmenities: string[];
  guestsAccessSubtitle: string;
  guestsAccessList: string[];
  importantNotesList: string[];
  otherNotesDescription: string;
  amenityFeesDescription: string;
  amenityFeeItems: string[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  hint?: string;
}

export interface CalendarSource {
  platform: string;
  url: string;
}

export interface GalleryCategory {
  name: string;
  unitType: string;
  coverImage: GalleryImage;
  galleryContent: PropertyGalleryContent;
  cardContent: PropertyCardContent;
  images: GalleryImage[];
  bookingLinks: {
    airbnb: string;
    booking: string;
  };
  icsUrls: CalendarSource[];
  activeMapUrl: string;
}

// ==========================================
// Amenity Types
// ==========================================

export interface Amenity {
  name: string;
  icon: string; // Icon name for dynamic rendering
  category?: string;
}

export interface AmenityCategory {
  title: string;
  amenities: Amenity[];
}

export interface AmenityCollection {
  amenityCategories: AmenityCategory[];
}

// ==========================================
// Contact Form Types
// ==========================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// ==========================================
// User/Device Types
// ==========================================

export interface UserLocation {
  country: string;
  countryCode: string;
  city?: string;
}

export interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
}

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
}

// ==========================================
// Toast Notification Types
// ==========================================

export type ToastVariant = 'default' | 'destructive' | 'success' | 'info';

export interface ToastMessage {
  id: string;
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
}

export interface ToastAction {
  label: string;
  onClick: () => void;
}

// ==========================================
// Navigation Types
// ==========================================

export interface NavItem {
  name: string;
  href: string;
  label?: string;
  external?: boolean;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  ariaLabel?: string;
}

// ==========================================
// API Response Types
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface BookingDateRangeStrings {
  from: string;
  to: string;
}

// ==========================================
// SEO & Metadata Types
// ==========================================

export interface MetaImageData {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
}

export interface SeoData {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  url?: string;
  image?: MetaImageData;
  ogType?: 'website' | 'article' | 'product';
}

// ==========================================
// Form Types
// ==========================================

export type FormFieldError = {
  message: string;
  path: string[];
};

export type FormErrors<T> = {
  [K in keyof T]?: string | FormFieldError;
};

// ==========================================
// Event Handler Types
// ==========================================

export type EventHandler<T = Event> = (event: T) => void;

export type ChangeEventHandler<T = Event> = (event: T) => void;

export type ClickEventHandler = (event: React.MouseEvent) => void;

export type KeyboardEventHandler = (event: React.KeyboardEvent) => void;

export type TouchEventHandler = (event: React.TouchEvent) => void;

// ==========================================
// Utility Types
// ==========================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Merge<First, Second> = {
  [K in keyof First]: K extends keyof Second ? Second[K] : First[K];
} & Second;

export type RequiredDeep<T> = {
  [K in keyof T]-?: T[K] extends object ? RequiredDeep<T[K]> : T[K];
};

export type TimeoutId = ReturnType<typeof setTimeout>;

// ==========================================
// Image Collection Types
// ==========================================

export interface ImageCollection {
  landscapeImages: GalleryImage[];
  portraitImages: GalleryImage[];
}

export interface AmenitiesCollection {
  amenityCategories: AmenityCategory[];
}

export interface GalleryCollection {
  galleryItems: GalleryCategory[];
}

// ==========================================
// Booking Hook Return Types
// ==========================================

export interface UseBookingReturn {
  dateRange: CalendarRange;
  setRange: (range: CalendarRange) => void;
  guests: number;
  children: number;
  pets: number;
  setGuests: (count: number) => void;
  setChildren: (count: number) => void;
  setPets: (count: number) => void;
  totalPrice: number;
  totalNights: number;
  calculatePrice: (basePrice: number) => number;
  isBookingValid: boolean;
  clearBooking: () => void;
}

// ==========================================
// File Export
// ==========================================

export * from './types';
