import React, { useEffect } from "react";
import { getMe } from "../features/users/userService";
import { useDispatch } from "react-redux";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { TfiMoreAlt } from "react-icons/tfi";

const Profile = () => {
  const dispatch = useDispatch();
	const [activeTab, setActiveTab] = React.useState("html");
	const user = JSON.parse(localStorage.getItem("user"));
  const data = [
    {
      label: "Home",
      value: "home",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Settings",
      value: "settings",
      // desc: {
			// 	email: user.email,
			// 	username: user.name.toLowerCase().split(" ").join("_"),
			// 	role: user.role,
			// 	createdAt: user.createdAt,
			// 	updatedAt: user.updatedAt,
			// 	id: user.userId,

			// }
			desc: `It really matters and then like it really doesn't matter.
			What matters is the people who are sparked by it. And the people
			who are like offended by it, it doesn't matter.`,
    },
  ];


  console.log(user);

  return (
    <div className=" h-screen container1 mx-auto flex flex-row">
      <div className="flex-[2] flex-col">
        <div className="flex flex-col h-[30%]">
          <div className={`bg-[#020D2F] h-2/3 w-full`}></div>
          <div className="bg-white h-1/3 flex items-center mx-8 justify-between">
            <h1 className="text-3xl">{user.name}</h1>
            <Menu>
              <MenuHandler>
                <Button
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    outline: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#292929",
                  }}
                >
                  <TfiMoreAlt />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem>Copy link to profile </MenuItem>
                <MenuItem>Mute this user</MenuItem>
                <MenuItem>Block this user</MenuItem>
                <MenuItem>Report this user</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-primary shadow-none rounded-none",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
								defaultValue={value}
                onClick={() => setActiveTab(value)}
                className={`text-sm font-medium text-blue-gray-500 hover:text-blue-gray-700 w-20 ${
                  activeTab === value ? "text-primary" : ""
                }`}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
      <div className="flex-1 bg-green-500"></div>
    </div>
  );
};

export default Profile;


