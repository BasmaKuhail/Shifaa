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
  pharmacistApplications,
  PharmacistApplicationsPagination,
} from "@/services/admin";

import { PharmacistApplication } from "@/types/PharmacistApplication";
import { ApplicationStatusFilter } from "@/types/Status";

type RequestStatus = PharmacistApplication["status"];

type PharmacistApplicationContextType = {
  requests: PharmacistApplication[];
  loading: boolean;
  error: string | null;

  pagination: PharmacistApplicationsPagination | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;

  statusFilter: ApplicationStatusFilter;
  setStatusFilter: (
    status: ApplicationStatusFilter,
  ) => void;

  refreshRequests: () => Promise<void>;

  getRequestById: (
    id: number,
  ) => PharmacistApplication | undefined;

  removeRequest: (id: number) => void;

  updateRequestStatus: (
    id: number,
    status: RequestStatus,
  ) => void;
};

const defaultContextValue: PharmacistApplicationContextType = {
  requests: [],
  loading: true,
  error: null,

  pagination: null,
  currentPage: 1,
  setCurrentPage: () => {},

  statusFilter: "all",
  setStatusFilter: () => {},

  refreshRequests: async () => {},
  getRequestById: () => undefined,
  removeRequest: () => {},
  updateRequestStatus: () => {},
};

export const AdminRequestContext =
  createContext<PharmacistApplicationContextType>(
    defaultContextValue,
  );

type AdminRequestProviderProps = {
  children: ReactNode;
};

export const AdminRequestProvider = ({
  children,
}: AdminRequestProviderProps) => {
  const [requests, setRequests] = useState<
    PharmacistApplication[]
  >([]);

  const [pagination, setPagination] =
    useState<PharmacistApplicationsPagination | null>(null);

  const [currentPage, setCurrentPageState] = useState(1);

  const [statusFilter, setStatusFilterState] =
    useState<ApplicationStatusFilter>("all");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const refreshRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await pharmacistApplications(
        currentPage,
        statusFilter,
      );

      setRequests(result.applications);
      setPagination(result.pagination);

      if (
        result.pagination.lastPage > 0 &&
        currentPage > result.pagination.lastPage
      ) {
        setCurrentPageState(result.pagination.lastPage);
      }
    } catch (error: unknown) {
      console.error(
        "Failed to load pharmacist applications:",
        error,
      );

      const errorMessage =
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تحميل الطلبات";

      setError(errorMessage);
      setRequests([]);
      setPagination(null);
    } finally {
      setLoading(false);
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
    (status: ApplicationStatusFilter) => {
      setStatusFilterState(status);

      // Each status can have a different number of pages.
      setCurrentPageState(1);
    },
    [],
  );

  const removeRequest = useCallback((id: number) => {
    setRequests((currentRequests) =>
      currentRequests.filter(
        (request) => request.id !== id,
      ),
    );

    setPagination((currentPagination) => {
      if (!currentPagination) {
        return null;
      }

      return {
        ...currentPagination,
        total: Math.max(
          0,
          currentPagination.total - 1,
        ),
      };
    });
  }, []);

  const updateRequestStatus = useCallback(
    (id: number, newStatus: RequestStatus) => {
      setRequests((currentRequests) =>
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

  const getRequestById = useCallback(
    (id: number) =>
      requests.find((request) => request.id === id),
    [requests],
  );

  useEffect(() => {
    void refreshRequests();
  }, [refreshRequests]);

  const value =
    useMemo<PharmacistApplicationContextType>(
      () => ({
        requests,
        loading,
        error,

        pagination,
        currentPage,
        setCurrentPage,

        statusFilter,
        setStatusFilter,

        refreshRequests,
        getRequestById,
        removeRequest,
        updateRequestStatus,
      }),
      [
        requests,
        loading,
        error,
        pagination,
        currentPage,
        setCurrentPage,
        statusFilter,
        setStatusFilter,
        refreshRequests,
        getRequestById,
        removeRequest,
        updateRequestStatus,
      ],
    );

  return (
    <AdminRequestContext.Provider value={value}>
      {children}
    </AdminRequestContext.Provider>
  );
};