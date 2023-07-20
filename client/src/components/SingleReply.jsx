import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import { AiOutlineLike } from "react-icons/ai";
import axios from "axios";
const SingleReply = (props) => {
  const { reply } = props;
  console.log(reply);
  const [Like, setLike] = useState();
  const [LikeCount, setLikeCount] = useState(reply.like_count);
  const checkLike = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/checkreplylike/${reply.reply_id}`,
        { withCredentials: true }
      );
      setLike(response.data.response);
      console.log(Like);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/likereply/${reply.reply_id}`,
        { withCredentials: true }
      );
      if (Like === 1) {
        setLikeCount(LikeCount - 1);
      } else {
        setLikeCount(LikeCount + 1);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkLike();
  });
  return (
    <div className="post-container">
      <div className="post-header">
        <Avatar src={reply.profile_picture} alt="profile picture" />
        <div className="user-details">
          <p className="fullname">{reply.full_name}</p>
          <p className="username">@{reply.username}</p>
        </div>
      </div>
      <div className="post-body">
        <p>{reply.content}</p>
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
        </div>
      </div>
    </div>
  );
};

export default SingleReply;
