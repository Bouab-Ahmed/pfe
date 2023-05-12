import React from "react";
import Feeds from "../../pages/Feeds";
import Home from "../../pages/Home";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.user);
  if (user) {
    return <Feeds />;
  } else {
    return <Home />;
  }
};

export default ProtectedRoute;
