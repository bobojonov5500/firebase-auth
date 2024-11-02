import React, { useContext, useState } from "react";
import Input from "../input/input";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { FaGoogle } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";

const Login = () => {
  const { Login, setIsAuth, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email && !password) {
      return setError("email or password was not written");
    }
    try {
      setLoading(false);
      await Login(email, password);
      setIsAuth(true);
      setError("");
      navigate("/");
      toast("log in successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 px-3">
      <form
        onSubmit={HandleLogin}
        className="max-w-sm mx-auto border rounded-lg py-10 px-8"
      >
        <h5 className="mb-2 text-center font-bold text-3xl">Login</h5>
        <Input
          setState={setEmail}
          placeholder="email"
          state={email}
          type="email"
        />

        <Input
          type="password"
          setState={setPassword}
          state={password}
          placeholder="password"
        />
        <div className="flex justify-center  sm:items-end sm:justify-between mt-2 flex-wrap">
          <button
            type="submit"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
          <Link
            className="text-center mt-2 sm:mt-0 hover:underline hover:text-blue-700"
            to={"/register"}
          >
            if you don't have an account
          </Link>
        </div>
        {error ? <p className="mt-2 text-left text-red-500"> {error}</p> : ""}
        <button
          className="mx-auto mt-3 flex items-center text-white gap-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogle();
          }}
        >
          <FaGoogle />
          Log in with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
