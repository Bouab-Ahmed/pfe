import React from "react";

export default function Tags({ tags }) {
  return (
    <>
      <div className="mx-1 my-2">
        <h2 className="text-2xl font-bold my-2">Recommended Topics</h2>
        <div className="flex flex-wrap gap-2">
          {tags?.slice(0, 10)?.map((tag) => (
            <span
              className="p-2 bg-gray-100 rounded-full text-sm text-[#292929] cursor-pointer"
              key={tag._id}
            >
              {" "}
              {tag.name}{" "}
            </span>
          ))}
        </div>
        <h3 className="my-1 text-primary">
          <a href="/topics">Discover more</a>
        </h3>
      </div>
    </>
  );
}
