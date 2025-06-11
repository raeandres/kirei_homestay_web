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
    name: "Aiko S.",
    avatar: "https://placehold.co/100x100.png?text=AS",
    avatarHint: "person avatar",
    rating: 5,
    review:
      "Absolutely loved my stay at Kirei! The minimalist design was so calming, and everything was spotless. A true gem for anyone seeking a peaceful retreat.",
    date: "October 2023",
  },
  {
    name: "Ben M.",
    avatar: "https://placehold.co/100x101.png?text=BM", // unique URL
    avatarHint: "person avatar",
    rating: 5,
    review:
      "Kirei Homestay is fantastic. The attention to detail in the decor and amenities is impressive. Felt like a home away from home. Highly recommend!",
    date: "November 2023",
  },
  {
    name: "Chloe L.",
    avatar: "https://placehold.co/100x102.png?text=CL", // unique URL
    avatarHint: "person avatar",
    rating: 4,
    review:
      "A beautiful and serene apartment. Perfect for a quiet weekend. The concept of slow living really shines through. Only wish there was a bit more natural light in the afternoon.",
    date: "December 2023",
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
          Guest Experiences
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
