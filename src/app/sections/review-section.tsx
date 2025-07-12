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

const reviews = [
  // {
  //   name: "Hazel",
  //   avatar: "https://placehold.co/100x102.png?text=H", // unique URL
  //   avatarHint: "person avatar",
  //   rating: 5,
  //   review:
  //     "I've had the pleasure of staying in numerous Airbnbs across countries, but Siri’s been one of the most helpful, warm, and accommodating host I've ever encountered. Our experience with Siri was exceptional from the get go.We had to evacuate during typhoon Carina, and we were fortunate to find her listing available. Despite our last-minute request, she was quick to confirm our stay, making the stressful situation much more manageableThe check-in process was seamless, and our stay was nothing short of amazing. Truly, our home away from home! Our 1-year-old mini poodle, Ragnar, surely enjoyed the plushies provided. Despite bringing his own toys, he quickly found new favorites among the ones Siri had prepared.Siri's hospitality made our stay memorable. If only we could have stayed longer! We highly recommend her place – a thousand percent. 🩶",
  //   date: "July 2024",
  // },
  {
    name: "Nicole",
    avatar: "https://placehold.co/100x102.png?text=N", // unique URL
    avatarHint: "person avatar",
    rating: 5,
    review:
      "The place was immaculate! Just like in the photos. Was my most comfortable stay. I realized I left my Anker charger in the bnb the day after I checked out and it was delivered as soon as the next guest had checked out. Very thankful for that! I will most definitely be back here!",
    date: "February 2025",
  },
  {
    name: "Sanaya Michelle",
    avatar: "https://placehold.co/100x102.png?text=SM", // unique URL
    avatarHint: "person avatar",
    rating: 5,
    review:
      "This is my go-to place whenever I'm in Quezon City. It's always clean, smells great, and is even more beautiful in person. The location in Eastwood is perfect—great restaurants and everything I need are just around the corner! Siri is incredibly friendly and always goes out of her way to make sure I'm well taken care of. Highly recommended!",
    date: "March 2025",
  },
  // {
  //   name: "Karen",
  //   avatar: "https://placehold.co/100x102.png?text=K", // unique URL
  //   avatarHint: "person avatar",
  //   rating: 5,
  //   review:
  //     "Had a perfect weekend at Kirei House — a relaxing haven right in the heart of the city. I loved the aesthetic and thoughtful design. Check-in was seamless, and the place had everything we needed — from toothbrushes and slippers to a hairdryer and even a steam iron.Siri and Toti are fantastic hosts — super responsive and know the good restaurants and cafes nearby if you're not sure where to go. Staying in was hard to resist tho, so we decided to cook on our 2nd day instead of eating out. To our surprise, the kitchen had everything we needed too. We didn’t get a chance to use the building amenities, but the pool looked great, and there was a parking space available as well.I guess the only downside is that I don’t actually live here lol. Will definitely book again and recommend this place to family and friends.Thank you, Kirei House!",
  //   date: "May 2025",
  // },
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
  {
    name: "Marie",
    avatar: "https://placehold.co/100x102.png?text=M", // unique URL
    avatarHint: "person avatar",
    rating: 5,
    review:
      "Really enjoyed our stay here! The host was very responsive and helpful, and the place was super clean. The location was extremely convenient—just a short trip to all our appointments. Would totally book again!",
    date: "June 2025",
  },
  {
    name: "Marione Yolene",
    avatar: "https://placehold.co/100x102.png?text=MY", // unique URL
    avatarHint: "person avatar",
    rating: 5,
    review:
      "The place really deserves the title of Muji House with its minimalistic yet elegant design with the right touch of Japanese elements. It really felt like home that even my 2 pets, Moonshine and Sunbeam, felt at home the moment we got there. Also, there are many great restaurants and convenience stores around the area which made our stay hassle-free. Perfect for a staycation with loved ones (furbabies included) 💖",
    date: "June 2025",
  },
];

export function ReviewsSection() {
  const { isMobile } = useDevice();
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for swipe gestures
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const itemsPerView = isMobile ? 1 : 2;
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
    <section id="reviews" className="py-0 md:py-0 bg-secondary/30">
      <div
        className={
          isMobile
            ? "container max-w-6xl mx-auto px-4"
            : "container max-w-6xl mx-auto"
        }
      >
        <h2
          className={
            isMobile
              ? "text-lg md:text-xl text-left text-justify-left font-headline tracking-wide mb-8"
              : "text-lg md:text-xl text-center text-justify-center font-headline tracking-wide mb-8"
          }
        >
          EXPERIENCES
        </h2>
        <div className="relative w-full max-w-3xl mx-auto">
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
                  className="w-full md:w-1/2 flex-shrink-0 p-2"
                >
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
                        <CardTitle className="text-lg font-semibold tracking-tight leading-relaxed">
                          {review.name}
                        </CardTitle>
                        <RatingStars rating={review.rating} />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm md:text-sm lg:text-sm text-center text-gray-600 font-normal tracking-tight leading-relaxed">
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
        </div>
      </div>
    </section>
  );
}
