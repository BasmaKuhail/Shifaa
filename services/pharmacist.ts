import api from "@/lib/api";

type PharmacistSearchField =
  | "firstName"
  | "email"
  | "phoneNumber";

const getSearchField = (
  input: string,
): PharmacistSearchField => {
  if (input.includes("@")) {
    return "email";
  }

  if (/^[+\d\s()-]+$/.test(input)) {
    return "phoneNumber";
  }

  return "firstName";
};

export const searchPharmacists = async (
  searchInput: string,
  page = 1,
) => {
  const normalizedInput = searchInput.trim();

  if (!normalizedInput) {
    return null;
  }

  const searchField = getSearchField(normalizedInput);

  const response = await api.get("/pharmacists", {
    params: {
      [`filter[${searchField}]`]: normalizedInput,
      page,
    },
  });

  return response.data;
};