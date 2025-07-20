// ui/AdaptiveCard.tsx
"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";

// Types
interface CardAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

type CardVariant = "default" | "compact" | "wide" | "square";
type ScreenSize = "mobile" | "tablet" | "desktop";

interface AdaptiveCardProps {
  title?: string;
  rating?: string;
  description?: string;
  date?: string;
  image?: string;
  imageAlt?: string;
  actions?: CardAction[];
  variant?: CardVariant;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  loading?: boolean;
}

interface AdaptiveCardGridProps {
  children: ReactNode;
  className?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    xl?: number;
  };
}

const AdaptiveCard: React.FC<AdaptiveCardProps> = ({
  title,
  rating,
  description,
  date,
  image,
  imageAlt = "",
  actions = [],
  variant = "default",
  className = "",
  onClick,
  children,
  loading = false,
}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("desktop");
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth < 640) setScreenSize("mobile");
      else if (window.innerWidth < 1024) setScreenSize("tablet");
      else setScreenSize("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCardClasses = (): string => {
    const baseClasses =
      "bg-white rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg";
    const variantClasses: Record<CardVariant, string> = {
      default: "max-w-sm sm:max-w-md lg:max-w-lg",
      compact: "max-w-xs sm:max-w-sm lg:max-w-md",
      wide: "w-full max-w-4xl",
      square: "aspect-square max-w-sm",
    };

    const interactiveClasses = onClick
      ? "cursor-pointer hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:outline-none"
      : "";

    return `${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`;
  };

  const getContentClasses = (): string => {
    const spacing: Record<ScreenSize, string> = {
      mobile: "p-4",
      tablet: "p-6",
      desktop: "p-8",
    };

    return spacing[screenSize] || spacing.desktop;
  };

  const getLayoutClasses = (): string => {
    if (!image || imageError) return "flex flex-col";

    // Layout changes based on screen size and content
    if (screenSize === "mobile") return "flex flex-col space-y-3";
    if (variant === "wide") return "flex flex-row space-x-6";
    return "flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0";
  };

  const getTitleClasses = (): string => {
    const sizes: Record<ScreenSize, string> = {
      mobile: "text-lg",
      tablet: "text-xl",
      desktop: "text-2xl",
    };

    return `font-bold font-playfair-display text-stormy-blue-900 mb-2 ${
      sizes[screenSize]
    } ${variant === "compact" ? "line-clamp-1" : "line-clamp-2"}`;
  };

  const getDescriptionClasses = (): string => {
    const sizes: Record<ScreenSize, string> = {
      mobile: "text-sm",
      tablet: "text-base",
      desktop: "text-base",
    };

    return ` text-stormy-blue-600 mb-4 ${sizes[screenSize]} ${
      variant === "compact" ? "line-clamp-2" : "line-clamp-3"
    }`;
  };

  const getImageClasses = (): string => {
    if (variant === "wide") {
      return "w-48 h-48 flex-shrink-0";
    }

    if (screenSize === "mobile") {
      return "w-full h-48";
    }

    return "w-full sm:w-32 md:w-40 h-48 sm:h-32 md:h-40 flex-shrink-0";
  };

  const getActionButtonClasses = (action: CardAction): string => {
    const baseClasses =
      "px-4 py-2 text-sm font-medium rounded-md transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none";

    const variantClasses: Record<string, string> = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      secondary:
        "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
    };

    const sizeClasses =
      screenSize === "mobile" ? "w-full" : "flex-1 sm:flex-initial";
    const disabledClasses = action.disabled
      ? "opacity-50 cursor-not-allowed"
      : "";

    return `${baseClasses} ${
      variantClasses[action.variant || "secondary"]
    } ${sizeClasses} ${disabledClasses}`;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };

  const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse">
      {image && (
        <div className={`bg-gray-300 rounded-md mb-4 ${getImageClasses()}`} />
      )}
      <div className="h-4 bg-gray-300 rounded mb-2" />
      <div className="h-3 bg-gray-300 rounded mb-4 w-3/4" />
      {actions.length > 0 && (
        <div className="flex gap-2">
          {actions.map((_, index) => (
            <div key={index} className="h-8 bg-gray-300 rounded flex-1" />
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className={getCardClasses()}>
        <div className={getContentClasses()}>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div
      className={getCardClasses()}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : "article"}
      tabIndex={onClick ? 0 : undefined}
      aria-label={
        onClick ? `Click to interact with ${title || "card"}` : undefined
      }
    >
      <div className={getContentClasses()}>
        <div className={getLayoutClasses()}>
          {image && !imageError && (
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={image}
                alt={imageAlt}
                width={200}
                height={200}
                className={`object-cover transition-opacity duration-300 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                } ${getImageClasses()}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
              {imageLoading && (
                <div
                  className={`absolute inset-0 bg-gray-200 animate-pulse ${getImageClasses()}`}
                />
              )}
            </div>
          )}

          <div className="flex flex-col flex-grow min-w-0">
            {title && <h3 className={getTitleClasses()}>{title}</h3>}

            {description && (
              <p className={getDescriptionClasses()}>{description}</p>
            )}

            {children && <div className="mb-4 flex-grow">{children}</div>}

            {actions.length > 0 && (
              <div
                className={`flex gap-2 mt-auto ${
                  screenSize === "mobile" ? "flex-col" : "flex-row flex-wrap"
                }`}
              >
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!action.disabled) {
                        action.onClick();
                      }
                    }}
                    disabled={action.disabled}
                    className={getActionButtonClasses(action)}
                    aria-label={action.label}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Adaptive Card Grid Component
export const AdaptiveCardGrid: React.FC<AdaptiveCardGridProps> = ({
  children,
  className = "",
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    xl: 4,
  },
}) => {
  const gridClasses = `grid gap-6 grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop} xl:grid-cols-${columns.xl}`;

  return <div className={`${gridClasses} ${className}`}>{children}</div>;
};

export default AdaptiveCard;

// Export types for external use
export type {
  AdaptiveCardProps,
  CardAction,
  CardVariant,
  AdaptiveCardGridProps,
};

// Example usage component (can be in a separate file)
/*
// pages/example.tsx or app/example/page.tsx
import AdaptiveCard, { AdaptiveCardGrid, CardAction } from '../ui/AdaptiveCard';

const ExamplePage: React.FC = () => {
  const handleCardClick = (id: number): void => {
    console.log(`Card ${id} clicked`);
  };

  const sampleActions: CardAction[] = [
    { 
      label: "View", 
      onClick: () => console.log("View clicked"), 
      variant: "primary" 
    },
    { 
      label: "Edit", 
      onClick: () => console.log("Edit clicked"),
      variant: "secondary"
    },
    { 
      label: "Delete", 
      onClick: () => console.log("Delete clicked"), 
      variant: "danger",
      disabled: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Adaptive Card Components
        </h1>
        
        <AdaptiveCardGrid>
          <AdaptiveCard
            title="Sample Card"
            description="This is a sample description for the adaptive card component."
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
            imageAlt="Sample image"
            actions={sampleActions}
            onClick={() => handleCardClick(1)}
          />
          
          <AdaptiveCard
            title="Loading Card"
            loading={true}
          />
          
          <AdaptiveCard
            title="Custom Content Card"
            description="This card has custom children content."
            actions={[
              { label: "Action", onClick: () => {}, variant: "primary" }
            ]}
          >
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-blue-800 text-sm">Custom content area</p>
            </div>
          </AdaptiveCard>
        </AdaptiveCardGrid>
      </div>
    </div>
  );
};

export default ExamplePage;
*/
