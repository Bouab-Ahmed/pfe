import React from "react";
import Posts from "../components/posts/Posts";
import Aside from "../components/aside/Aside";

// get user from local storage

const Feeds = () => {
  return (
    <div className="container1 mx-auto flex justify-between my-2">
      <div className="flex-[2]">
        <Posts />
      </div>
      <div className="flex-1">
        <Aside />
      </div>
    </div>
  );
};

export default Feeds;
