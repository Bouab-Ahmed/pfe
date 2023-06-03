import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Recommands({ user, users, following }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="mx-1 my-2">
        <h2 className="text-2xl font-bold my-2">recommended authors</h2>
        <div className="flex flex-wrap gap-2">
          {user &&
            users.slice(0, 5).map((author, i) => (
              <div key={i} className="min-w-max">
                {user._id !== author._id ? (
                  <div className="flex flex-row justify-between w-full my-1 items-center">
                    <img
                      src={`http://localhost:5000${author.profilePic}`}
                      alt="author"
                      className="h-8 w-8 rounded-full self-start"
                      onClick={() => navigate(`/profile/${author._id}`)}
                    />
                    <div className="flex flex-col mx-2">
                      <span className="text-lg font-bold"> {author.name} </span>
                      <p className="text-[#292929] opacity-75 text-sm">
                        {author.bio}
                      </p>
                    </div>

                    {user?.following.some((id) => id === author._id) ? (
                      <button
                        // onClick={() => dispatch(following(author._id))}
                        // className="rounded-full px-8 py-2 border border-black "
                        className="rounded-full px-10 py-[8px]  border border-gray-900 "
                        disabled
                        // onClick={() => onFollow(author.fellow, author.id)}
                      >
                        following
                      </button>
                    ) : (
                      <button
                        onClick={() => dispatch(following(author._id))}
                        // className="rounded-full w-[131] px-8 py-2 border border-black bg-primary border border-primary"
                        className="rounded-full px-10 py-[8px] text-white bg-primary border-primary border-2"

                        // onClick={() => onFollow(author.fellow, author.id)}
                      >
                        follow
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          <h3 className="my-1 text-primary">
            <a href="/topics">See more Suggestions</a>
          </h3>
        </div>
      </div>
    </>
  );
}
