import React, { useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const getUserNotifications = async () => {
    const results = await axios.get("http://localhost:5050/notifications", {
      withCredentials: true,
    });
    console.log(results);
  };
  useEffect = () => {
    getUserNotifications();
  };
  return (
    <div className="Notification-component">
      <div className="notification-container">
        <div className="single-notification"></div>
      </div>
    </div>
  );
};

export default Notifications;
