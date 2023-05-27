import React from "react";
import navItems from "../../shared/navitems";
import { useNavigate } from "react-router-dom";

const NavList = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row items-center lg:gap-6">
      {navItems.map((item) => (
        <span key={item.path} onClick={()=>navigate(item.path)}>
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default NavList;
