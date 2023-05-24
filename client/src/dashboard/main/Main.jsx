import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllusers } from "../../features/users/userSlice";
import { getRandomPosts } from "../../features/posts/postsSlice";
import { getTags } from "../../features/tags/tagSlice";
import DashCard from "../components/DashCard";

const Main = () => {
  const dispatch = useDispatch();

  const { isUserSuccess, users } = useSelector((state) => state.user);
  const { isPostSuccess, posts } = useSelector((state) => state.post);
  const { isTagSuccess, tags } = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(getAllusers());
    dispatch(getRandomPosts());
    dispatch(getTags());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col justify-between my-2 w-full">
      <div className=" p-4 flex w-full justify-evenly gap-4">
        {isUserSuccess && <DashCard title={"Users"} value={users.length} />}
        {isPostSuccess && <DashCard title={"Posts"} value={posts.length} />}
        {isTagSuccess && <DashCard title={"Tags"} value={tags.length} />}
      </div>
    </div>
  );
};

export default Main;
