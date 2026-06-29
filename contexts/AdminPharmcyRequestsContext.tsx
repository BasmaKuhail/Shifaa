"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { pharmacyApplications } from "@/services/admin";
import { PharmacyApplication } from "@/types/PharmacistApplication";

type RequestStatus = PharmacyApplication["status"];

type PharmacistApplicationContextType = {
  pharmacyRequests: PharmacyApplication[];
  loadingPharm: boolean;
  errorPharm: string | null;
  refreshPharmRequests: () => Promise<void>;
  getPharmRequestById: (id: number) => PharmacyApplication | undefined;
  removeRequest: (id: number) => void;
  updateRequestStatus: (id: number, status: RequestStatus) => void;
};

export const AdminPharmacyRequestContext = createContext<PharmacistApplicationContextType>({
  pharmacyRequests: [],
  loadingPharm: true,
  errorPharm: null,
  refreshPharmRequests: async () => {},
  getPharmRequestById: () => undefined,
  removeRequest: () => {},
  updateRequestStatus: () => {},
});

export const AdminPharmacyRequestProvider = ({ children }: { children: ReactNode }) => {
  const [pharmacyRequests, setPharmacyRequests] = useState<PharmacyApplication[]>([]);
  const [loadingPharm, setLoadingPharm] = useState(true);
  const [errorPharm, setErrorPharm] = useState<string | null>(null);

  const refreshPharmRequests = useCallback(async () => {
    try {
      setLoadingPharm(true);
      setErrorPharm(null);

      const data = await pharmacyApplications();
      setPharmacyRequests(data);
    } catch (error: unknown) {
      console.error(error);

      const message =
        error instanceof Error ? error.message : "حدث خطأ أثناء تحميل الطلبات";

      setErrorPharm(message);
    } finally {
      setLoadingPharm(false);
    }
  }, []);

  const removeRequest = useCallback((id: number) => {
    setPharmacyRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
  }, []);

  const updateRequestStatus = useCallback((id: number, status: RequestStatus) => {
    setPharmacyRequests((prevRequests) =>
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

  const getPharmRequestById = useCallback(
    (id: number) => {
          console.log(id)

      return pharmacyRequests.find((request) => request.id === id);
    },
    [pharmacyRequests]
  );
  useEffect(() => {
  refreshPharmRequests();
}, [refreshPharmRequests]);

  const value = useMemo(
    () => ({
      pharmacyRequests,
      loadingPharm,
      errorPharm,
      refreshPharmRequests,
      getPharmRequestById,
      removeRequest,
      updateRequestStatus,
    }),
    [
      pharmacyRequests,
      loadingPharm,
      errorPharm,
      refreshPharmRequests,
      getPharmRequestById,
      removeRequest,
      updateRequestStatus,
    ]
  );

  return (
    <AdminPharmacyRequestContext.Provider value={value}>
      {children}
    </AdminPharmacyRequestContext.Provider>
  );
};