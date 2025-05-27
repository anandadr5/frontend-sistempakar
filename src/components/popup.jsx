import React from "react";
import Button from "@/components/user/button";

const PopupAlert = ({ message, onClose, success = null }) => {
  const icon = success ? "✅" : "⚠️";
  const textColor = success ? "text-green-600" : "text-red-600";
  const title = success ? "Berhasil!" : "Terjadi Kesalahan";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <div className="flex flex-col items-center mb-4">
          <div className={`text-4xl mb-2 ${textColor}`}>{icon}</div>
          <h2 className={`text-xl font-bold ${textColor}`}>{title}</h2>
        </div>
        <p className="text-black mb-4">{message}</p>
        <Button
          onClick={onClose}
          className="py-2 px-4 bg-black hover:bg-gray-800 text-white rounded transition"
        >
          Tutup
        </Button>
      </div>
    </div>
  );
};

export default PopupAlert;
