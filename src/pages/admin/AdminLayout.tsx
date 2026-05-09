import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, LogOut, Home } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package, end: false },
];

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <img src={logo} alt="Bambotia" className="h-[6em] w-auto mb-3" />
          <p className="text-[10px] tracking-[0.4em] text-accent">ADMIN PANEL</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-sm tracking-wider transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <Button variant="outline" className="w-full justify-start text-xs tracking-wider" onClick={() => navigate("/")}>
            <Home className="w-4 h-4" /> View Storefront
          </Button>
          <Button variant="ghost" className="w-full justify-start text-xs tracking-wider text-muted-foreground" onClick={handleLogout}>
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden border-b border-border bg-card px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Bambotia" className="h-8 w-auto" />
            <span className="text-[10px] tracking-[0.3em] text-accent">ADMIN</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </header>
        <nav className="md:hidden border-b border-border bg-card flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex-1 text-center py-3 text-xs tracking-wider ${
                  isActive ? "text-accent border-b-2 border-accent" : "text-muted-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
