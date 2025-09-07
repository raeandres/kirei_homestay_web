import { LucideIcon, PawPrintIcon, Dumbbell, WavesLadder, Blocks, BathIcon, Building2, BedDoubleIcon, BedDouble, Thermometer, Users, Tv, BookOpen, ShieldCheck, Refrigerator, Microwave, Coffee, Utensils, ShowerHeadIcon, Toilet, Wind, Shirt, Wifi, WashingMachine, BatteryCharging, ParkingCircle } from "lucide-react";

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
    title: "Amenities",
    amenities: [
      { name: "Pet-Friendly", icon: PawPrintIcon },
      { name: "Gym", icon: Dumbbell },
      { name: "Swimming Pool", icon: WavesLadder },
      { name: "Kids Playground", icon: Blocks },
      { name: "Sauna", icon: BathIcon },
      { name: "City View", icon: Building2 },
    ],
  },
  {
    title: "Bedroom",
    amenities: [
      { name: "King Bed", icon: BedDoubleIcon },
      { name: "Futon Bed (upon request)", icon: BedDouble },
    ],
  },
  {
    title: "Family",
    amenities: [
      { name: "Air Conditioning", icon: Thermometer },
      { name: "Board Games", icon: Users },
    ],
  },
  {
    title: "Entertainment",
    amenities: [
      { name: "Smart TV", icon: Tv },
      { name: "Books and Reading Material", icon: BookOpen },
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
    title: "Bathroom",
    amenities: [
      { name: "Hot Water", icon: ShowerHeadIcon },
      { name: "Bidet", icon: Toilet },
      { name: "Hair Dryer", icon: Wind },
      { name: "Towels", icon: Shirt },
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
    title: "Utilities",
    amenities: [
      { name: "Washing Machine", icon: WashingMachine },
      { name: "Charging wall socket", icon: BatteryCharging },
      { name: "Iron & Board", icon: Shirt },
      { name: "Hangers", icon: Shirt },
    ],
  },
  {
    title: "Parking and Facilities",
    amenities: [
      { name: "Available Parking", icon: ParkingCircle },
      { name: "Elevator", icon: Users },
    ],
  },
];

export const AmenitiesCollection = {
    amenityCategories,
}