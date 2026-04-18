import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, Eye, Package, Percent } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAdminProducts } from "@/contexts/AdminProductsContext";

const revenueData = [
  { month: "Jan", revenue: 245000, orders: 32 },
  { month: "Feb", revenue: 312000, orders: 41 },
  { month: "Mar", revenue: 289000, orders: 38 },
  { month: "Apr", revenue: 398000, orders: 52 },
  { month: "May", revenue: 445000, orders: 61 },
  { month: "Jun", revenue: 521000, orders: 68 },
  { month: "Jul", revenue: 612000, orders: 79 },
  { month: "Aug", revenue: 587000, orders: 74 },
];

const topProducts = [
  { name: "Emerald Jhumka Earrings", sales: 142, revenue: 1775000 },
  { name: "Royal Gold Bangle Set", sales: 98, revenue: 2156000 },
  { name: "Velvet Rose Lipstick", sales: 87, revenue: 287100 },
  { name: "Pearl Drop Necklace", sales: 73, revenue: 1387000 },
  { name: "Embroidered Clutch", sales: 65, revenue: 845000 },
];

const categoryData = [
  { category: "Jewellery", sales: 384 },
  { category: "Cosmetics", sales: 256 },
  { category: "Purses", sales: 178 },
];

const fmtPKR = (n: number) => `PKR ${(n / 1000).toFixed(0)}k`;

const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  positive = true,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}) => (
  <div className="bg-card border border-border rounded-lg p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <span
        className={`text-xs flex items-center gap-1 ${
          positive ? "text-green-600 dark:text-green-500" : "text-destructive"
        }`}
      >
        {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {change}
      </span>
    </div>
    <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-1">{label}</p>
    <p className="font-serif text-2xl text-foreground">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const { products } = useAdminProducts();

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <p className="text-[10px] tracking-[0.4em] text-accent mb-2">OVERVIEW</p>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Welcome back. Here's how BAMBOTIA is performing today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="TOTAL REVENUE" value="PKR 3.4M" change="+12.5%" />
        <StatCard icon={ShoppingBag} label="ORDERS" value="445" change="+8.2%" />
        <StatCard icon={Users} label="CUSTOMERS" value="1,284" change="+18.4%" />
        <StatCard icon={DollarSign} label="AVG. ORDER VALUE" value="PKR 7,640" change="+3.1%" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="VISITORS" value="24,891" change="+22.1%" />
        <StatCard icon={Percent} label="CONVERSION" value="3.42%" change="+0.4%" />
        <StatCard icon={TrendingDown} label="BOUNCE RATE" value="38.2%" change="-2.1%" positive={false} />
        <StatCard icon={Package} label="PRODUCTS LIVE" value={String(12 + products.length)} change={`+${products.length} new`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.4em] text-accent mb-1">REVENUE</p>
            <h3 className="font-serif text-xl text-foreground">Sales Over Time</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={fmtPKR} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [`PKR ${v.toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.4em] text-accent mb-1">CATEGORIES</p>
            <h3 className="font-serif text-xl text-foreground">Sales by Category</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis type="category" dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={80} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-6">
          <p className="text-[10px] tracking-[0.4em] text-accent mb-1">BEST SELLERS</p>
          <h3 className="font-serif text-xl text-foreground">Top Products</h3>
        </div>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div
              key={p.name}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-4">
                <span className="font-serif text-2xl text-accent w-8">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-sm text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sales} units sold</p>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">PKR {p.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
