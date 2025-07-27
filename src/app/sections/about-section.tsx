"use client";
import { useDevice } from "@/hooks/use-device";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";

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
    <section id="about" className="mb-8 md:mb-8 bg-secondary/30">
      <div className="w-full">
        <div
          className={cn(
            "relative w-full h-screen overflow-hidden",
            isMobile ? "aspect-[9/16]" : "aspect-video"
          )}
        >
          {/* Luxury gradient overlay */}
          <div className="absolute inset-0  from-black/30 via-black/40 to-black/60 flex items-center justify-center p-8">
            <div className="text-center text-stormy-blue/80 max-w-5xl mx-auto space-y-8">
              {/* Elegant header */}
              <div
                className={cn(
                  "space-y-4 transition-all duration-1000 ease-out",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
              >
                {/* <Image
                  src="https://placehold.co/800x400.png"
                  src="/images/hero/dining_1.jpg"
                  alt="Peaceful Kirei interior detail"
                  data-ai-hint="zen decor"
                  width={800}
                  height={400}
                  className="rounded-lg shadow-lg mx-auto mb-8 object-cover"
                /> */}
                <div
                  className={cn(
                    "w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto transition-all duration-1000 ease-out delay-300",
                    isVisible
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0"
                  )}
                ></div>
                <Image
                  src="/about/converted_0000.webp"
                  alt="Peaceful Kirei interior detail"
                  data-ai-hint="zen decor"
                  width={600}
                  height={400}
                  className="rounded-none shadow-none mx-auto mb-8 object-cover"
                />
              </div>

              {/* Luxury content */}
              <div
                className={cn(
                  "space-y-8 transition-all duration-1000 ease-out delay-500 font-body",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
              >
                <p
                  className="text-stormy-blue/60 text-base md:text-lg lg:text-xl leading-relaxed tracking-wide font-extralight px-4 sm:px-0 max-w-4xl mx-auto font-playfair-display"
                  style={
                    isMobile
                      ? {
                          lineHeight: "1.5",
                          letterSpacing: "0.03em",
                          fontSize: "1rem",
                          fontWeight: "300",
                        }
                      : {
                          lineHeight: "1.3",
                          letterSpacing: "0.05em",
                          textIndent: "2rem",
                          fontSize: "1rem",
                          fontWeight: "300",
                        }
                  }
                >
                  {" "}
                  Rooted in the Japanese word{" "}
                  <span className="text-stormy-blue/80 font-lg text-lg md:text-lg lg:text-lg xl:text-lg 2k:text-lg 4k:text-xl">
                    kirei
                  </span>{" "}
                  <span className="text-stormy-blue/80">(綺麗)</span>, meaning
                  both “beautiful” and “neat”, our spaces embody quiet elegance,
                  intentional design, and hotel-grade comfort. Whether you're
                  traveling for work or seeking a temporary home in Metro
                  Manila, our spaces are designed to meet you where you are and
                  elevate your experience.
                </p>

                <p
                  className=" text-stormy-blue/60 text-base md:text-lg lg:text-xl leading-relaxed tracking-wide font-light px-4 sm:px-0 max-w-4xl mx-auto font-playfair-display"
                  style={
                    isMobile
                      ? {
                          lineHeight: "1.5",
                          letterSpacing: "0.03em",
                          fontSize: "1rem",
                          fontWeight: "300",
                        }
                      : {
                          lineHeight: "1.3",
                          letterSpacing: "0.05em",
                          textIndent: "2rem",
                          fontSize: "1rem",
                          fontWeight: "300",
                        }
                  }
                >
                  Each space is carefully curated with calming interiors, warm
                  neutral tones and a focus on cleanliness and functionality. We
                  believe in the beauty of simplicity and the importance of
                  mindful moments. From seamless check-ins to soft linens and
                  cozy corners, everything is designed to help you unwind,
                  reconnect, and feel at home.
                </p>

                <p
                  className=" text-stormy-blue/60 text-base md:text-lg lg:text-xl leading-relaxed tracking-wide font-light px-4 sm:px-0 max-w-4xl mx-auto font-playfair-display"
                  style={
                    isMobile
                      ? {
                          lineHeight: "1.5",
                          letterSpacing: "0.03em",
                          fontSize: "1rem",
                          fontWeight: "300",
                        }
                      : {
                          lineHeight: "1.3",
                          letterSpacing: "0.05em",
                          textIndent: "2rem",
                          fontSize: "1rem",
                          fontWeight: "300",
                        }
                  }
                >
                  Kirei House is just steps away from shops, restaurants, and
                  offices in the vibrant Eastwood community.
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
