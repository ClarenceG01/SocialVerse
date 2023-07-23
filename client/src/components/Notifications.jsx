import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleNotification from "./SingleNotification";

const Notifications = () => {
  const [Notifications, setNotifications] = useState([]);
  const getUserNotifications = async () => {
    const results = await axios.get("http://localhost:5050/notifications", {
      withCredentials: true,
    });
    const notifications = results.data.results;
    setNotifications(notifications);
  };
  console.log(Response);
  console.log(Notifications);
  useEffect(() => {
    getUserNotifications();
  }, []);

  return (
    <div className="Notification-component">
      <div className="notification-container">
        {Notifications.map((notification) => {
          return (
            <SingleNotification
              key={notification.notify_id}
              notification={notification}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
