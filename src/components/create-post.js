import { React, useContext, useState } from "react";
import TextArea from "../input/textarea";
import ApiCall from "../api-service/api-services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const post = {
    some_text: text,
    user_id: currentUser.uid,
    email: currentUser.email,
    user_name: currentUser.email,
  };
  const HandlePost = async (e) => {
    e.preventDefault();
    if (!text) {
      setError("there was not written anything");
    }
    try {
      const response = await ApiCall.postData(post);
      console.log(response);
      setError("");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="max-w-md hover:shadow-xl mx-auto rounded-md border py-5 px-5 mt-8">
      <h3 className="text-2xl font-medium mb-2">Create new post</h3>
      <form onSubmit={HandlePost}>
        <TextArea state={text} setState={setText} />
        <button className="text-md mt-2 bg-green-500 px-5 py-1 rounded-md active:text-white">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
