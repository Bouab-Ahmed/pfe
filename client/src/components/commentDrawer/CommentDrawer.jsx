import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import PostComment from "./PostComment";

import ReplyComment from "./ReplyComment";

import { useParams } from "react-router-dom";
import {
  getComments,
  replyComments,
} from "../../features/comments/commentSlice";
const CommentDrawer = ({ openDrawer, closeDrawerRight, commentslength }) => {
  const [ref, setref] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [reply, setReply] = useState("");

  const { comments, isSuccessReply } = useSelector(
    (state) => state.comment
  );

  useEffect(() => {
    if (commentslength && openDrawer) {
      dispatch(getComments(id));
    }
  }, [openDrawer]);

  const handleCommentLikes = () => {};

  const handleReplyClick = (commentId) => {
    setShowReplyBox((prevState) => ({
      ...prevState,
      [commentId]: !showReplyBox[commentId],
    }));
  };

  const handleReply = (e, id) => {
    e.preventDefault();
    dispatch(replyComments({ id, comment: reply }));
    setShowReplyBox(false);
    setReply("");
  };

  useEffect(() => {
    if (isSuccessReply) {
      dispatch(getComments(id));
    }
  }, [isSuccessReply]);

  return (
    <Drawer
      title={`Discussion ${commentslength}`}
      placement="right"
      onClose={closeDrawerRight}
      open={openDrawer}
      width={420}
    >
      <PostComment change={setref} />

      {comments?.map((comment) => {
        return (
          <div key={comment._id}>
            <div className="p-6 mb-6 text-base bg-white rounded-lg ">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={`http://localhost:5000${comment.user.profilePic}`}
                      alt="avatar"
                    />
                    {comment.user.name}
                  </p>
                  <p className="text-sm text-gray-600 ">
                    {new Date(comment.createdAt).toDateString()}
                  </p>
                </div>
                <button
                  id="dropdownComment1Button"
                  data-dropdown-toggle="dropdownComment1"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:outline-none "
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                {/* <div
                              id="dropdownComment1"
                              className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow"
                            >
                              <ul
                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconHorizontalButton"
                              >
                                <li>
                                  <a
                                    href="/edit"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  >
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="/remove"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  >
                                    Remove
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="/report"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                                  >
                                    Report
                                  </a>
                                </li>
                              </ul>
                            </div> */}
              </footer>
              <p className="text-gray-500">{comment.comment}</p>
              <div className="flex items-center mt-4 space-x-4">
                <div className="flex items-center gap-1 text-gray-500">
                  <BiUpvote
                    className={`text-base stroke-[0.5] ${
                      comment.activeBtn === "upvote"
                        ? "bg-transparent fill-primary stroke-primary"
                        : "bg-transparent"
                    } `}
                    onClick={() => handleCommentLikes("upvote", comment._id)}
                  />
                  <span className="text-xl">{comment.like.length}</span>
                  <BiDownvote
                    className={`text-base stroke-[0.5] ${
                      comment.activeBtn === "downvote"
                        ? "fill-primary stroke-primary"
                        : "bg-transparent"
                    } `}
                    onClick={() => handleCommentLikes("downvote", comment._id)}
                  />
                  <span className="text-xl">{comment.dislike.length}</span>
                </div>
                <a
                  href={`#${comment._id}`}
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline"
                  onClick={() => handleReplyClick(comment._id)}
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  Replyss
                </a>
              </div>
            </div>
            {/* display reply comments */}
            <ReplyComment comment={comment} />

            {showReplyBox[comment._id] && (
              <form
                id={`${comment._id}`}
                className="mb-6"
                onSubmit={(e) => handleReply(e, comment._id)}
              >
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="2"
                    className="px-0 w-full text-sm text-gray-900 border-1 focus:ring-0 focus:outline-none"
                    placeholder="Write a comment..."
                    required
                    // value={comment}
                    onChange={(e) => setReply(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg cursor-pointer hover:bg-opacity-90 focus:outline-none"
                >
                  reply
                </button>
              </form>
            )}
            {/* {show && <div>hiiii</div>} */}
          </div>
        );
      })}
    </Drawer>
  );
};

export default CommentDrawer;
