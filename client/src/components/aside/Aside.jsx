import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getTags } from "../../features/tags/tagSlice";
import { following, getAllusers, getMe } from "../../features/users/userSlice";
import Recommands from "./Recommands";
import Tags from "./Tags";
import Posts from "./Posts";

const Aside = ({ postUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tags, isTagGetSuccess } = useSelector((state) => state.tag);

  const { users, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getAllusers());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getAllusers());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="lg:flex flex-col justify-center sticky top-14 z-10 hidden">
      {postUser && (
        <div className="flex flex-col items-center justify-center gap-1 w-3/4 text-center">
          <div className="w-24 h-w-24 rounded-full">
            <img
              src={`http://localhost:5000${postUser?.profilePic}`}
              alt="author"
              className="w-full h-full object-cover"
            />
          </div>
          <h3
            className="my-1 text-lg cursor-pointer"
            onClick={() => navigate(`/profile/${postUser._id}`)}
          >
            {postUser?.name}
          </h3>
          <div className="flex flex-row gap-2 ">
            <span>{postUser?.follower.length} followers</span> •{" "}
            <span>{postUser?.following.length} following</span>
          </div>
          <p className="text-[#292929] opacity-75 text-sm">
            Creative Investor. Sharing my inspiring journey in...
          </p>
          {user?.following.some((id) => id === postUser._id) ? (
            <button
              // onClick={() => dispatch(following(postUser._id))}
              // className="w-full rounded-full px-4 py-1 border border-primary text-white bg-primary"
              className="rounded-full w-[190px] py-[8px]  border border-gray-900 "
            >
              Following
            </button>
          ) : (
            <button
              onClick={() => dispatch(following(postUser._id))}
              // className="w-full rounded-full px-4 py-1 border border-primary text-white bg-primary"
              className="rounded-full w-[190px] py-[8px] text-white bg-primary border-primary border-2"
            >
              Follow
            </button>
          )}
        </div>
      )}
      <div className="">
        {tags.length && <Tags tags={tags} />}
        {user && !postUser && (
          <Recommands user={user} users={users} following={following} />
        )}
      </div>
      {user && postUser && <Posts user={postUser} />}
    </div>
  );
};

export default Aside;
