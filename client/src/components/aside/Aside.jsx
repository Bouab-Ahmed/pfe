import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../features/tags/tagSlice";
import { useNavigate } from "react-router-dom";
import { getAllusers } from "../../features/users/userSlice";

const Aside = ({user}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { tags } = useSelector(
    (state) => state.tag
  );

  const { users } = useSelector((state) => state.user);



  // const [follow, setFollow] = useState(authors);
  // const onFollow = (fellow, id) => {
  //   const newAuthors = authors.map((author) => {
  //     if (author.id === id) {
  //       author.fellow = fellow === "Follow" ? "Following" : "Follow";
  //     }
  //     return author;
  //   });
  //   setFollow(newAuthors);
  // };

    useEffect(() => {
      dispatch(getTags());
      dispatch(getAllusers());
      // if (!user) {
      //   dispatch(getAllusers());
      // }
      // eslint-disable-next-line
    }, []);

    console.log(users)
  return (
    <div className="flex flex-col justify-center sticky top-14 z-10">
      {user && (
        <div className="flex flex-col items-center justify-center gap-1 w-3/4 text-center">
          <div className="w-24 h-w-24 rounded-full">
            <img
              src={`http://localhost:5000${user?.profilePic}`}
              alt="author"
              className="w-full h-full object-cover"
            />
          </div>
          <h3
            className="my-1 text-lg cursor-pointer"
            onClick={() => navigate(`/me/${user._id}`)}
          >
            {user?.name}
          </h3>
          <div className="flex flex-row gap-2 ">
            <span>{user?.follower.length} followers</span> •{" "}
            <span>{user?.following.length} following</span>
          </div>
          <p className="text-[#292929] opacity-75 text-sm">
            Creative Investor. Sharing my inspiring journey in...
          </p>
          <button className="w-full rounded-full px-4 py-1 border border-primary text-white bg-primary">
            Follow
          </button>
        </div>
      )}
      <div className="mx-1 my-2">
        <h2 className="text-2xl font-bold my-2">Recommended Topics</h2>
        <div className="flex flex-wrap gap-2">
          {tags?.slice(0, 10)?.map((tag) => (
            <span
              className="p-2 bg-gray-100 rounded-full text-sm text-[#292929] cursor-pointer"
              key={tag._id}
            >
              {" "}
              {tag.name}{" "}
            </span>
          ))}
        </div>
        <h3 className="my-1 text-primary">
          <a href="/topics">Discover more</a>
        </h3>
      </div>
      {user ? (
        <h2 className="text-2xl font-bold my-2">more from this user</h2>
      ) : (
        <div className="mx-1 my-2">
          <h2 className="text-2xl font-bold my-2">recommended authors</h2>
          <div className="flex flex-wrap gap-2">
            {users &&
              users.slice(0, 5).map((author, i) => (
                <div className="flex flex-row my-1 items-center" key={i}>
                  <img
                    src={`http://localhost:5000${author.profilePic}`}
                    alt="author"
                    className="h-8 w-8 rounded-full self-start"
                    onClick={() => navigate(`/profile/${author._id}`)}
                  />
                  <div className="flex flex-col mx-2">
                    <span className="text-lg font-bold"> {author.name} </span>
                    <p className="text-[#292929] opacity-75 text-sm">
                      Creative Investor. Sharing my inspiring journey in...
                    </p>
                  </div>
                  <button
                    className="rounded-full px-8 py-2 border border-black"
                    // onClick={() => onFollow(author.fellow, author.id)}
                  >
                    follow
                  </button>
                </div>
              ))}
            <h3 className="my-1 text-primary">
              <a href="/topics">See more Suggestions</a>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aside;
