import React from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import Feeds from "../Feeds";
import Posts from "../../components/posts/Posts";
import Aside from "../../components/aside/Aside";
import Trending from "../../components/trending/Trending";

const TrendingPosts = () => {
  return (
    <div className="flex items-start bg-white">
      <div className="flex-[2]">
        <Trending />
      </div>
      <div className="flex-1 py-10">
        <Aside />
      </div>
    </div>
  );
};

export default TrendingPosts;
