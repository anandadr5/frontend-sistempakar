import React from "react";

const AdminTitle = ({ title }) => (
  <>
    <div className="flex justify-center items-center self-stretch gap-8 sm:gap-16">
      <p className="w-full max-w-full text-lg sm:text-5xl font-bold text-center text-black">
        {title}
      </p>
    </div>
  </>
);

export default AdminTitle;
