import React from "react";

const DataCard = ({ title, children }) => {
  return (
    <div className="w-full p-4 rounded-md bg-[#d6eadf] border border-black/10">
      <p className="text-xl font-semibold text-center w-full text-black mb-2">
        {title}
      </p>
      {children}
    </div>
  );
};

export default DataCard;
