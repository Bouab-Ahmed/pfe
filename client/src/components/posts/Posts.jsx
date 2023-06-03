import React, { useEffect } from "react";
import PostCard from "./PostCard";
import { getPosts } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetComment } from "../../features/comments/commentSlice";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/users/userSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = window.location.pathname.split("/")[1];
  const { posts, isPostLoading, isPostSuccess, isPostError } = useSelector(
    (state) => state.post
  );
  const { isUserSuccessGetMe } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getPosts());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getPosts());
    // eslint-disable-next-line
  }, [isUserSuccessGetMe]);

  useEffect(() => {
    dispatch(getMe());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(resetComment());
  });

  if (isPostLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center min-w-full">
      {isPostSuccess && posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} {...post} />)
      ) : (
        <div className="flex flex-col items-center my-4 gap-2">
          <h1>you don't have any post in the range of your categories</h1>
          <button className="py-2 px-4 bg-primary text-white rounded-lg">
            <a href="/topics">follow more categories to see more posts</a>
          </button>
        </div>
      )}
      {path !== "profile" && posts.length > 5 && isPostSuccess && (
        <div>
          <button className="text-[#222222] font-bold py-2 px-4 rounded-lg bg-gray-300 ">
            follow more categories to see more posts
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
