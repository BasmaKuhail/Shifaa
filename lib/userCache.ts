import { User } from "@/types/UserType";

const USER_CACHE_KEY = "shifaa:authenticated-user:v1";
const LEGACY_USER_CACHE_KEY = "user";
const CACHE_VERSION = 1;

type CachedUser = {
  version: typeof CACHE_VERSION;
  cachedAt: number;
  user: User;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isCachedUser = (value: unknown): value is CachedUser => {
  if (!isRecord(value) || value.version !== CACHE_VERSION) return false;
  if (
    typeof value.cachedAt !== "number" ||
    !Number.isFinite(value.cachedAt) ||
    !isRecord(value.user)
  ) {
    return false;
  }

  const { user } = value;
  const validRole =
    user.role === "user" || user.role === "pharmacist" || user.role === "admin";
  const validAvatar =
    user.avatar === null ||
    (isRecord(user.avatar) &&
      typeof user.avatar.id === "number" &&
      typeof user.avatar.type === "string" &&
      typeof user.avatar.mime_type === "string" &&
      typeof user.avatar.name === "string");

  return (
    typeof user.id === "number" &&
    Number.isFinite(user.id) &&
    typeof user.firstName === "string" &&
    typeof user.lastName === "string" &&
    typeof user.email === "string" &&
    typeof user.type === "string" &&
    validRole &&
    validAvatar &&
    typeof user.has_pharmacist_application === "boolean" &&
    typeof user.has_pharmacy_application === "boolean" &&
    typeof user.has_pharmacy === "boolean" &&
    (user.pharmacy_id === undefined ||
      (typeof user.pharmacy_id === "number" && Number.isFinite(user.pharmacy_id))) &&
    (user.mobileNum === undefined || typeof user.mobileNum === "string") &&
    (user.location === undefined || typeof user.location === "string")
  );
};

export const readCachedUser = (): User | null => {
  if (typeof window === "undefined") return null;

  try {
    localStorage.removeItem(LEGACY_USER_CACHE_KEY);
    const storedValue = localStorage.getItem(USER_CACHE_KEY);
    if (!storedValue) return null;

    const parsedValue: unknown = JSON.parse(storedValue);
    if (!isCachedUser(parsedValue)) {
      localStorage.removeItem(USER_CACHE_KEY);
      return null;
    }

    return parsedValue.user;
  } catch {
    try {
      localStorage.removeItem(USER_CACHE_KEY);
    } catch {
      // Ignore storage access errors and continue without an offline cache.
    }
    return null;
  }
};

export const writeCachedUser = (user: User): void => {
  if (typeof window === "undefined") return;

  const cachedUser: CachedUser = {
    version: CACHE_VERSION,
    cachedAt: Date.now(),
    user,
  };

  try {
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(cachedUser));
    localStorage.removeItem(LEGACY_USER_CACHE_KEY);
  } catch {
    // The in-memory user remains usable if storage is unavailable or full.
  }
};

export const clearCachedUser = (): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(USER_CACHE_KEY);
    localStorage.removeItem(LEGACY_USER_CACHE_KEY);
  } catch {
    // Storage can be unavailable in restricted browser modes.
  }
};
