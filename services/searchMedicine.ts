import api from "@/lib/api";
import { GetMedicinesParams, MedicinesApiResponse } from "./medication";

export const searchMedicines = async (
  {
    page = 1,
    perPage = 9,
    search = "",
  }: GetMedicinesParams = {},
): Promise<MedicinesApiResponse> => {
  const normalizedSearch = search.trim();

  const response = await api.get<MedicinesApiResponse>(
    "/pharmacy-medicines",
    {
      params: {
        include: "globalMedicine",
        page,
        per_page: perPage,

        ...(normalizedSearch && {
          "filter[scientificNameOrTradeName]": `*${normalizedSearch}*`,
        }),
      },
    },
  );
    console.log(response)

  return response.data;
};