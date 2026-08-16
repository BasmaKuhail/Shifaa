import api from "@/lib/api";
import { Region, RegionsApiResponse } from "@/types/RegionType";

const getRegionsFromResponse = (response: RegionsApiResponse | Region[]) =>
  Array.isArray(response) ? response : response.data;

export const getRegions = async (): Promise<Region[]> => {
  const response = await api.get<RegionsApiResponse | Region[]>("/regions");

  return getRegionsFromResponse(response.data);
};

/** Loads address 2 using only the address 1 id. */
export const getSubRegions = async (regionId: number): Promise<Region[]> => {
  const response = await api.get<RegionsApiResponse | Region[]>("/sub-regions", {
    params: { regionId: regionId },
  });

  return getRegionsFromResponse(response.data);
};
