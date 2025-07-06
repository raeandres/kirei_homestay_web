// Currency configuration and utilities
import { useState } from 'react';

export interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number; // Rate from SGD base
}

export const currencyMap: Record<string, CurrencyInfo> = {
  SG: { code: 'SGD', symbol: '$', rate: 1 },
  US: { code: 'USD', symbol: '$', rate: 0.74 },
  GB: { code: 'GBP', symbol: '£', rate: 0.58 },
  EU: { code: 'EUR', symbol: '€', rate: 0.68 },
  JP: { code: 'JPY', symbol: '¥', rate: 110 },
  AU: { code: 'AUD', symbol: 'A$', rate: 1.12 },
  CA: { code: 'CAD', symbol: 'C$', rate: 1.01 },
  PH: { code: 'PHP', symbol: '₱', rate: 42 },
  MY: { code: 'MYR', symbol: 'RM', rate: 3.15 },
  TH: { code: 'THB', symbol: '฿', rate: 26 },
  ID: { code: 'IDR', symbol: 'Rp', rate: 11200 },
  VN: { code: 'VND', symbol: '₫', rate: 18500 },
  // European countries that use EUR
  DE: { code: 'EUR', symbol: '€', rate: 0.68 }, // Germany
  FR: { code: 'EUR', symbol: '€', rate: 0.68 }, // France
  IT: { code: 'EUR', symbol: '€', rate: 0.68 }, // Italy
  ES: { code: 'EUR', symbol: '€', rate: 0.68 }, // Spain
  NL: { code: 'EUR', symbol: '€', rate: 0.68 }, // Netherlands
  // Default fallback
  DEFAULT: { code: 'SGD', symbol: '$', rate: 1 }
};

/**
 * Detects the user's currency based on their IP geolocation
 * @returns Promise<CurrencyInfo> - The detected currency information
 */
export const detectUserCurrency = async (): Promise<CurrencyInfo> => {
  try {
    // Try to get user's country from IP geolocation
    const response = await fetch('https://ipapi.co/json/');
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    
    if (data.country_code) {
      const countryCode = data.country_code.toUpperCase();
      const currency = currencyMap[countryCode] || currencyMap.DEFAULT;
      return currency;
    } else {
      return currencyMap.DEFAULT;
    }
  } catch (error) {
    console.log('Could not detect location, using default currency:', error);
    return currencyMap.DEFAULT;
  }
};

/**
 * Formats a price with the given currency information
 * @param basePriceSGD - The base price in SGD
 * @param currency - The currency information to format with
 * @returns string - The formatted price string
 */
export const formatPrice = (basePriceSGD: number, currency: CurrencyInfo): string => {
  const convertedPrice = basePriceSGD * currency.rate;
  
  // Format based on currency
  if (currency.code === 'JPY' || currency.code === 'IDR' || currency.code === 'VND') {
    // No decimal places for these currencies
    return `${currency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
  } else {
    // Two decimal places for other currencies
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  }
};

/**
 * Gets the currency information for a specific country code
 * @param countryCode - The ISO country code (e.g., 'US', 'GB', 'JP')
 * @returns CurrencyInfo - The currency information for that country
 */
export const getCurrencyByCountry = (countryCode: string): CurrencyInfo => {
  const upperCountryCode = countryCode.toUpperCase();
  return currencyMap[upperCountryCode] || currencyMap.DEFAULT;
};

/**
 * Hook for managing currency state in React components
 * @returns Object with currency state and utilities
 */
export const useCurrency = () => {
  const [userCurrency, setUserCurrency] = useState<CurrencyInfo>(currencyMap.DEFAULT);
  const [isLoadingCurrency, setIsLoadingCurrency] = useState(true);

  const initializeCurrency = async () => {
    try {
      setIsLoadingCurrency(true);
      const currency = await detectUserCurrency();
      setUserCurrency(currency);
    } catch (error) {
      console.error('Error initializing currency:', error);
      setUserCurrency(currencyMap.DEFAULT);
    } finally {
      setIsLoadingCurrency(false);
    }
  };

  const formatPriceWithCurrency = (basePriceSGD: number): string => {
    return formatPrice(basePriceSGD, userCurrency);
  };

  return {
    userCurrency,
    isLoadingCurrency,
    initializeCurrency,
    formatPriceWithCurrency,
    setUserCurrency, // For manual override if needed
  };
};
