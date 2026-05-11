import { SUBCATEGORIES } from "@/data/products";

const AdminCategories = () => (
  <div className="space-y-8 max-w-5xl">
    <div>
      <p className="text-[10px] tracking-[0.4em] text-accent mb-2">CATALOG</p>
      <h1 className="font-serif text-3xl md:text-4xl text-foreground">Categories</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Top-level categories and their sub-categories used across the storefront.
      </p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(SUBCATEGORIES).map(([cat, subs]) => (
        <div
          key={cat}
          className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-6 shadow-sm"
        >
          <p className="text-[10px] tracking-[0.3em] text-accent mb-1">CATEGORY</p>
          <h3 className="font-serif text-xl text-foreground capitalize mb-4">{cat}</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {subs.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default AdminCategories;