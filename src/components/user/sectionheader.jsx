import React from "react";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <section className="w-full px-10 py-6 bg-[#d6eadf] shadow-md text-center">
      <p className="text-3xl font-bold text-black">{title}</p>
      <p className="text-base text-black mt-2">{subtitle}</p>
    </section>
  );
};

export default SectionHeader;
