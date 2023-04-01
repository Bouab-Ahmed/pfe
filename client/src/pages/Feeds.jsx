import React, { useRef } from 'react';

// get user from local storage

const Feeds = () => {
  const user = useRef(JSON.parse(localStorage.getItem('user'))).current;
  return (
    <div>
      <h1>Feeds</h1>
      {user && (
        <>
          <h2>welcome {user.name}</h2>
          <img src={user.cardId} alt='' />
          <img src={user.profilePic} alt='' />
        </>
      )}
    </div>
  );
};

export default Feeds;
