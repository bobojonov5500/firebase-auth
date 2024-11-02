import React, { useContext } from "react";
import Input from "./input";
import { AuthContext } from "../context/auth-context";

const Modal = () => {
  const { CloseModal } = useContext(AuthContext);
  return (
    <div  className="border-2">
      <form action="">
        <Input />
        <button onClick={CloseModal} className="bg-red-500">
          close
        </button>
      </form>
    </div>
  );
};

export default Modal;
