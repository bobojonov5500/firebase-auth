import React from "react";
import Loading from "./loading";
import { useQuery } from "react-query";
import ApiCall from "../api-service/api-services";
import Card from "./card";

const Home = () => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    "getdata",
    () => ApiCall.getData(),
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return (
      <div className="max-w-full flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-full flex justify-center items-center h-screen">
        <p className="text-red-600">
          Xato yuz berdi: {error.message || "Internetga ulanishda muammo."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-full px-5 my-4 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data?.map((item, index) => (
          <Card item={item} refetch={refetch} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
