"use client";
import { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { User } from "@/types/UserType";
import { getMe } from "@/services/getMe";
import {
  clearCachedUser,
  readCachedUser,
  writeCachedUser,
} from "@/lib/userCache";
import axios from "axios";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUser = useCallback((nextUser: User | null) => {
    setUser(nextUser);

    if (nextUser) {
      writeCachedUser(nextUser);
    } else {
      clearCachedUser();
    }
  }, []);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      updateUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await getMe();
      updateUser(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("token");
        updateUser(null);
      } else {
        console.warn("Could not refresh the user profile; using the cached profile.");
      }
    } finally {
      setLoading(false);
    }
  }, [updateUser]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      updateUser(null);
      setLoading(false);
      return;
    }

    const cachedUser = readCachedUser();
    if (cachedUser) {
      setUser(cachedUser);
      setLoading(false);
    }

    if (!navigator.onLine) {
      setLoading(false);
      return;
    }

    void fetchUser();
  }, [fetchUser, updateUser]);

  useEffect(() => {
    const handleOnline = () => {
      void fetchUser();
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
