import { useLocation, useNavigate } from "react-router-dom";
import NavList from "./NavList";
import { useState, useEffect } from "react";
import { logoutUser, reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilSquare } from "react-icons/bs";

import {
  Navbar,
  MobileNav,
  Button,
  IconButton,
} from "@material-tailwind/react";
import ProfileMenu from "../profileMenu/ProfileMenu";
import SearchBar from "../searchBar/SearchBar";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.substring(1);

  const user = useSelector((state) => state.auth.user);
  const { isSuccess } = useSelector((state) => state.auth);
  const [openNav, setOpenNav] = useState(false);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(reset());
      console.log("header success");
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  return (
    <Navbar className="sticky inset-0 z-10 h-max max-w-full py-2 px-4 lg:px-8 lg:py-2 rounded-none shadow-sm min-w-full">
      <div
        className={
          user
            ? "flex items-center justify-between text-blue-gray-900 "
            : "flex items-center justify-between text-blue-gray-900 container1 mx-auto"
        }
      >
        <div className="flex items-center gap-4 flex-[2]">
          <div
            className="text-3xl text-primary font-DINRoundPro cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span>Logo</span>
          </div>
          {user && <SearchBar />}
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="hidden lg:block">
            {user && user.role === "writer" ? (
              <div
                className={`flex items-center gap-1 mx-2 cursor-pointer text-[#222] hover:text-black hover:scale-105 transition-all duration-200 ease-in-out ${path === "newPost" && "hidden"}`}
                onClick={() => navigate("/newPost")}
              >
                <BsPencilSquare />
                <span>write</span>
              </div>
            ) : (
              <NavList />
            )}
          </div>
          {user ? (
            <div className="mx-4 bg-transparent my-0 py-0">
              <ProfileMenu user={user} onLogout={onLogout} />
            </div>
          ) : (
            <Button
              size="md"
              className="hidden lg:inline-block bg-primary text-sm py-2 px-4 rounded-md"
              onClick={() => navigate("/auth/login")}
            >
              <span>Login</span>
            </Button>
          )}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          <NavList />
          <Button size="sm" fullWidth className="mb-2 bg-primary">
            <span>Login</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}

export default Header;
