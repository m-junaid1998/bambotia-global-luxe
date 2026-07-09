import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import StudioFeed from "@/components/StudioFeed";
import CategoriesSection from "@/components/CategoriesSection";
import NewArrivals from "@/components/NewArrivals";
import ShopTheLook from "@/components/ShopTheLook";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const Index = () => (
  <div className="min-h-screen bg-background pb-20 md:pb-0">
    <Navbar />
    <main>
      <HeroSection />
      <StatsBar />
      <StudioFeed />
      <CategoriesSection />
      <NewArrivals />
      <ShopTheLook />
      <Testimonials />
    </main>
    <Footer />
    <BottomNav />
  </div>
);

export default Index;
