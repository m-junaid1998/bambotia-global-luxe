import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      <main className="flex-1 pt-24 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.4em] text-accent mb-3">JOIN THE HOUSE</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">Create Account</h1>
            <div className="w-12 h-px bg-accent mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Discover curated luxury, exclusive previews, and member-only access
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs tracking-[0.2em] text-foreground">
                    FIRST NAME
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="firstName" type="text" placeholder="ENTER FIRST NAME" className="pl-10 h-12" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs tracking-[0.2em] text-foreground">
                    LAST NAME
                  </Label>
                  <Input id="lastName" type="text" placeholder="ENTER LAST NAME" className="h-12" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs tracking-[0.2em] text-foreground">
                  EMAIL ADDRESS
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-10 h-12" required />
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
                    placeholder="At least 8 characters"
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id="terms" className="mt-0.5" required />
                <Label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                  I agree to the{" "}
                  <Link to="#" className="text-accent hover:underline">Terms of Service</Link> and{" "}
                  <Link to="#" className="text-accent hover:underline">Privacy Policy</Link>
                </Label>
              </div>

              <Button type="submit" className="w-full h-12 tracking-[0.2em] text-xs">
                CREATE ACCOUNT
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-4 text-[10px] tracking-[0.3em] text-muted-foreground">
                  OR SIGN UP WITH
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 ">
              <Button variant="outline" className="h-11 text-xs tracking-wider">
                Google
              </Button>
              
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/signin" className="text-accent hover:underline font-medium tracking-wider">
              Sign in
            </Link>
          </p>
        </div>
      </main>
      
    </div>
  );
};

export default SignUp;
