import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 font-headline">
          Welcome to Kirei
        </h2>
        <Image
          src="/images/showcase/bed_right_angle.webp"
          alt="Peaceful Kirei interior detail"
          data-ai-hint="zen decor"
          width={800}
          height={400}
          className="rounded-lg shadow-lg mx-auto mb-8 object-cover"
        />
        <p className="text-lg md:text-xl text-foreground/80 mb-6 leading-relaxed">
          Kirei (綺麗), meaning beautiful and clean in Japanese, is more than
          just a place to stay. It's an invitation to embrace slow, intentional
          living. Our space is thoughtfully designed to be a sanctuary of calm,
          where minimalist aesthetics meet cozy comfort.
        </p>
        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
          We believe in the beauty of simplicity and the importance of mindful
          moments. Every detail at Kirei Homestay is curated to help you unwind,
          reconnect, and find joy in the present.
        </p>
      </div>
    </section>
  );
}
