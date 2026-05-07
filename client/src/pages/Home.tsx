/**
 * Pizzería Costumbres Argentinas - Home Page
 * Design: Tradición Porteña Moderna
 * Colors: Crema (#FFF8F0), Azul marino (#1B3A6B), Celeste (#A8D4F0), Rojo (#E63946), Dorado (#F4A261)
 * Typography: Playfair Display (display), Nunito (body)
 */

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NoticeBar from "@/components/NoticeBar";
import HistorySection from "@/components/HistorySection";
import GallerySection from "@/components/GallerySection";
import MenuSection from "@/components/MenuSection";
import EventsSection from "@/components/EventsSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Header />
      <HeroSection />
      <NoticeBar />
      <HistorySection />
      <GallerySection />
      <MenuSection />
      <EventsSection />
      <LocationSection />
      <Footer />
    </div>
  );
}
