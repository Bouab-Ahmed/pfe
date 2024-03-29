import React from "react";
import Feeds from "../../pages/Feeds";
import Home from "../../pages/Home";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    if (user.tags.length > 0) {
      return <Feeds />;
    } else {
      return <Navigate to="/topics" replace={true} />;
    }
  } else {
    return <Home />;
  }
};

export default ProtectedRoute;
