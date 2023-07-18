import React from "react";
import { useLocation } from "react-router-dom";
import SideMenu from "./SideMenu";
import Extra from "./Extra";
import SingleComment from "./SingleComment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CommentReplies = () => {
  const location = useLocation();
  const comment = location.state.comment;
  console.log(comment);
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="Home-component">
      <SideMenu />
      <div className="CommentReplies-component">
        <div className="back">
          <ArrowBackIcon color="blue" onClick={goBack} />
        </div>
        <SingleComment key={comment.comment_id} comment={comment} />
        <CommentReplies comment={comment} />
        <div className="posts-comments"></div>
      </div>
      <Extra />
    </div>
  );
};

export default CommentReplies;
