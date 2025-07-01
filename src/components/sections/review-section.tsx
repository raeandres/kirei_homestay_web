"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RatingStars } from "@/components/ui/rating-stars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const reviews = [
  {
    name: "Jannice",
    avatar: "https://placehold.co/100x102.png?text=J", // unique URL
    avatarHint: "person avatar",
    rating: 5,
    review:
      "Beautiful home with stunning view. It has everything we need and more. We will definitely come back. Thank you Siri ❤️",
    date: "May 2025",
  },
  {
    name: "Angel",
    avatar: "https://placehold.co/100x100.png?text=A",
    avatarHint: "person avatar",
    rating: 5,
    review:
      "We held my bridal shower here and had a wonderful time! The place was clean, and the interior had such a relaxing vibe. It had everything we needed from utensils and toiletries to laundry essentials. If we ever have errands in QC again, we’d definitely book this place. As a bonus, the host was very responsive and accommodating to our requests!",
    date: "May 2025",
  },
  {
    name: "Miguel",
    avatar: "https://placehold.co/100x101.png?text=M", // unique URL
    avatarHint: "person avatar",
    rating: 5,
    review:
      "Siri’s place is hands-down the nicest Airbnb I’ve stayed in. It’s spotless, tastefully designed, and stocked with everything you’d need. Siri was super responsive and made the whole stay effortless.",
    date: "June 2025",
  },
  // {
  //   name: "Marie",
  //   avatar: "https://placehold.co/100x102.png?text=M", // unique URL
  //   avatarHint: "person avatar",
  //   rating: 5,
  //   review:
  //     "Really enjoyed our stay here! The host was very responsive and helpful, and the place was super clean. The location was extremely convenient—just a short trip to all our appointments. Would totally book again!",
  //   date: "June 2025",
  // },
];

export function ReviewsSection() {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  }, []);

  const showPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  const goToReview = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(showNext, 5000); // Autoplay every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, showNext]);

  return (
<<<<<<< Updated upstream
    <section id="reviews" className="py-16 md:py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center font-headline mb-8 ">
=======
    <section
      id="reviews"
      className={
        isMobile
          ? "py-16 md:py-24 bg-secondary/30"
          : "py-8 md:py-24 bg-secondary/30"
      }
    >
      <div
        className={
          isMobile
            ? "container max-w-6xl mx-auto px-4"
            : "container max-w-6xl mx-auto"
        }
      >
        <h2 className="text-xl md:text-2xl text-left px-4 font-headline mb-8">
>>>>>>> Stashed changes
          Experiences
        </h2>
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
<<<<<<< Updated upstream
              <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                <Avatar>
                  <AvatarImage
                    src={review.avatar}
                    alt={review.name}
                    data-ai-hint={review.avatarHint}
                  />
                  <AvatarFallback>
                    {review.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-headline">
                    {review.name}
                  </CardTitle>
                  <RatingStars rating={review.rating} />
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground/80 italic">"{review.review}"</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </CardFooter>
            </Card>
          ))}
=======
              {reviews.map((review) => (
                <div key={review.name} className="w-full flex-shrink-0 p-1">
                  <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[22rem] md:min-h-[18rem]">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                      <Avatar>
                        <AvatarImage
                          src={review.avatar}
                          alt={review.name}
                          data-ai-hint={review.avatarHint}
                        />
                        <AvatarFallback>
                          {review.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg font-headline">
                          {review.name}
                        </CardTitle>
                        <RatingStars rating={review.rating} />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-foreground/80 italic">
                        "{review.review}"
                      </p>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-muted-foreground">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-[2] p-2 rounded-full bg-background/50 text-foreground hover:bg-background/75 hidden md:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            onClick={showNext}
            aria-label="Next review"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-[2] p-2 rounded-full bg-background/50 text-foreground hover:bg-background/75 hidden md:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center space-x-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                aria-label={`Go to review ${index + 1}`}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  currentIndex === index
                    ? "bg-primary"
                    : "bg-muted-foreground/50 hover:bg-muted-foreground"
                )}
              />
            ))}
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </section>
  );
}
