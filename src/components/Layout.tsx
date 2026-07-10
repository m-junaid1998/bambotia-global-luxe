import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const Layout = () => (
  <div className="min-h-screen bg-background pb-20 md:pb-0">
    <Navbar />
    <Outlet />
    <Footer />
    <BottomNav />
  </div>
);

export default Layout;