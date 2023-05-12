import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/posts/postsSlice";

const bookCategories = [
  "Biography",
  "Business",
  "Children's",
  "Cooking",
  "Crime",
  "Drama",
  "Education",
  "Fantasy",
  "Fiction",
  "Health",
  "History",
  "Horror",
  "Humor",
  "Mystery",
  "Poetry",
  "Religion",
  "Romance",
  "Science",
  "Science Fiction",
  "Self-Help",
  "Sports",
  "Travel",
];

const NewPost = () => {
  const [contentEditor, setContentEditor] = useState();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.post);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (contentEditor && category && title) {
      const post = {
        title,
        content: contentEditor,
        tags: category,
      };
      dispatch(createPost(post));
    } else
      toast.error(
        "Please fill in all fields before submitting"
      );
  };


  return (
    <div className="container1 mx-auto my-4">
      <form
        action=""
        onSubmit={onSubmit}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block py-2.5 px-0 w-full text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-[#607D8B] peer"
            placeholder="Title"
            required
          />
        </div>
        <Editor
          initialValue=""
          init={{
            plugins: "lists link image paste wordcount",
            toolbar:
              "undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fontfamily fontsize forecolor |  link image",
            menubar: true,
          }}
          value={contentEditor}
          onEditorChange={handleEditorChange}
          apiKey="jgcx2psulpmhn3zcyqiy8701ocford1i7ha5ue9t8b4q999a"
          cloudChannel="6-dev"
          content
        />
        <div className="my-4 text-black">
          <select 
          required={true}
          name="category"
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-[#607D8B] peer">
            {bookCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button
        type="submit"
        className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-primary active:bg-primary rounded-lg duration-150"
        >Publish</button>
      </form>
    </div>
  );
};

export default NewPost;
