"use client";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import { ChevronDown } from "lucide-react";

export function IntroSection() {
  return (
    <section
      id="intro"
      className="min-h-screen bg-background flex flex-col items-center justify-center"
    >
      <div
        className="flex flex-col items-center justify-center text-center px-4 sm:px-0 max-w-4xl"
        onClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-center mb-6 font-light leading-relaxed">
          Thoughtfully designed spaces for mindful stays
        </h2>
        <h3 className="text-lg md:text-2xl lg:text-3xl text-center font-light text-muted-foreground">
          Explore more
        </h3>

        {/* <Link href="#about">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-transparent text-black hover:bg-transparent hover:text-black animate-fade-in animation-delay-[1800ms]"
          >
            <span>
              Explore More{" "}
              <ChevronDown className="text-lg md:text-2xl lg:text-3xl text-center font-light text-muted-foreground" />
            </span>
          </Button>
        </Link> */}
      </div>
    </section>
  );
}
