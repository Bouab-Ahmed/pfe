import React, { useEffect, useState } from "react";

import authorPic from "../../assets/default.jpg";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";


const PostCard = (post) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col my-2 border-b border-[#DBDADB] border-opacity-70 pb-4 w-[90%]">
      <div className="flex flex-row items-center gap-2 py-1">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(`/profile/${post.user.profilePic}`)}
        >
          <img src={authorPic} alt="author" className="h-8 w-8 rounded-full" />
        </div>
        <div className="flex flex-col">
          <span>{post.user.name}</span>
          {/* <span className="text-[#DBDADB]">.</span> */}
          <span className="text-[#DBDADB] text-sm">
            {new Date(post.updatedAt).toDateString()}
          </span>
        </div>
      </div>
      <div
        className="flex flex-row items-center justify-between cursor-pointer"
        onClick={() => navigate(`/posts/${post.id}`)}
      >
        <div className="flex flex-col w-3/4">
          <h2 className="text-2xl pt-2 font-bold">{post.title}</h2>
          <p className="font-sourceSansPro font-thin line-clamp-3 py-1 text-[#292929]">
            {parse(`${post?.content}`)}
          </p>
          <div className="flex flex-row gap-2">
            <div>
              {post.tags.map((tag) => (
                <span
                  className="mx-1 px-2 py-1 bg-gray-100 rounded-full text-sm text-[#292929]"
                  key={tag._id}
                >
                  {" "}
                  {tag.name}{" "}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/4 flex justify-end">
          <img
            src={`http://localhost:5000${post.image}`}
            alt="post"
            className="w-[70%]"
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
