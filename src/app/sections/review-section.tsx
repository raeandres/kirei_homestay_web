"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/card";
import { RatingStars } from "@/app/ui/rating-stars";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/ui/button";

import { useDevice } from "@/hooks/use-device";
import AdaptiveCard from "../ui/AdaptiveCard";
import { ReviewsCollection } from "../data/local/reviews-collection";


export function ReviewsSection() {
  const { isMobile } = useDevice();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);
  const reviews = ReviewsCollection.reviews;

  // State for swipe gestures
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Responsive items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 2560) {
        // 4K resolution
        setItemsPerView(5);
      } else if (width >= 1440) {
        // 1440p resolution
        setItemsPerView(3);
      } else if (width >= 768) {
        // Desktop/tablet
        setItemsPerView(2);
      } else {
        // Mobile
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);
  // Calculate the last possible index for the carousel to start from.
  // This ensures the carousel doesn't show empty space at the end.
  const lastIndex =
    reviews.length > itemsPerView ? reviews.length - itemsPerView : 0;

  const showNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= lastIndex ? 0 : prevIndex + 1
    );
  }, [lastIndex]);

  const showPrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? lastIndex : prevIndex - 1
    );
  }, [lastIndex]);

  // Handlers for swipe gestures
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null); // Reset on new touch
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;

    if (distance > minSwipeDistance) {
      showNext();
    } else if (distance < -minSwipeDistance) {
      showPrev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  useEffect(() => {
    const timer = setTimeout(showNext, 5000); // Autoplay every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, showNext]);

  // On desktop, each item is 50% width, so we slide by 50%. On mobile, 100%.
  const slidePercentage = 100 / itemsPerView;

  return (
    <section id="reviews" className="mb-16 md:mb-16 bg-background">
      <div className="container max-w-6xl 2k:max-w-full 4k:max-w-full mx-auto px-4 2k:px-16 4k:px-24">
        <h2
          className="text-2xl md:text-lg lg:text-xl 2k:text-4xl 4k:text-7xl text-stormy-blue/80 font-playfair-display"
          style={{
            letterSpacing: "0.01em",
            fontWeight: "500",
          }}
        >
          Experiences
        </h2>
        <div className="border-t border-gray-200 my-6" />
        <div className="container max-w-6xl 2k:max-w-full 4k:max-w-full mx-auto px-4 2k:px-16 4k:px-24">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * slidePercentage}%)`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className={`flex-shrink-0 p-2 ${
                    itemsPerView === 1
                      ? "w-full"
                      : itemsPerView === 2
                      ? "w-1/2"
                      : itemsPerView === 3
                      ? "w-1/3"
                      : itemsPerView === 3
                      ? "w-1/5"
                      : "w-1/2"
                  }`}
                >
                  <Card className="flex flex-col duration-400 min-h-[22rem] md:min-h-[18rem] rounded-none">
                    <CardHeader className="flex flex-row items-left space-x-4 pb-4">
                      <div>
                        <CardTitle
                          className="text-xl text-luxury-light text-stormy-blue/80 tracking-normal leading-relaxed font-title"
                          style={{
                            lineHeight: "2",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {review.name}
                        </CardTitle>
                        <RatingStars
                          className="text-gray-300 h-1 w-1"
                          rating={review.rating}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p
                        className="text-sm md:text-sm lg:text-sm xl:text-base 2k:text-sm 4k:text-xl text-left text-stormy-blue/60 font-playfair-display font-normal leading-relaxed"
                        style={
                          isMobile
                            ? {
                                lineHeight: "1.4",
                                letterSpacing: "0.04em",
                                fontWeight: "100",
                                // fontSize: "0.8rem",
                              }
                            : {
                                lineHeight: "1.5",
                                letterSpacing: "0.01em",
                                fontWeight: "100",
                              }
                        }
                      >
                        "{review.review}"
                      </p>
                    </CardContent>
                    <CardFooter>
                      <p
                        className="text-sm md:text-sm lg:text-sm xl:text-sm 2k:text-sm 4k:text-xl text-left text-stormy-blue/60 font-normal font-playfair-display leading-relaxed"
                        style={{
                          lineHeight: "1.5",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {review.date}
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={showPrev}
            aria-label="Previous review"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-[2] p-2 bg-background/50 text-foreground hidden md:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            onClick={showNext}
            aria-label="Next review"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-[2] p-2 bg-background/50 text-foreground hidden md:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
