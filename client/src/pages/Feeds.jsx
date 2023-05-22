import React, { useEffect } from "react";
import Posts from "../components/posts/Posts";
import Aside from "../components/aside/Aside";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/posts/postsSlice";

// get user from local storage


const Feeds = () => {

  return (
    <div className="container1 mx-auto flex justify-between my-2 ">
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
