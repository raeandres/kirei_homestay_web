import type { LucideIcon } from "lucide-react";
import {
  Bath,
  BedDouble,
  BookOpen,
  Coffee,
  Microwave,
  ParkingCircle,
  Refrigerator,
  ShieldCheck,
  Shirt,
  Speaker,
  Sun,
  Thermometer,
  Trees,
  Tv,
  Users,
  Utensils,
  Wifi,
  Wind,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Amenity {
  name: string;
  icon: LucideIcon;
}

interface AmenityCategory {
  title: string;
  amenities: Amenity[];
}

const amenityCategories: AmenityCategory[] = [
  {
    title: "Bathroom",
    amenities: [
      { name: "Hot Water", icon: Bath },
      { name: "Shampoo & Conditioner", icon: Bath },
      { name: "Hair Dryer", icon: Wind },
      { name: "Towels", icon: Shirt },
    ],
  },
  {
    title: "Bedroom and Laundry",
    amenities: [
      { name: "Queen Bed", icon: BedDouble },
      { name: "Linens Provided", icon: BedDouble },
      { name: "Iron & Board", icon: Shirt },
      { name: "Hangers", icon: Shirt },
    ],
  },
  {
    title: "Entertainment",
    amenities: [
      { name: "Smart TV", icon: Tv },
      { name: "Books and Reading Material", icon: BookOpen },
      { name: "Bluetooth Speaker", icon: Speaker },
    ],
  },
  {
    title: "Family",
    amenities: [
      { name: "Board Games", icon: Users },
      { name: "Travel Crib (upon request)", icon: BedDouble },
    ],
  },
  {
    title: "Heating and Cooling",
    amenities: [
      { name: "Air Conditioning", icon: Thermometer },
      { name: "Heating", icon: Thermometer },
    ],
  },
  {
    title: "Home Safety",
    amenities: [
      { name: "Smoke Alarm", icon: ShieldCheck },
      { name: "Carbon Monoxide Alarm", icon: ShieldCheck },
      { name: "First Aid Kit", icon: ShieldCheck },
    ],
  },
  {
    title: "Internet and Office",
    amenities: [
      { name: "High-speed Wi-Fi", icon: Wifi },
      { name: "Dedicated Workspace", icon: BookOpen },
    ],
  },
  {
    title: "Kitchen and Dining",
    amenities: [
      { name: "Refrigerator", icon: Refrigerator },
      { name: "Microwave", icon: Microwave },
      { name: "Coffee Maker", icon: Coffee },
      { name: "Dishes and Silverware", icon: Utensils },
      { name: "Cooking Basics (Pots, Pans)", icon: Utensils },
    ],
  },
  {
    title: "Outdoor",
    amenities: [
      { name: "Balcony", icon: Sun },
      { name: "Patio Furniture", icon: Trees },
    ],
  },
  {
    title: "Parking and Facilities",
    amenities: [
      { name: "Free Parking on Premises", icon: ParkingCircle },
      { name: "Elevator", icon: Users },
    ],
  },
];

export function AmenitiesSection() {
  return (
    <section id="amenities" className="py-16 md:py-24 bg-background px-4">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenityCategories.map((category) => {
            const CategoryIcon =
              category.amenities.length > 0
                ? category.amenities[0].icon
                : Users;
            return (
              <Card
                key={category.title}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center">
                    <CategoryIcon className="mr-3 h-6 w-6 text-accent" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.amenities.map((amenity) => {
                      const AmenityIconComponent = amenity.icon;
                      return (
                        <li
                          key={amenity.name}
                          className="flex items-center text-foreground/80"
                        >
                          <AmenityIconComponent className="mr-3 h-5 w-5 text-accent" />
                          <span>{amenity.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
