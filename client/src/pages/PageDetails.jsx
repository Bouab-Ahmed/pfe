import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../features/posts/postsSlice";
import parse from "html-react-parser";
import Aside from "../components/aside/Aside";
import { FaRegCommentDots } from "react-icons/fa";
import RateSection from "../components/rateSection/RateSection";
import CommentDrawer from "../components/commentDrawer/CommentDrawer";
const PageDetails = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [post, setPost] = useState({});
  const [displayComment, setDispalyComment]= useState(false)
  const openRightDrawer = () => setOpenDrawer(true);
  const closeDrawerRight = () => setOpenDrawer(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singlePost, singlePostSuccess } = useSelector((state) => state.post);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSinglePost(id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (singlePostSuccess) {
      setPost(singlePost);
      setTimeout(()=>setDispalyComment(()=>true),5000)
    }
  },[singlePostSuccess]);



  return (
    <div>
      {post && (
        <div className="container1 mx-auto flex justify-between my-2 gap-10">
          <div className="flex flex-col items-center flex-[2]">
            <h1 className="text-5xl font-bold text-gray-900 my-4 self-start">
              {post?.title}
            </h1>
            <div className="flex flex-col items-start justify-center w-full h-96 mb-10">
              <img
                src={`http://localhost:5000${post?.image}`}
                alt="post"
                className="h-full w-full my-4 object-cover"
              />
            </div>
            <div className="postContent m-2">{parse(`${post?.content}`)}</div>
            <div className="self-start my-4 flex gap-4 text-gray-800">
              <RateSection
                postId={post?._id}
                user={user}
                like={post?.like}
                dislike={post?.dislike}
              />
              {displayComment && (
              <FaRegCommentDots
                className="text-2xl stroke-[0.5] bg-transparent"
                onClick={openRightDrawer}
              />
                )}
                <CommentDrawer
                  closeDrawerRight={closeDrawerRight}
                  openDrawer={openDrawer}
                  commentslength={post?.comments?.length}
                />
            </div>
          </div>
          {user && (
            <div className="flex-1">
              <Aside postUser={post?.user} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PageDetails;
