import React from "react";

const Button = ({ onClick, children, className, type = "button", id }) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`flex justify-center items-center w-full h-12 p-2.5 rounded-lg
      bg-black text-white font-semibold text-base ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
