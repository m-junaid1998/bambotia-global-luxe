import { useMemo, useState } from "react";
import { Search, Phone, MessageCircle, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useOrders, type Order } from "@/contexts/OrdersContext";

interface CustomerRow {
  key: string;
  name: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderAt: number;
  isRepeat: boolean;
  orders: Order[];
}

const buildCustomers = (orders: Order[]): CustomerRow[] => {
  const map = new Map<string, CustomerRow>();
  for (const o of orders) {
    const key = o.customer.phone.replace(/\s+/g, "");
    const existing = map.get(key);
    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpent += o.status === "cancelled" ? 0 : o.total;
      existing.lastOrderAt = Math.max(existing.lastOrderAt, o.placedAt);
      existing.orders.push(o);
    } else {
      map.set(key, {
        key,
        name: o.customer.fullName,
        phone: o.customer.phone,
        city: o.customer.city,
        totalOrders: 1,
        totalSpent: o.status === "cancelled" ? 0 : o.total,
        lastOrderAt: o.placedAt,
        isRepeat: false,
        orders: [o],
      });
    }
  }
  return Array.from(map.values()).map((c) => ({ ...c, isRepeat: c.totalOrders > 1 }));
};

const waLink = (phone: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}`;

const AdminCustomers = () => {
  const { orders } = useOrders();
  const [query, setQuery] = useState("");

  const customers = useMemo(() => {
    const all = buildCustomers(orders);
    const q = query.trim().toLowerCase();
    const filtered = q
      ? all.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.phone.toLowerCase().includes(q) ||
            c.city.toLowerCase().includes(q),
        )
      : all;
    return filtered.sort((a, b) => b.lastOrderAt - a.lastOrderAt);
  }, [orders, query]);

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.4em] text-accent mb-2">PEOPLE</p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {customers.length} customer{customers.length === 1 ? "" : "s"} •{" "}
            {customers.filter((c) => c.isRepeat).length} repeat buyer
            {customers.filter((c) => c.isRepeat).length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name, phone, city"
            className="pl-9 h-11"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-12 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">No customers yet. Place an order to see it here.</p>
        </div>
      ) : (
        <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr className="text-[10px] tracking-[0.2em] text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">CUSTOMER</th>
                  <th className="px-4 py-3 text-left font-medium">PHONE</th>
                  <th className="px-4 py-3 text-left font-medium">CITY</th>
                  <th className="px-4 py-3 text-left font-medium">ORDERS</th>
                  <th className="px-4 py-3 text-left font-medium">TOTAL SPENT</th>
                  <th className="px-4 py-3 text-right font-medium">CONTACT</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.key} className="border-t border-border hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-[11px] font-medium text-accent uppercase">
                          {c.name.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-foreground">{c.name}</p>
                          {c.isRepeat && (
                            <p className="text-[10px] text-accent inline-flex items-center gap-1">
                              <Star className="w-3 h-3" /> Repeat customer
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.city}</td>
                    <td className="px-4 py-3 text-foreground">{c.totalOrders}</td>
                    <td className="px-4 py-3 text-foreground">PKR {c.totalSpent.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`tel:${c.phone.replace(/\s+/g, "")}`}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                          aria-label="Call"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={waLink(c.phone)}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                          aria-label="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;