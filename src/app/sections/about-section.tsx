"use client";
import { useDevice } from "@/hooks/use-device";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function AboutSection() {
  const { isMobile } = useDevice();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "-10% 0px -10% 0px", // Add some margin for better timing
      }
    );

    const section = document.getElementById("about");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="about" className="pb-24 md:pb-24 bg-background">
      <div className="w-full">
        <div
          className={cn(
            "relative w-full h-screen overflow-hidden",
            isMobile ? "aspect-[9/16]" : "aspect-video"
          )}
        >
          <video
            key={isMobile ? "mobile" : "desktop"}
            autoPlay
            muted
            loop
            playsInline
            data-ai-hint="zen decor"
            className="w-full h-full object-cover"
          >
            {isMobile ? (
              <source
                src="/about/kirei_about_portrait.webm"
                type="video/webm"
              />
            ) : (
              <source
                src="/about/kirei_about_landscape.webm"
                type="video/webm"
              />
            )}
            Your browser does not support the video tag.
          </video>
          {/* Luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60 flex items-center justify-center p-8">
            <div className="text-center text-white max-w-5xl mx-auto space-y-8">
              {/* Elegant header */}
              <div
                className={cn(
                  "space-y-4 transition-all duration-1000 ease-out",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
              >
                <h2 className="text-luxury-light text-2xl md:text-4xl lg:text-5xl font-headline tracking-[0.15em] mb-4">
                  WELCOME
                </h2>
                <div
                  className={cn(
                    "w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto transition-all duration-1000 ease-out delay-300",
                    isVisible
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0"
                  )}
                ></div>
              </div>

              {/* Luxury content */}
              <div
                className={cn(
                  "space-y-8 transition-all duration-1000 ease-out delay-500",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
              >
                <p className="text-luxury-light text-base md:text-lg lg:text-xl leading-relaxed tracking-wide px-4 sm:px-0 max-w-4xl mx-auto">
                  <span className="font-serif text-xl md:text-2xl">Kirei</span>{" "}
                  <span className="text-white/80">(綺麗)</span>, meaning
                  beautiful and clean in Japanese, is more than just a place to
                  stay. It's an invitation to embrace slow, intentional living.
                  Our space is thoughtfully designed to be a sanctuary of calm,
                  where minimalist aesthetics meet cozy comfort.
                </p>

                <p className="text-luxury-light text-base md:text-lg lg:text-xl leading-relaxed tracking-wide px-4 sm:px-0 max-w-4xl mx-auto">
                  We believe in the beauty of simplicity and the importance of
                  mindful moments. Every detail at Kirei Homestay is curated to
                  help you unwind, reconnect, and find joy in the present.
                </p>
              </div>

              {/* Decorative element */}
              <div
                className={cn(
                  "transition-all duration-1000 ease-out delay-1000",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
              >
                <div className="flex items-center justify-center space-x-4 pt-8">
                  <div
                    className={cn(
                      "w-8 h-px bg-gradient-to-r from-transparent to-white/40 transition-all duration-800 ease-out delay-1200",
                      isVisible
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    )}
                  ></div>
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full bg-white/60 transition-all duration-600 ease-out delay-1400",
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    )}
                  ></div>
                  <div
                    className={cn(
                      "w-8 h-px bg-gradient-to-l from-transparent to-white/40 transition-all duration-800 ease-out delay-1600",
                      isVisible
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    )}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
