"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { pharmacyApplications } from "@/services/admin";
import { PharmacyApplication } from "@/types/PharmacistApplication";

type RequestStatus = PharmacyApplication["status"];

type AdminPharmacyRequestContextType = {
  pharmacyRequests: PharmacyApplication[];
  loadingPharm: boolean;
  errorPharm: string | null;
  refreshPharmRequests: () => Promise<void>;
  getPharmRequestById: (
    id: number,
  ) => PharmacyApplication | undefined;
  removeRequest: (id: number) => void;
  updateRequestStatus: (
    id: number,
    status: RequestStatus,
  ) => void;
};

const defaultContextValue: AdminPharmacyRequestContextType = {
  pharmacyRequests: [],
  loadingPharm: true,
  errorPharm: null,
  refreshPharmRequests: async () => {},
  getPharmRequestById: () => undefined,
  removeRequest: () => {},
  updateRequestStatus: () => {},
};

export const AdminPharmacyRequestContext =
  createContext<AdminPharmacyRequestContextType>(
    defaultContextValue,
  );

export const AdminPharmacyRequestProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [pharmacyRequests, setPharmacyRequests] = useState<
    PharmacyApplication[]
  >([]);

  const [loadingPharm, setLoadingPharm] = useState(true);
  const [errorPharm, setErrorPharm] = useState<string | null>(
    null,
  );

  const refreshPharmRequests = useCallback(async () => {
    try {
      setLoadingPharm(true);
      setErrorPharm(null);

      const applications = await pharmacyApplications();

      setPharmacyRequests(applications);
    } catch (error: unknown) {
      console.error("Failed to load pharmacy applications:", error);

      const message =
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تحميل الطلبات";

      setErrorPharm(message);
      setPharmacyRequests([]);
    } finally {
      setLoadingPharm(false);
    }
  }, []);

  const removeRequest = useCallback((id: number) => {
    setPharmacyRequests((currentRequests) =>
      currentRequests.filter((request) => request.id !== id),
    );
  }, []);

  const updateRequestStatus = useCallback(
    (id: number, status: RequestStatus) => {
      setPharmacyRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === id
            ? {
                ...request,
                status,
              }
            : request,
        ),
      );
    },
    [],
  );

  const getPharmRequestById = useCallback(
    (id: number) =>
      pharmacyRequests.find((request) => request.id === id),
    [pharmacyRequests],
  );

  useEffect(() => {
    void refreshPharmRequests();
  }, [refreshPharmRequests]);

  const value = useMemo<AdminPharmacyRequestContextType>(
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
    ],
  );

  return (
    <AdminPharmacyRequestContext.Provider value={value}>
      {children}
    </AdminPharmacyRequestContext.Provider>
  );
};