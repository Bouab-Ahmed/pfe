import React, { useState } from "react";

const PostComment = () => {
  const [comment, setComment] = useState("");

  return (
    <form
      className="mb-6"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(comment);
      }}
    >
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          rows="6"
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
          placeholder="Write a comment..."
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg cursor-pointer hover:bg-opacity-90 focus:outline-none"
      >
        Post comment
      </button>
    </form>
  );
};

export default PostComment;
