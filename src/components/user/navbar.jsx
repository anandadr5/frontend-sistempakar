import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.jpg";

import Button from "@/components/user/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (label) => {
    setIsOpen(false);
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
    <nav className="fixed top-0 left-0 w-full h-20 bg-white border-b border-gray-200 shadow-md z-50 flex items-center justify-between px-4 sm:px-10">
      {/* Logo dan Judul */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <img
          src={Logo}
          alt="Logo"
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover"
        />
        {/* Judul: kecil di mobile, besar di desktop */}
        <p className="text-sm font-medium text-black block sm:hidden">
          Sistem Pakar Diagnosis Penyakit Jantung
        </p>
        <p className="ml-2 text-lg sm:text-2xl font-medium text-black hidden sm:block">
          Sistem Pakar Diagnosis Penyakit Jantung
        </p>
      </div>

      {/* Link Navigasi untuk desktop */}
      <div className="hidden sm:flex gap-3 md:gap-6 ml-auto">
        {navItems.map((label) => (
          <p
            key={label}
            className="text-sm md:text-base text-black hover:text-[#01796f] cursor-pointer hover:border-b-2 hover:border-[#01796f] transition duration-150"
            onClick={() => handleClick(label)}
          >
            {label}
          </p>
        ))}
      </div>

      {/* Hamburger button untuk mobile */}
      <div className="sm:hidden ml-auto">
        <Button onClick={() => setIsOpen(!isOpen)}>
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

      {/* Dropdown menu untuk mobile */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-start p-4 sm:hidden z-40">
          {navItems.map((label) => (
            <p
              key={label}
              onClick={() => handleClick(label)}
              className="text-base text-black py-2 w-full hover:bg-[#f0f0f0] px-2 rounded"
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
