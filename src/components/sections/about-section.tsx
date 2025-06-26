export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl text-center font-light mb-8 font-zen-old-mincho">
          w e l c o m e
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
            <source src="/about/IMG_2727.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="px-10 font-zen-old-mincho">
          <p className="text-lg text-right md:text-xl text-foreground/80 mb-2 leading-relaxed px-4 sm:px-0">
            kirei (綺麗), meaning beautiful and clean in Japanese, is more than
            just a place to stay.
          </p>
          <p className="text-lg text-right md:text-xl text-foreground/80 mb-2 leading-relaxed px-4 sm:px-0">
            It's an invitation to embrace slow, intentional living. Our space is
            thoughtfully designed to be a sanctuary of calm, where minimalist
            aesthetics meet cozy comfort.
          </p>
          <p className="text-lg text-right md:text-xl text-foreground/80 mb-2 leading-relaxed px-4 sm:px-0">
            We believe in the beauty of simplicity and the importance of mindful
            moments.
          </p>
          <p className="text-lg text-right md:text-xl text-foreground/80 mb-2 leading-relaxed px-4 sm:px-0">
            Every detail at Kirei House is curated to help you unwind,
            reconnect, and find joy in the present.
          </p>
        </div>
      </div>
    </section>
  );
}
