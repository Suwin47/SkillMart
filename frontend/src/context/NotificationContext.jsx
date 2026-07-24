import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");

      const unread = res.data.notifications.filter(
        (item) => !item.isRead
      ).length;

      setUnreadCount(unread);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        unreadCount,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;