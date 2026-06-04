import { ArrowRight, Sparkles, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-model.jpg";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden pt-20 bg-background">
      
      {/* Tailwind v4 Clear Mask: Sirf text ke peeche subtle layering hogi, face bilkul clear rahega */}
      <div 
        className="absolute inset-0 z-10 hidden md:block pointer-events-none" 
        style={{
          background: "linear-gradient(to right, var(--background) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)"
        }}
      />

      {/* Hero Image Container */}
      <div className="absolute inset-0 md:right-0 md:left-auto md:top-0 md:bottom-0 md:w-3/5 h-full z-0">
        <img
          src={heroImage}
          alt="Luxury fashion model wearing Bambotia jewellery"
          className="w-full h-full object-cover object-center md:object-top"
          width={1024}
          height={1280}
        />
        
        {/* Mobile overlay: darken image so text reads clearly while keeping the model fully visible */}
        <div
          className="absolute inset-0 z-1 md:hidden pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div 
          className="absolute inset-0 z-1 hidden md:block pointer-events-none" 
          style={{
            background: "linear-gradient(to right, var(--background) 10%, transparent 70%)"
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="max-w-xl">
          <AnimateOnScroll animation="fade-up" delay={100}>
            <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-accent mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-6 sm:w-8 h-px bg-accent inline-block" />
              GLOBAL LUXURY · PAKISTANI ELEGANCE
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={250}>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-1">
              Elegance
            </h1>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium italic text-gradient-gold leading-[1.1] mb-4 sm:mb-6">
              Redefined
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={400}>
            <p className="text-sm sm:text-base text-muted-foreground mb-1">
              Curated luxury for the modern woman
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mb-8 sm:mb-10">
              Jewellery · Cosmetics · Designer Purses
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={550}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#new-arrivals"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-accent text-accent-foreground font-medium text-sm tracking-wider rounded hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                New Arrivals <Sparkles className="w-4 h-4" />
              </a>
              <a
                href="#shop-the-look"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-foreground/20 text-foreground font-medium text-sm tracking-wider rounded hover:border-accent hover:text-accent transition-colors w-full sm:w-auto"
              >
                Shop the Look <Eye className="w-4 h-4" />
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
