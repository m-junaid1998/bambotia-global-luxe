import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import {
  Banknote,
  ChevronRight,
  Loader2,
  Lock,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";

const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 250;

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+92\s?3\d{2}[\s-]?\d{7}$/, "Use format +92 3XX XXXXXXX"),
  city: z.string().trim().min(2, "City is required").max(60),
  area: z.string().trim().min(2, "Area / Town is required").max(80),
  address: z.string().trim().min(8, "Please enter a complete address").max(250),
  notes: z.string().trim().max(400).optional().or(z.literal("")),
});

type FormState = z.infer<typeof checkoutSchema>;

const initialForm: FormState = {
  fullName: "",
  phone: "+92 ",
  city: "",
  area: "",
  address: "",
  notes: "",
};

const Checkout = () => {
  const navigate = useNavigate();

  const { items, totalPrice, totalItems, addItem, decrementItem } = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Checkout | BAMBOTIA";
  }, []);

  const shipping = useMemo(
    () =>
      totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0
        ? 0
        : SHIPPING_FEE,
    [totalPrice],
  );
  const grandTotal = totalPrice + shipping;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your bag is empty");
      return;
    }
    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    toast.success("Order placed! We'll call to confirm shortly.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Checkout</span>
          </nav>

          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-accent mb-3">
              SECURE CHECKOUT
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-2">
              Complete Your Order
            </h1>
            <p className="text-sm text-muted-foreground inline-flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-accent" />
              Your information is safe and used only for delivery
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8">
            {/* LEFT: Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer info */}
              <section className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl md:text-2xl text-foreground">
                    Customer Information
                  </h2>
                  <span className="text-[10px] tracking-[0.2em] text-accent">
                    STEP 1
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      autoComplete="name"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      placeholder="Enter Full Name"
                      className="mt-1.5 h-11"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+92 3XX XXXXXXX"
                      className="mt-1.5 h-11"
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="Enter City"
                      className="mt-1.5 h-11"
                    />
                    {errors.city && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="area">Area / Town</Label>
                    <Input
                      id="area"
                      value={form.area}
                      onChange={(e) => update("area", e.target.value)}
                      placeholder="Enter Your Area/Town"
                      className="mt-1.5 h-11"
                    />
                    {errors.area && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.area}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Complete Delivery Address</Label>
                    <Textarea
                      id="address"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      placeholder="House #, Street, Landmark..."
                      className="mt-1.5 min-h-[90px]"
                    />
                    {errors.address && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="notes">
                      Order Notes{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="notes"
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Any special instructions for delivery"
                      className="mt-1.5 min-h-[70px]"
                    />
                  </div>
                </div>
              </section>

              {/* Shipping */}
              <section className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl md:text-2xl text-foreground">
                    Shipping Method
                  </h2>
                  <span className="text-[10px] tracking-[0.2em] text-accent">
                    STEP 2
                  </span>
                </div>

                <div className="border border-accent/40 bg-gold-subtle rounded-xl p-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-foreground">
                        Standard Delivery
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {shipping === 0 ? "FREE" : `PKR ${SHIPPING_FEE}`}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Estimated delivery: 3–5 business days across Pakistan
                    </p>
                    <p className="text-xs text-accent mt-2">
                      Free shipping on orders over PKR{" "}
                      {FREE_SHIPPING_THRESHOLD.toLocaleString()}
                    </p>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl md:text-2xl text-foreground">
                    Payment Method
                  </h2>
                  <span className="text-[10px] tracking-[0.2em] text-accent">
                    STEP 3
                  </span>
                </div>

                <label className="flex items-start gap-4 p-5 border-2 border-accent rounded-xl bg-gold-subtle cursor-pointer">
                  <div className="w-11 h-11 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                    <Banknote className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">
                        Cash on Delivery (COD)
                      </p>
                      <span className="text-[10px] tracking-wider px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-semibold">
                        RECOMMENDED
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pay in cash when your order arrives at your doorstep.
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-foreground/80">
                      <ShieldCheck className="w-4 h-4 text-accent" />
                      <span>100% secure — inspect before payment</span>
                    </div>
                  </div>
                </label>
              </section>

              {/* Submit (mobile) */}
              <div className="lg:hidden">
                <PlaceOrderButton submitting={submitting} total={grandTotal} />
              </div>
            </form>

            {/* RIGHT: Order Summary */}
            <aside className="lg:sticky lg:top-24 h-fit">
              <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 md:p-7 shadow-sm">
                <h2 className="font-heading text-xl text-foreground mb-5">
                  Order Summary
                </h2>

                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center">
                    Your bag is empty.{" "}
                    <Link to="/" className="text-accent hover:underline">
                      Continue shopping
                    </Link>
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                      {items.map((item) => (
                        <div key={item.productId} className="flex gap-3">
                          <div className="relative shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-32 h-32 object-cover rounded-md bg-muted border border-border"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground line-clamp-2">
                              {item.name}
                            </p>

                            <p className="text-xs text-muted-foreground mt-0.5">
                              Qty {item.quantity}
                            </p>

                            <div className="flex items-center gap-2 border border-border rounded-md mt-2 w-fit">
                              <button
                                onClick={() => decrementItem(item.productId)}
                                className="p-1.5 hover:bg-muted transition-colors"
                                aria-label="Decrease quantity"
                                type="button"
                              >
                                <Minus className="w-3 h-3" />
                              </button>

                              <span className="text-sm w-6 text-center">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  addItem({
                                    productId: item.productId,
                                    name: item.name,
                                    price: item.price,
                                    currency: item.currency,
                                    image: item.image,
                                  })
                                }
                                className="p-1.5 hover:bg-muted transition-colors"
                                aria-label="Increase quantity"
                                type="button"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-5" />

                    <div className="space-y-2.5 text-sm">
                      <Row
                        label={`Subtotal (${totalItems} items)`}
                        value={`PKR ${totalPrice.toLocaleString()}`}
                      />
                      <Row
                        label="Delivery Charges"
                        value={
                          shipping === 0
                            ? "FREE"
                            : `PKR ${shipping.toLocaleString()}`
                        }
                        accent={shipping === 0}
                      />
                      <Row label="Discount" value="—" muted />
                    </div>

                    <Separator className="my-5" />

                    <div className="flex justify-between items-baseline">
                      <span className="text-xl tracking-[0.15em] font-medium">
                        TOTAL
                      </span>
                      <span className=" text-xl  font-medium">
                        PKR {grandTotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="hidden lg:block mt-6">
                      <PlaceOrderButton
                        submitting={submitting}
                        total={grandTotal}
                        onClick={() => {
                          (
                            document.querySelector(
                              "form",
                            ) as HTMLFormElement | null
                          )?.requestSubmit();
                        }}
                      />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                        Secure Order
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-accent" />
                        Private &amp; Encrypted
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-accent" />
                        Fast Delivery
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Banknote className="w-3.5 h-3.5 text-accent" />
                        Pay on Arrival
                      </div>
                    </div>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* WhatsApp floating support */}
      <a
        href="https://wa.me/923000000000?text=Hi%20BAMBOTIA%2C%20I%20need%20help%20with%20my%20order"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">WhatsApp</span>
      </a>

      <Footer />
    </div>
  );
};

const Row = ({
  label,
  value,
  muted,
  accent,
}: {
  label: string;
  value: string;
  muted?: boolean;
  accent?: boolean;
}) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span
      className={
        accent
          ? "text-accent font-semibold"
          : muted
            ? "text-muted-foreground"
            : "text-foreground"
      }
    >
      {value}
    </span>
  </div>
);

const PlaceOrderButton = ({
  submitting,
  total,
  onClick,
}: {
  submitting: boolean;
  total: number;
  onClick?: () => void;
}) => (
  <Button
    type={onClick ? "button" : "submit"}
    onClick={onClick}
    disabled={submitting}
    className="w-full h-13 py-4 text-sm tracking-[0.18em] font-semibold bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all rounded-xl"
  >
    {submitting ? (
      <>
        <Loader2 className="w-4 h-4 animate-spin" /> PLACING ORDER...
      </>
    ) : (
      <>
        <Lock className="w-4 h-4" /> PLACE ORDER • PKR {total.toLocaleString()}
      </>
    )}
  </Button>
);

export default Checkout;
