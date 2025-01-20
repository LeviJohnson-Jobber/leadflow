import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PipelineSettings from "./pages/PipelineSettings";
import Reports from "./pages/Reports";
import PipelineReport from "./pages/PipelineReport";
import WonDealsReport from "./pages/WonDealsReport";
import LostDealsReport from "./pages/LostDealsReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pipeline-settings" element={<PipelineSettings />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/pipeline" element={<PipelineReport />} />
          <Route path="/reports/won" element={<WonDealsReport />} />
          <Route path="/reports/lost" element={<LostDealsReport />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;