import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Film, Play, Volume2, VolumeX } from "lucide-react";

type Reel = {
  id: string;
  title: string;
  caption: string;
  thumbnail: string;
  videoUrl: string;
};

// Pool of sample vertical videos (royalty-free). Randomly assigned to jewellery items.
const VIDEO_POOL = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
];

const fetchReels = async (): Promise<Reel[]> => {
  // Random jewellery items from DummyJSON — a free public products API.
  const res = await fetch("https://dummyjson.com/products/category/womens-jewellery?limit=8");
  if (!res.ok) throw new Error(`Failed to load reels: ${res.status}`);
  const json = await res.json();
  const items = (json.products ?? []) as Array<{
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    images: string[];
  }>;
  return items.map((p, i) => ({
    id: String(p.id),
    title: p.title,
    caption: p.description?.split(".")[0] ?? p.title,
    thumbnail: p.images?.[0] ?? p.thumbnail,
    videoUrl: VIDEO_POOL[i % VIDEO_POOL.length],
  }));
};

const StudioFeed = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [muted, setMuted] = useState<Record<string, boolean>>({});
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  const [inView, setInView] = useState(false);

  const { data: reels, isLoading, isError } = useQuery({
    queryKey: ["studio-reels"],
    queryFn: fetchReels,
    staleTime: 5 * 60 * 1000, // 5 min — data considered fresh
    gcTime: 30 * 60 * 1000, // 30 min — keep in cache after unmount
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    refetchOnWindowFocus: false,
  });

  // Autoplay all reels when section enters viewport; pause when it leaves.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!reels) return;
    const updates: Record<string, boolean> = {};
    reels.forEach((r) => {
      const v = videoRefs.current[r.id];
      if (!v) return;
      if (inView) {
        v.muted = true;
        v.play().then(() => { updates[r.id] = true; }).catch(() => {});
      } else {
        v.pause();
        updates[r.id] = false;
      }
    });
    setPlaying((p) => ({ ...p, ...updates }));
    if (inView) {
      setMuted((m) => {
        const next = { ...m };
        reels.forEach((r) => { if (next[r.id] === undefined) next[r.id] = true; });
        return next;
      });
    }
  }, [inView, reels]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? (card as HTMLElement).offsetWidth + 16 : 280;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const togglePlay = (id: string) => {
    const v = videoRefs.current[id];
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying((p) => ({ ...p, [id]: true }));
    } else {
      v.pause();
      setPlaying((p) => ({ ...p, [id]: false }));
    }
  };

  return (
    <section ref={sectionRef} className="py-14 md:py-20 bg-background">
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

        {isLoading && (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-[70vw] sm:w-[280px] aspect-[9/14] rounded-2xl bg-card animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-sm text-muted-foreground py-8">
            Couldn't load the studio feed right now. Please try again shortly.
          </p>
        )}

        {reels && reels.length > 0 && (
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 scrollbar-hide"
          >
            {reels.map((r) => {
              const isMuted = muted[r.id] ?? true;
              const isPlaying = playing[r.id] ?? false;
              return (
                <article
                  key={r.id}
                  className="snap-start shrink-0 w-[70vw] sm:w-[280px] group"
                >
                  <div className="relative aspect-[9/14] rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
                    <video
                      ref={(el) => {
                        videoRefs.current[r.id] = el;
                      }}
                      src={r.videoUrl}
                      poster={r.thumbnail}
                      muted={isMuted}
                      loop
                      playsInline
                      preload="metadata"
                      onClick={() => togglePlay(r.id)}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
                    <p className="pointer-events-none absolute top-4 left-4 right-10 font-heading text-white text-lg leading-snug [text-shadow:_0_2px_8px_rgb(0_0_0_/_60%)]">
                      {r.caption}
                    </p>
                    {!isPlaying && (
                      <button
                        onClick={() => togglePlay(r.id)}
                        aria-label="Play video"
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span className="p-4 rounded-full bg-black/40 backdrop-blur text-white group-hover:bg-black/60 transition-colors">
                          <Play className="w-5 h-5 fill-current" />
                        </span>
                      </button>
                    )}
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
        )}
      </div>
    </section>
  );
};

export default StudioFeed;