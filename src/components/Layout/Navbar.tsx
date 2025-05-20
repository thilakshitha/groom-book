
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SharpGroom</Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <Link to="/services" className="hover:text-amber-400 transition-colors">Services</Link>
          {currentUser ? (
            <>
              <Link to="/dashboard" className="hover:text-amber-400 transition-colors">My Appointments</Link>
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center hover:text-amber-400">
                  <UserCircle className="mr-2" size={20} />
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2" size={16} />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-gray-900"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button 
                className="bg-amber-500 text-gray-900 hover:bg-amber-400"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-gray-900 z-50 p-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-amber-400 transition-colors p-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/services" className="hover:text-amber-400 transition-colors p-2" onClick={() => setIsMenuOpen(false)}>Services</Link>
              {currentUser ? (
                <>
                  <Link to="/dashboard" className="hover:text-amber-400 transition-colors p-2" onClick={() => setIsMenuOpen(false)}>My Appointments</Link>
                  <Link to="/profile" className="flex items-center hover:text-amber-400 p-2" onClick={() => setIsMenuOpen(false)}>
                    <UserCircle className="mr-2" size={20} />
                    Profile
                  </Link>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-gray-900"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2" size={16} />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-gray-900"
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-amber-500 text-gray-900 hover:bg-amber-400"
                    onClick={() => {
                      navigate("/signup");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
