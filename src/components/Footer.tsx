import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const quickLinks = [
    {
      name: "Jewellery",
      path: "/category/jewellery",
      type: "link",
    },
    {
      name: "Cosmetics",
      path: "/category/cosmetics",
      type: "link",
    },
    {
      name: "Purses",
      path: "/category/purses",
      type: "link",
    },
    {
      name: "New Arrivals",
      path: "/#new-arrivals",
      type: "anchor",
    },
  ];

  return (
    <footer className="border-t border-border bg-card pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <img src={logo} alt="Bambotia" width={144} height={96} className="h-[6em] w-auto mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Global Luxury meets Pakistani Elegance. Premium jewellery,
              cosmetics & designer purses curated for the modern woman.
            </p>
            <p className="text-xs text-accent italic mt-3 font-heading">
              Curated With Passion
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider">
              SHOP
            </h3>

            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {quickLinks?.map((item, index) => (
                <li key={index}>
                  {item.type === "link" ? (
                    <Link
                      to={item.path}
                      onClick={scrollToTop}
                      className="hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.path}
                      onClick={scrollToTop}
                      className="hover:text-accent transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider">
              ABOUT
            </h3>

            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/our-story"
                  onClick={scrollToTop}
                  className="hover:text-accent transition-colors"
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider">
              SUPPORT
            </h3>

            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  className="hover:text-accent transition-colors"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping-returns"
                  onClick={scrollToTop}
                  className="hover:text-accent transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>

              <li>
                <Link
                  to="/faqs"
                  onClick={scrollToTop}
                  className="hover:text-accent transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter + Socials */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <p className="text-sm text-muted-foreground">
                Subscribe for exclusive offers
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-background border border-border px-3 py-2.5 text-sm text-foreground rounded-l placeholder:text-muted-foreground focus:outline-none focus:border-accent w-52"
                />

                <button type="submit" aria-label="Subscribe to newsletter" className="bg-accent text-accent-foreground px-4 py-2.5 rounded-r hover:opacity-90 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 BAMBOTIA. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link
              to="/privacy-policy"
              onClick={scrollToTop}
              className="hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-service"
              onClick={scrollToTop}
              className="hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
