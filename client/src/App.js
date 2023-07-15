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

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/profile";
import Home from "./components/Home";
import Userprofile from "./components/Userprofile";
import Logout from "./components/Logout";
import SideMenu from "./components/SideMenu";
import Extra from "./components/Extra";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
