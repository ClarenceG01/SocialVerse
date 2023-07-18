import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";

const SingleComment = ({ comment }) => {
  const navigate = useNavigate();
  const [Like, setLike] = useState();
  const [LikeCount, setLikeCount] = useState(comment.likes_count);
  const checkLike = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5050/checkcommentlike",
        { comment_id: comment.comment_id },
        { withCredentials: true }
      );
      setLike(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5050/likecomment",
        { comment_id: comment.comment_id },
        { withCredentials: true }
      );
      console.log(`Like in handleLike: ${Like}`);
      if (Like == 1) {
        setLikeCount(LikeCount - 1);
      } else {
        setLikeCount(LikeCount + 1);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const postClick = () => {
    navigate("/commentreplies", { state: { comment: comment } });
  };
  const handleReply = () => {
    navigate("/commentreplies", { state: { comment: comment } });
  };
  useEffect(() => {
    checkLike();
  });
  return (
    <div className="post-container">
      <div className="post-header">
        <Avatar src={comment.profile_picture} alt="profile picture" />
        <div className="user-details">
          <p className="fullname">{comment.full_name}</p>
          <p className="username">@{comment.username}</p>
        </div>
      </div>
      <div className="post-body" onClick={postClick}>
        <p>{comment.comment}</p>
      </div>
      <div className="post-footer">
        <div className="reactions">
          <div className="likes">
            {Like === 1 ? (
              <AiOutlineLike
                className="like-icon filled"
                onClick={handleLike}
              />
            ) : (
              <AiOutlineLike className="like-icon" onClick={handleLike} />
            )}
            <p className="likes">{LikeCount}</p>
          </div>
          <div className="comments" onClick={handleReply}>
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
