import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/profile";
import Home from "./components/Home";

function App() {
  const myRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
      </Route>
    )
  );
  return <RouterProvider router={myRouter} />;
}

export default App;
