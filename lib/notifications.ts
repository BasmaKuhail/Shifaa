export type UserNotification = {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning";
  createdAt: number;
  expiresAt: number;
  read: boolean;
  href?: string;
};

type NewNotification = Omit<UserNotification, "id" | "createdAt" | "expiresAt" | "read"> & {
  ttlMs?: number;
};

const CACHE_VERSION = 1;
const DEFAULT_TTL_MS = 14 * 24 * 60 * 60 * 1000;
const MAX_NOTIFICATIONS = 50;
const EVENT_NAME = "shifaa:notifications-changed";

const getStorageKey = (userId: number) => `shifaa:notifications:${userId}:v${CACHE_VERSION}`;

const isNotification = (value: unknown): value is UserNotification => {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.message === "string" &&
    (item.type === "success" || item.type === "info" || item.type === "warning") &&
    typeof item.createdAt === "number" &&
    typeof item.expiresAt === "number" &&
    typeof item.read === "boolean" &&
    (item.href === undefined || typeof item.href === "string")
  );
};

const notifySubscribers = (userId: number) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { userId } }));
  }
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const getUserNotifications = (userId: number): UserNotification[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(getStorageKey(userId));
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) throw new Error("Invalid notification cache");

    const active = parsed
      .filter(isNotification)
      .filter((item) => item.expiresAt > Date.now())
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, MAX_NOTIFICATIONS);

    localStorage.setItem(getStorageKey(userId), JSON.stringify(active));
    return active;
  } catch {
    try {
      localStorage.removeItem(getStorageKey(userId));
    } catch {
      // Storage may be unavailable in restricted browser modes.
    }
    return [];
  }
};

export const getUnreadUserNotificationCount = (userId: number) =>
  getUserNotifications(userId).filter((notification) => !notification.read).length;

export const addUserNotification = (userId: number, notification: NewNotification) => {
  if (typeof window === "undefined") return null;

  const createdAt = Date.now();
  const item: UserNotification = {
    id: createId(),
    title: notification.title,
    message: notification.message,
    type: notification.type,
    href: notification.href,
    createdAt,
    expiresAt: createdAt + (notification.ttlMs ?? DEFAULT_TTL_MS),
    read: false,
  };

  const notifications = [item, ...getUserNotifications(userId)].slice(0, MAX_NOTIFICATIONS);
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(notifications));
    notifySubscribers(userId);
    return item;
  } catch {
    return null;
  }
};

const updateUserNotifications = (userId: number, update: (item: UserNotification) => UserNotification) => {
  const notifications = getUserNotifications(userId).map(update);
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(notifications));
    notifySubscribers(userId);
  } catch {
    // Keep the current in-memory state if storage is unavailable.
  }
};

export const markUserNotificationRead = (userId: number, id: string) =>
  updateUserNotifications(userId, (item) => item.id === id ? { ...item, read: true } : item);

export const markAllUserNotificationsRead = (userId: number) =>
  updateUserNotifications(userId, (item) => ({ ...item, read: true }));

export const clearUserNotifications = (userId: number) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(getStorageKey(userId));
    notifySubscribers(userId);
  } catch {
    // Ignore storage access errors during logout.
  }
};

export const notificationsChangedEvent = EVENT_NAME;
