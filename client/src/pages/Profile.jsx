import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserPosts } from "../features/posts/postsSlice";
import { getSingleUser } from "../features/users/userSlice";
import PostCard from "../components/posts/PostCard";
import { GoPlus } from "react-icons/go";
import UserProfileModel from "../components/UserProfileModel";

const Profile = () => {
  const [preview, setPreview] = useState();
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const path = window.location.pathname.split("/")[2];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const { isPostSuccess, posts } = useSelector((state) => state.post);
  const { isUserSuccess, user } = useSelector((state) => state.user);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const onSelectImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }

    setImage(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(getSingleUser(path));
    dispatch(getSingleUserPosts(path));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <main className="profile-page">
      {user && (
        <>
          <section className="relative block" style={{ height: "500px" }}>
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: "70px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-white fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 ">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center flex-col md:flex-row">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative h-36 w-36 -m-16 -ml-20 lg:-ml-16">
                        <img
                          alt="..."
                          src={`${
                            preview
                              ? preview
                              : `http://localhost:5000${user.profilePic}`
                          }`}
                          className="shadow-xl rounded-full h-full w-full align-middle border-none absolute "
                          style={{ maxWidth: "150px" }}
                        />
                        <label
                          htmlFor="profile"
                          className="absolute bottom-16 left-20 md:bottom-0 md:left-24 p-1 bg-primary text-white rounded-full"
                        >
                          <GoPlus />
                        </label>
                        <input
                          type="file"
                          name="profile"
                          id="profile"
                          className="hidden"
                          onChange={onSelectImage}
                        />
                      </div>
                    </div>
                    <div className="w-full pt-16 lg:pt-0 lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      {loggedInUser._id === user._id ? (
                        <div className="md:py-6 px-3 mt-32 sm:mt-0 flex items-center gap-11 justify-center lg:justify-end">
                          <div className="flex flex-col items-center text-gray-900">
                            <span>Total Points</span>
                            <span className="text-2xl font-bold block uppercase tracking-wide text-gray-700">
                              {user.counter}
                            </span>
                          </div>
                          <button
                            className="bg-primary text-white active:bg-primary hover:bg-primary text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                            onClick={handleOpen}
                          >
                            Edit Profile
                          </button>
                          {user && <UserProfileModel open={open} handleOpen={handleOpen} user={user}/>}
                        </div>
                      ) : (
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                          <button
                            className="bg-white border border-primary uppercase text-primary font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            Follow
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            {user.follower.length}
                          </span>
                          <span className="text-sm text-gray-500">
                            Followers
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            {user.following.length}
                          </span>
                          <span className="text-sm text-gray-500">
                            Follwing
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            {posts.length}
                          </span>
                          <span className="text-sm text-gray-500">Posts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
                      {user.name}
                    </h3>
                  </div>
                  <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                          {user?.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <div className="flex flex-col items-center container1 mx-auto">
        {isPostSuccess &&
          posts.map((post) => <PostCard key={post.id} {...post} />)}
      </div>
    </main>
  );
};

export default Profile;
