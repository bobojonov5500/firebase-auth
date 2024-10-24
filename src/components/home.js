import React from "react";
import Loading from "./loading";
import { useQuery } from "react-query";
import ApiCall from "../api-service/api-services";
import Card from "./card";

const Home = () => {
  const { data, isLoading, isError, error } = useQuery(
    "getdata",
    () => ApiCall.getData(),
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(data);
  return (
    <div className="mx-auto max-w-full px-5 my-4 ">
      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data?.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
