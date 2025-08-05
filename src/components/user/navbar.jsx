import { useState } from "react";
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
    <nav className="fixed top-0 left-0 w-full h-16 sm:h-18 md:h-20 bg-white border-b border-gray-200 shadow-md z-50 flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-10">
      {/* Logo dan Judul */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
        <img
          src={Logo || "/placeholder.svg"}
          alt="Logo"
          className="w-8 h-8 xs:w-9 xs:h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0"
        />
        {/* Judul: sangat kecil di mobile, sedang di tablet, besar di desktop */}
        <div className="min-w-0 flex-1">
          <p className="text-xs xs:text-sm font-medium text-black block sm:hidden leading-tight">
            Sistem Pakar Diagnosis Penyakit Jantung
          </p>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-black hidden sm:block leading-tight">
            Sistem Pakar Diagnosis Penyakit Jantung
          </p>
        </div>
      </div>

      {/* Link Navigasi untuk desktop dan tablet */}
      <div className="hidden md:flex gap-2 lg:gap-4 xl:gap-6 ml-auto flex-shrink-0">
        {navItems.map((label) => (
          <p
            key={label}
            className="text-xs lg:text-sm xl:text-base text-black hover:text-[#01796f] cursor-pointer hover:border-b-2 hover:border-[#01796f] transition-all duration-200 ease-in-out px-1 py-1 whitespace-nowrap"
            onClick={() => handleClick(label)}
          >
            {label}
          </p>
        ))}
      </div>

      {/* Hamburger button untuk mobile dan tablet kecil */}
      <div className="md:hidden ml-auto flex-shrink-0">
        <Button onClick={() => setIsOpen(!isOpen)}>
          <svg
            className={`w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-200 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </Button>
      </div>

      {/* Dropdown menu untuk mobile dan tablet kecil */}
      {isOpen && (
        <>
          {/* Overlay untuk menutup menu ketika klik di luar */}
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu dropdown */}
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col py-2">
              {navItems.map((label, index) => (
                <p
                  key={label}
                  onClick={() => handleClick(label)}
                  className={`text-sm sm:text-base text-black py-3 px-4 sm:px-6 hover:bg-[#f8f9fa] hover:text-[#01796f] cursor-pointer transition-all duration-150 border-b border-gray-100 last:border-b-0 ${
                    index === 0 ? "border-t border-gray-100" : ""
                  }`}
                >
                  {label}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
