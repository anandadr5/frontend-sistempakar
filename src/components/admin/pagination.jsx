import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`px-5 py-2 rounded-full font-semibold transition duration-200 shadow ${
          currentPage === 1
            ? "bg-gray-300 text-white cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        ← Sebelumnya
      </button>

      <span className="px-4 py-2 rounded-full bg-cream text-black font-medium shadow">
        {currentPage} <span className="text-sm text-gray-500">/</span>{" "}
        {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-5 py-2 rounded-full font-semibold transition duration-200 shadow ${
          currentPage === totalPages
            ? "bg-gray-300 text-white cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        Selanjutnya →
      </button>
    </div>
  );
};

export default Pagination;
