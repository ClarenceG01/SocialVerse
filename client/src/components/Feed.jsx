import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [Posts, setPosts] = useState([]);
  const getFollowingPosts = async () => {
    const response = await axios.get("http://localhost:5050/followingposts", {
      withCredentials: true,
    });
    console.log(response.data.results);
  };
  useEffect(() => {
    getFollowingPosts();
  }, []);
  return <div className="Feed-component"></div>;
};

export default Feed;
