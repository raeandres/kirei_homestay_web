"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SocialMediaLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SocialMediaLinksSectionProps {
  socialMediaLinks: SocialMediaLink[];
}

export function SocialMediaLinksSection({
  socialMediaLinks,
}: SocialMediaLinksSectionProps) {
  return (
    <div className="pt-2">
      <h3 className="font-semibold font-headline text-lg mb-3"></h3>
      <div className="flex items-center space-x-3">
        {socialMediaLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target={link.name === "Facebook" ? "_blank" : undefined}
            rel={
              link.name === "Facebook" ? "noopener noreferrer" : undefined
            }
          >
            <Button
              asChild
              variant="ghost"
              size="icon"
              aria-label={link.name}
              className="text-accent hover:text-accent-foreground hover:bg-accent"
            >
              <link.icon className="h-6 w-6" />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
