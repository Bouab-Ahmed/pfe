import React, { useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { sendDislike, sendLike } from "../../features/rate/rateSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../features/posts/postsSlice";

const RateSection = ({ postId, user, like, dislike }) => {
  const dispatch = useDispatch();
  const { likes, dislikes, isRateSuccess } = useSelector(
    (state) => state.rate
  );

  const [upVote, setUpvote] = useState(likes);
  const [downVote, setDownVote] = useState(dislikes);

  useEffect(() => {
    if (isRateSuccess) {
      dispatch(getSinglePost(postId));
      setUpvote(likes);
      setDownVote(dislikes);
    }
  }, [likes, dislikes]);

  return (
    <div className="flex items-center gap-1">
      <BiUpvote
        className={`text-2xl stroke-[0.5] disable ${
          like?.some((id) => id.user === user?._id)
            ? "bg-transparent fill-primary stroke-primary"
            : "bg-transparent"
        }  `}
        onClick={() => dispatch(sendLike(postId))}
      />
      <span className="text-xl">{upVote || like?.length}</span>
      <BiDownvote
        className={`text-2xl stroke-[0.5] ${
          dislike?.some((id) => id.user === user?._id)
            ? "fill-primary stroke-primary"
            : "bg-transparent"
        } `}
        onClick={() => dispatch(sendDislike(postId))}
      />
      <span className="text-xl">{downVote || dislike?.length}</span>
    </div>
  );
};

export default RateSection;
