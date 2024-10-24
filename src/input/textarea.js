import React from "react";

const TextArea = ({ state, setState }) => {
  return (
    <textarea
      onChange={(e) => setState(e.target.value)}
      value={state}
      className="border-2 rounded-lg outline-none  focus:border-green-500 p-1 w-full"
      placeholder="write some text..."
      rows="6"
      cols="50"
    ></textarea>
  );
};

export default TextArea;
