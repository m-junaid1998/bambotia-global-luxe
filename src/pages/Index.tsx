import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import CategoriesSection from "@/components/CategoriesSection";
import SubcategoryShowcase from "@/components/SubcategoryShowcase";
import NewArrivals from "@/components/NewArrivals";
import ShopTheLook from "@/components/ShopTheLook";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <StatsBar />
    <CategoriesSection />
    <NewArrivals />
    <ShopTheLook />
    <Testimonials />
    <Footer />
  </div>
);

export default Index;
