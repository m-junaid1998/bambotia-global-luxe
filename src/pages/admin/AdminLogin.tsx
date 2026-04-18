import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin, ADMIN_DEMO_CREDENTIALS } from "@/contexts/AdminContext";
import { toast } from "sonner";

const AdminLogin = () => {
  const { isAuthenticated, login } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok) {
      toast.success("Welcome back, Admin");
      navigate("/admin", { replace: true });
    } else {
      toast.error(res.error ?? "Login failed");
    }
  };

  const fillDemo = () => {
    setEmail(ADMIN_DEMO_CREDENTIALS.email);
    setPassword(ADMIN_DEMO_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
            <ShieldCheck className="w-7 h-7 text-accent" />
          </div>
          <p className="text-[10px] tracking-[0.4em] text-accent mb-3">RESTRICTED AREA</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">Admin Portal</h1>
          <div className="w-12 h-px bg-accent mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Sign in to manage products and view analytics</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs tracking-[0.2em] text-foreground">
                EMAIL ADDRESS
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bambotia.com"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs tracking-[0.2em] text-foreground">
                PASSWORD
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 tracking-[0.2em] text-xs">
              SIGN IN TO DASHBOARD
            </Button>
          </form>

          <div className="mt-6 p-4 rounded-md bg-muted/40 border border-border">
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-2">DEMO CREDENTIALS</p>
            <div className="text-xs text-foreground space-y-1 font-mono">
              <div>Email: {ADMIN_DEMO_CREDENTIALS.email}</div>
              <div>Password: {ADMIN_DEMO_CREDENTIALS.password}</div>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="mt-3 text-xs text-accent hover:underline tracking-wider"
            >
              Auto-fill credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
