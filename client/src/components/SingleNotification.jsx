import { Avatar } from "@material-ui/core";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const SingleNotification = ({ notification }) => {
  console.log(notification);
  const markRead = async (notify_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/setread/${notify_id}`,
        { withCredentials: true }
      );
      if (response.data.message === "Notifications retrieved") {
        toast.success("Notification marked as read");
      } else {
        toast.error("Error marking notification as read");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="single-notifications">
        <div className="upper-cut">
          <div className="notification-icon">
            <Avatar src={notification.trigger_profile_picture} />
          </div>
          <div className="notification-message">
            {notification.event_type === "Like Reply" ? (
              <p>
                <span className="notification-username">
                  {notification.trigger_username} liked your reply.
                </span>
              </p>
            ) : notification.event_type === "Like post" ? (
              <p>
                <span className="notification-username">
                  {notification.trigger_username} liked your post.
                </span>
              </p>
            ) : notification.event_type === "Like Comment" ? (
              <p>
                <span className="notification-username">
                  {notification.trigger_username} liked your comment.
                </span>
              </p>
            ) : notification.event_type === "Comment" ? (
              <p>
                <span className="notification-username">
                  {notification.trigger_username} commented on your post.
                </span>
              </p>
            ) : notification.event_type === "Follow" ? (
              <p>
                <span className="notification-username">
                  {notification.trigger_username} started following you.
                </span>
              </p>
            ) : null}
          </div>
        </div>
        <input
          type="checkbox"
          className="checkbox"
          onClick={() => {
            markRead(notification.notify_id);
          }}
        />
      </div>
    </div>
  );
};

export default SingleNotification;
