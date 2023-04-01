import React from 'react';

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));



const Feeds = () => {
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
