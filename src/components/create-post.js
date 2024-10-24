import { React, useContext, useState } from "react";
import TextArea from "../input/textarea";
import ApiCall from "../api-service/api-services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { Bounce, toast } from "react-toastify";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const post = {
    some_text: text,
    user_id: currentUser?.uid,
    email: currentUser?.email,
    user_name: currentUser?.email,
  };
  const HandlePost = async (e) => {
    e.preventDefault();
    if (!text) {
      return setError("there was not written anything");
    }
    try {
      setLoading(true);
      await ApiCall.postData(post);
      setError("");
      navigate("/");
      toast.success("Post successfully created", {
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
      toast.error("There was an error creating the post.");
    }
  };
  return (
    <div className="max-w-md hover:shadow-xl mx-auto rounded-md border py-5 px-5 mt-8">
      <h3 className="text-2xl font-medium mb-2">Create new post</h3>
      <form onSubmit={HandlePost}>
        <TextArea state={text} setState={setText} />
        <button className="text-md mt-2 bg-green-500 px-5 py-1 rounded-md active:text-white">
          {loading ? "Loading..." : "Post"}
        </button>
      </form>
      {error ? <p className="text-md mt-2  text-red-600">{error}</p> : ""}
    </div>
  );
};

export default CreatePost;
