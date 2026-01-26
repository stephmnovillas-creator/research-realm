import { GraduationCap, UserCircle, LogOut, ChevronDown } from "lucide-react";
import { useRouter, useLocation } from "@tanstack/react-router";
import React from "react";
import { useAuth } from "../lib/auth";

export default function Header() {
  const router = useRouter();
  const location = useLocation();
  const { user, logout: authLogout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Check if we're on auth pages
  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    authLogout();
    setIsDropdownOpen(false);
    router.navigate({ to: "/sign-in" });
  };

  return (
    <header className="bg-[#7a9b76] text-white px-8 py-6 shadow-md z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-10 h-10 text-white" />
          <div>
            <h1 className="text-2xl font-bold tracking-wide">RESEARCH REALM</h1>
            <p className="text-sm text-green-100 font-light opacity-90">
              Cabatuan National Comprehensive High School
            </p>
          </div>
        </div>

        {/* User Profile Dropdown */}
        {user && !isAuthPage && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:opacity-80 text-right"
            >
              <div className="text-right">
                <p className="font-semibold text-sm">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-green-100 opacity-90 capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
              <UserCircle className="w-10 h-10" />
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Log Out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
