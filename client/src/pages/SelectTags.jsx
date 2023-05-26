import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../features/tags/tagSlice";
import { updateUser } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const SelectTags = () => {
	const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tags, isTagSuccess } = useSelector((state) => state.tag);
	const { isUserSuccess } = useSelector((state) => state.user);
  const [selectedTags, setSelectedTags] = useState([]);
	const id = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    dispatch(getTags());
    // eslint-disable-next-line
  }, []);

  const handleTagClick = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tagId)
      );
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

	const handleSubmit = () => {
		const user = {
			tags: selectedTags,
			_id: id
		}
		dispatch(updateUser(user));
	}

	useEffect(()=>{
		if(isUserSuccess){
			navigate("/");
		}
		// eslint-disable-next-line
	},[isUserSuccess])

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
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {isTagSuccess &&
          tags.map((tag) => (
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
    </div>
  );
};

export default SelectTags;
