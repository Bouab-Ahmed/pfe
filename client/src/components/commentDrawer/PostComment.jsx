import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getComments,
} from "../../features/comments/commentSlice";
import { Await, useParams } from "react-router-dom";

const PostComment = ({ change }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const { isSuccessComment, comments, update } = useSelector(
    (state) => state.comment
  );

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment) {
      return;
    }
    dispatch(createComment({ postId: id, comment }));
    setComment("");
  };

  useEffect(() => {
    if (update) {
      dispatch(getComments(id));
      change(true);
    }
  }, [update]);

  return (
    <form className="mb-6" onSubmit={handleComment}>
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
