import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import {
  PowerIcon,
  InboxArrowDownIcon,
  UserCircleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const serverLocalHost = "http://localhost:5000";

const ProfileMenu = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="candice wu"
          className="cursor-pointer"
          src={`${serverLocalHost}${user?.profilePic}`}
        />
      </MenuHandler>
      <MenuList>
        <MenuItem
          className="flex items-center gap-2  text-textColor"
          onClick={() => navigate(`/profile/${user._id}`)}
        >
          <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            My Profile
          </Typography>
        </MenuItem>
        {user?.role === "admin" && (
          <MenuItem
            className="flex items-center gap-2  text-textColor"
            onClick={() => navigate("/dashboard")}
          >
            <InboxArrowDownIcon strokeWidth={2} className="h-4 w-4" />
            <Typography variant="small" className="font-normal">
              Dashboard
            </Typography>
          </MenuItem>
        )}
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem
          className="flex items-center gap-2  text-textColor "
          onClick={() => onLogout()}
        >
          <PowerIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
