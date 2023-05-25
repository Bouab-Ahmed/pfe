import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { FcApproval } from "react-icons/fc";

const UserModel = ({ open, handleOpen, user }) => {
  return (
    <React.Fragment>
      <Dialog open={open} handler={() => handleOpen(null)}>
        <DialogHeader className="justify-between">
          <div className="flex flex-col items-center w-full gap-3">
            <Avatar
              size="xxl"
              variant="circular"
              alt="candice wu"
              src={`http://localhost:5000${user?.profilePic}`}
            />
            <div className="-mt-px flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <Typography color="black" className="" variant="h6">
                  name :
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {user?.name}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <Typography color="black" className="" variant="h5">
                  email :
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {user?.email}
                </Typography>
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogBody
          divider={true}
          className=" flex flex-col items-center gap-4"
        >
          <Typography color="black" className="" variant="h5">
            card id :
          </Typography>
          <img
            alt="nature"
            className="object-cover object-center rounded-lg"
            src={`http://localhost:5000${user?.cardId}`}
          />
          <Typography color="black" className="text-center" variant="paragraph">
            {user?.bio}
          </Typography>
          <Typography
            color="black"
            className="font-bold text-center"
            variant="h5"
          >
            categories :
          </Typography>
          <div className="flex items-center">
            {user?.tags &&
              user?.tags.map((tag) => (
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2"
                  key={tag._id}
                >
                  {tag.name}
                </span>
              ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex items-center gap-4 w-full justify-center">
            <button
              className="inline-flex items-center px-4 py-2 text-red-600 text-sm border border-red-600 font-medium rounded-md"
              onClick={handleOpen}
            >
              Cancel
            </button>
            {user?.accepted === true ? (
              user?.role !== "admin" && (
                <button className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 border-2 text-white text-sm font-medium rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              )
            ) : (
              <button className="inline-flex items-center px-4 py-2 bg-primary hover:bg-green-800 border-2 text-white text-sm font-medium rounded-md">
                <FcApproval className="text-xl mr-1" />
                Approve
              </button>
            )}
          </div>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
};

export default UserModel;
