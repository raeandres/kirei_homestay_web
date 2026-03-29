import { LucideIcon } from "lucide-react";
import { ImageCollection } from "./image-collection";

interface Amenity {
  name: string;
  icon: LucideIcon;
}

interface GalleryContent {
  teaserDescription1: string;
  teaserDescription2: string;
  propertyDetailsTitle: string;
  propertyDescription: string;
  spaceDescription: string;
  guestsPreferenceList: string[];
  guestsPreferenceFooterNote: string;
  guestsAmenities: string[];
  guestsAccessSubtitle: string;
  guestsAccessList: string[];
  importantNotesList: string[];
  otherNotesDescription: string;
  amenityFeesDescription: string;
  amenityFeeItems: string[];
}

interface CardContent {
  location: string;
  guests: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  basePriceSGD: number; // Base price in SGD for conversion
  reviews: string;
  stars: number;
}

interface GalleryImage {
  src: string;
  alt: string;
  hint: string;
}

interface CalendarSource {
  platform: string;
  url: string;
}

interface GalleryCategory {
  name: string;
  unitType: string;
  coverImage: GalleryImage;
  galleryContent: GalleryContent;
  cardContent: CardContent;
  images: GalleryImage[];
  bookingLinks: {
    airbnb: string;
    booking: string;
  };
  icsUrls: CalendarSource[];
  activeMapUrl: string;
}

const galleryItems: GalleryCategory[] = [
  {
    name: "Kirei",
    unitType: "Studio",
    coverImage: {
      src: "/gallery/kirei_1/converted_0007.webp",
      alt: "Kirei",
      hint: "Minimalist studio bedroom suite",
    },
    cardContent: {
      location: "Eastwood LeGrand 3, Quezon City",
      guests: "4 guests",
      bedrooms: "1 bedroom",
      beds: "2 beds",
      bathrooms: "1 bathroom",
      basePriceSGD: 122,
      reviews: "5 reviews",
      stars: 5,
    },
    galleryContent: {
      teaserDescription1:
        "Designed for clarity and comfort, Kirei House offers a true home away from home. This minimalist studio is designed to give you a peaceful space where you can rest, work, or relax without any distractions.\n\n Whether you’re traveling for business, a quick getaway, or just need a quiet spot to recharge, this space offers everything you need for a hassle-free stay. Kirei House is not just another Airbnb. It’s your space elevated.",
      teaserDescription2: "",
      propertyDetailsTitle: "Kirei",
      propertyDescription:
        "Designed for clarity and comfort, Kirei House offers a true home away from home. This minimalist studio is designed to give you a peaceful space where you can rest, work, or relax without any distractions.\n\nWhether you’re traveling for business, a quick getaway, or just need a quiet spot to recharge, this space offers everything you need for a hassle-free stay. Kirei House is not just another Airbnb. It’s your space elevated.",
      spaceDescription: "",
      guestsAmenities: [
        " • A comfortable queen bed with fresh linens for a good night’s sleep. We also have full-size futon bed available upon request.",
        " • Simple, clutter-free furnishings to help you unwind.",
        " • A dedicated work desk with fast, reliable WiFi for productivity.",
        " •  Netflix and other streaming platforms so you can kick back after a busy day.",
        " • Fully functional kitchen with Nespresso and Smartoven.",
        " •  Clean, well-maintained bathroom with essential toiletries provided.",
      ],
      guestsPreferenceList: [
        "✔️ Clean, quiet, and well-maintained",
        "✔️ Seamless check-in with responsive host",
        "✔️ Ideal for solo travelers, couples, and WFH stays,",
        "✔️ Tastefully designed.",
      ],
      guestsPreferenceFooterNote:
        "We got everything you need and nothing you don’t.",
      guestsAccessSubtitle: "",
      guestsAccessList: [
        " • Parking Basement 3",
        " • Pay parking inside the condominium",
        " • P350/night 1 slot only (kindly confirm in advance)",
        " • Pool Access 6th Floor",
        " • Free for 4 guests, additional fee of P200 for succeeding guests. Pay at Admin Office or at the guard on duty",
        " • Gym 6th Floor",
        " • Day Care Center and Outdoor Playground 6th Floor",
        " • Garden 6th Floor",
      ],
      amenityFeesDescription: "",
      amenityFeeItems: [],
      importantNotesList: [
        " • Strictly imposing CLAY GO policy.",
        " • Check in 2PM - 10PM",
        " • Check out 11AM",
        " • Quiet time 11PM - 8AM",
        " • NO SMOKING AND ILLEGAL DRUGS AT ALL TIMES",
        " • NO ADDITIONAL GUESTS",
        " • NO UNRULY HOUSE PARTIES",
      ],
      otherNotesDescription:
        "Eastwood City is within walking distance to shopping malls, convenience stores, groceries, restaurants, and entertainment such as bowling alley, billiards, dog parks, fitness gyms, food bazaars, movie theater, nightlife, and many more.",
    },
    images: ImageCollection.kirei_1_images_collection,
    activeMapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d438.8887546439741!2d121.08111150085881!3d14.608037443965378!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b81d13b04c0d%3A0x7bb0ce56deb5b6fe!2sEastwood%20LeGrand%203!5e0!3m2!1sen!2ssg!4v1751795054321!5m2!1sen!2ssg",
    bookingLinks: {
      airbnb: "https://www.airbnb.com/rooms/1030897971821606234",
      booking:
        "https://www.booking.com/hotel/ph/cozy-home-in-eastwood-pet-friendly-fast-wifi.html",
    },
    icsUrls: [
      {
        platform: "Airbnb",
        url: "https://www.airbnb.com.sg/calendar/ical/1030897971821606234.ics?s=1b728ed92d212d0e42783ed473c0bb0f",
      },
      // Example: Add more calendar sources when URLs become available
      {
        platform: "Booking.com",
        url: "https://ical.booking.com/v1/export?t=8e69dadf-d9aa-4d48-b092-dc9042edeff7",
      },
      // {
      //   platform: "Agoda",
      //   url: "https://agoda.com/calendar/ical/actual-agoda-url-for-kirei.ics",
      // },
      // {
      //   platform: "Direct Bookings",
      //   url: "https://your-domain.com/calendar/ical/kirei-direct.ics",
      // },
    ],
  },
  {
    name: "Kirei - Ito",
    unitType: "One Bedroom",
    coverImage: {
      src: "/gallery/kirei_2/converted_0002.webp",
      alt: "Kirei - Ito",
      hint: "Minimalist 1 bedroom suite",
    },
    cardContent: {
      location: "Eastwood Global Plaza Luxury Residences, Quezon City",
      guests: "5 guests",
      bedrooms: "1 bedroom",
      beds: "2 beds",
      bathrooms: "1 bathroom",
      basePriceSGD: 228,
      reviews: "5 reviews",
      stars: 5,
    },
    galleryContent: {
      teaserDescription1:
        "Right in the heart of Eastwood City is Kirei House - Ito, a serene Muji-inspired space high above the city. Relax in the elevated lounge, work by the window, or unwind in the cozy bedroom with sweeping skyline views. Every detail is curated for calm and comfort. A perfect retreat for mindful travelers seeking beauty in simplicity.",
      teaserDescription2:
        "Our Muji-inspired home in Eastwood Global Plaza Luxury Residence is thoughtfully designed for comfort, calm, and quiet luxury. Guests enjoy full access to premium building amenities like the infinity pool (best enjoyed from 7PM - 10PM for city lights), fitness pool and jacuzzi, gym, sauna and spa, day care center and outdoor playground for kids, sun deck lounge, and hammock garden.",
      propertyDetailsTitle: "Kirei-ito",
      propertyDescription:
        "Right in the heart of Eastwood City is Kirei House - Ito, a serene Muji-inspired space high above the city. Relax in the elevated lounge, work by the window, or unwind in the cozy bedroom with sweeping skyline views. Every detail is curated for calm and comfort. A perfect retreat for mindful travelers seeking beauty in simplicity.",
      spaceDescription:
        "Our Muji-inspired home in Eastwood Global Plaza Luxury Residence is thoughtfully designed for comfort, calm, and quiet luxury. Guests enjoy full access to premium building amenities like the infinity pool (best enjoyed from 7PM - 10PM for city lights), fitness pool and jacuzzi, gym, sauna and spa, day care center and outdoor playground for kids, sun deck lounge, and hammock garden.",
      guestsAmenities: [
        " • Smart Entry: MGS ELITE PRO Smart Lock for seamless check-in.",
        ' • Entertainment: 55" TCL Google TV with Netflix, HBO Max, Disney+, Amazon Prime, and cable.',
        " • Internet: 300 Mbps Fiber WiFi, ideal for remote work and streaming.",
        " • Comfort: Centralized AC with ceiling fan, spacious king bed, full-size futon bed, ultra-comfy sofa, and a daybed for reading or relaxing.",
        " • Workspace: Dedicated desk for working.",
        " • Fun & Cozy Touches: Board games, card games, and plushies for pets.",
        " • Kitchen: Fully equipped with cookware, tableware, teaware, Condura Inverter Fridge, SAMSUNG 4-in-1 Smart Oven (air fryer, microwave, oven, toaster), B Coffee Neo machine (with 4 complimentary pods), KYOWA rice cooker, and electric kettle.",
        " • Bathroom Essentials: Shower heater, hairdryer, towels, dental kit, and complete toiletries.",
        " • Laundry: TCL front-load washer and dryer with complimentary laundry capsules.",
        " • Closet: Includes hangers, steamer/iron and ironing bed.",
      ],
      guestsPreferenceList: [
        "✔️ Clean, quiet, and well-maintained",
        "✔️ Seamless check-in with responsive host",
        "✔️ Ideal for travelers, families, couples, business trips and WFH stays",
        "✔️ Tastefully designed. We got everything you need and nothing you don’t.",
      ],
      guestsPreferenceFooterNote:
        "Book your stay and see why Kirei House - Ito is one of Eastwood’s most-loved homes.",
      guestsAccessSubtitle:
        "Kirei House - Ito offers access to premium amenities designed for relaxation, wellness, and leisure:",
      guestsAccessList: [
        " • Infinity Pool",
        " • Fitness Pool & Jacuzzi",
        " • Fully Equipped Gym",
        " • Indoor Sauna & Spa",
        " • Day Care Center & Outdoor Playground",
        " • Hammock Garden & Sun Deck Lounge.",
      ],
      amenityFeesDescription:
        "Eastwood Global Plaza facilities require a usage fee per person, per day to be paid at the Admin Office.",
      amenityFeeItems: [
        " • Swimming Pools & Gym P500",
        " • Swimming Pools & Day Care Center P500",
        " • Sauna P500",
      ],
      importantNotesList: [
        " • Registered guests need to pay P250 registration fee as mandated by PMO.",
        " • Unregistered guests are not allowed.",
        " • CLAYGO (Clean As You Go) is strictly observed.",
        " • Check-in is from 3PM to 10PM; check-out is at 12:00 PM.",
        " • Quiet hours are from 10:00 PM to 8:00 AM.",
        " • Smoking and illegal substances are strictly prohibited.",
        " • No additional guests beyond your booking are allowed.",
        " • No loud or unruly parties. This is a peaceful space meant for rest and relaxation.,",
        "Please refer to the House Rules for the complete guidelines.",
      ],
      otherNotesDescription:
        "Eastwood City is within walking distance to shopping malls, convenience stores, groceries, restaurants, and entertainment such as bowling alley, billiards, dog parks, fitness gyms, food bazaars, movie theater, nightlife, and many more.",
    },
    images: ImageCollection.kirei_2_images_collection,
    activeMapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d816.8502546510437!2d121.0808228177933!3d14.608080028428878!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b94bae284457%3A0x556240a3da88002a!2sEastwood%20Global%20Plaza%20Luxury%20Residence%2C%20Palm%20Tree%20Avenue%2C%20Bagumbayan%20Quezon%20City%201800!5e0!3m2!1sen!2ssg!4v1751794979901!5m2!1sen!2ssg",
    bookingLinks: {
      airbnb: "https://www.airbnb.com/rooms/1364997919482714933",
      booking:
        "https://www.booking.com/hotel/ph/king-suite-eastwood-global-plaza-high-floor-quezon-city.html",
    },
    icsUrls: [
      {
        platform: "Airbnb",
        url: "https://www.airbnb.com.sg/calendar/ical/1364997919482714933.ics?s=663892ccaa5dabea43e13966feabc6e1",
      },
      // Example: Add more calendar sources when URLs become available
      {
        platform: "Booking.com",
        url: "https://ical.booking.com/v1/export?t=42eba3ad-a5f1-4f7a-b758-bdc17af96cc0",
      },
      // {
      //   platform: "Agoda",
      //   url: "https://agoda.com/calendar/ical/actual-agoda-url-for-kirei-ito.ics",
      // },
      // {
      //   platform: "Direct Bookings",
      //   url: "https://your-domain.com/calendar/ical/kirei-ito-direct.ics",
      // },
    ],
  },
];


export const GalleryCollection = {
    galleryItems
}