import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";
import Extra from "./Extra";
import SinglePost from "./SinglePost";
import axios from "axios";
import SingleComment from "./SingleComment";

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
  useEffect(() => {
    getComments();
  }, []);
  return (
    <div className="Home-component">
      <SideMenu />
      <div className="PostComments-component">
        <SinglePost key={post.post_id} post={post} />
        <div className="posts-comments">
          {Comments.map((comment) => {
            return <SingleComment key={comment.comment_id} comment={comment} />;
          })}
        </div>
      </div>
      <Extra />
    </div>
  );
};

export default PostComments;
