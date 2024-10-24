import React from "react";

const Input = ({ mt, setState, state, type, placeholder = "name" }) => {
  return (
    <div className={`${mt}`}>
      <label
        htmlFor={placeholder}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {placeholder}
      </label>
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        type={type}
        id={placeholder}
        className="bg-gray-50  border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  "
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Input;
