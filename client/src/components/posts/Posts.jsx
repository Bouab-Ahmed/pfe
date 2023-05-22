import React, { useEffect } from "react";
import PostCard from "./PostCard";
import { getPosts } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";

const Posts = () => {
  const dispatch = useDispatch();
  const path = window.location.pathname.split("/")[1];
  const { posts, isPostLoading, isPostSuccess, isPostError } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(getPosts());
    // eslint-disable-next-line
  }, []);

  if (isPostLoading) {
    return <h1>Loading...</h1>;
  }

  if (isPostError) {
    return <h1>Something went wrong</h1>;
  }

  console.log(posts);

  return (
    <div className="flex flex-col items-center">
      {isPostSuccess &&
        posts.map((post) => <PostCard key={post.id} {...post} />)}
      {
        path !=="profile" && (
          <div>
        <button className="text-[#222222] font-bold py-2 px-4 rounded-lg bg-gray-300 ">
          follow more categories to see more posts
        </button>
      </div>
        )
      }
    </div>
  );
};

export default Posts;
