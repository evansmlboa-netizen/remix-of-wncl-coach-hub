import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import MatchPrep from "@/pages/MatchPrep";
import Fixtures from "@/pages/Fixtures";
import Squad from "@/pages/Squad";
import Tactics from "@/pages/Tactics";
import Analytics from "@/pages/Analytics";
import AIAssistant from "@/pages/AIAssistant";
import Training from "@/pages/Training";
import Communications from "@/pages/Communications";
import Media from "@/pages/Media";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/match-prep" element={<MatchPrep />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/squad" element={<Squad />} />
            <Route path="/tactics" element={<Tactics />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/training" element={<Training />} />
            <Route path="/communications" element={<Communications />} />
            <Route path="/media" element={<Media />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
