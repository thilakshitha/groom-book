
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout/Layout";
import HomePage from "@/pages/home/HomePage";
import ServicesPage from "@/pages/services/ServicesPage";
import BookingPage from "@/pages/booking/BookingPage";
import Dashboard from "@/pages/dashboard/Dashboard";
import ProfilePage from "@/pages/profile/ProfilePage";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import NotFound from "./pages/NotFound";

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/booking/:serviceId" element={<BookingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;
