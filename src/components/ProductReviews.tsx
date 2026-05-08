import { useEffect, useMemo, useRef, useState } from "react";
import { Star, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

export interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: number;
  photos?: string[];
}

const STORAGE_KEY = "bambotia_reviews_v1";
const MAX_PHOTOS = 4;
const MAX_EDGE = 1024;
const MAX_FILE_BYTES = 8 * 1024 * 1024;

const fileToCompressedDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) return reject(new Error("Not an image"));
    if (file.size > MAX_FILE_BYTES) return reject(new Error("Image is too large (max 8MB)"));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to load image"));
      img.onload = () => {
        const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

const seedReviews: Review[] = [
  {
    id: "r-seed-1",
    productId: "*",
    name: "Ayesha K.",
    rating: 5,
    title: "Absolutely stunning",
    comment:
      "The craftsmanship is exquisite. Packaging felt premium and delivery was quick. Already getting compliments!",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
  },
  {
    id: "r-seed-2",
    productId: "*",
    name: "Hina M.",
    rating: 4,
    title: "Beautiful piece",
    comment: "Looks exactly like the pictures. Slightly smaller than expected but the quality is excellent.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 22,
  },
  {
    id: "r-seed-3",
    productId: "*",
    name: "Sara A.",
    rating: 5,
    title: "Worth every rupee",
    comment: "BAMBOTIA never disappoints. Elegant, well-finished, and feels luxurious in hand.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 35,
  },
];

const loadAll = (): Review[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
};

const saveAll = (list: Review[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
};

const formatDate = (ts: number) =>
  new Date(ts).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const Stars = ({ value, size = 14 }: { value: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        style={{ width: size, height: size }}
        className={n <= value ? "fill-accent text-accent" : "text-muted-foreground/40"}
      />
    ))}
  </div>
);

const RatingInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n)}
          className="p-0.5"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            className={`w-6 h-6 transition-colors ${
              (hover || value) >= n ? "fill-accent text-accent" : "text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const ProductReviews = ({ productId }: { productId: string }) => {
  const [all, setAll] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setAll(loadAll());
  }, []);

  const reviews = useMemo(() => {
    const own = all.filter((r) => r.productId === productId);
    const seeds = seedReviews.map((r) => ({ ...r, id: `${r.id}-${productId}`, productId }));
    return [...own, ...seeds].sort((a, b) => b.createdAt - a.createdAt);
  }, [all, productId]);

  const avg = useMemo(
    () => (reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0),
    [reviews]
  );

  const distribution = useMemo(() => {
    const d = [0, 0, 0, 0, 0];
    reviews.forEach((r) => (d[5 - r.rating] += 1));
    return d;
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || rating < 1) {
      toast.error("Please add your name, rating and review.");
      return;
    }
    const next: Review = {
      id: `r-${Date.now()}`,
      productId,
      name: name.trim(),
      rating,
      title: title.trim(),
      comment: comment.trim(),
      createdAt: Date.now(),
    };
    const updated = [next, ...all];
    setAll(updated);
    saveAll(updated);
    setName("");
    setRating(0);
    setTitle("");
    setComment("");
    setShowForm(false);
    toast.success("Thank you! Your review has been posted.");
  };

  return (
    <section className="mt-16 border-t border-border pt-12">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-3">
            <Stars value={Math.round(avg)} size={16} />
            <span className="text-sm text-foreground font-medium">{avg.toFixed(1)} out of 5</span>
            <span className="text-sm text-muted-foreground">
              ({reviews.length} review{reviews.length === 1 ? "" : "s"})
            </span>
          </div>
        </div>
        <Button
          onClick={() => setShowForm((s) => !s)}
          variant={showForm ? "outline" : "default"}
          className="rounded-full px-6"
        >
          {showForm ? "Cancel" : "Write a review"}
        </Button>
      </div>

      {/* Distribution */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-2">
          {distribution.map((count, i) => {
            const stars = 5 - i;
            const pct = reviews.length ? (count / reviews.length) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-sm">
                <span className="w-12 text-muted-foreground">{stars} star</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right text-muted-foreground">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border border-border rounded-md p-6 mb-10 bg-card/50 space-y-4"
        >
          <h3 className="font-heading text-lg font-semibold text-foreground">Share your experience</h3>
          <div>
            <label className="block text-xs tracking-wider text-muted-foreground mb-2">YOUR RATING</label>
            <RatingInput value={rating} onChange={setRating} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wider text-muted-foreground mb-2">NAME</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs tracking-wider text-muted-foreground mb-2">
                REVIEW TITLE (OPTIONAL)
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sum it up in a few words"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs tracking-wider text-muted-foreground mb-2">YOUR REVIEW</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you loved about the product..."
              rows={4}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="rounded-full px-8">
              Submit review
            </Button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-6">
        {reviews.map((r) => (
          <div key={r.id} className="border-b border-border pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback className="bg-accent/10 text-accent text-sm font-medium">
                  {initials(r.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <span className="text-xs text-muted-foreground">{formatDate(r.createdAt)}</span>
                </div>
                <Stars value={r.rating} />
                {r.title && (
                  <h4 className="text-sm font-semibold text-foreground mt-2">{r.title}</h4>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{r.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductReviews;