import React from "react";
import Feeds from "../../pages/Feeds";
import Home from "../../pages/Home";

const ProtectedRoute = ({ user }) => {
  console.log(user);
  if (user) {
    return <Feeds />;
  } else {
    return <Home />;
  }
};

export default ProtectedRoute;
