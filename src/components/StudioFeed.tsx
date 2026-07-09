import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Film, Volume2, VolumeX } from "lucide-react";
import bangles from "@/assets/product-bangles.jpg";
import necklace from "@/assets/product-necklace.jpg";
import earrings from "@/assets/product-earrings.jpg";
import ring from "@/assets/product-ring.jpg";
import clutch from "@/assets/product-clutch.jpg";
import lipstick from "@/assets/product-lipstick.jpg";

type Reel = {
  id: string;
  title: string;
  caption: string;
  poster: string;
};

const reels: Reel[] = [
  { id: "1", title: "Shiny bangles", caption: "Obsessed with these bangles", poster: bangles },
  { id: "2", title: "Catalog Collections", caption: "New arrivals just dropped", poster: necklace },
  { id: "3", title: "Heart necklace", caption: "Tum kab Dilaoge ye viral heart neclace", poster: earrings },
  { id: "4", title: "Signature ring", caption: "A ring to remember", poster: ring },
  { id: "5", title: "Evening clutch", caption: "Perfect for date nights", poster: clutch },
  { id: "6", title: "Lip love", caption: "The velvet matte edit", poster: lipstick },
];

const StudioFeed = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState<Record<string, boolean>>({});

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? (card as HTMLElement).offsetWidth + 16 : 280;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-accent" />
            <h2 className="font-heading text-[11px] sm:text-xs tracking-[0.3em] text-accent uppercase">
              Bambotia Studio Feed
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
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 scrollbar-hide"
        >
          {reels.map((r) => {
            const isMuted = muted[r.id] ?? true;
            return (
              <article
                key={r.id}
                className="snap-start shrink-0 w-[70vw] sm:w-[280px] group"
              >
                <div className="relative aspect-[9/14] rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
                  <img
                    src={r.poster}
                    alt={r.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
                  <p className="absolute top-4 left-4 right-10 font-heading text-white text-lg leading-snug drop-shadow-lg [text-shadow:_0_2px_8px_rgb(0_0_0_/_60%)]">
                    {r.caption}
                  </p>
                  <button
                    onClick={() => setMuted((m) => ({ ...m, [r.id]: !isMuted }))}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/50 backdrop-blur text-white hover:bg-black/70 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="mt-3 text-sm text-foreground font-medium">{r.title}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StudioFeed;