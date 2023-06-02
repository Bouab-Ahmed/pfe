import React from "react";
import Posts from "../components/posts/Posts";
import Aside from "../components/aside/Aside";


const Feeds = () => {

  return (
    <div className="container1 mx-auto flex justify-between my-2 ">
      <div className="lg:flex-[2]">
        <Posts />
      </div>
      <div className="lg:flex-1">
        <Aside />
      </div>
    </div>
  );
};

export default Feeds;
