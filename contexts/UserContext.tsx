"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { getMe } from "@/services/auth";
import { User } from "@/types/UserType";


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

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    console.log("Fetching user with token:", token);
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await getMe();
      setUser(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      } else {
        console.log("Network error, keeping session");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      const token = localStorage.getItem("token");
      if (token && !user) {
        fetchUser();
      }
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};