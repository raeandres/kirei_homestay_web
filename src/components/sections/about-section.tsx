"use client";
import { useIsMobile } from "@/hooks/use-mobile";

export function AboutSection() {
  const isMobile = useIsMobile();

  return (
<<<<<<< Updated upstream
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl text-center font-headline mb-8">
          Welcome
        </h2>
        <div className="aspect-video w-full max-w-[1290px] mx-auto shadow-lg mb-10 overflow-hidden">
=======
    <section id="about" className="py-8 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="relative h-[80vh] aspect-video w-full max-w-[1920px] mx-auto mb-8 shadow-lg overflow-hidden">
>>>>>>> Stashed changes
          <video
            autoPlay
            muted
            loop
            playsInline
            data-ai-hint="zen decor"
            className="w-full h-full object-cover"
          >
            <source src="/about/kirei_slide.webm" type="video/webm" />
            {isMobile ? (
              <source src="/about/IMG_2727.mp4" type="video/mp4" />
            ) : (
              <source src="/about/IMG_2727.mp4" type="video/mp4" />
            )}
            Your browser does not support the video tag.
          </video>
<<<<<<< Updated upstream
        </div>
        <div className="px-2 font-headline">
          <p className="text-lg text-left md:text-xl text-foreground/80 leading-6 md:leading-6 px-4 sm:px-0">
            kirei (綺麗), meaning beautiful and clean in Japanese, is more than
            just a place to stay.
          </p>
          <p className="text-lg text-left md:text-xl text-foreground/80 leading-6 mb-2 md:leading-6 px-4 sm:px-0">
            It's an invitation to embrace slow, intentional living. Our space is
            thoughtfully designed to be a sanctuary of calm, where minimalist
            aesthetics meet cozy comfort.
          </p>
          <p className="text-lg text-left md:text-xl text-foreground/80 leading-6 md:leading-6 px-4 sm:px-0">
            We believe in the beauty of simplicity and the importance of mindful
            moments.
          </p>
          <p className="text-lg text-left md:text-xl text-foreground/80 leading-6 md:leading-6 px-4 sm:px-0">
            Every detail at Kirei House is curated to help you unwind,
            reconnect, and find joy in the present.
          </p>
=======
          <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-8">
            <div className="text-center text-white">
              <h2 className="text-lg md:text-2xl text-left px-4 font-headline mb-8">
                WELCOME
              </h2>
              <p className="text-sm md:text-sm text-white/90 mb-6 leading-relaxed px-4 sm:px-0 max-w-3xl ">
                Kirei (綺麗), meaning beautiful and clean in Japanese, is more
                than just a place to stay. It's an invitation to embrace slow,
                intentional living. Our space is thoughtfully designed to be a
                sanctuary of calm, where minimalist aesthetics meet cozy
                comfort.
              </p>
              <p className="text-sm md:text-sm text-white/90 leading-relaxed px-4 sm:px-0 max-w-3xl">
                We believe in the beauty of simplicity and the importance of
                mindful moments. Every detail at Kirei Homestay is curated to
                help you unwind, reconnect, and find joy in the present.
              </p>
            </div>
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </section>
  );
}
