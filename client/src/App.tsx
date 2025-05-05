import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/components/LandingPage";

// Marketplace pages
import MarketplaceHome from "@/pages/marketplace/Home";
import Datasets from "@/pages/marketplace/Datasets";
import Dataset from "@/pages/marketplace/Dataset";
import CategoryPage from "@/pages/marketplace/CategoryPage";

function Router() {
  return (
    <Switch>
      {/* Landing page */}
      <Route path="/" component={LandingPage} />
      
      {/* Marketplace routes */}
      <Route path="/marketplace" component={MarketplaceHome} />
      <Route path="/datasets" component={Datasets} />
      <Route path="/dataset/:id" component={Dataset} />
      <Route path="/category/:name" component={CategoryPage} />
      
      {/* 404 page */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
