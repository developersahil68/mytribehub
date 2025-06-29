import React, { useState, useEffect, type ReactNode } from "react";

import axiosInstances from "../utils/axiosInstances";
import { API_PATHS } from "../utils/apiPaths";
import type { User, UserContextType } from "../types/user";

import { UserContext } from "./UserContextObject";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // function to update user data
  const updateUser = (userData: User) => {
    setUser(userData);
  };

  // function to clear user data (on logout)
  const clearUser = () => {
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstances.get(API_PATHS.AUTH.me);
        if (response.data.status === "success" && response.data.data.user) {
          setUser(response.data.data.user);
        }
      } catch (error) {
        console.warn(
          "No active user session or session expired. User set to null.",
          error
        );
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const contextValue: UserContextType = {
    user,
    updateUser,
    clearUser,
    isLoading,
  };

  if (isLoading) {
    return <div>Loading application...</div>;
  }
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
