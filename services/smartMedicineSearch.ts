type SmartSearchResponse = {
  searchQuery?: string;
};

const resolvedQueries = new Map<string, string>();

export const resolveMedicineSearch = async (input: string) => {
  const normalizedInput = input.trim();

  if (!normalizedInput || normalizedInput.length < 2) {
    return normalizedInput;
  }

  const cachedQuery = resolvedQueries.get(normalizedInput.toLocaleLowerCase());
  if (cachedQuery) {
    return cachedQuery;
  }

  try {
    const response = await fetch("/api/smart-medicine-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: normalizedInput }),
    });

    if (!response.ok) {
      return normalizedInput;
    }

    const data = (await response.json()) as SmartSearchResponse;
    const searchQuery = data.searchQuery?.trim();

    if (!searchQuery) {
      return normalizedInput;
    }

    resolvedQueries.set(normalizedInput.toLocaleLowerCase(), searchQuery);
    return searchQuery;
  } catch {
    // AI search is an enhancement; the normal backend search remains available.
    return normalizedInput;
  }
};
