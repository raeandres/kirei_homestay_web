import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RatingStars } from "../../components/ui/rating-stars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reviews = [
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
    name: "Jannice",
    avatar: "https://placehold.co/100x102.png?text=J", // unique URL
    avatarHint: "person avatar",
    rating: 5,
    review:
      "Beautiful home with stunning view. It has everything we need and more. We will definitely come back. Thank you Siri ❤️",
    date: "May 2025",
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl text-center font-light mb-8 font-zen-old-mincho">
          e x p e r i e n c e s
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
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
        </div>
      </div>
    </section>
  );
}
