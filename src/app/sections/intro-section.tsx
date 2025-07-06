"use client";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import { ChevronDown } from "lucide-react";

export function IntroSection() {
  return (
    <section
      id="intro"
      className="bg-background flex flex-col items-center justify-center"
    >
      <div
        className="flex flex-col items-center justify-center text-center sm:my-8 my-8 md:my-8 lg:my-8 max-w-4xl mx-8 md:mx-8 lg:mx-8"
        onClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <h2 className="text-lg md:text-lg lg:text-lg text-center text-zinc-700 font-normal tracking-tighter leading-relaxed">
          {/* Thoughtfully designed spaces for mindful stays */}
          THOUGHTFULLY DESIGNED SPACES FOR MINDFUL STAYS
        </h2>
        <h3 className="text-sm md:text-sm lg:text-sm text-center text-zinc-700 font-normal tracking-wide text-muted-foreground">
          EXPLORE MORE
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
