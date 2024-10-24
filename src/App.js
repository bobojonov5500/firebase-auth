import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Register from "./auth/register";
import Login from "./auth/login";
import Navbar from "./components/navbar";
import Dashboard from "./auth/dashboard";
import PrivateRoute from "./components/private-route";
import CreatePost from "./components/create-post";

function App() {
  const routes = ["/register", "/login", "/404"];
  const location = useLocation();
  const showNavbar = routes.includes(location.pathname);
  return (
    <>
      {!showNavbar ? <Navbar /> : ""}
      <div className="App max-w-screen-2xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<h5>page not found</h5>} />
          <Route path="/create-post" element={<CreatePost/>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
