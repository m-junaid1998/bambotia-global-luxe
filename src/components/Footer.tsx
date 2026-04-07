import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/bambotia-logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-muted/20 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div>
          <img src={logo} alt="Bambotia" className="h-14 w-auto mb-4" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Global Luxury meets Pakistani Elegance. Curated jewellery, cosmetics & designer purses.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider">SHOP</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/category/jewellery" className="hover:text-accent transition-colors">Jewellery</Link></li>
            <li><Link to="/category/cosmetics" className="hover:text-accent transition-colors">Cosmetics</Link></li>
            <li><Link to="/category/purses" className="hover:text-accent transition-colors">Purses</Link></li>
            <li><a href="/#new-arrivals" className="hover:text-accent transition-colors">New Arrivals</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider">SUPPORT</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Size Guide</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider">FOLLOW US</h4>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
          </div>
          <p className="text-sm text-muted-foreground mt-6">Subscribe for exclusive offers</p>
          <div className="flex mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-muted border border-border px-3 py-2 text-sm text-foreground rounded-l placeholder:text-muted-foreground focus:outline-none focus:border-accent"
            />
            <button className="bg-accent text-accent-foreground px-4 py-2 text-sm font-medium rounded-r hover:opacity-90 transition-opacity">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 BAMBOTIA. All rights reserved. Jewellery, Cosmetics & Accessories.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
