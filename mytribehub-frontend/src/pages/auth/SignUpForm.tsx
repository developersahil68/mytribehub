/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useContext, type FormEvent } from "react";
// import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../../components/input/AuthInput";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../contexts/UserContextObject";
import axiosInstance from "../../utils/axiosInstances";
// import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPaths";
import type { UserContextType } from "../../types/user";

const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const userContext = useContext<UserContextType | undefined>(UserContext);

  if (userContext === undefined) {
    throw new Error("SignUpForm must be used within a UserProvider");
  }
  const { updateUser } = userContext;
  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    // let profileImageUrl = "";
    if (!fullName) {
      setError("Please enter the full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!username) {
      setError("Please enter your username");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Sign up Api

    try {
      // create a formdata object
      const formData = new FormData();

      // appending all text fields

      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);

      // 3. Append the profile picture if selected
      if (profilePic) {
        formData.append("photo", profilePic);
      }
      const response = await axiosInstance.post(
        API_PATHS.AUTH.signup,
        formData
      );

      const { user } = response.data.data;

      updateUser(user);
      navigate("/get-to-know-you");
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
            Create an Account
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Join us today by entering your details below.
          </p>
          <form onSubmit={handleSignUp} className="space-y-6">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AuthInput
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="john"
                type="text"
              />
              <AuthInput
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="text"
              />
              <AuthInput
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                label="Username"
                placeholder="@"
                type="text"
              />
              <AuthInput
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="min 8 characters"
                type="password"
              />
            </div>
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              CREATE ACCOUNT
            </button>
            <p className="text-[13px] text-slate-800 mt-3 text-center">
              already have an account?{" "}
              <Link className="font-medium text-sky-600 underline" to="/login">
                Login
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

export default SignUpForm;
