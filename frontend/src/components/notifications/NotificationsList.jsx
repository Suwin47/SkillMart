import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";
import { NotificationContext } from "../../context/NotificationContext";

function NotificationsList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchNotifications: refreshNotificationCount } =
    useContext(NotificationContext);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");

      setNotifications(res.data.notifications);

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}`);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isRead: true }
            : item
        )
      );

      // Update navbar notification badge
      refreshNotificationCount();

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to update notification."
      );
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-lg font-medium">
        Loading notifications...
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow">
        <h2 className="text-2xl font-bold text-slate-800">
          No Notifications
        </h2>

        <p className="mt-3 text-slate-500">
          You're all caught up 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {notifications.map((notification) => (

        <div
          key={notification._id}
          onClick={() =>
            !notification.isRead &&
            markAsRead(notification._id)
          }
          className={`cursor-pointer rounded-2xl border p-6 shadow transition-all duration-300 hover:shadow-lg ${
            notification.isRead
              ? "bg-white border-slate-200"
              : "border-blue-200 bg-blue-50"
          }`}
        >

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold text-slate-800">
              {notification.title}
            </h2>

            {!notification.isRead && (
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                New
              </span>
            )}

          </div>

          <p className="mt-3 text-slate-600">
            {notification.message}
          </p>

          <p className="mt-4 text-sm text-slate-400">
            {new Date(
              notification.createdAt
            ).toLocaleString()}
          </p>

        </div>

      ))}

    </div>
  );
}

export default NotificationsList;