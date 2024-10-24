import React, { useContext } from "react";
import moment from "moment";
import ApiCall from "../api-service/api-services";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../context/auth-context";
const Card = ({ item, refetch }) => {
  const { isAuth } = useContext(AuthContext);
  const DeletePost = async (id) => {
    try {
      await ApiCall.deletePost(id);
      toast.success("Post successfully deleted", {
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
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="border flex flex-col justify-between  max-w-80 px-3 py-2 rounded-md">
      <div>
        <p className="text-sm"> {moment(item.createdAt).format("LLLL")}</p>
        <p>
          <span className="font-bold">user_name:</span> {item.user_name}
        </p>
        <p className="overflow-hidden">{item.email}</p>
        <p>{item.some_text}</p>
      </div>
      <div className="flex gap-2   flex-wrap mt-1">
        {isAuth ? (
          <>
            <button className=" py-1 rounded-md text-white active:text-black px-3 bg-green-500">
              Edit
            </button>
            <button
              onClick={() => DeletePost(item.id)}
              className=" py-1 rounded-md text-white active:text-black px-3 bg-red-500"
            >
              Delete
            </button>
          </>
        ) : (
          ""
        )}
        <button className=" py-1 rounded-md text-white active:text-black px-3 bg-yellow-500">
          View
        </button>
      </div>
    </div>
  );
};

export default Card;
