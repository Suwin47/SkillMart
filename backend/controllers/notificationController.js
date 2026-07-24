const Notification = require("../models/Notification");

// Get Logged-in User Notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: notifications.length,
      notifications,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Mark Notification as Read
const markAsRead = async (req, res) => {
  try {
    console.log("✅ Marking notification as read:", req.params.id);

  const notification = await Notification.findOneAndUpdate(
  {
    _id: req.params.id,
    user: req.user.userId,
  },
  {
    isRead: true,
  },
  {
    new: true,
  }
);

if (!notification) {
  return res.status(404).json({
    success: false,
    message: "Notification not found",
  });
}

    res.status(200).json({
      success: true,
      notification,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
};