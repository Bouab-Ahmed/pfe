import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  InboxArrowDownIcon,
  UserCircleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { logoutUser, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ProfileMenu = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSucess, message } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (isSucess) {
      toast.success(message);
      console.log(message);
      dispatch(reset());
      navigate("/");
    }
  }, [isSucess, message]);

  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="candice wu"
          className="cursor-pointer"
          src={user?.profilePic}
        />
      </MenuHandler>
      <MenuList>
        <MenuItem
          className="flex items-center gap-2  text-textColor"
          onClick={() => navigate("/profile")}
        >
          <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            My Profile
          </Typography>
        </MenuItem>
        <MenuItem
          className="flex items-center gap-2  text-textColor"
          onClick={() => navigate("/notifications")}
        >
          <InboxArrowDownIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Inbox
          </Typography>
        </MenuItem>
        <MenuItem
          className="flex items-center gap-2  text-textColor"
          onClick={() => navigate("/help")}
        >
          <LifebuoyIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Help
          </Typography>
        </MenuItem>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem
          className="flex items-center gap-2  text-textColor "
          onClick={onLogout}
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
