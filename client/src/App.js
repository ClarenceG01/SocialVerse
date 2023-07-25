// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import Profile from "./components/profile";
// import Home from "./components/Home";
// import Userprofile from "./components/Userprofile";
// import Feed from "./components/Feed";
// import Logout from "./components/Logout";
// import SideMenu from "./components/SideMenu";
// import Extra from "./components/Extra";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/home" element={<Home />}>
//           <Route path="feed" element={<Feed />} /> {/* Default route */}
//           <Route path="logout" element={<Logout />} />
//           <Route path="userprofile" element={<Userprofile />} />
//         </Route>
//         <Route path="*" element={<h1>Not Found</h1>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/profile";
import Home from "./components/Home";
import Userprofile from "./components/Userprofile";
import Logout from "./components/logout";
import Following from "./components/Following";
import Followers from "./components/Followers";
import { ToastContainer } from "react-toastify";
import PostComments from "./components/PostComments";
import EditProfile from "./components/EditProfile";
import CommentReplies from "./components/CommentReplies";
import Feed from "./components/Feed";
import Notifications from "./components/Notifications";
import Search from "./components/Search";
import Settings from "./components/settings";
import ChangePassword from "./components/ChangePassword";
import DeleteAccount from "./components/DeleteAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="/" element={<SignUp />} />
          <Route path="/land/login" element={<Login />} />
          <Route path="/land/profile" element={<Profile />} />
        </Route>
        <Route path="/home" element={<Home />}>
          <Route path="/home/" element={<Feed />} />
          <Route path="/home/logout" element={<Logout />} />
          <Route path="/home/userprofile" element={<Userprofile />} />
          <Route path="/home/postcomments" element={<PostComments />} />
          <Route path="/home/followers" element={<Followers />} />
          <Route path="/home/following" element={<Following />} />
          <Route path="/home/editprofile" element={<EditProfile />} />
          <Route path="/home/commentreplies" element={<CommentReplies />} />
          <Route path="/home/notifications" element={<Notifications />} />
          <Route path="/home/search" element={<Search />} />
          <Route path="/home/settings" element={<Settings />} />
          <Route path="/home/changepassword" element={<ChangePassword />} />
          <Route path="/home/deleteaccount" element={<DeleteAccount />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
