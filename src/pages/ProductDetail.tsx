import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Heart, Minus, Plus, ChevronRight } from "lucide-react";
import { getProductBySlug, formatPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem } = useCart();
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
                <button className="p-4 border border-border rounded text-foreground hover:text-accent hover:border-accent transition-colors">
                  <Heart className="w-5 h-5" />
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
