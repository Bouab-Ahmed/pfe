import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTags } from "../../features/tags/tagSlice";
import { following, getAllusers, getMe } from "../../features/users/userSlice";
import Recommands from "./Recommands";
import Tags from "./Tags";

const Aside = () => {
  const dispatch = useDispatch();
  const { tags, isTagGetSuccess } = useSelector((state) => state.tag);

  const { users, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getAllusers());
    dispatch(getMe());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col justify-center sticky top-14 z-10">
      {/* {user && (
        <div className="flex flex-col items-center justify-center gap-1 w-3/4 text-center">
          <div className="w-24 h-w-24 rounded-full">
            <img
              src={`http://localhost:5000${user?.profilePic}`}
              alt="author"
              className="w-full h-full object-cover"
            />
          </div>
          <h3
            className="my-1 text-lg cursor-pointer"
            onClick={() => navigate(`/profile/${user._id}`)}
          >
            {user?.name}
          </h3>
          <div className="flex flex-row gap-2 ">
            <span>{user?.follower.length} followers</span> •{" "}
            <span>{user?.following.length} following</span>
          </div>
          <p className="text-[#292929] opacity-75 text-sm">
            Creative Investor. Sharing my inspiring journey in...
          </p>
          <button className="w-full rounded-full px-4 py-1 border border-primary text-white bg-primary">
            Follow
          </button>
        </div>
      )} */}
      <Tags tags={tags} />
      {user ? (
        <Recommands user={user} users={users} following={following} />
      ) : (
        <h2 className="text-2xl font-bold my-2">more from this user</h2>
      )}
    </div>
  );
};

export default Aside;
