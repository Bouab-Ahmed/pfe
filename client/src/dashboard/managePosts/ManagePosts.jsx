import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomPosts, getSinglePost } from "../../features/posts/postsSlice";
import { Table } from "antd";
import { FcApproval } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";
import PostModel from "../components/PostModel";
import { RiGitRepositoryLine } from "react-icons/ri";

const ManagePosts = () => {
  const dispatch = useDispatch();
  const { isPostSuccess, posts,singlePost,singlePostSuccess } = useSelector((state) => state.post);
  const [dataSourse, setDataSourse] = useState([]);
  const [columnsSourse, setColumnsSourse] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = useState({});
  
  
  const getPostModel = async(id) => {
    dispatch(getSinglePost(id));
  };
  
  const handleOpen = () => {
    setOpen(!open);
  }
  
  useEffect(() => {
    if (singlePostSuccess) {
      setPost(() => singlePost);
      setOpen(() => true);
    }
    // eslint-disable-next-line
  }, [singlePostSuccess]);


  useEffect(() => {
    dispatch(getRandomPosts());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isPostSuccess) {
      setDataSourse(() => {
        return posts.map((post) => {
          return {
            key: post._id,
            title: post.title,
            image: post.image,
            status: post.stauts,
            tag: post.tags[0]?.name,
            name: post.user.name,
            date: new Date(post.createdAt).toLocaleDateString(),
          };
        });
      });
      setColumnsSourse(() => {
        return [
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
            sorter: function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            },
            width: "20%",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            filters: [
              {
                text: "Pending",
                value: "pending",
              },
              {
                text: "Published",
                value: "published",
              },
            ],
            onFilter: (value, record) => record.status.startsWith(value),
            width: "10%",
          },
          {
            title: "Tag",
            dataIndex: "tag",
            key: "tag",
            filters: [
              {
                text: "Category 1",
                value: "Category 1",
              },
              {
                text: "Category 2",
                value: "Category 2",
              },
            ],
            onFilter: (value, record) => record.tag.startsWith(value),
            width: "10%",
            render: (tag) => (
              <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                {tag}
              </span>
            ),
          },
          {
            title: "Author",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name - b.name,
            width: "15%",
          },
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
            width: "15%",
          },
          {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "15%",
            render: (_, row) => {
              return (
                <div className="flex flex-row justify-evenly">
                  <button
                    className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
                    onClick={() => getPostModel(row.key)}
                  >
                    <AiOutlineEye className="text-xl mr-1" />
                    view
                  </button>
                  {row.status === "published" ? (
                    <button className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
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
                  ) : (
                    <button className="inline-flex items-center px-4 py-2 bg-primary hover:bg-green-800 text-white text-sm font-medium rounded-md">
                      <FcApproval className="text-xl mr-1" />
                      Approve
                    </button>
                  )}
                </div>
              );
            },
          },
        ];
      });
    }
    // eslint-disable-next-line
  }, [isPostSuccess]);

  return (
    <div className="m-10 text-center">
      <div className="flex items-center gap-2 text-2xl  my-4">
        <RiGitRepositoryLine />
        <h1 className="font-semibold">Manage Posts</h1>
      </div>
      {post && <PostModel open={open} handleOpen={handleOpen} post={post} />}
      <Table
        columns={columnsSourse.length && columnsSourse}
        dataSource={dataSourse.length && dataSourse}
        pagination={{ pageSize: 15 }}
      />
    </div>
  );
};

export default ManagePosts;
