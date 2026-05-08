import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Minus, Plus, ChevronRight } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useStorefrontProductBySlug } from "@/hooks/useStorefrontProducts";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductReviews from "@/components/ProductReviews";
import Seo from "@/components/Seo";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = useStorefrontProductBySlug(slug || "");
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/" className="text-accent hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  const seoTitle = `${product.name} — ${categoryLabel} | BAMBOTIA`;
  const seoDescription =
    product.description.replace(/\s+/g, " ").trim() ||
    `Shop the ${product.name} at BAMBOTIA — ${formatPrice(product.price, product.currency)}.`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.images[0],
      });
    }
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={seoTitle}
        description={seoDescription}
        image={product.images[0]}
        type="product"
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/category/${product.category}`} className="hover:text-accent transition-colors">
              {categoryLabel}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-sm mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  width={640}
                  height={800}
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? "border-accent" : "border-border"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <Link
                to={`/category/${product.category}`}
                className="text-xs tracking-[0.2em] text-accent mb-3 hover:underline"
              >
                {categoryLabel.toUpperCase()}
              </Link>

              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              <p className="text-2xl font-heading text-gradient-gold mb-6">
                {formatPrice(product.price, product.currency)}
              </p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground tracking-wider">QUANTITY</span>
                <div className="flex items-center border border-border rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-foreground hover:text-accent transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-foreground hover:text-accent transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-10">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-medium text-sm tracking-wider rounded hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
                <button
                  onClick={() => toggleItem(product.id, product.name)}
                  className={`p-4 border rounded transition-colors ${
                    isWishlisted(product.id)
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-border text-foreground hover:text-accent hover:border-accent"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill={isWishlisted(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
              </div>

              {/* Details */}
              <div className="border-t border-border pt-6">
                <h3 className="font-heading text-sm font-semibold tracking-wider text-foreground mb-4">
                  PRODUCT DETAILS
                </h3>
                <ul className="space-y-2">
                  {product.details.map((detail, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {product.isNew && (
                <div className="mt-6">
                  <span className="text-[10px] tracking-[0.15em] bg-accent text-accent-foreground px-3 py-1 rounded-sm font-medium">
                    NEW ARRIVAL
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-16">
            <Link
              to={`/category/${product.category}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to {categoryLabel}
            </Link>
          </div>

          <ProductReviews productId={product.id} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
