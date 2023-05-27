import React from "react";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const PostCard = (post) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {user !== null ? (
        <div className="flex flex-col my-2 border-b border-[#DBDADB] border-opacity-70 pb-4 w-[90%]">
          <div className="flex flex-row items-center gap-2 py-1">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate(`/profile/${post.user._id}`)}
            >
              <img
                src={`http://localhost:5000${post.user.profilePic}`}
                alt="author"
                className="h-8 w-8 rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span>{post.user.name}</span>
              {/* <span className="text-[#DBDADB]">.</span> */}
              <span className="text-[#DBDADB] text-sm">
                {new Date(post.updatedAt).toDateString()}
              </span>
            </div>
          </div>
          <div
            className="flex flex-row items-center justify-between cursor-pointer"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <div className="flex flex-col w-3/4">
              <h2 className="text-2xl pt-2 font-bold">{post.title}</h2>
              <p className="font-sourceSansPro font-thin line-clamp-3 py-1 text-[#292929]">
                {parse(`${post?.content}`)}
              </p>
              <div className="flex flex-row gap-2">
                <div>
                  {post.tags.map((tag) => (
                    <span
                      className="mx-1 px-2 py-1 bg-gray-100 rounded-full text-sm text-[#292929]"
                      key={tag._id}
                    >
                      {" "}
                      {tag.name}{" "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1/4 flex justify-end">
              <img
                src={`http://localhost:5000${post.image}`}
                alt="post"
                className="w-[70%]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden shadow-lg hover:shadow-2xl h-[405px] relative rounded-lg w-60 md:w-80 cursor-pointer m-auto my-4 bg-white">
          <div href="#" className="w-full block h-full">
            <img
              src={`http://localhost:5000${post.image}`}
              className="max-h-40 w-full object-cover"
              alt="post"
              onClick={() => navigate(`/posts/${post.id}`)}
            />
            <div className="bg-white w-full p-4">
              <p
                className="text-primary text-2xl font-medium w-full overflow-hidden max-h-16"
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                {post.title}
              </p>
              <p
                className="text-gray-800 text-sm font-medium mb-2 max-h-16 line-clamp-3 overflow-hidden"
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                {parse(`${post?.content}`)}
              </p>

              <div
                className="flex flex-wrap justify-starts items-center pb-5 text-xs text-white font-medium absolute bottom-[70px] bg-white left-2 w-full"
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                {post.tags.map((tag) => (
                  <span
                    className="m-1 px-2 py-1 rounded bg-primary"
                    key={tag._key}
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
              <div
                className="flex items-center mt-2 absolute bottom-0 left-0 w-full p-4 text-gray-700 font-medium cursor-pointer border-t-2 bg-white border-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${post.user.id}`);
                }}
              >
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  alt="User avatar"
                  src={`http://localhost:5000${post.user.profilePic}`}
                />

                <div className="pl-3">
                  <div className="font-medium">{post.user.name}</div>
                  <div className="text-gray-600 text-sm">
                    {new Date(post.createdAt).toDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
