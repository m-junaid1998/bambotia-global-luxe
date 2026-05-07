import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch within 24 hours.");
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <PageShell
      eyebrow="GET IN TOUCH"
      title="Contact Us"
      subtitle="Our concierge team is here to help — typically replying within 24 hours."
    >
      <div className="grid md:grid-cols-3 gap-6 not-prose mb-10">
        {[
          { icon: Mail, label: "Email", value: "care@bambotia.com" },
          { icon: Phone, label: "Phone", value: "+92 300 1234567" },
          { icon: MapPin, label: "Atelier", value: "Lahore, Pakistan" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="border border-border rounded-sm p-5 text-center bg-card">
            <Icon className="w-5 h-5 text-accent mx-auto mb-3" />
            <p className="text-xs tracking-[0.2em] text-muted-foreground mb-1">{label.toUpperCase()}</p>
            <p className="text-sm text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="not-prose space-y-4 max-w-xl mx-auto">
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground rounded-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent"
        />
        <input
          required
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground rounded-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent"
        />
        <textarea
          required
          rows={5}
          placeholder="How can we help?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground rounded-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none"
        />
        <button
          type="submit"
          className="w-full bg-accent text-accent-foreground px-6 py-3 text-sm font-medium tracking-[0.2em] rounded-sm hover:opacity-90 transition-opacity"
        >
          SEND MESSAGE
        </button>
      </form>
    </PageShell>
  );
};

export default Contact;