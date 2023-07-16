// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";

// const SideMenu = () => {
//   return (
//     <div className="Sidemenu-component">
//       <NavLink to="/home">Home</NavLink>
//       <NavLink to="/userprofile">Profile</NavLink>
//       <NavLink to="/logout">Logout</NavLink>
//       <Outlet />
//     </div>
//   );
// };

// export default SideMenu;
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import { ImHome3 } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";

const SideMenu = () => {
  const location = useLocation();

  return (
    <div className="Sidemenu-component">
      <div className="sv-logo">
        <img src={logo} alt="logo" />
      </div>
      <div>
        <ImHome3 />
        <NavLink to="/home">Home</NavLink>
      </div>
      <div>
        <CgProfile />
        <NavLink to="/userprofile">Profile</NavLink>
      </div>
      <div>
        <LuLogOut />
        <NavLink to="/logout">Logout</NavLink>
      </div>
    </div>
  );
};

export default SideMenu;
