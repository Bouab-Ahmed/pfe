import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../features/auth/authSlice";

// get user from local storage

const Feeds = () => {
  const user = useSelector(getUser);
  return (
    <div>
      <h1>Feeds</h1>
      {user && (
        <>
          <h2>welcome {user.name}</h2>
          <img src={user.cardId} alt="" />
          <img src={user.profilePic} alt="" />
        </>
      )}
    </div>
  );
};

export default Feeds;
