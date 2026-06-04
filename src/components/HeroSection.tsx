import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-model.jpg";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-[calc(100vh-5rem)] flex items-center overflow-hidden pt-20 md:pt-0 bg-background">
      {/* Hero Image Background */}
      <div className="absolute inset-0 md:left-auto md:w-[72%] h-full z-0">
        <img
          src={heroImage}
          alt="Luxury fashion model wearing Bambotia jewellery"
          className="w-full h-full object-cover object-center md:object-[50%_30%]"
          width={1024}
          height={1280}
        />
        
        {/* Mobile overlay: darken image so text reads clearly while keeping the model fully visible */}
        <div
          className="absolute inset-0 z-[1] md:hidden pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      <div 
        className="absolute inset-0 z-10 hidden md:block pointer-events-none" 
        style={{
          background:
            "linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background)) 29%, hsl(var(--background) / 0.9) 43%, hsl(var(--background) / 0.48) 61%, hsl(var(--background) / 0.2) 100%), linear-gradient(to bottom, hsl(var(--background) / 0.22) 0%, transparent 45%, hsl(var(--background) / 0.18) 100%)",
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-0">
        <div className="max-w-[430px] md:pt-2">
          <AnimateOnScroll animation="fade-up" delay={100}>
            <p className="text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.32em] text-accent mb-4 sm:mb-7 flex items-center gap-2.5 whitespace-nowrap">
              <span className="w-8 h-px bg-accent inline-block" />
              GLOBAL LUXURY · PAKISTANI ELEGANCE
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={250}>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[0.98] mb-1">
              Elegance
            </h1>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-medium italic text-gradient-gold leading-[0.98] mb-7 sm:mb-8">
              Redefined
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={400}>
            <p className="text-sm sm:text-base text-muted-foreground mb-1.5">
              Curated luxury for the modern woman
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mb-10 sm:mb-11">
              Jewellery · Cosmetics · Designer Purses
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={550}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#new-arrivals"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-medium text-sm tracking-wide rounded hover:opacity-90 transition-opacity w-full sm:min-w-[222px] sm:w-auto"
              >
                Explore Collection <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#new-arrivals"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-foreground/20 text-foreground font-medium text-sm tracking-wide rounded bg-background/10 hover:border-accent hover:text-accent transition-colors w-full sm:min-w-[184px] sm:w-auto"
              >
                New Arrivals <Star className="w-4 h-4" />
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
