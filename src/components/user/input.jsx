import React from "react";

const Input = ({ type, id, name, placeholder, value, onChange }) => (
  <input
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full h-[50px] px-2.5 py-2 border border-black rounded-md placeholder-gray-500 bg-white text-black"
  />
);

export default Input;
