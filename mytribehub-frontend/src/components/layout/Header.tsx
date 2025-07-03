import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const navigate = useNavigate();

  const languages = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "FR", name: "Français" },
    { code: "DE", name: "Deutsch" },
  ];

  const navigationButtons = [
    { name: "Connect fellows", path: "/" },
    { name: "Browse Nearby", path: "/about" },
    { name: "AI Assistant", path: "/services" },
    { name: "Review & Rating", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-lg border-b-2 border-sky-200">
      {/* First Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Site Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
              MyTribeHub
            </h1>
          </div>

          {/* Right side - Login, Signup, Language */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="appearance-none bg-sky-50 border border-sky-200 text-sky-700 py-2 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent cursor-pointer hover:bg-sky-100 transition-colors"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.code}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sky-600">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {/* Login Button */}
            <Link
              to="/login"
              className="bg-transparent border-2 border-sky-500 text-sky-600 px-6 py-2 rounded-lg font-medium hover:bg-sky-50 transition-all duration-200 hover:border-sky-600 hover:text-sky-700"
            >
              Login
            </Link>

            {/* Signup Button */}
            <Link
              to="/signup"
              className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-2 rounded-lg font-medium hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Second Row - Navigation Buttons */}
      <div className="bg-sky-50 border-t border-sky-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-3">
            <div className="flex space-x-1">
              {navigationButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => navigate(button.path)}
                  className="px-6 py-2 text-sky-700 font-medium rounded-lg hover:bg-white hover:text-sky-800 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 border border-transparent hover:border-sky-200"
                >
                  {button.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
