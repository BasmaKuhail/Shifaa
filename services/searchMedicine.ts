import api from "@/lib/api";
import { GetMedicinesParams, MedicinesApiResponse } from "./medication";
import { resolveSmartSearch } from "./smartMedicineSearch";

export const searchData = async (
  {
    page = 1,
    perPage = 9,
    search = "",
    dosageForm="",
    min=1,
    max=200
  }: GetMedicinesParams = {},
): Promise<MedicinesApiResponse> => {
  const normalizedSearch = search.trim();

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

// Check whether the query contains Arabic characters.
const containsArabic = (value: string): boolean =>
  /[\u0600-\u06FF]/.test(value);

export const smartSearchMedicines = async (
  params: GetMedicinesParams = {},
): Promise<MedicinesApiResponse> => {
  const search = params.search?.trim() ?? "";

  if (!search) {
    return searchData(params);
  }

  const isEnglishSearch = !containsArabic(search);

  // Search English input directly first so valid medicine names stay fast.
  if (isEnglishSearch) {
    const directResults = await searchData({
      ...params,
      search,
    });

    if (directResults.data.length > 0) {
      return directResults;
    }

    // No English results usually means the query contains a typo. Continue
    // below so the AI can normalize it and search again.
  }

  try {
    // resolveSmartSearch() checks for cached searches, if found, returns the cached data,
    // otherwise it calls the AI API.
    const normalizedSearch = await resolveSmartSearch(search);
    if (!normalizedSearch) {
      return searchData({
        ...params,
        search,
      });
    }

    return searchData({
      ...params,
      search: normalizedSearch,
    });
  } catch (error) {
    console.error("AI normalization failed:", error);

    return searchData({
      ...params,
      search,
    });
  }
};
