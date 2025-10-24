import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// import RegisterRunning from "./pages/RegisterRunning";
import LoginAdmin from "./pages/LoginAdmin";
import AdminDashboard from "./pages/AdminDashboard";
// import PaymentRegistration from "./pages/PaymentRegistration";
// import RegisterSuccess from "./pages/RegisterSuccess";
import RefundPage from "./pages/refund";
import RefundSuccess from "./pages/RefundSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/register-running" element={<RegisterRunning />} /> */}
          {/* <Route
            path="/pembayaran/pendaftaran"
            element={<PaymentRegistration />}
          /> */}
          {/* <Route path="/pendaftaran-success" element={<RegisterSuccess />} /> */}
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/refund-success" element={<RefundSuccess />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
