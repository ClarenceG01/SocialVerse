import { Avatar } from "@material-ui/core";
import React from "react";

const SingleNotification = ({ notification }) => {
  console.log(notification);
  return (
    <div>
      <div className="single-notifications">
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
          ) : notification.event_type === "Like Post" ? (
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
    </div>
  );
};

export default SingleNotification;
