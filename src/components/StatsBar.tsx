const stats = [
  { value: "500+", label: "LUXURY PRODUCTS" },
  { value: "10K+", label: "HAPPY CUSTOMERS" },
  { value: "3", label: "PREMIUM CATEGORIES" },
  { value: "100%", label: "AUTHENTIC QUALITY" },
];

const StatsBar = () => (
  <section className="border-y border-border bg-muted/30">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="py-8 text-center border-r border-border last:border-r-0">
          <p className="font-heading text-2xl md:text-3xl font-bold text-gradient-gold">{stat.value}</p>
          <p className="text-xs tracking-[0.2em] text-muted-foreground mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBar;
