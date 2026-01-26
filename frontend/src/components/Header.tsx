import { GraduationCap, UserCircle, LogOut, ChevronDown } from "lucide-react";
import { useRouter, useLocation } from "@tanstack/react-router";
import React from "react";

export default function Header() {
  const router = useRouter();
  const location = useLocation();
  const [user, setUser] = React.useState<{
    firstName: string;
    lastName: string;
    role: string;
  } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Check if we're on auth pages
  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  // Load user from localStorage
  React.useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Load user on mount
    loadUser();

    // Listen for storage changes (when localStorage is updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user") {
        loadUser();
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleUserUpdate = () => {
      loadUser();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsDropdownOpen(false);
    // Dispatch custom event to update all components
    window.dispatchEvent(new Event("userUpdated"));
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
