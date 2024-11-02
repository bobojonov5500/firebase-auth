import React, { useContext, useState } from "react";
import Input from "../input/input";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { FaGithub, FaGoogle } from "react-icons/fa";
const Register = () => {
  const navigate = useNavigate();
  const {
    Register,
    setIsAuth,
    signInWithGoogle,
    SignInWithGithub,
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const HandleSignUp = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      return setError("passwords do not match");
    }
    try {
      setLoading(true);
      setError("");
      await Register(email, password);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="mt-20 px-3">
      <form
        onSubmit={HandleSignUp}
        className="max-w-sm mx-auto border rounded-lg py-10 px-8"
      >
        <h5 className="mb-2 text-center font-bold text-3xl">Register</h5>
        <Input
          setState={setEmail}
          placeholder="email"
          state={email}
          type="email"
        />
        <Input
          mt={"my-2"}
          type="password"
          setState={setPassword}
          state={password}
          placeholder="password"
        />
        <Input
          type="password"
          setState={setPasswordConfirmation}
          state={passwordConfirmation}
          placeholder="password confirmation"
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
            to={"/login"}
          >
            if you have an account
          </Link>
        </div>
        <button
          className="mx-auto mt-3 justify-center flex items-center text-white gap-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogle();
          }}
        >
          <FaGoogle />
          Log in with Google
        </button>
        <button
          className="mx-auto mt-3 justify-center flex items-center text-white gap-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            e.preventDefault();
            SignInWithGithub();
          }}
        >
          <FaGithub />
          Log in with Github
        </button>
        {error ? <p className=" mt-2 text-red-500">{error}</p> : ""}
      </form>
    </div>
  );
};

export default Register;
