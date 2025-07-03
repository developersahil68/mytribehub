/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useContext, type FormEvent } from "react";
// import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../../components/input/AuthInput";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../contexts/UserContextObject";
import axiosInstance from "../../utils/axiosInstances";

import type { UserContextType } from "../../types/user";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const userContext = useContext<UserContextType | undefined>(UserContext);

  if (userContext === undefined) {
    throw new Error("SignUpForm must be used within a UserProvider");
  }
  const { updateUser } = userContext;

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login API
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.login, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again ");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-white">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-sky-100">
        {/* Left Side: Form */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-sky-700">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Please enter your details to log in
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <AuthInput
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <AuthInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="min 8 characters"
              type="password"
            />
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              LOGIN
            </button>
            <p className="text-[13px] text-slate-800 mt-3 text-center">
              Don't have an account?{" "}
              <Link className="font-medium text-sky-600 underline" to="/signup">
                Signup
              </Link>
            </p>
          </form>
        </div>
        {/* Right Side: Logo/Branding */}
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

export default LoginForm;
