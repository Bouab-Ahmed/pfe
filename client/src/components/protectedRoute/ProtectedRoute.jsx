import React from 'react';
import Feeds from '../../pages/Feeds';
import Home from '../../pages/Home';

const ProtectedRoute = ({ user }) => {
  if (user) {
    return <Feeds />;
  } else {
    return <Home />;
  }
};

export default ProtectedRoute;
