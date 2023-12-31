import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";
import Extra from "./Extra";
import SinglePost from "./SinglePost";
import axios from "axios";
import SingleComment from "./SingleComment";
import CreateComment from "./CreateComment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PostComments = () => {
  const location = useLocation();
  const post = location.state.post;
  const [Comments, setComments] = useState([]);
  const getComments = async () => {
    const response = await axios.get(
      `http://localhost:5050/singlepost/${post.post_id}`,
      { withCredentials: true }
    );
    const comments = response.data.comments;
    setComments(comments);
    console.log(comments);
  };
  const goBack = () => {
    window.history.back();
  };
  useEffect(() => {
    getComments();
  }, []);
  const refreshComments = () => {
    getComments();
  };
  return (
    <div className="PostComments-component">
      <div className="back">
        <ArrowBackIcon color="blue" onClick={goBack} />
      </div>
      <SinglePost key={post.post_id} post={post} />
      <CreateComment post={post} refreshComments={refreshComments} />
      <div className="posts-comments">
        {Comments.map((comment) => {
          return <SingleComment key={comment.comment_id} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default PostComments;
