import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Space, Table } from "antd";
import { FcApproval } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";
import {
  activateUser,
  getAllusers,
  getSingleUser,
  updateUser,
} from "../../features/users/userSlice";
import { FiUsers } from "react-icons/fi";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import UserModel from "../components/UserModel";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const [singleUser, setSingleUser] = useState({});
  const {
    isUserSuccess,
    users,
    user,
    isSingleUserSuccess,
    isUserSuccessActive,
    isUserUpdateSuccess,
  } = useSelector((state) => state.user);
  const [dataSourse, setDataSourse] = useState([]);
  const [columnsSourse, setColumnsSourse] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getPostModel = async (id) => {
    dispatch(getSingleUser(id));
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleApprove = (id) => {
    dispatch(activateUser({ accepted: true, id }));
  };

  const handleRoleAdmin = (id) => {
    dispatch(updateUser({ role: "admin", _id: id }));
  };

  const handleRoleReader = (id) => {
    dispatch(updateUser({ role: "reader", _id: id }));
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              backgroundColor: "#1677ff",
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    setSingleUser(() => user);
    setOpen(() => true);
    // eslint-disable-next-line
  }, [isSingleUserSuccess]);

  useEffect(() => {
    dispatch(getAllusers());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getAllusers());
    // eslint-disable-next-line
  }, [isUserSuccessActive, isUserUpdateSuccess]);

  useEffect(() => {
    if (isUserSuccess) {
      setDataSourse(() => {
        return users.map((user) => {
          return {
            key: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            date: new Date(user.createdAt).toLocaleDateString(),
            profilePic: user.profilePic,
            followers: user.follower,
            following: user.following,
            points: user.counter,
            accepted: user.accepted,
            activated: user.activated,
          };
        });
      });
      setColumnsSourse(() => {
        return [
          {
            title: "",
            dataIndex: "profilePic",
            key: "profilePic",
            render: (_, row) => (
              <img
                src={`http://localhost:5000/${row.profilePic}`}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            ),
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            // sorter: (a, b) => a.localeCompare(b),
            ...getColumnSearchProps("name"),
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
            Filters: [
              {
                text: "Writer",
                value: "writer",
              },
              {
                text: "Reader",
                value: "reader",
              },
              {
                text: "Admin",
                value: "admin",
              },
            ],
            onFilter: (value, record) => record.role.startsWith(value),
          },
          {
            title: "activated",
            dataIndex: "activated",
            key: "activated",
            render: (_, row) => (
              <span className="font-semibold">
                {row.activated ? "true" : "false"}
              </span>
            ),
            sorter: (a, b) => a.length - b.length,
          },
          {
            title: "Published at",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
          },
          {
            title: "Followers",
            dataIndex: "followers",
            key: "followers",
            render: (_, row) => (
              <span className="font-semibold">{row.followers.length}</span>
            ),
            sorter: (a, b) => a.length - b.length,
          },
          {
            title: "Following",
            dataIndex: "following",
            key: "following",
            render: (_, row) => (
              <span className="font-semibold">{row.following.length}</span>
            ),
            sorter: (a, b) => a.length - b.length,
          },
          {
            title: "Points",
            dataIndex: "points",
            key: "points",
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
                  {row.accepted === true ? (
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
                    <button
                      onClick={() => handleApprove(row.key)}
                      className="inline-flex items-center px-4 py-2 bg-primary hover:bg-green-800 text-white text-sm font-medium rounded-md"
                    >
                      <FcApproval className="text-xl mr-1" />
                      Approve
                    </button>
                  )}
                  {row.role === "admin" ? (
                    <button
                      onClick={() => handleRoleReader(row.key)}
                      className="inline-flex items-center px-4 py-2 bg-primary hover:bg-green-800 text-white text-sm font-medium rounded-md"
                    >
                      <FcApproval className="text-xl mr-1" />
                      {row.role}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleAdmin(row.key)}
                      className="inline-flex items-center px-4 py-2 bg-primary hover:bg-green-800 text-white text-sm font-medium rounded-md"
                    >
                      <FcApproval className="text-xl mr-1" />

                      {row.role}
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
  }, [isUserSuccess]);

  return (
    <div className="m-10 text-center">
      <div className="flex items-center gap-2 text-2xl  my-4">
        <FiUsers />
        <h1 className="font-semibold">Manage users</h1>
      </div>
      {singleUser && isSingleUserSuccess && (
        <UserModel open={open} handleOpen={handleOpen} user={singleUser} />
      )}
      <Table
        columns={columnsSourse.length && columnsSourse}
        dataSource={dataSourse.length && dataSourse}
        pagination={{ pageSize: 15 }}
      />
    </div>
  );
};

export default ManageUsers;
