import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSingleUserPosts } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";

export default function Posts({user}) {
  console.log(user)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { posts, isPostSuccess } = useSelector((state) => state.post);
  useEffect(()=>{
    dispatch(getSingleUserPosts(user._id))
  },[])
  return (
    <div>
      <h2 className="text-2xl my-2">more from this user</h2>
      {isPostSuccess && (
        <div>
          {posts.slice(0, 5).map((post) => (
            <div className="w-full my-4 h-28 flex gap-1">
              <div className="h-full w-1/4">
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="w-3/4">
                <h6 className="text-base font-bold">{post.title}</h6>
                <p className="text-sm line-clamp-2 text-gray-800">
                  {parse(post?.content)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
