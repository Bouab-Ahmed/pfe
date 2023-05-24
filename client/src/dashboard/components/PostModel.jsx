import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import parse from "html-react-parser";
import { FcApproval } from "react-icons/fc";

const PostModel = ({open, handleOpen,post}) => {

  return (
    <React.Fragment>
      <Dialog size="xl" open={open} handler={() => handleOpen(null)}>
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              size="sm"
              variant="circular"
              alt="candice wu"
              src={`http://localhost:5000${post?.user?.profilePic}`}
            />
            <div className="-mt-px flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                {post?.user?.name}
              </Typography>
            </div>
          </div>
        </DialogHeader>
        <DialogBody
          divider={true}
          className="h-[50rem] overflow-scroll overflow-x-hidden"
        >
          <img
            alt="nature"
            className="h-[30rem] w-full object-cover object-center rounded-lg"
            src={`http://localhost:5000${post?.image}`}
          />
          <Typography
            color="black"
            className="font-bold text-center"
            variant="h1"
          >
            {post?.title}
          </Typography>
          <Typography color="gray" className="font-normal text-center">
            {parse(`${post?.content}`)}
          </Typography>
        </DialogBody>
        <DialogFooter className="justify-between">
          <div className="flex items-center">
            {post?.tags ? `#${post?.tags[0]?.name}` : "no tag"}
          </div>
          <div className="flex items-center gap-4">
            <button
              class="inline-flex items-center px-4 py-2 text-red-600 text-sm border border-red-600 font-medium rounded-md"
              onClick={handleOpen}
            >
              Cancel
            </button>
            {post?.stauts === "published" ? (
              <button class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 border-2 text-white text-sm font-medium rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            ) : (
              <button class="inline-flex items-center px-4 py-2 bg-primary hover:bg-green-800 border-2 text-white text-sm font-medium rounded-md">
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

export default PostModel;