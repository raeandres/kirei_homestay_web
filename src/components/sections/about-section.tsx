export function AboutSection() {
  return (
    <section id="about" className="py-8 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl text-left px-6 font-headline mb-8">
          Welcome
        </h2>
        <div className="aspect-video w-full max-w-[1290px] mx-auto shadow-lg mb-10 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            data-ai-hint="zen decor"
            className="w-full h-full object-cover"
          >
            <source src="/about/IMG_2727.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="px-8 font-headline">
          <p className="text-sm text-left md:text-lg text-foreground/80 leading-5 md:leading-6 sm:px-0">
            kirei (綺麗), meaning beautiful and clean in Japanese, is more than
            just a place to stay. It's an invitation to embrace slow,
            intentional living. Our space is thoughtfully designed to be a
            sanctuary of calm, where minimalist aesthetics meet cozy comfort.
          </p>
          <br />
          <p className="text-sm text-left md:text-lg text-foreground/80 leading-5 md:leading-6 sm:px-0">
            We believe in the beauty of simplicity and the importance of mindful
            moments. Every detail at Kirei House is curated to help you unwind,
            reconnect, and find joy in the present.
          </p>
        </div>
      </div>
    </section>
  );
}
