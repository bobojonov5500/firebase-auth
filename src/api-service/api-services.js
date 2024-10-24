import axios from "../api-service/baseUrl";

const ApiCall = {
  getData: async () => {
    const { data } = await axios.get("/posts");
    return data;
  },
  postData: async (post) => {
    const { data } = await axios.post("/posts", post);
    return data;
  },
};
export default ApiCall;
