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
import Userprofile from "./Userprofile";
import Feed from "./Feed";
import Extra from "./Extra";

const SideMenu = () => {
  const location = useLocation();

  return (
    <div className="Sidemenu-component">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/userprofile">Profile</NavLink>
      <NavLink to="/logout">Logout</NavLink>
    </div>
  );
};

export default SideMenu;
