import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.jpg";
import Button from "@/components/user/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (label) => {
    setIsOpen(false); // close dropdown menu
    if (label === "Beranda") {
      if (window.location.pathname === "/") {
        window.location.reload();
      } else {
        navigate("/");
      }
    } else if (label === "Diagnosis") {
      navigate("/inputpage");
    } else if (label === "Penyakit Jantung") {
      navigate("/penyakit");
    } else if (label === "Feedback") {
      navigate("/#feedback");
    } else if (label === "Kontak") {
      const footer = document.getElementById("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems = [
    "Beranda",
    "Diagnosis",
    "Penyakit Jantung",
    "Feedback",
    "Kontak",
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-white border-b border-gray-200 shadow-md z-50 flex items-center justify-between px-4 sm:px-8">
      {/* Logo dan Judul */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <img
          src={Logo}
          alt="Logo"
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover"
        />
        <p className="text-sm font-medium text-black block md:hidden">
          Diagnosis Penyakit
        </p>
        <p className="ml-2 text-lg sm:text-2xl font-medium text-black hidden md:block">
          Sistem Pakar Diagnosis Penyakit Jantung
        </p>
      </div>

      {/* Menu Desktop */}
      <div className="hidden md:flex gap-3 lg:gap-6 ml-auto">
        {navItems.map((label) => (
          <p
            key={label}
            onClick={() => handleClick(label)}
            className="text-sm lg:text-base text-black hover:text-[#01796f] cursor-pointer hover:border-b-2 hover:border-[#01796f] transition duration-150"
          >
            {label}
          </p>
        ))}
      </div>

      {/* Hamburger Mobile */}
      <div className="md:hidden ml-auto">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#01796f] p-2 rounded"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-start p-4 md:hidden z-40">
          {navItems.map((label) => (
            <p
              key={label}
              onClick={() => handleClick(label)}
              className="text-base text-black py-2 w-full hover:bg-[#f0f0f0] px-3 rounded"
            >
              {label}
            </p>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
