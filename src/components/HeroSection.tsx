import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-model.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background to-transparent z-10" />

      {/* Hero image */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5">
        <img
          src={heroImage}
          alt="Luxury fashion model wearing Bambotia jewellery"
          className="w-full h-full object-cover object-top"
          width={1024}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl">
          <p className="text-sm tracking-[0.3em] text-accent mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-accent inline-block" />
            GLOBAL LUXURY · PAKISTANI ELEGANCE
          </p>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-2">
            Elegance
          </h1>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-medium italic text-gradient-gold leading-[1.1] mb-6">
            Redefined
          </h1>

          <p className="text-lg text-muted-foreground mb-2">
            Curated luxury for the modern woman
          </p>
          <p className="text-sm text-muted-foreground mb-10">
            Jewellery · Cosmetics · Designer Purses
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-medium text-sm tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#new-arrivals"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-foreground/20 text-foreground font-medium text-sm tracking-wider rounded hover:border-accent hover:text-accent transition-colors"
            >
              New Arrivals <Star className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-muted-foreground text-xs tracking-[0.3em] animate-bounce">
        SCROLL
      </div>
    </section>
  );
};

export default HeroSection;
