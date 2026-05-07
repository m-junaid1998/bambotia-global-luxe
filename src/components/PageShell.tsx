import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const PageShell = ({ eyebrow, title, subtitle, children }: PageShellProps) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{title}</span>
        </nav>
        <div className="text-center mb-12">
          {eyebrow && <p className="text-xs tracking-[0.3em] text-accent mb-3">{eyebrow}</p>}
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">{title}</h1>
          {subtitle && <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
        </div>
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6 [&_h2]:font-heading [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-foreground [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-2 [&_a]:text-accent [&_a:hover]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-foreground">
          {children}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PageShell;