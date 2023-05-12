import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../features/posts/postsSlice";

const PageDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isSuccess, isError, isPending, singlePost } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, []);

  console.log(isSuccess, isError, isPending, singlePost);

  return <div>PageDetails {id}</div>;
};

export default PageDetails;
