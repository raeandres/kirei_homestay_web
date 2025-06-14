import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import { HeroSection } from "../components/sections/hero-section";
import { AboutSection } from "../components/sections/about-section";
import { GallerySection } from "../components/sections/gallery-section";
import { AmenitiesSection } from "../components/sections/amenities-section";
import { ReviewsSection } from "../components/sections/review-section";
import { ContactSection } from "../components/sections/contact-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <AmenitiesSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
