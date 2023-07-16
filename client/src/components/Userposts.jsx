import React, { useState, useEffect } from "react";
import axios from "axios";
import SinglePost from "./SinglePost";

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
  return (
    <div className="Userposts-component">
      {Posts.map((post) => {
        return <SinglePost key={post.post_id} post={post} />;
      })}
    </div>
  );
};

export default Userposts;
