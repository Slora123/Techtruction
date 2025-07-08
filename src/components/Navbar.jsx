import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  Brain,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Upload,
  FileText,
  Briefcase,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

// Dark mode toggle logic
function useDarkMode() {
  const [isDark, setIsDark] = React.useState(() =>
    document.documentElement.classList.contains("dark")
  );
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  return [isDark, setIsDark];
}

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useDarkMode();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const navItems = user
    ? [
        { path: "/dashboard", label: "Dashboard", icon: Home },
        { path: "/resume-upload", label: "Upload Resume", icon: Upload },
        { path: "/resume-analysis", label: "Analysis", icon: FileText },
        { path: "/job-matching", label: "Jobs", icon: Briefcase },
      ]
    : [];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-200">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JobFinder AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-700 dark:bg-gray-800 dark:text-blue-300"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDark((d) => !d)}
              className="p-2 rounded-md text-gray-600 hover:text-yellow-500 hover:bg-yellow-100 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full ring-2 ring-blue-200"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-all duration-200"
                  >
                    <Settings className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            {/* Mobile dark mode toggle */}
            <button
              onClick={() => setIsDark((d) => !d)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-yellow-500 hover:bg-yellow-100 dark:text-gray-300 dark:hover:text-yellow-400 dark:hover:bg-gray-800 transition-all duration-200 ml-2"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user && (
              <div className="flex items-center space-x-3 px-3 py-2 border-b border-gray-200 mb-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full ring-2 ring-blue-200"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>
            )}

            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-3 py-2 text-left text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md text-base font-medium"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
