import React, { useState, useEffect } from "react";
import axios from "axios";
import SinglePost from "./SinglePost";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const Userposts = () => {
  const [Posts, setPosts] = useState([]);
  const getUserPosts = async () => {
    const response = await axios.get("http://localhost:5050/userpost", {
      withCredentials: true,
    });
    setPosts(response.data.results);
    console.log(response.data.results);
  };
  useEffect(() => {
    getUserPosts();
  }, []);
  const handleDeletePost = async (post_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/deletepost/${post_id}`,
        { withCredentials: true }
      );
      if (response.data.message === "Post deleted") {
        toast.success("Post deleted");
        setTimeout(() => {
          setPosts(Posts.filter((post) => post.post_id !== post_id));
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting post");
    }
  };
  return (
    <div className="Userposts-component">
      {Posts.map((post) => {
        return (
          <div className="all-user-posts">
            <SinglePost key={post.post_id} post={post} />
            <div className="actions">
              <div className="delete">
                <AiOutlineDelete
                  className="delete-posts"
                  onClick={() => {
                    handleDeletePost(post.post_id);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Userposts;
