import React, { useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { sendDislike, sendLike } from "../../features/rate/rateSlice";
import { useDispatch, useSelector } from "react-redux";

const RateSection = ({ postId, user, like, dislike }) => {
  const [postactiveBtn, setPostActiveBtn] = useState("none");
  const dispatch = useDispatch();
  const { likes, dislikes, isRateSuccess } = useSelector((state) => state.rate);

	const [postRate, setPostRate] = useState({
		like: [],
		dislike: [],
	})

	useEffect(() => {
		setPostRate({
			like: like?.length,
			dislike: dislike?.length,
		})
	}, [like, dislike])



  const handlePostLikes = (clicked) => {
    if (!user) {
      return;
    }
    if (clicked === "upvote") {
      dispatch(sendLike(postId));

      // if (postactiveBtn === "upvote") {
      //   setPostActiveBtn("none");
      // } else if (postactiveBtn === "none") {
      //   setPostActiveBtn("upvote");
      // } else {
      //   setPostActiveBtn("upvote");
      // }
    } else if (clicked === "downvote") {
      dispatch(sendDislike(postId));
      // if (postactiveBtn === "downvote") {
      //   setPostActiveBtn("none");
      // } else if (postactiveBtn === "upvote") {
      //   setPostActiveBtn("downvote");
      // } else if (postactiveBtn === "none") {
      //   setPostActiveBtn("downvote");
      // }
    }
  };

	useEffect(() => {
		if (isRateSuccess) {
			setPostRate({
				like: likes,
				dislike: dislikes,
			})
		}
	}, [isRateSuccess, likes, dislikes]);


  return (
    <div className="flex items-center gap-1">
      <BiUpvote
        className={`text-2xl stroke-[0.5] ${
          postactiveBtn === "upvote"
            ? "bg-transparent fill-primary stroke-primary"
            : "bg-transparent"
        } `}
        onClick={() => handlePostLikes("upvote")}
      />
      <span className="text-xl">{postRate.like}</span>
      <BiDownvote
        className={`text-2xl stroke-[0.5] ${
          postactiveBtn === "downvote"
            ? "fill-primary stroke-primary"
            : "bg-transparent"
        } `}
        onClick={() => handlePostLikes("downvote")}
      />
      <span className="text-xl">{postRate.dislike}</span>
    </div>
  );
};

export default RateSection;
