// import { useParams, Link } from "react-router-dom";
// import { ArrowLeft, ChevronRight } from "lucide-react";
// import { formatPrice, getDiscountPercent } from "@/data/products";
// import { useStorefrontProductsByCategory } from "@/hooks/useStorefrontProducts";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import WishlistButton from "@/components/WishlistButton";

// const categoryMeta: Record<string, { title: string; subtitle: string }> = {
//   jewellery: { title: "Luxury Jewellery", subtitle: "Timeless pieces crafted with precision and adorned with natural stones" },
//   cosmetics: { title: "Professional Cosmetics", subtitle: "Enhance your natural radiance with our curated beauty collection" },
//   purses: { title: "Designer Purses", subtitle: "Statement accessories for every occasion, crafted with premium materials" },
// };

// const CategoryPage = () => {
//   const { category } = useParams<{ category: string }>();
//   const products = useStorefrontProductsByCategory(category || "");
//   const meta = categoryMeta[category || ""];

//   if (!meta || products.length === 0) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="font-heading text-3xl text-foreground mb-4">Category Not Found</h1>
//           <Link to="/" className="text-accent hover:underline">Return to Home</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       

//       <main className="pt-24 pb-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Breadcrumb */}
//           <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
//             <Link to="/" className="hover:text-accent transition-colors">Home</Link>
//             <ChevronRight className="w-3 h-3" />
//             <span className="text-foreground">{meta.title}</span>
//           </nav>

//           {/* Header */}
//           <div className="text-center mb-16">
//             <p className="text-sm tracking-[0.3em] text-accent mb-3">COLLECTION</p>
//             <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
//               {meta.title}
//             </h1>
//             <p className="text-muted-foreground max-w-xl mx-auto">{meta.subtitle}</p>
//           </div>

//           {/* Product Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {products.map((p) => (
//               <Link
//                 key={p.id}
//                 to={`/product/${p.slug}`}
//                 className="group cursor-pointer"
//               >
//                 <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-4">
//                   <img
//                     src={p.images[0]}
//                     alt={p.name}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                     loading="lazy"
//                     width={640}
//                     height={800}
//                   />
//                   {p.isNew && (
//                     <div className="absolute top-3 left-3">
//                       <span className="text-[10px] tracking-[0.15em] bg-accent text-accent-foreground px-3 py-1 rounded-sm font-medium">
//                         NEW
//                       </span>
//                     </div>
//                   )}
//                   <WishlistButton productId={p.id} productName={p.name} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100" />
//                 </div>
//                 {p.subcategory && (
//                   <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-0.5">
//                     {p.subcategory}
//                   </p>
//                 )}
//                 <h3 className="font-heading text-sm md:text-base font-medium text-foreground mb-1 group-hover:text-accent transition-colors">
//                   {p.name}
//                 </h3>
//                 <div className="flex items-center gap-2 flex-wrap">
//                   <p className="text-sm text-accent font-medium">{formatPrice(p.price, p.currency)}</p>
//                   {p.regularPrice && p.regularPrice > p.price && (
//                     <>
//                       <p className="text-xs text-muted-foreground line-through">
//                         {formatPrice(p.regularPrice, p.currency)}
//                       </p>
//                       <span className="text-[10px] font-semibold text-red-500">
//                         -{getDiscountPercent(p.regularPrice, p.price)}%
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {/* Back */}
//           <div className="mt-16">
//             <Link
//               to="/"
//               className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4" /> Back to Home
//             </Link>
//           </div>
//         </div>
//       </main>

//       
//     </div>
//   );
// };

// export default CategoryPage;

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";

import { formatPrice, getDiscountPercent } from "@/data/products";

import { useStorefrontProductsByCategory } from "@/hooks/useStorefrontProducts";

import WishlistButton from "@/components/WishlistButton";

const categoryMeta: Record<string, { title: string; subtitle: string }> = {
  jewellery: {
    title: "Luxury Jewellery",
    subtitle:
      "Timeless pieces crafted with precision and adorned with natural stones",
  },
  cosmetics: {
    title: "Professional Cosmetics",
    subtitle:
      "Enhance your natural radiance with our curated beauty collection",
  },
  purses: {
    title: "Designer Purses",
    subtitle:
      "Statement accessories for every occasion, crafted with premium materials",
  },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  const products = useStorefrontProductsByCategory(category || "");

  const meta = categoryMeta[category || ""];

  const [filters, setFilters] = useState({
    searchInput: "",
    search: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "latest",
  });



  const filteredProducts = [...products]
    .filter((p) => {
      const matchesSearch = `${p.name} ${p.subcategory || ""}`
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchesMin =
        !filters.minPrice || p.price >= Number(filters.minPrice);

      const matchesMax =
        !filters.maxPrice || p.price <= Number(filters.maxPrice);

      return matchesSearch && matchesMin && matchesMax;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "latest":
          return Number(b.isNew) - Number(a.isNew);

        case "low-high":
          return a.price - b.price;

        case "high-low":
          return b.price - a.price;

        case "name":
          return a.name.localeCompare(b.name);

        case "discount":
          return (
            getDiscountPercent(b.regularPrice || b.price, b.price) -
            getDiscountPercent(a.regularPrice || a.price, a.price)
          );

        default:
          return 0;
      }
    });

  if (!meta || products.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-foreground mb-4">
            Category Not Found
          </h1>
          <Link to="/" className="text-accent hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{meta.title}</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] text-accent mb-3">
              COLLECTION
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
              {meta.title}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {meta.subtitle}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 md:p-6 mb-12">
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.searchInput}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchInput: e.target.value,
                    }))
                  }
                  className="w-full h-10 md:h-12 pl-9 md:pl-12 pr-3 md:pr-4 rounded-lg md:rounded-xl border border-border bg-background text-sm md:text-base"
                />
              </div>

              {/* Sort */}
              <div className="relative w-full lg:w-[200px]">
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value,
                    }))
                  }
                  className="h-10 md:h-12 w-full appearance-none px-3 md:px-4 pr-8 md:pr-10 rounded-lg md:rounded-xl border border-border bg-background text-sm md:text-base"
                >
                  <option value="latest">Latest</option>
                  <option value="low-high">Low → High</option>
                  <option value="high-low">High → Low</option>
                  <option value="name">A-Z</option>
                  <option value="discount">Discount</option>
                </select>

                <div className="pointer-events-none absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    search: prev.searchInput,
                  }))
                }
                className="h-10 md:h-12 px-4 md:px-6 bg-accent text-white rounded-lg md:rounded-xl text-sm md:text-base"
              >
                Search
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group">
                <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-4">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />

                  {/* NEW */}
                  {p.isNew && (
                    <span className="absolute top-3 left-3 bg-accent text-white text-[10px] px-2 py-1 rounded">
                      NEW
                    </span>
                  )}

                  {/* Discount */}
                  {p.regularPrice && p.regularPrice > p.price && (
                    <span className="absolute bottom-3 left-3 bg-red-500/90 text-white text-[10px] px-2 py-1 rounded">
                      -{getDiscountPercent(p.regularPrice, p.price)}%
                    </span>
                  )}

                  <WishlistButton
                    productId={p.id}
                    productName={p.name}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100"
                  />
                </div>

                <h3 className="text-sm font-medium group-hover:text-accent">
                  {p.name}
                </h3>

                <p className="text-sm text-accent font-medium">
                  {formatPrice(p.price, p.currency)}
                </p>
              </Link>
            ))}
          </div>

          {/* Back */}
          <div className="mt-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default CategoryPage;
