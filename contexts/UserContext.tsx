"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { getMe } from "@/services/auth";
import { StaticImageData } from "next/image";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: StaticImageData;
  position: string;
}

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

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await getMe();
          setUser(data);
        } catch (err) {
          console.log("Failed to fetch user", err);
          localStorage.removeItem("token"); // clear invalid token
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};