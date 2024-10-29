import React, { useEffect, useState } from "react";
import TextArea from "../input/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ApiCall from "../api-service/api-services";
import { Bounce, toast } from "react-toastify";

const EditPost = () => {
  const [text, setText] = useState("");
  const { id } = useParams();
  const naviagte = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["getPostviaId"],
    queryFn: () => ApiCall.getPost(id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setText(data?.some_text);
    }
    return;
  }, [data]);

  const handleEditPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!text) {
      toast.error("There was an error creating the post.");
      setIsLoading(false);
      return;
    }
    try {
      await ApiCall.editPost(id, text);
      toast.success("Post successfully updated", {
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
      setIsLoading(false);
      naviagte("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="max-w-md hover:shadow-xl mx-auto rounded-md border py-5 px-5 mt-8">
      <h3 className="text-2xl font-medium mb-2">Create new post</h3>
      <form onSubmit={handleEditPost}>
        <TextArea state={text} setState={setText} />
        <button className="text-md mt-2 bg-green-500 px-5 py-1 rounded-md active:text-white">
          {isloading ? "Loading..." : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
