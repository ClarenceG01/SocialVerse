import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import CreateComment from "./CreateComment";

const SinglePost = ({ post }) => {
  const navigate = useNavigate();
  const [Like, setLike] = useState();
  const [LikeCount, setLikeCount] = useState(post.like_count);
  const [CommentComponent, setCommentComponent] = useState(false);
  const checkLike = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5050/checklike",
        { post_id: post.post_id },
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
        "http://localhost:5050/likepost",
        { post_id: post.post_id },
        { withCredentials: true }
      );
      if (Like == 1) {
        setLikeCount(LikeCount - 1);
      } else {
        setLikeCount(LikeCount + 1);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const postClick = () => {
    navigate("/postcomments", { state: { post: post } });
  };
  useEffect(() => {
    checkLike();
  });
  const handleComment = () => {
    // set CommentComponent to true
    setCommentComponent(true);
    console.log(CommentComponent);
  };
  return (
    <div className="post-container">
      <div className="post-header">
        <Avatar
          className="avatar"
          src={post.profile_picture}
          alt="profile picture"
        />
        <div className="user-details">
          <p className="fullname">{post.full_name}</p>
          <p className="username">@{post.username}</p>
        </div>
      </div>
      <div className="post-body" onClick={postClick}>
        <p>{post.post_text}</p>
        {post.media_links && (
          <img className="post-photo" src={post.media_links} alt="post media" />
        )}
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
          <div className="comments">
            <NavLink className="navlink">
              <FaRegComment className="comment-icon" />
              <p className="comments">{post.comment_count}</p>
            </NavLink>
          </div>
          {CommentComponent && <CreateComment />}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
