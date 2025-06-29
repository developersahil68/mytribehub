/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useContext, type FormEvent } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
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
      // upload image if present

      //   if (profilePic) {
      //     const imgUploadRes = await uploadImage(profilePic);
      //     profileImageUrl = imgUploadRes.imageUrl || "";
      //   }
      const response = await axiosInstance.post(API_PATHS.AUTH.signup, {
        fullName,
        username,
        email,
        password,
        // profileImageUrl,
      });
      const { user } = response.data.data;

      updateUser(user);
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again ");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSignUp}>
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

          <button type="submit" className="btn-primary">
            CREATE ACCOUNT
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpForm;
