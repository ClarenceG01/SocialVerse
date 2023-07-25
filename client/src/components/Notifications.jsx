import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleNotification from "./SingleNotification";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  const goBack = () => {
    window.history.back();
  };
  const markAll = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/markallread`, {
        withCredentials: true,
      });
      if (response.data.message === "Notifications retrieved") {
        toast.success("All notifications marked as read");
      } else {
        toast.error("Error marking notifications as read");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Notification-component">
      <div className="back">
        <ArrowBackIcon color="blue" onClick={goBack} />
      </div>
      <div className="notification-container">
        <Button variant="contained" onClick={markAll}>
          Mark All
        </Button>
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
