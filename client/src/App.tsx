import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/components/LandingPage";
import SiteLayout from "@/components/common/SiteLayout";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import AuthPage from "@/pages/auth-page";

// Marketplace pages
import MarketplaceHome from "@/pages/marketplace/Home";
import Datasets from "@/pages/marketplace/Datasets";
import Dataset from "@/pages/marketplace/Dataset";
import CategoryPage from "@/pages/marketplace/CategoryPage";
import Categories from "@/pages/marketplace/Categories";

function Router() {
  return (
    <SiteLayout>
      <Switch>
        {/* Landing page */}
        <Route path="/" component={LandingPage} />
        
        {/* Authentication */}
        <Route path="/auth" component={AuthPage} />
        
        {/* Marketplace routes - protected */}
        <ProtectedRoute path="/marketplace" component={MarketplaceHome} />
        <ProtectedRoute path="/datasets" component={Datasets} />
        <ProtectedRoute path="/categories" component={Categories} />
        <ProtectedRoute path="/dataset/:id" component={Dataset} />
        <ProtectedRoute path="/category/:name" component={CategoryPage} />
        
        {/* 404 page */}
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
