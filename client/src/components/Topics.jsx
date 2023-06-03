import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, updateUser } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const Topics = () => {
  const navigate = useNavigate();
  const { isUserUpdateSuccess } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);
  const { tags } = useSelector((state) => state.tag);
  const id = JSON.parse(localStorage.getItem("user"))._id;

  const handleTagClick = useCallback(
    (tagId) => {
      if (selectedTags.includes(tagId)) {
        setSelectedTags(
          selectedTags.filter((selectedTag) => selectedTag !== tagId)
        );
      } else {
        setSelectedTags([...selectedTags, tagId]);
      }
    },
    [selectedTags]
  );

  const handleSubmit = useCallback(() => {
    const user = {
      tags: selectedTags,
      _id: id,
    };
    dispatch(updateUser(user));
  }, [selectedTags, id, dispatch]);

  useEffect(() => {
    if (isUserUpdateSuccess) {
      dispatch(reset());
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isUserUpdateSuccess]);

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {tags?.map((tag) => (
          <span
            key={tag._id}
            className={`bg-gray-100 text-gray-800 font-medium mr-2 px-4 py-2 rounded-full text-base cursor-pointer hover:bg-green-400 hover:text-white ${
              selectedTags.includes(tag._id) ? "bg-primary text-white" : ""
            }`}
            onClick={() => handleTagClick(tag._id)}
          >
            {tag.name}
          </span>
        ))}
      </div>
      <button
        className={`py-2 px-4 mt-4 bg-primary text-white rounded-full ${
          selectedTags.length < 3 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={selectedTags.length < 3}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
};

export default Topics;
