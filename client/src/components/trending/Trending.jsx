import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomPosts } from "../../features/posts/postsSlice";
import PostCard from "../posts/PostCard";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = window.location.pathname;
  let { posts, isPostSuccess } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getRandomPosts());
  }, []);

  useEffect(() => {
    if (isPostSuccess) {
      console.log(posts);
    }
    // eslint-disable-next-line
  }, [isPostSuccess]);
  
  if (path !== "/trending") {
    posts = posts.slice(0, 6);
  }


  return (
    <div className={`${path === "/" ? "bg-[#F1FAF7]" : "bg-white"} py-10 px-4 sm:px-0`}>
      <div className="flex justify-between items-center container1 mx-auto my-4">
        <h1 className="text-3xl md:text-4xl font-bold">Trending on platform</h1>
        {path === "/" && (
          <button
            className="bg-primary text-white font-bold py-2 px-4 sm:px-8 rounded-sm text-base"
            onClick={() => navigate("/trending")}
          >
            see more
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 container1 mx-auto ">
        {isPostSuccess &&
          posts.map((post) => <PostCard key={post.id} {...post} />)}
      </div>
    </div>
  );
};

export default Trending;
