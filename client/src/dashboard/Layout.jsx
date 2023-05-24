import React, { useState } from "react";
import Main from "./main/Main";
import SideBar from "./sidebar/SideBar";
import ManagePosts from "./managePosts/ManagePosts";
import ManageCategories from "./manageCategories/ManageCategories";
import ManageUsers from "./manageUsers/ManageUsers";
import Settings from "./settings/Settings";
import ErrorPage from "../pages/ErrorPage";

const Layout = ({ page }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  	const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      {user.role === "admin" ? (
        <div
          className={`flex ${
            collapsed ? "max-w-[94.94vw]" : "max-w-[89.064vw]"
          }`}
        >
          <div className="">
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>
          <div className="min-w-full">
            {page === "main" && <Main />}
            {page === "posts" && <ManagePosts />}
            {page === "categories" && <ManageCategories />}
            {page === "users" && <ManageUsers />}
            {page === "settings" && <Settings />}
          </div>
        </div>
      ) : (
        <ErrorPage forAdmin={"true"} />
      )}
    </div>
  );
};

export default Layout;
