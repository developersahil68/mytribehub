import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetToKnowYou: React.FC = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/dashboard");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to) {
      // Here you can send the data to your backend if needed
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-white">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-sky-100">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-10 text-sky-500 hover:text-sky-700 text-2xl font-bold focus:outline-none"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Left Side: Form */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-sky-700">
            Help us to know better about you
          </h2>
          <p className="text-gray-600 mb-8">
            so that we can provide the best to you
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sky-700 font-medium mb-2">
                Where are you from?
              </label>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Enter your country or city"
                className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-sky-50 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sky-700 font-medium mb-2">
                Country you want to go
              </label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Enter your dream destination"
                className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-sky-50 text-gray-800"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-md hover:shadow-lg"
              disabled={!from || !to}
            >
              Submit
            </button>
          </form>
        </div>
        {/* Right Side: Logo */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 to-sky-400 p-8 w-80">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-white font-extrabold text-4xl">M</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-wide">
              MyTribeHub
            </h3>
            <p className="text-sky-100 mt-2 text-center">
              Your journey, your tribe, your hub.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetToKnowYou;
