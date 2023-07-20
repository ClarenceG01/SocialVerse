import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateReply = ({ comment, refreshReplies }) => {
  const [Reply, setReply] = useState("");
  console.log(comment);
  const handleReply = (e) => {
    setReply(e.target.value);
  };
  const sendReply = async (e) => {
    try {
      e.preventDefault();
      setReply("");
      const input_data = {
        comment_id: comment.comment_id,
        content: Reply,
      };
      console.log(`body` + input_data.comment_id);
      const response = await axios.post(
        "http://localhost:5050/replytocomment",
        input_data,
        { withCredentials: true }
      );
      const message = response.data.message;
      if (message == "Reply posted") {
        toast.success("Reply posted");
        refreshReplies();
      }
      console.log(`create post response` + response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="createcomment-box">
      <form onSubmit={sendReply}>
        <div className="createcomment-top">
          <Avatar />
          <textarea
            className="createcomment-textarea"
            cols="33"
            required
            onChange={handleReply}
            value={Reply}
          />
        </div>
        <div className="button-div">
          <Button variant="contained" size="small" type="submit">
            Reply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateReply;
