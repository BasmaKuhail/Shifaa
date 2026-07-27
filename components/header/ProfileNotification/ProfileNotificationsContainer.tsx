import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import notification from "@/public/icons/notifications.svg";
import IconHolder from "../IconHolder";
import NotificationsDropDown from "../NotificationsDropDown";
import Profile from "../Profile";
import HeaderDeopDown from "../dropdown/DropDown";
import { User } from "@/types/UserType";
import {
  getUserNotifications,
  markAllUserNotificationsRead,
  markUserNotificationRead,
  notificationsChangedEvent,
  UserNotification,
} from "@/lib/notifications";

type ProNotContProps = {
  user: User;
  bg?: string;
};

export default function ProNotCont({ user, bg = "white" }: ProNotContProps) {
  const router = useRouter();
  const [profileOpened, setProfileOpened] = useState(false);
  const [notificationsOpened, setNotificationsOpened] = useState(false);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);

  useEffect(() => {
    const refreshNotifications = () => setNotifications(getUserNotifications(user.id));
    const handleNotificationsChanged = (event: Event) => {
      const changedUserId = (event as CustomEvent<{ userId: number }>).detail?.userId;
      if (changedUserId === user.id) refreshNotifications();
    };

    refreshNotifications();
    window.addEventListener(notificationsChangedEvent, handleNotificationsChanged);
    return () => window.removeEventListener(notificationsChangedEvent, handleNotificationsChanged);
  }, [user.id]);

  useEffect(() => {
    document.body.style.overflow = profileOpened || notificationsOpened ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [profileOpened, notificationsOpened]);

  const unreadCount = notifications.filter((item) => !item.read).length;
  const backdrop = (profileOpened || notificationsOpened) && typeof document !== "undefined"
    ? createPortal(
        <div
          className="fixed inset-0 bg-black/40 z-[40]"
          onClick={() => {
            setProfileOpened(false);
            setNotificationsOpened(false);
          }}
        />,
        document.body,
      )
    : null;

  return (
    <>
      {backdrop}
      <div dir="rtl" className={`flex flex-row gap-3 items-center justify-between ${bg === "white" ? "bg-white" : "bg-blue-70"}`}>
      <div className="relative z-[60]">
        <button
          type="button"
          aria-label="Open notifications"
          onClick={() => {
            setProfileOpened(false);
            setNotificationsOpened((opened) => !opened);
          }}
        >
          <IconHolder icon={notification} isNotification width={24} height={24} notiCount={unreadCount} />
        </button>
        <div className="absolute top-full left-0 z-[70]">
          {notificationsOpened && (
            <NotificationsDropDown
              notifications={notifications}
              onMarkAllRead={() => markAllUserNotificationsRead(user.id)}
              onNotificationClick={(item) => {
                markUserNotificationRead(user.id, item.id);
                setNotificationsOpened(false);
                if (item.href) void router.push(item.href);
              }}
            />
          )}
        </div>
      </div>

      <div className="w-[1px] h-[35px] bg-black-200" />

      <div
        className="relative z-[60] cursor-pointer"
        onClick={() => {
          setNotificationsOpened(false);
          setProfileOpened(true);
        }}
      >
        <Profile user={user} />
        <div className="absolute top-full left-0 z-[70]">
          {profileOpened && <HeaderDeopDown user={user} profileOpened={profileOpened} setProfileOpened={setProfileOpened} />}
        </div>
      </div>
      </div>
    </>
  );
}
