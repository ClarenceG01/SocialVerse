import React, { useEffect, useState } from "react";
import axios from "axios";
import SinglePost from "./SinglePost";
import CreatePost from "./CreatePost";

const Feed = () => {
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

  return (
    <div className="Feed-component">
      <CreatePost refreshFeed={refreshFeed} />
      {Posts.map((post) => {
        return <SinglePost key={post.post_id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
