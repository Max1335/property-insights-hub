import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import Home from "./pages/Home";
import ListingsData from "./pages/ListingsData";
import PropertyDetails from "./pages/PropertyDetails";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import ViewHistory from "./pages/ViewHistory";
import AddListing from "./pages/AddListing";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ComparisonProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<ListingsData />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/history" element={<ViewHistory />} />
              <Route path="/add-listing" element={<AddListing />} />
              <Route path="/admin" element={<AdminPanel />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ComparisonProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
