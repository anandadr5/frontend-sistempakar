import React from "react";

const Label = ({ children }) => {
  return (
    <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-neutral-800">
      {children}
    </p>
  );
};

export default Label;
