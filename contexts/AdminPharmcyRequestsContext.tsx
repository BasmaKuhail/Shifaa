"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  pharmacyApplications,
  PharmacyApplicationsPagination,
} from "@/services/admin";
import { PharmacyApplication } from "@/types/PharmacyType";
import { StatusType } from "@/types/Status";

export type PharmacyRequestFilter = StatusType | "all";

type AdminPharmacyRequestContextType = {
  pharmacyRequests: PharmacyApplication[];
  loadingPharm: boolean;
  errorPharm: string | null;

  pagination: PharmacyApplicationsPagination | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;

  statusFilter: PharmacyRequestFilter;
  setStatusFilter: (status: PharmacyRequestFilter) => void;

  refreshPharmRequests: () => Promise<void>;
  getPharmRequestById: (
    id: number,
  ) => PharmacyApplication | undefined;
  removeRequest: (id: number) => void;
  updateRequestStatus: (
    id: number,
    status: StatusType,
  ) => void;
};

const defaultContextValue: AdminPharmacyRequestContextType = {
  pharmacyRequests: [],
  loadingPharm: true,
  errorPharm: null,

  pagination: null,
  currentPage: 1,
  setCurrentPage: () => {},

  statusFilter: "all",
  setStatusFilter: () => {},

  refreshPharmRequests: async () => {},
  getPharmRequestById: () => undefined,
  removeRequest: () => {},
  updateRequestStatus: () => {},
};

export const AdminPharmacyRequestContext =
  createContext<AdminPharmacyRequestContextType>(
    defaultContextValue,
  );

type AdminPharmacyRequestProviderProps = {
  children: ReactNode;
};

export const AdminPharmacyRequestProvider = ({
  children,
}: AdminPharmacyRequestProviderProps) => {
  const [pharmacyRequests, setPharmacyRequests] = useState<
    PharmacyApplication[]
  >([]);

  const [pagination, setPagination] =
    useState<PharmacyApplicationsPagination | null>(null);

  const [currentPage, setCurrentPageState] = useState(1);

  const [statusFilter, setStatusFilterState] =
    useState<PharmacyRequestFilter>("all");

  const [loadingPharm, setLoadingPharm] = useState(true);
  const [errorPharm, setErrorPharm] = useState<string | null>(
    null,
  );

  const refreshPharmRequests = useCallback(async () => {
    try {
      setLoadingPharm(true);
      setErrorPharm(null);

      const result = await pharmacyApplications(
        currentPage,
        statusFilter,
      );

      setPharmacyRequests(result.applications);
      setPagination(result.pagination);

      if (
        result.pagination.lastPage > 0 &&
        currentPage > result.pagination.lastPage
      ) {
        setCurrentPageState(result.pagination.lastPage);
      }
    } catch (error: unknown) {
      console.error(
        "Failed to load pharmacy applications:",
        error,
      );

      const errorMessage =
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تحميل الطلبات";

      setErrorPharm(errorMessage);
      setPharmacyRequests([]);
      setPagination(null);
    } finally {
      setLoadingPharm(false);
    }
  }, [currentPage, statusFilter]);

  const setCurrentPage = useCallback(
    (page: number) => {
      if (!Number.isInteger(page) || page < 1) {
        return;
      }

      if (
        pagination &&
        pagination.lastPage > 0 &&
        page > pagination.lastPage
      ) {
        return;
      }

      setCurrentPageState(page);
    },
    [pagination],
  );

  const setStatusFilter = useCallback(
    (status: PharmacyRequestFilter) => {
      setStatusFilterState(status);
      setCurrentPageState(1);
    },
    [],
  );

  const removeRequest = useCallback((id: number) => {
    setPharmacyRequests((currentRequests) =>
      currentRequests.filter((request) => request.id !== id),
    );

    setPagination((currentPagination) => {
      if (!currentPagination) {
        return null;
      }

      return {
        ...currentPagination,
        total: Math.max(0, currentPagination.total - 1),
      };
    });
  }, []);

  const updateRequestStatus = useCallback(
    (id: number, newStatus: StatusType) => {
      setPharmacyRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === id
            ? {
                ...request,
                status: newStatus,
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
      pagination,
      currentPage,
      setCurrentPage,
      statusFilter,
      setStatusFilter,
      refreshPharmRequests,
      getPharmRequestById,
      removeRequest,
      updateRequestStatus,
    }),
    [
      pharmacyRequests,
      loadingPharm,
      errorPharm,
      pagination,
      currentPage,
      setCurrentPage,
      statusFilter,
      setStatusFilter,
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