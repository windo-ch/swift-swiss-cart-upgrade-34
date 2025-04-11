
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Order from "./pages/Order";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Dateschutz from "./pages/Dateschutz";
import AGB from "./pages/AGB";
import Impressum from "./pages/Impressum";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import { AgeVerificationProvider } from "./contexts/AgeVerificationContext";
import { CartProvider } from "./contexts/CartContext";
import InitialLoadingScreen from "./components/InitialLoadingScreen";
import CartDrawer from "./components/CartDrawer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AgeVerificationProvider>
        <CartProvider>
          <InitialLoadingScreen />
          <CartDrawer />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/order" element={<Order />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/dateschutz" element={<Dateschutz />} />
              <Route path="/agb" element={<AGB />} />
              <Route path="/impressum" element={<Impressum />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AgeVerificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
