import HeroSection from "@/components/LandingPage/HeroSection";
import Navbar from "@/components/LandingPage/Navbar";
import TestimonialsSection from "@/components/LandingPage/TestimonialSection";
import FeaturesSection from "@/components/LandingPage/FeaturesSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TestimonialsSection />
      <FeaturesSection />
    </main>
  );
}
