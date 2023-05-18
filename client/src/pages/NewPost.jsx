import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getTags, reset } from "../features/posts/postsSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [contentEditor, setContentEditor] = useState();
  const [idTag, setIdTag] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    tags,
    isPostLoading,
    isPostSuccess,
    isPostError,
    isTagLoading,
    isTagSuccess,
    isTagError,
  } = useSelector((state) => state.post);
  const handleIdTagChange = (e) => {
    setIdTag(e.target.value);
  };
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    if (!contentEditor || !idTag || !title) {
      toast.error("Please fill in all fields");
      return;
    }

    form.set("content", contentEditor);
    form.set("idTag", idTag);
    form.set("title", title);
    form.set("image", image);
    dispatch(createPost(form));
  };

  const onSelectImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }

    setImage(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(reset());

    dispatch(getTags());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isPostSuccess) {
      dispatch(reset());
      navigate("/");
      toast.success("Post created successfully");
    }
    // eslint-disable-next-line
  }, [isPostSuccess]);

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="container1 mx-auto my-4">
      <form action="" onSubmit={onSubmit}>
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

        {preview ? (
          <div className="flex flex-col items-center justify-center w-[80%] mx-auto my-2 relative">
            <img src={preview} alt="" className="w-full h-96 " />
            <div
              onClick={() => setPreview(() => undefined)}
              className=" text-white font-medium absolute text-5xl top-2 right-4 cursor-pointer z-10"
            >
              <AiOutlineCloseCircle />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full my-2">
            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {image && image.name}
                </p>
              </div>
              <input
                id="file"
                type="file"
                className="hidden"
                required
                onChange={onSelectImage}
              />
            </label>
          </div>
        )}

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
            name="idTag"
            id="idTag"
            value={idTag}
            onChange={handleIdTagChange}
            className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-[#607D8B] peer"
          >
            {tags.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-primary active:bg-primary rounded-lg duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
          disabled={
            !contentEditor || !idTag || !title || isPostLoading || !image
          }
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default NewPost;
