import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { verifyMail } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
  const { isLoading, isError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const query = useQuery();

  useEffect(() => {
    dispatch(
      verifyMail({
        verificationToken: query.get("token"),
        email: query.get("email"),
      })
    );
  }, []);

  if (isLoading) {
    return (
      <div className="page">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page">
        <h4>There was an error, please double check your verification link </h4>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Account Confirmed</h2>
      <Link to="/auth/login">Please login</Link>
    </div>
  );
};

export default VerifyPage;
