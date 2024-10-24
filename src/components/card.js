import React from "react";
import moment from "moment";
const Card = ({ item }) => {
  return (
    <div className="border max-w-80 px-3 py-2 rounded-md">
      <p className="text-sm"> {moment(item.createdAt).format("LLLL")}</p>
      <p>
        <span className="font-bold">user_name:</span> {item.user_name}
      </p>
      <p className="overflow-hidden">{item.email}</p>
      <p>{item.some_text}</p>
    </div>
  );
};

export default Card;
