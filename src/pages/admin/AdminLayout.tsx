import { useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  LogOut,
  Home,
  ShoppingBag,
  Users,
  FolderTree,
  Tags,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useOrders } from "@/contexts/OrdersContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.webp";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag, end: false },
  { to: "/admin/customers", label: "Customers", icon: Users, end: false },
  { to: "/admin/products", label: "Products", icon: Package, end: false },
  { to: "/admin/categories", label: "Categories", icon: FolderTree, end: false },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3, end: false },
  { to: "/admin/settings", label: "Settings", icon: Settings, end: false },
];

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const { orders } = useOrders();
  const [collapsed, setCollapsed] = useState(false);
  const pendingCount = orders.filter((o) => o.status === "pending").length;

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <aside
        className={`${collapsed ? "w-20" : "w-64"} border-r border-border bg-card hidden md:flex flex-col transition-[width] duration-300`}
      >
        <div className={`p-4 border-b border-border ${collapsed ? "items-center flex flex-col" : ""}`}>
          <div className="flex items-center justify-between">
            {!collapsed && (
              <img src={logo} alt="Bambotia" className="h-12 w-auto" />
            )}
            <button
              onClick={() => setCollapsed((c) => !c)}
              className={`w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors ${collapsed ? "mx-auto" : ""}`}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
          {!collapsed && (
            <p className="text-[10px] tracking-[0.4em] text-accent mt-3">ADMIN PANEL</p>
          )}
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center ${collapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-md text-sm tracking-wider transition-colors relative ${
                  isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {item.to === "/admin/orders" && pendingCount > 0 && (
                <span
                  className={`text-[10px] font-semibold rounded-full bg-accent text-accent-foreground ${
                    collapsed
                      ? "absolute top-1 right-1 w-4 h-4 flex items-center justify-center"
                      : "px-2 py-0.5"
                  }`}
                >
                  {pendingCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border space-y-2">
          <Button
            variant="outline"
            className={`w-full text-xs tracking-wider ${collapsed ? "justify-center px-0" : "justify-start"}`}
            onClick={() => navigate("/")}
            title={collapsed ? "View Storefront" : undefined}
          >
            <Home className="w-4 h-4" />
            {!collapsed && <span>View Storefront</span>}
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="md:hidden flex items-center gap-3">
            <img src={logo} alt="Bambotia" className="h-8 w-auto" />
            <span className="text-[10px] tracking-[0.3em] text-accent">ADMIN</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground tracking-[0.2em]">
            BAMBOTIA · ADMIN
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-border hover:border-accent transition-colors">
                <span className="w-7 h-7 rounded-full bg-accent/15 text-accent flex items-center justify-center text-xs font-semibold">A</span>
                <span className="hidden sm:inline text-xs text-foreground">Admin</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Signed in as Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/admin/settings")}>
                <User className="w-4 h-4 mr-2" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/")}>
                <Home className="w-4 h-4 mr-2" /> View Storefront
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <nav className="md:hidden border-b border-border bg-card flex overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex-shrink-0 flex items-center gap-1.5 px-4 py-3 text-xs tracking-wider whitespace-nowrap ${
                  isActive ? "text-accent border-b-2 border-accent" : "text-muted-foreground"
                }`
              }
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <header className="hidden border-b border-border bg-card px-4 py-3 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Bambotia" className="h-8 w-auto" />
            <span className="text-[10px] tracking-[0.3em] text-accent">ADMIN</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </header>
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
