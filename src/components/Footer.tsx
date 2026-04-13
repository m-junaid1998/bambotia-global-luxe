import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";
import logo from "@/assets/bambotia-logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-card pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div>
          <img src={logo} alt="Bambotia" className="h-14 w-auto mb-4" />
          <p className="text-sm text-muted-foreground leading-relaxed">
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
          <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider">SUPPORT</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Size Guide</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider">CONNECT WITH US</h4>
          <div className="flex gap-4 mb-6">
            <a href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Subscribe for exclusive offers</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-background border border-border px-3 py-2.5 text-sm text-foreground rounded-l placeholder:text-muted-foreground focus:outline-none focus:border-accent"
            />
            <button className="bg-accent text-accent-foreground px-4 py-2.5 rounded-r hover:opacity-90 transition-opacity">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © 2026 BAMBOTIA. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-accent transition-colors">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
