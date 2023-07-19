import { Avatar } from "@material-ui/core";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateComment = (props) => {
  // const location = useLocation();
  // const post = location.state.post;
  const post = props.post;
  const [Comment, setComment] = useState("");
  const sendComment = async (e) => {
    try {
      e.preventDefault();
      setComment("");
      const comment_inputs = {
        post_id: post.post_id,
        comment: Comment,
      };
      const response = await axios.post(
        "http://localhost:5050/commentpost",
        comment_inputs,
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "Post commented") {
        toast.success("Comment posted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="createcomment-box">
      <form onSubmit={sendComment}>
        <div className="createcomment-top">
          <Avatar />
          <textarea
            className="createcomment-textarea"
            cols="33"
            required
            onChange={(e) => setComment(e.target.value)}
            value={Comment}
          />
        </div>
        <div className="button-div">
          <Button variant="contained" size="small" type="submit">
            Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
