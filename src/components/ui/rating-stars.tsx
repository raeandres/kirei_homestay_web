import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  className?: string;
  starClassName?: string;
}

export function RatingStars({
  rating,
  maxRating = 5,
  className,
  starClassName,
}: RatingStarsProps) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-5 w-5",
            index < rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted-foreground",
            starClassName
          )}
        />
      ))}
    </div>
  );
}
