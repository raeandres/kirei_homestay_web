import { Facebook, Instagram, MessageSquare, Home, Briefcase, HotelIcon } from "lucide-react";

const socialMediaLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61558711286570",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/kireihouse.ph",
    icon: Instagram,
  },
  { name: "WhatsApp", href: "https://wa.me/639175069965", icon: MessageSquare },
];

const platformLinks = [
  { name: "Airbnb", href: "https://www.airbnb.com", icon: Home },
  { name: "Booking.com", href: "https://www.booking.com", icon: Briefcase },
  { name: "Agoda", href: "https://www.agoda.com", icon: HotelIcon },
];


export const ContactsCollection = {
    socialMediaLinks,
    platformLinks
}