import { useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Truck,
  MapPin,
  Phone,
  User,
  Banknote,
  Package,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import PrintInvoice from "./PrintInvoice";

export interface OrderConfirmationState {
  orderNumber: string;
  placedAt: number;
  customer: {
    fullName: string;
    phone: string;
    city: string;
    area: string;
    address: string;
    notes?: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  estimatedDelivery: string;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const state = location.state as OrderConfirmationState | null;

  const handlePrint = () => {
    const customerName = customer?.fullName
      ?.replace(/\s+/g, "-")
      ?.toLowerCase();

    document.title = `${customerName}-invoice`;

    window.print();
  };

  if (!state?.orderNumber) {
    return <Navigate to="/" replace />;
  }

  const {
    orderNumber,
    customer,
    items,
    subtotal,
    shipping,
    total,
    paymentMethod,
    estimatedDelivery,
    placedAt,
  } = state;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/15 mb-5">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <p className="text-xs tracking-[0.3em] text-accent mb-3">
              ORDER CONFIRMED
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
              Thank you for your order!
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              We&apos;ve received your order and will call shortly to confirm. A
              summary is shown below.
            </p>
          </div>

          {/* Order meta */}
          <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 shadow-sm mb-6">
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-1">
                  ORDER NUMBER
                </p>
                <p className="font-heading text-lg text-accent">
                  {orderNumber}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-1">
                  ORDER DATE
                </p>
                <p className="text-sm text-foreground">
                  {new Date(placedAt).toLocaleDateString("en-PK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-1">
                  PAYMENT
                </p>
                <p className="text-sm text-foreground inline-flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-accent" /> {paymentMethod}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery + Items */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <section className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="font-heading text-xl text-foreground mb-5 inline-flex items-center gap-2">
                <Truck className="w-5 h-5 text-accent" /> Delivery Details
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <User className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground">{customer.fullName}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground">{customer.phone}</span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    {customer.address}, {customer.area}, {customer.city}
                  </span>
                </li>
                {customer.notes && (
                  <li className="flex gap-3">
                    <MessageCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground italic">
                      &ldquo;{customer.notes}&rdquo;
                    </span>
                  </li>
                )}
              </ul>
              <Separator className="my-5" />
              <div className="flex items-start gap-3 text-sm">
                <Package className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">
                    Estimated delivery
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {estimatedDelivery}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="font-heading text-xl text-foreground mb-5">
                Order Summary
              </h2>
              <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md bg-muted border border-border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm text-foreground whitespace-nowrap">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <Separator className="my-5" />
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    PKR {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span
                    className={
                      shipping === 0
                        ? "text-accent font-medium"
                        : "text-foreground"
                    }
                  >
                    {shipping === 0
                      ? "FREE"
                      : `PKR ${shipping.toLocaleString()}`}
                  </span>
                </div>
              </div>
              <Separator className="my-5" />
              <div className="flex justify-between items-baseline">
                <span className="text-lg tracking-[0.15em] font-medium">
                  TOTAL
                </span>
                <span className="text-xl font-medium text-accent">
                  PKR {total.toLocaleString()}
                </span>
              </div>
            </section>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all text-sm font-medium tracking-wide"
            >
              Continue Shopping
            </Link>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-border text-foreground hover:border-accent hover:text-accent transition-all text-sm font-medium tracking-wide"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </main>
      <PrintInvoice
        orderNumber={orderNumber}
        customer={customer}
        items={items}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        paymentMethod={paymentMethod}
        estimatedDelivery={estimatedDelivery}
        placedAt={placedAt}
      />
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
