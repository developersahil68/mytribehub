// import { useState } from "react";

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/auth/LoginForm";
import SignUpForm from "./pages/auth/SignUpForm";
import Home from "./pages/dashboard/home";
import GetToKnowYou from "./pages/auth/GetToKnowYou";
import UserProvider from "./contexts/userContext";
import MapPage from "./pages/mapPage/MapPage.tsx";

function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/get-to-know-you" element={<GetToKnowYou />} />
            <Route
              path="/about"
              element={
                <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center">
                  <h1 className="text-4xl font-bold text-sky-600">
                    About Page
                  </h1>
                </div>
              }
            />
            <Route
              path="/services"
              element={
                <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center">
                  <h1 className="text-4xl font-bold text-sky-600">
                    Services Page
                  </h1>
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center">
                  <h1 className="text-4xl font-bold text-sky-600">
                    Contact Page
                  </h1>
                </div>
              }
            />
            <Route path="/browse-nearby" element={<MapPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
