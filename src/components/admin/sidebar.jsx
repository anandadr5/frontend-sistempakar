import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.jpg";
import { Home, Users, MessageSquare, LogOut } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logout berhasil!");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const menuItems = [
    { icon: <Home />, label: "Dashboard", path: "/dashboard" },
    { icon: <Users />, label: "Data Masyarakat", path: "/datamasyarakat" },
    { icon: <MessageSquare />, label: "Data FeedBack", path: "/datafeedback" },
  ];

  return (
    <div className="flex flex-col items-center w-full h-screen bg-[#d6eadf] p-3 overflow-hidden">
      <img
        src={Logo}
        alt="Logo"
        className="w-14 h-14 rounded-full object-cover"
      />

      <nav className="w-full">
        {/* Menu utama */}
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-[#c4dbc2] rounded-lg"
          >
            <span className="w-6 h-6 text-black">{item.icon}</span>
            <p className="text-base font-medium text-black">{item.label}</p>
          </Link>
        ))}

        {/* Tombol Logout */}
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-[#c4dbc2] rounded-lg"
        >
          <span className="w-6 h-6 text-black">
            <LogOut />
          </span>
          <p className="text-base font-medium text-black">Keluar</p>
        </div>
      </nav>

      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default Sidebar;
