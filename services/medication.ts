import api from "@/lib/api";

export type Medicine = {
  id: number;
  scientific_name: string;
  trade_name: string;
  dosage_form: string;
  strength: string | null;
};

export type MedicinesPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type MedicinesApiResponse = MedicinesPagination & {
  data: Medicine[];
};

export type GetMedicinesParams = {
  page?: number;
  perPage?: number;
  search?: string;
};

export const getMedicines = async ({
  page = 1,
  perPage = 10,
  search = "",
}: GetMedicinesParams = {}): Promise<MedicinesApiResponse> => {
  const normalizedSearch = search.trim();

  const response = await api.get<MedicinesApiResponse>(
    "/global-medicines",
    {
      params: {
        page,
        per_page: perPage,
        // sort: "scientificName",
        ...(normalizedSearch && {
          "filter[scientificName]": `*${normalizedSearch}*`,
        }),
      },
    },
  );

  return response.data;
};