import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AppLayout from "@/components/AppLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Manuales from "@/pages/Manuales";
import Actas from "@/pages/Actas";
import Procedimientos from "@/pages/Procedimientos";
import GlosarioTecnico from "@/pages/GlosarioTecnico";
import GlosarioInstitucional from "@/pages/GlosarioInstitucional";
import Configuracion from "@/pages/Configuracion";
import AcercaDe from "@/pages/AcercaDe";
import Organigrama from "@/pages/Organigrama";
import ChatEmpresarial from "@/pages/ChatEmpresarial";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/registro" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route index element={<Home />} />
                <Route path="documentos/manuales" element={<Manuales />} />
                <Route path="documentos/actas" element={<Actas />} />
                <Route path="documentos/procedimientos" element={<Procedimientos />} />
                <Route path="glosarios/tecnico" element={<GlosarioTecnico />} />
                <Route path="glosarios/institucional" element={<GlosarioInstitucional />} />
                <Route path="info/acerca" element={<AcercaDe />} />
                <Route path="info/organigrama" element={<Organigrama />} />
                <Route path="chat" element={<ChatEmpresarial />} />
                <Route path="configuracion" element={<Configuracion />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
