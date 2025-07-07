"use client";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function IntroSection() {
  const isMobile = useIsMobile();

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
        <h2
          className={
            isMobile
              ? "text-sm md:text-sm lg:text-sm text-center text-gray-600 font-normal tracking-tight leading-relaxed max-w-3xl"
              : "text-lg md:text-lg lg:text-lg text-center text-gray-600 font-normal tracking-tighter leading-relaxed"
          }
        >
          {/* Thoughtfully designed spaces for mindful stays */}
          Thoughtfully designed spaces for mindful stays
        </h2>

        <h3
          className={
            isMobile
              ? "text-sm md:text-sm lg:text-sm text-center text-gray-600 font-normal tracking-tight leading-relaxed max-w-3xl"
              : "text-lg md:text-lg lg:text-lg text-center text-gray-600 font-normal tracking-tighter leading-relaxed"
          }
        >
          explore more
        </h3>
      </div>
    </section>
  );
}
