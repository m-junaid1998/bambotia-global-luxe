import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  autoScroll?: boolean;
}

const ProductCarousel = ({ title, subtitle, products, autoScroll }: ProductCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? (card as HTMLElement).offsetWidth + 16 : 240;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  useEffect(() => {
    if (!autoScroll) return;
    const el = trackRef.current;
    if (!el) return;
    const id = setInterval(() => {
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: 240, behavior: "smooth" });
    }, 4000);
    return () => clearInterval(id);
  }, [autoScroll, products.length]);

  if (!products.length) return null;

  return (
    <section className="mt-14">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          {subtitle && (
            <p className="text-[10px] sm:text-xs tracking-[0.3em] text-accent mb-1">
              {subtitle}
            </p>
          )}
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            {title}
          </h2>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="p-2 rounded-full border border-border bg-background/80 hover:border-accent hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="p-2 rounded-full border border-border bg-background/80 hover:border-accent hover:text-accent transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div key={p.id} className="snap-start">
            <ProductCard product={p} compact />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;