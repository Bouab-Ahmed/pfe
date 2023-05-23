import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { search } from "../features/posts/postsSlice";
import { search } from "../../features/posts/postsSlice";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ searchInput: query, option: type });
    dispatch(search({ searchInput: query, option: type }));
  };

  return (
    <form className="w-1/2" onSubmit={onSubmit}>
      <div className=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
        <button className="outline-none focus:outline-none" type="submit">
          <svg
            className=" w-5 text-gray-600 h-5 cursor-pointer"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
        <input
          type="search"
          name=""
          id=""
          placeholder="search for Books, Authors, Articles, etc..."
          x-model="q"
          className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="select">
          <select
            name=""
            id=""
            x-model="image_type"
            className="text-sm outline-none focus:outline-none bg-transparent"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="all" defaultValue={"all"}>
              All
            </option>
            <option value="content">Articles</option>
            <option value="user">Authors</option>
            <option value="tags">Categories</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
