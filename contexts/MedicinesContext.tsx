"use client";

import {
  getMedicines,
  Medicine,
} from "@/services/medication";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type MedicinesContextValue = {
  medicines: Medicine[];
  page: number;
  lastPage: number;
  total: number;
  search: string;
  isLoading: boolean;
  errorMessage: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  refreshMedicines: () => Promise<void>;
};

const MedicinesContext = createContext<
  MedicinesContextValue | undefined
>(undefined);

type MedicinesProviderProps = {
  children: ReactNode;
};

export function MedicinesProvider({
  children,
}: MedicinesProviderProps) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [page, setPageState] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearchState] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMedicines = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await getMedicines({
        page,
        perPage: 9,
        search,
      });

      setMedicines(response.data);

      setLastPage(response.meta.last_page);
      setTotal(response.meta.total);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);

      setMedicines([]);
      setLastPage(1);
      setTotal(0);
      setErrorMessage("Unable to load medicines.");
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    void fetchMedicines();
  }, [fetchMedicines]);

  const setPage = useCallback(
    (nextPage: number) => {
      const safePage = Math.min(
        Math.max(nextPage, 1),
        lastPage,
      );

      setPageState(safePage);
    },
    [lastPage],
  );

  const setSearch = useCallback((value: string) => {
    setSearchState(value);
    setPageState(1);
  }, []);

  const value = useMemo<MedicinesContextValue>(
    () => ({
      medicines,
      page,
      lastPage,
      total,
      search,
      isLoading,
      errorMessage,
      setPage,
      setSearch,
      refreshMedicines: fetchMedicines,
    }),
    [
      medicines,
      page,
      lastPage,
      total,
      search,
      isLoading,
      errorMessage,
      setPage,
      setSearch,
      fetchMedicines,
    ],
  );

  return (
    <MedicinesContext.Provider value={value}>
      {children}
    </MedicinesContext.Provider>
  );
}

export function useMedicines(): MedicinesContextValue {
  const context = useContext(MedicinesContext);

  if (!context) {
    throw new Error(
      "useMedicines must be used inside MedicinesProvider",
    );
  }

  return context;
}