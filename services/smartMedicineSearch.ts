type SmartSearchResponse = {
  searchQuery?: string;
};

const resolvedQueries = new Map<string, string>();

const getCacheKey = (input: string): string =>
  input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

export const resolveSmartSearch = async (
  input: string,
): Promise<string> => {
  const normalizedInput = input.trim();

  if (normalizedInput.length < 2) {
    return normalizedInput;
  }

  const cacheKey = getCacheKey(normalizedInput);

  const cachedQuery = resolvedQueries.get(cacheKey);

  if (cachedQuery) {
    console.log("Client cache hit:", cacheKey);
    return cachedQuery;
  }

  try {
    const response = await fetch(
      "/api/smart-medicine-search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: normalizedInput,
        }),
        
      },
    );

    if (!response.ok) {
      return normalizedInput;
    }

    const data =
      (await response.json()) as SmartSearchResponse;

    const searchQuery = data.searchQuery?.trim();

    if (!searchQuery) {
      return normalizedInput;
    }

    resolvedQueries.set(cacheKey, searchQuery);

    return searchQuery;
  } catch (error) {
    console.error(
      "Smart search normalization failed:",
      error,
    );

    return normalizedInput;
  }
};