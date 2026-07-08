import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { AdminProductsProvider } from "@/contexts/AdminProductsContext";
import { OrdersProvider } from "@/contexts/OrdersContext";
import { FeedbackProvider } from "@/contexts/FeedbackContext";

import Index from "./pages/Index.tsx";
const CategoryPage = lazy(() => import("./pages/CategoryPage.tsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.tsx"));
const WishlistPage = lazy(() => import("./pages/WishlistPage.tsx"));
const SignIn = lazy(() => import("./pages/SignIn.tsx"));
const SignUp = lazy(() => import("./pages/SignUp.tsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.tsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts.tsx"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders.tsx"));
const AdminCustomers = lazy(() => import("./pages/admin/AdminCustomers.tsx"));
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories.tsx"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics.tsx"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings.tsx"));
const SearchPage = lazy(() => import("./pages/SearchPage.tsx"));
const OurStory = lazy(() => import("./pages/OurStory.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const ShippingReturns = lazy(() => import("./pages/ShippingReturns.tsx"));
const FAQs = lazy(() => import("./pages/FAQs.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const Checkout = lazy(() => import("./pages/Checkout.tsx"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FeedbackProvider>
        <AdminProvider>
          <AdminProductsProvider>
            <OrdersProvider>
              <CartProvider>
                <WishlistProvider>
                <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/our-story" element={<OurStory />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/shipping-returns" element={<ShippingReturns />} />
                  <Route path="/faqs" element={<FAQs />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
                </Suspense>
                </WishlistProvider>
              </CartProvider>
            </OrdersProvider>
          </AdminProductsProvider>
        </AdminProvider>
        </FeedbackProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

