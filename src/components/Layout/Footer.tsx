
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SharpGroom</h3>
            <p className="text-gray-400">Elevate your grooming experience with our premium salon services tailored for the modern gentleman.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-amber-400 transition-colors">Services</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-amber-400 transition-colors">My Appointments</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic">
              <p>123 Salon Street</p>
              <p>New York, NY 10001</p>
              <p className="mt-2">Email: info@sharpgroom.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} SharpGroom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
