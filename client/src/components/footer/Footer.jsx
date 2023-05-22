import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="flex justify-center px-4 text-gray-800 bg-[#F1FAF7] dark:text-white dark:bg-gray-900">
      <div className="container px-6 py-6">
        <h1 className="text-lg font-bold text-center lg:text-2xl">
          Join 31,000+ other and never miss <br /> out on new tips, tutorials,
          and more.
        </h1>

        <div className="flex flex-col justify-center mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
          <input
            id="email"
            type="text"
            className="px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-primary  focus:outline-none w-1/3"
            placeholder="Email Address"
          />

          <button className="w-full px-6 py-2 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-primary rounded-lg ">
            Subscribe
          </button>
        </div>

        <hr className="h-px bg-gray-200 border-none my-7 dark:bg-gray-700" />

        <div className="flex flex-col items-center justify-between md:flex-row">
          <div
            className="text-3xl text-primary font-DINRoundPro cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span>Logo</span>
          </div>

          <div className="flex mt-4 md:m-0">
            <ul className="-mx-4 flex gap-4 items-center">
              <li className="px-4 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-primary cursor-pointer dark:hover:text-blue-400 hover:underline">
                About
              </li>
              <li className="px-4 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-primary cursor-pointer dark:hover:text-blue-400 hover:underline">
                Blog
              </li>
              <li className="px-4 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-primary cursor-pointer dark:hover:text-blue-400 hover:underline">
                News
              </li>
              <li className="px-4 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-primary cursor-pointer dark:hover:text-blue-400 hover:underline">
                Contact
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
