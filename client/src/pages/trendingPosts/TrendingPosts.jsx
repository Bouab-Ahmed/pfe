import React from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import Feeds from "../Feeds";
import Posts from "../../components/posts/Posts";
import Aside from "../../components/aside/Aside";
import Trending from "../../components/trending/Trending";

const TrendingPosts = () => {
  return (
    <div className="flex items-start bg-white gap-4">
      <div className="flex-[2] w-2/3">
        <Trending />
      </div>
      <div className="flex-1 p-10 w-1/3">
        <Aside />
      </div>
    </div>
  );
};

export default TrendingPosts;
