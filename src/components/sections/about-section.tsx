export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 font-headline">
          Welcome to Kirei
        </h2>
        <div className="aspect-video w-full max-w-[1290px] mx-auto shadow-lg mb-8 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            data-ai-hint="zen decor"
            className="w-full h-full object-cover"
          >
            <source src="kirei_2/hero/IMG_2727.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-lg md:text-xl text-foreground/80 mb-6 leading-relaxed px-4 sm:px-0">
          Kirei (綺麗), meaning beautiful and clean in Japanese, is more than
          just a place to stay. It's an invitation to embrace slow, intentional
          living. Our space is thoughtfully designed to be a sanctuary of calm,
          where minimalist aesthetics meet cozy comfort.
        </p>
        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed px-4 sm:px-0">
          We believe in the beauty of simplicity and the importance of mindful
          moments. Every detail at Kirei Homestay is curated to help you unwind,
          reconnect, and find joy in the present.
        </p>
      </div>
    </section>
  );
}
