"use client";
import { useRouter } from "next/navigation";
import {
  Car,
  MapPin,
  Clock,
  Phone,
  Mail
} from "lucide-react";

// Navigation items for public frontend
const navItems = [
  { name: "Home", path: "/" },
  { name: "Book Parking", path: "/booking" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">QSmartPark</h3>
                <p className="text-sm text-slate-400">Smart Parking Solutions</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Revolutionary parking management system for Makumbura Multimodal Transport Center, 
              making parking effortless for Sri Lankan commuters.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="h-4 w-4" />
              <span>MMTC, Makumbura, Sri Lanka</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => router.push(item.path)}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>Real-time Slot Booking</li>
              <li>QR Code Entry System</li>
              <li>24/7 Parking Support</li>
              <li>Mobile Integration</li>
              <li>Supervisor Assignment</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-700 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-slate-300" />
                </div>
                <span className="text-sm text-slate-300">+94 11 234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-700 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-slate-300" />
                </div>
                <span className="text-sm text-slate-300">info@qsmartpark.lk</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-700 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-slate-300" />
                </div>
                <span className="text-sm text-slate-300">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">
            © 2024 QSmartPark. All rights reserved. | Powered by Smart Technology Solutions
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <button className="text-sm text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button className="text-sm text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
