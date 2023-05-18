import React, { useEffect } from "react";
import PostCard from "./PostCard";
import { getPosts, reset } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";


const Posts = () => {
  const dispatch = useDispatch();
  const { posts, isPostLoading, isPostSuccess, isPostError,isTagSuccess } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  // useEffect(() => {
  //     if (isSuccess) {
  //       dispatch(reset());
  //     }
  // }, [isSuccess]);

  if (isPostLoading) {
    return <h1>Loading...</h1>;
  }

  if (isPostError) {
    return <h1>Something went wrong</h1>;
  }


  console.log(posts)

  return (
    <div className="flex flex-col">
      { isTagSuccess && posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
