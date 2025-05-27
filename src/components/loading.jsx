import React from "react";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-16 w-16 border-4 border-[#d6eadf] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-lg font-medium text-black">Mohon ditunggu</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
