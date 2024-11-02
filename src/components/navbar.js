import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "../style/navbar.css";
import { getItem } from "./localstorage";

const Navbar = () => {
  const { LogOut, setIsAuth, currentUser,OpenModal } = useContext(AuthContext);
  const isAuth = !!getItem("accessToken");

  const HandleLogout = async () => {
    LogOut();
    setIsAuth(false);
  };
 
  return (
    <div className="top-0  backdrop-blur-sm bg-slate-500/80 sticky">
      <div className="flex max-w-screen-2xl mx-auto justify-between py-3 text-gray-50 px-5 ">
        <Link className="textcolor font-sans" to="/">
          Home
        </Link>
        <div className="flex gap-3 textcolor">
          <button onClick={OpenModal}>modal</button>
          {isAuth && (
            <div className="flex gap-3">
              <Link className="hover:underline" to={"/create-post"}>
                create post
              </Link>
              <Link className="hover:underline" to={"/dashboard"}>
                {currentUser?.displayName
                  ? currentUser?.displayName
                  : currentUser?.email}
              </Link>
            </div>
          )}
          {isAuth ? (
            <button className="hover:underline" onClick={HandleLogout}>
              LogOut
            </button>
          ) : (
            <Link className="" to={"/login"}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
