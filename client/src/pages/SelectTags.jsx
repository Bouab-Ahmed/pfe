import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../features/tags/tagSlice";
import Topics from "../components/Topics";



const SelectTags = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTags());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container1 mx-auto flex flex-col">
      <div className="my-10 flex flex-col items-center justify-center text-gray-800 gap-3">
        <h1 className="text-3xl">
          Welcome to{" "}
          <span className="text-4xl text-primary">Knowledge Hub</span> eager{" "}
        </h1>
        <p className="text-sm">
          Please select at least 3 categories of your interest for which you
          would like to explore further*
        </p>
        <Topics />
      </div>
      
    </div>
  );
};

export default SelectTags;
