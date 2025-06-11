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
  { name: "Airbnb", href: "#", icon: HomeIcon },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "WhatsApp", href: "#", icon: MessageSquare },
  { name: "TikTok", href: "#", icon: Film },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-8">
      <div className="container px-10 max-w-screen-2xl flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Kirei Homestay. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {socialLinks.map((link) => (
            <Link key={link.name} href={link.href}>
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
