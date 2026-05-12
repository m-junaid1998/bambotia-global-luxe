import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Filter,
  Phone,
  MessageCircle,
  Printer,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  ORDER_STATUSES,
  STATUS_META,
  useOrders,
  type Order,
  type OrderStatus,
} from "@/contexts/OrdersContext";

const fmtDate = (ts: number) =>
  new Date(ts).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
const fmtDateTime = (ts: number) =>
  new Date(ts).toLocaleString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] font-medium uppercase border rounded-full px-2.5 py-1 ${meta.className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ShoppingBag;
  label: string;
  value: string;
}) => (
  <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-5 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className="w-9 h-9 rounded-md bg-accent/15 flex items-center justify-center">
        <Icon className="w-4 h-4 text-accent" />
      </div>
    </div>
    <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-1">{label}</p>
    <p className="font-serif text-2xl text-foreground">{value}</p>
  </div>
);

const printInvoice = (order: Order) => {
  const win = window.open("", "_blank", "width=820,height=900");
  if (!win) return;
  const itemsRows = order.items
    .map(
      (i) => `
        <tr>
          <td>${i.name}</td>
          <td style="text-align:center">${i.quantity}</td>
          <td style="text-align:right">PKR ${i.price.toLocaleString()}</td>
          <td style="text-align:right">PKR ${(i.price * i.quantity).toLocaleString()}</td>
        </tr>`,
    )
    .join("");
  win.document.write(`<!doctype html><html><head><title>Invoice ${order.orderNumber}</title>
    <style>
      body{font-family:Inter,system-ui,sans-serif;color:#111;padding:32px;max-width:780px;margin:0 auto;}
      h1{font-family:'Playfair Display',serif;letter-spacing:.05em;margin:0;}
      .muted{color:#666;font-size:12px}
      table{width:100%;border-collapse:collapse;margin-top:24px;font-size:13px}
      th,td{padding:10px;border-bottom:1px solid #eee;text-align:left}
      .totals td{border:none;padding:4px 10px}
      .totals tr.grand td{border-top:2px solid #111;font-weight:700;font-size:15px;padding-top:10px}
      .row{display:flex;justify-content:space-between;gap:24px;margin-top:24px}
      .row > div{flex:1}
      .badge{display:inline-block;font-size:10px;letter-spacing:.2em;padding:4px 10px;border:1px solid #999;border-radius:999px;text-transform:uppercase;margin-top:4px}
    </style></head><body>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #111;padding-bottom:16px">
      <div>
        <h1>BAMBOTIA</h1>
        <p class="muted">Luxury jewellery, cosmetics & purses</p>
      </div>
      <div style="text-align:right">
        <p style="margin:0;font-size:18px;font-weight:600">INVOICE</p>
        <p class="muted" style="margin:4px 0">#${order.orderNumber}</p>
        <p class="muted" style="margin:0">${fmtDate(order.placedAt)}</p>
        <span class="badge">${STATUS_META[order.status].label}</span>
      </div>
    </div>
    <div class="row">
      <div>
        <p class="muted" style="margin:0 0 4px 0">BILL TO</p>
        <p style="margin:0;font-weight:600">${order.customer.fullName}</p>
        <p style="margin:2px 0">${order.customer.phone}</p>
        <p style="margin:2px 0">${order.customer.address}, ${order.customer.area}, ${order.customer.city}</p>
      </div>
      <div style="text-align:right">
        <p class="muted" style="margin:0 0 4px 0">PAYMENT</p>
        <p style="margin:0">${order.paymentMethod}</p>
        <p class="muted" style="margin:8px 0 4px 0">DELIVERY</p>
        <p style="margin:0">${order.estimatedDelivery}</p>
      </div>
    </div>
    <table>
      <thead><tr><th>Product</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Total</th></tr></thead>
      <tbody>${itemsRows}</tbody>
    </table>
    <table class="totals" style="margin-top:8px">
      <tr><td>Subtotal</td><td style="text-align:right">PKR ${order.subtotal.toLocaleString()}</td></tr>
      <tr><td>Shipping</td><td style="text-align:right">${order.shipping === 0 ? "FREE" : "PKR " + order.shipping.toLocaleString()}</td></tr>
      <tr class="grand"><td>Total</td><td style="text-align:right">PKR ${order.total.toLocaleString()}</td></tr>
    </table>
    <p class="muted" style="margin-top:32px;text-align:center">Thank you for shopping with BAMBOTIA.</p>
    <script>window.onload=()=>{window.print();}</script>
    </body></html>`);
  win.document.close();
};

const downloadInvoice = (order: Order) => {
  const lines = [
    `BAMBOTIA — Invoice ${order.orderNumber}`,
    `Date: ${fmtDateTime(order.placedAt)}`,
    `Status: ${STATUS_META[order.status].label}`,
    "",
    `Customer: ${order.customer.fullName}`,
    `Phone: ${order.customer.phone}`,
    `Address: ${order.customer.address}, ${order.customer.area}, ${order.customer.city}`,
    "",
    "Items:",
    ...order.items.map(
      (i) => `  - ${i.name} x ${i.quantity}  PKR ${(i.price * i.quantity).toLocaleString()}`,
    ),
    "",
    `Subtotal: PKR ${order.subtotal.toLocaleString()}`,
    `Shipping: ${order.shipping === 0 ? "FREE" : "PKR " + order.shipping.toLocaleString()}`,
    `Total:    PKR ${order.total.toLocaleString()}`,
    `Payment:  ${order.paymentMethod}`,
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${order.orderNumber}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const waLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

const AdminOrders = () => {
  const { orders, updateStatus, cancelOrder } = useOrders();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month">("all");
  const [activeId, setActiveId] = useState<string | null>(null);

  // Toast on new orders
  const seenCountRef = useRef<number | null>(null);
  useEffect(() => {
    if (seenCountRef.current === null) {
      seenCountRef.current = orders.length;
      return;
    }
    if (orders.length > seenCountRef.current) {
      const fresh = orders[0];
      toast.success(`New order ${fresh.orderNumber}`, {
        description: `${fresh.customer.fullName} • PKR ${fresh.total.toLocaleString()}`,
      });
    }
    seenCountRef.current = orders.length;
  }, [orders]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const now = Date.now();
    const dayMs = 1000 * 60 * 60 * 24;
    const cutoff =
      dateFilter === "today"
        ? now - dayMs
        : dateFilter === "week"
          ? now - dayMs * 7
          : dateFilter === "month"
            ? now - dayMs * 30
            : 0;
    return orders
      .filter((o) => (statusFilter === "all" ? true : o.status === statusFilter))
      .filter((o) => (cutoff === 0 ? true : o.placedAt >= cutoff))
      .filter((o) => {
        if (!q) return true;
        return (
          o.orderNumber.toLowerCase().includes(q) ||
          o.customer.fullName.toLowerCase().includes(q) ||
          o.customer.phone.toLowerCase().includes(q) ||
          o.customer.city.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.placedAt - a.placedAt);
  }, [orders, query, statusFilter, dateFilter]);

  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((s, o) => s + o.total, 0);
    const pending = orders.filter((o) => o.status === "pending").length;
    return {
      total: orders.length,
      pending,
      revenue: totalRevenue,
    };
  }, [orders]);

  const activeOrder = orders.find((o) => o.id === activeId) ?? null;

  const handleStatusChange = (id: string, status: OrderStatus) => {
    updateStatus(id, status);
    toast.success(`Order marked as ${STATUS_META[status].label}`);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <p className="text-[10px] tracking-[0.4em] text-accent mb-2">FULFILLMENT</p>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Manage incoming customer orders, update status, and contact customers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={ShoppingBag} label="TOTAL ORDERS" value={String(stats.total)} />
        <StatCard icon={Clock} label="PENDING" value={String(stats.pending)} />
        <StatCard icon={TrendingUp} label="REVENUE" value={`PKR ${stats.revenue.toLocaleString()}`} />
      </div>

      {/* Filters */}
      <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search order #, name, phone, city"
            className="pl-9 h-11"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <SelectTrigger className="h-11 md:w-44">
            <Filter className="w-3.5 h-3.5 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {ORDER_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_META[s].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={(v) => setDateFilter(v as typeof dateFilter)}>
          <SelectTrigger className="h-11 md:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All dates</SelectItem>
            <SelectItem value="today">Last 24 hours</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders table */}
      {filtered.length === 0 ? (
        <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-12 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">
            {orders.length === 0 ? "No orders yet. Place a test order from the storefront." : "No orders match your filters."}
          </p>
        </div>
      ) : (
        <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr className="text-[10px] tracking-[0.2em] text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">ORDER</th>
                  <th className="px-4 py-3 text-left font-medium">CUSTOMER</th>
                  <th className="px-4 py-3 text-left font-medium">ITEMS</th>
                  <th className="px-4 py-3 text-left font-medium">TOTAL</th>
                  <th className="px-4 py-3 text-left font-medium">PAYMENT</th>
                  <th className="px-4 py-3 text-left font-medium">DATE</th>
                  <th className="px-4 py-3 text-left font-medium">STATUS</th>
                  <th className="px-4 py-3 text-right font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => {
                  const itemCount = o.items.reduce((s, i) => s + i.quantity, 0);
                  return (
                    <tr key={o.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setActiveId(o.id)}
                          className="font-medium text-accent hover:underline"
                        >
                          {o.orderNumber}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-foreground">{o.customer.fullName}</p>
                        <p className="text-xs text-muted-foreground">{o.customer.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {itemCount} item{itemCount === 1 ? "" : "s"}
                      </td>
                      <td className="px-4 py-3 text-foreground">PKR {o.total.toLocaleString()}</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.paymentMethod}</td>
                      <td className="px-4 py-3 text-muted-foreground">{fmtDate(o.placedAt)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={o.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          {o.status === "pending" && (
                            <button
                              onClick={() => handleStatusChange(o.id, "confirmed")}
                              className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                            >
                              Confirm
                            </button>
                          )}
                          <button
                            onClick={() => setActiveId(o.id)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                            aria-label="View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order detail drawer */}
      <Sheet open={!!activeId} onOpenChange={(o) => !o && setActiveId(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {activeOrder && (
            <>
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl">
                  Order {activeOrder.orderNumber}
                </SheetTitle>
                <SheetDescription>
                  Placed {fmtDateTime(activeOrder.placedAt)}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge status={activeOrder.status} />
                  <Select
                    value={activeOrder.status}
                    onValueChange={(v) => handleStatusChange(activeOrder.id, v as OrderStatus)}
                  >
                    <SelectTrigger className="h-9 w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATUS_META[s].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/20 border border-border rounded-xl p-4">
                  <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-2">CUSTOMER</p>
                  <p className="text-foreground font-medium">{activeOrder.customer.fullName}</p>
                  <p className="text-sm text-muted-foreground">{activeOrder.customer.phone}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activeOrder.customer.address}, {activeOrder.customer.area}, {activeOrder.customer.city}
                  </p>
                  {activeOrder.customer.notes && (
                    <p className="text-xs text-muted-foreground italic mt-2">
                      &ldquo;{activeOrder.customer.notes}&rdquo;
                    </p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <a
                      href={`tel:${activeOrder.customer.phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                    >
                      <Phone className="w-3 h-3" /> Call
                    </a>
                    <a
                      href={waLink(activeOrder.customer.phone)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" /> WhatsApp
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">ITEMS</p>
                  <div className="space-y-3">
                    {activeOrder.items.map((i) => (
                      <div key={i.productId} className="flex gap-3">
                        <img
                          src={i.image}
                          alt={i.name}
                          className="w-14 h-14 object-cover rounded-md border border-border bg-muted shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground line-clamp-2">{i.name}</p>
                          <p className="text-xs text-muted-foreground">Qty {i.quantity}</p>
                        </div>
                        <p className="text-sm text-foreground whitespace-nowrap">
                          PKR {(i.price * i.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>PKR {activeOrder.subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{activeOrder.shipping === 0 ? "FREE" : `PKR ${activeOrder.shipping.toLocaleString()}`}</span></div>
                  <div className="flex justify-between font-medium pt-2 border-t border-border mt-2">
                    <span>Total</span><span className="text-accent">PKR {activeOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3">TIMELINE</p>
                  <ol className="space-y-3 border-l border-border pl-4">
                    {activeOrder.timeline.map((t, idx) => (
                      <li key={idx} className="relative">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-accent" />
                        <p className="text-sm text-foreground">{STATUS_META[t.status].label}</p>
                        <p className="text-xs text-muted-foreground">{fmtDateTime(t.at)}{t.note ? ` • ${t.note}` : ""}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => printInvoice(activeOrder)}>
                    <Printer className="w-3.5 h-3.5" /> Print Invoice
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => downloadInvoice(activeOrder)}>
                    <Download className="w-3.5 h-3.5" /> Download
                  </Button>
                  {activeOrder.status === "pending" && (
                    <Button size="sm" onClick={() => handleStatusChange(activeOrder.id, "confirmed")}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Order
                    </Button>
                  )}
                  {activeOrder.status !== "cancelled" && activeOrder.status !== "delivered" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        cancelOrder(activeOrder.id);
                        toast.success("Order cancelled");
                      }}
                    >
                      <XCircle className="w-3.5 h-3.5" /> Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminOrders;