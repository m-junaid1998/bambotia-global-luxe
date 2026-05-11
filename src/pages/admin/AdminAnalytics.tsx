import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useOrders } from "@/contexts/OrdersContext";

const AdminAnalytics = () => {
  const { orders } = useOrders();

  const daily = useMemo(() => {
    const map = new Map<string, number>();
    for (const o of orders) {
      if (o.status === "cancelled") continue;
      const d = new Date(o.placedAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      map.set(key, (map.get(key) ?? 0) + o.total);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, revenue]) => ({ day, revenue }));
  }, [orders]);

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <p className="text-[10px] tracking-[0.4em] text-accent mb-2">INSIGHTS</p>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-2">Daily revenue across all confirmed orders.</p>
      </div>
      <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm">
        <div className="h-80">
          {daily.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No order data yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={daily}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number) => [`PKR ${v.toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#aGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;