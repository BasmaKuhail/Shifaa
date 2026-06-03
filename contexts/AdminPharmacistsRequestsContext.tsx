"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { pharmacistApplications  } from "@/services/admin";
import { PharmacistApplication } from "@/types/PharmacistApplication";

type PharmacistApplicationContextType = {
    requests: PharmacistApplication[];
    loading: boolean;
    error: string | null;
    getRequestById: (id: number) => PharmacistApplication | undefined;
};

export const AdminRequestContext = createContext<PharmacistApplicationContextType>({
    requests: [],
    loading: true,
    error: null,
    getRequestById: () => undefined,
});

export const AdminRequestProvider = ({ children }: { children: ReactNode }) => {
    const [requests, setRequests] = useState<PharmacistApplication[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  const refreshRequests = async () => {
    try {
        setLoading(true);
        setError(null);
        const data = await pharmacistApplications();
        setRequests(data);
    } catch (error:any) {
        console.error(error);
        setError(error.message ||"حدث خطأ أثناء تحميل الطلبات");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    refreshRequests();
  }, []);

  const getRequestById = (id: number) => {
    return requests.find((request) => request.id === id);
  };

  return (
    <AdminRequestContext.Provider value={{ requests, loading, error, getRequestById }}>
      {children}
    </AdminRequestContext.Provider>
  );
};