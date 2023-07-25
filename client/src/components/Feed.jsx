import React, { useEffect, useState } from "react";
import axios from "axios";
import SinglePost from "./SinglePost";
import CreatePost from "./CreatePost";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();
  const [Posts, setPosts] = useState([]);
  const getFollowingPosts = async () => {
    const response = await axios.get("http://localhost:5050/followingposts", {
      withCredentials: true,
    });
    setPosts(response.data.results);
    console.log(response);
  };

  const refreshFeed = () => {
    getFollowingPosts();
  };
  useEffect(() => {
    getFollowingPosts();
  }, []);
  const toSuggestedUsers = () => {
    navigate("/home/search");
  };
  return (
    <div className="Feed-component">
      <CreatePost refreshFeed={refreshFeed} />
      {/* {Posts.map((post) => {
        return <SinglePost key={post.post_id} post={post} />;
      })} */}
      {Posts.length === 0 ? (
        <div className="no-posts">
          <span>Follow users to get started</span>
          <Button variant="contained" onClick={toSuggestedUsers}>
            Get Started
          </Button>
        </div>
      ) : (
        Posts.map((post) => {
          return <SinglePost key={post.post_id} post={post} />;
        })
      )}
    </div>
  );
};

export default Feed;
