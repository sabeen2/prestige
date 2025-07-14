import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrestigeHomepage from "./pages/index/Index";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

import NotFound from "./pages/NotFound";
import ContactUs from "./pages/contact-us";
import Categories from "./pages/categories";
import ArticleDetails from "./pages/article-details";
import AppProvider from "./providers/app-providers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<PrestigeHomepage />} />
                <Route
                  path="/categories/:categorySlug"
                  element={<Categories />}
                />
                <Route path="/:articleSlug" element={<ArticleDetails />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
