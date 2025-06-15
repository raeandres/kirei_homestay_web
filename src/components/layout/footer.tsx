import Link from "next/link";
import {
  Instagram,
  Facebook,
  MessageSquare,
  Film,
  HomeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "Airbnb",
    href: "https://www.airbnb.com.sg/rooms/1364997919482714933?guests=1&adults=4&pets=2&s=67&unique_share_id=0d245e15-131c-48e4-bd7a-200c585b4fcc",
    icon: HomeIcon,
  },
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

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-8">
      <div className="container px-10 max-w-screen-2xl flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Kirei House PH. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.name === "Facebook" ? "_blank" : undefined}
              rel={link.name === "Facebook" ? "noopener noreferrer" : undefined}
            >
              <Button
                asChild
                variant="ghost"
                size="icon"
                aria-label={link.name}
                className="text-accent hover:text-accent-foreground hover:bg-accent"
              >
                <link.icon className="h-5 w-5" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
