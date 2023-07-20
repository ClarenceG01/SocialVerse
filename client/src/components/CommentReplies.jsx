import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SingleComment from "./SingleComment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateReply from "./CreateReply";
import axios from "axios";
import SingleReply from "./SingleReply";

const CommentReplies = () => {
  const location = useLocation();
  const comment = location.state.comment;
  const [Replies, setReplies] = useState([]);
  const getReplies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/repliestocomment/${comment.comment_id}`,
        { withCredentials: true }
      );
      const replies = response.data.results;
      setReplies(replies);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(comment);
  const goBack = () => {
    window.history.back();
  };
  useEffect(() => {
    getReplies();
  }, []);
  return (
    <div className="CommentReplies-component">
      <div className="back">
        <ArrowBackIcon color="blue" onClick={goBack} />
      </div>
      <SingleComment key={comment.comment_id} comment={comment} />
      <CreateReply comment={comment} />

      <div className="posts-comments">
        {Replies.map((reply) => {
          return <SingleReply key={reply.reply_id} reply={reply} />;
        })}
      </div>
    </div>
  );
};

export default CommentReplies;
