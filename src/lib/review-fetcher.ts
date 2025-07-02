// Define the structure of a review for the component
export interface Review {
  name: string;
  avatar: string;
  avatarHint: string;
  rating: number;
  review: string;
  date: string;
}

// Define the structure of the API response for a single review
interface ApiReview {
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  localizedDate: string;
}

export async function fetchReviews(): Promise<Review[]> {
  try {
    const response = await fetch('https://stl-listing-review-fetching-service.onrender.com/api/scrape-reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "airbnbUrl": "https://www.airbnb.com/rooms/1030897971821606234/reviews",
        "maxReviews": 20
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.reviews) {
      const formattedReviews: Review[] = data.reviews.map((review: ApiReview) => ({
        name: review.userName,
        avatar: review.userAvatar,
        avatarHint: 'person avatar',
        rating: review.rating,
        review: review.text,
        date: review.localizedDate,
      }));
      return formattedReviews;
    } else {
        return [];
    }

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return []; // Set to empty array on error to show the 'no reviews' message
  }
}
