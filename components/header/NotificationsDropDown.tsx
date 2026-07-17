import { UserNotification } from "@/lib/notifications";

type NotificationsDropDownProps = {
  notifications: UserNotification[];
  onNotificationClick: (notification: UserNotification) => void;
  onMarkAllRead: () => void;
};

export default function NotificationsDropDown({
  notifications,
  onNotificationClick,
  onMarkAllRead,
}: NotificationsDropDownProps) {
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <div dir="rtl" className="bg-white rounded-[12px] p-4 pb-5 w-[21.75rem] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-7rem)] overflow-y-auto flex flex-col gap-1 shadow-lg border border-black-200">
      <div className="flex items-center justify-between">
        <p className="text-sm font-[500]">الإشعارات</p>
        {unreadCount > 0 && (
          <button type="button" className="text-xs text-blue-600 hover:underline" onClick={onMarkAllRead}>
            تحديد الكل كمقروء
          </button>
        )}
      </div>
      <div className="flex flex-row justify-between w-full border-t border-t-black-200 pt-5 mt-5 text-12px font-[500]">
        <p>{unreadCount} غير مقروءة</p>
      </div>
      <div className="flex flex-col">
        {notifications.length === 0 ? (
          <p className="py-8 text-center text-sm text-black-500">لا توجد إشعارات</p>
        ) : notifications.map((notification) => (
          <button
            type="button"
            key={notification.id}
            className={`text-right border border-black-200 p-3 flex flex-col gap-2 hover:bg-black-100 ${notification.read ? "bg-white" : "bg-blue-50"}`}
            onClick={() => onNotificationClick(notification)}
          >
            <span className="flex items-center justify-between gap-2">
              <strong className="text-sm">{notification.title}</strong>
              {!notification.read && <span className="h-2 w-2 rounded-full bg-red shrink-0" aria-label="Unread" />}
            </span>
            <span className="text-inpt text-black-500">{notification.message}</span>
            <span className="text-xs text-black-500">{new Date(notification.createdAt).toLocaleDateString()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
