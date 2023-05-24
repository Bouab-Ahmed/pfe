import React from "react";
import { FiUsers } from "react-icons/fi";
import { RiGitRepositoryLine } from "react-icons/ri";

const DashCard = ({ title, value }) => {
  return (
    <div className="bg-primary dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-b-yellow-100 w-1/3 h-32  text-white font-medium group">
      <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
        {title === "Users" ? (
					<FiUsers className="text-primary dark:text-gray-800 text-2xl" />
				) : (
					<RiGitRepositoryLine className="text-primary dark:text-gray-800 text-2xl" />
				)}
      </div>
      <div className="text-right">
        <p className="text-2xl">{value}</p>
        <p>Total {title}</p>
      </div>
    </div>
  );
};

export default DashCard;
