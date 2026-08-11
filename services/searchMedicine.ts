import api from "@/lib/api";
import { GetMedicinesParams, MedicinesApiResponse } from "./medication";
import { resolveMedicineSearch } from "./smartMedicineSearch";

export const searchMedicines = async (
  {
    page = 1,
    perPage = 9,
    search = "",
    dosageForm="",
    min=1,
    max=200
  }: GetMedicinesParams = {},
): Promise<MedicinesApiResponse> => {
  const normalizedSearch = await resolveMedicineSearch(search);

  const response = await api.get<MedicinesApiResponse>(
    "/pharmacy-medicines",
    {
      params: {
        include: "pharmacy",
        page,
        per_page: perPage,

        ...(normalizedSearch && {
          "filter[scientificNameOrTradeName]": `*${normalizedSearch}*`}),

        ...(dosageForm && {
          "filter[dosageForm]": `*${dosageForm}*`,
        }),

        "filter[priceRange]": `${min},${max}`,    
      }
    })
    console.log(response)

  return response.data;
};
