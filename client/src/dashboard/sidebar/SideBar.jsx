import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { RiGitRepositoryLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { BiHomeAlt2 } from "react-icons/bi";
const SideBar = () => {

	const [collapsed, setCollapsed] = useState(false);
	
  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} width="190px">
        <Menu>
          <MenuItem onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <div className="w-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            ) : (
              <div className="w-full flex items-center justify-end h-full hover:bg-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black right-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
          </MenuItem>
          <MenuItem
            className="hover:text-primary"
            component={<Link to="/dashboard" />}
          >
            <div
              className={`flex items-center justify-${
                collapsed ? "center text-xl" : "start"
              }`}
            >
              <BiHomeAlt2 />
              {collapsed ? null : <span className="ml-2">Dashboard</span>}
            </div>
          </MenuItem>
          <MenuItem
            className="hover:text-primary"
            component={<Link to="/dashboard/posts" />}
          >
            <div
              className={`flex items-center justify-${
                collapsed ? "center text-xl" : "start"
              }`}
            >
              <RiGitRepositoryLine />
              {collapsed ? null : <span className="ml-2">Posts</span>}
            </div>
          </MenuItem>
          <MenuItem
            className="hover:text-primary"
            component={<Link to="/dashboard/users" />}
          >
            <div
              className={`flex items-center justify-${
                collapsed ? "center text-xl" : "start"
              }`}
            >
              <FiUsers />
              {collapsed ? null : <span className="ml-2">Users</span>}
            </div>
          </MenuItem>
          <MenuItem
            className="hover:text-primary"
            component={<Link to="/dashboard/categories" />}
          >
            <div
              className={`flex items-center justify-${
                collapsed ? "center text-xl" : "start"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-grid"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                <rect x="14" y="14" width="6" height="6" rx="1"></rect>
              </svg>
              {collapsed ? null : <span className="ml-2">categories</span>}
            </div>
          </MenuItem>
          <MenuItem
            className="hover:text-primary"
            component={<Link to="/e-commerce" />}
          >
            <div
              className={`flex items-center justify-${
                collapsed ? "center text-xl" : "start"
              }`}
            >
              <AiOutlineSetting />
              {collapsed ? null : <span className="ml-2">Settings</span>}
            </div>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
