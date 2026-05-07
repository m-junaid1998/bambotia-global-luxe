import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";
import logo from "@/assets/bambotia-logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-card pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
        <div className="col-span-2">
          <img src={logo} alt="Bambotia" className="h-14 w-auto mb-4" />
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Global Luxury meets Pakistani Elegance. Premium jewellery, cosmetics & designer purses curated for the modern woman.
          </p>
          <p className="text-xs text-accent/60 italic mt-3 font-heading">Curated With Passion</p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider">SHOP</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/category/jewellery" className="hover:text-accent transition-colors">Jewellery</Link></li>
            <li><Link to="/category/cosmetics" className="hover:text-accent transition-colors">Cosmetics</Link></li>
            <li><Link to="/category/purses" className="hover:text-accent transition-colors">Purses</Link></li>
            <li><a href="/#new-arrivals" className="hover:text-accent transition-colors">New Arrivals</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider">ABOUT</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/our-story" className="hover:text-accent transition-colors">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider">SUPPORT</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            <li><Link to="/shipping-returns" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/faqs" className="hover:text-accent transition-colors">FAQs</Link></li>
          </ul>
        </div>
      </div>

      {/* Newsletter + Socials */}
      <div className="border-t border-border pt-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <p className="text-sm text-muted-foreground">Subscribe for exclusive offers</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-background border border-border px-3 py-2.5 text-sm text-foreground rounded-l placeholder:text-muted-foreground focus:outline-none focus:border-accent w-52"
              />
              <button className="bg-accent text-accent-foreground px-4 py-2.5 rounded-r hover:opacity-90 transition-opacity">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © 2026 BAMBOTIA. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
