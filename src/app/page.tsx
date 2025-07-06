import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import { HeroSection } from "./sections/hero-section";
import { IntroSection } from "./sections/intro-section";
import { AboutSection } from "./sections/about-section";
import { GallerySection } from "./sections/gallery-section";
import { AmenitiesSection } from "./sections/amenities-section";
import { ReviewsSection } from "./sections/review-section";
import { ContactSection } from "./sections/contact-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <HeroSection />
        <IntroSection />
        <AboutSection />
        <ReviewsSection />
        <GallerySection />
        <AmenitiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
