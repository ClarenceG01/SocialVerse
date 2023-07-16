import { Avatar } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

const SingleComment = ({ comment }) => {
  console.log(comment);
  return (
    <div className="post-container">
      <div className="post-header">
        <Avatar src={comment.profile_picture} alt="profile picture" />
        <div className="user-details">
          <p className="fullname">{comment.full_name}</p>
          <p className="username">{comment.username}</p>
        </div>
      </div>
      <div className="post-body">
        <p>{comment.comment}</p>
      </div>
      <div className="post-footer">
        <div className="reactions">
          <div className="likes">
            <AiOutlineLike className="like-icon" />
            <p className="likes">{comment.likes_count}</p>
          </div>
          <div className="comments">
            <NavLink to="/commentreplies" className="navlink">
              <FaRegComment className="comment-icon" />
              <p className="comments">{comment.replies_count}</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
