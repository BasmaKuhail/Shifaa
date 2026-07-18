"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { pharmacistApplications } from "@/services/admin";
import { PharmacistApplication } from "@/types/PharmacistApplication";

type RequestStatus = PharmacistApplication["status"];

type PharmacistApplicationContextType = {
  requests: PharmacistApplication[];
  loading: boolean;
  error: string | null;
  refreshRequests: () => Promise<void>;
  getRequestById: (id: number) => PharmacistApplication | undefined;
  removeRequest: (id: number) => void;
  updateRequestStatus: (id: number, status: RequestStatus) => void;
};

export const AdminRequestContext = createContext<PharmacistApplicationContextType>({
  requests: [],
  loading: true,
  error: null,
  refreshRequests: async () => {},
  getRequestById: () => undefined,
  removeRequest: () => {},
  updateRequestStatus: () => {},
});

export const AdminRequestProvider = ({ children }: { children: ReactNode }) => {
  const [requests, setRequests] = useState<PharmacistApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await pharmacistApplications();
      console.log("context pharmacsist arr: " + data)
      setRequests(data);
    } catch (error: unknown) {
      console.error(error);

      const message =
        error instanceof Error ? error.message : "حدث خطأ أثناء تحميل الطلبات";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeRequest = useCallback((id: number) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
  }, []);

  const updateRequestStatus = useCallback((id: number, status: RequestStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
            }
          : request
      )
    );
  }, []);

  const getRequestById = useCallback(
    (id: number) => {
      return requests.find((request) => request.id === id);
    },
    [requests]
  );

  useEffect(() => {
    refreshRequests();
  }, [refreshRequests]);

  const value = useMemo(
    () => ({
      requests,
      loading,
      error,
      refreshRequests,
      getRequestById,
      removeRequest,
      updateRequestStatus,
    }),
    [
      requests,
      loading,
      error,
      refreshRequests,
      getRequestById,
      removeRequest,
      updateRequestStatus,
    ]
  );

  return (
    <AdminRequestContext.Provider value={value}>
      {children}
    </AdminRequestContext.Provider>
  );
};