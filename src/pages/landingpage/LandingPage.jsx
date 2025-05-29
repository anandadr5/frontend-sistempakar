import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Navbar from "@/components/user/navbar";
import Footer from "@/components/user/footer";
import Button from "@/components/user/button";
import Label from "@/components/user/label";
import Input from "@/components/user/input";

import PopupAlert from "@/components/popup";
import PageFade from "@/components/pagefade";

import Animasi from "@/assets/landingpage.png";
import CekDiagnosis from "@/assets/cekdiagnosis.png";
import JenisPenyakit from "@/assets/jenispenyakit.png";
import Kontak from "@/assets/kontak.png";

const BASE_URL = import.meta.env.VITE_API_URL;

const services = [
  {
    img: CekDiagnosis,
    title: "Diagnosis",
    description: "Cek Risiko Penyakit Jantung Anda",
    navigateTo: "/inputpage",
  },
  {
    img: JenisPenyakit,
    title: "Penyakit Jantung",
    description: "Kenali Penyakit Jantung dan Cara Pencegahannya",
    navigateTo: "/penyakit",
  },
  {
    img: Kontak,
    title: "Kontak",
    description: "Hubungi Kami",
    scrollToFooter: true,
  },
];

const LandingPage = () => {
  const [formData, setFormData] = useState({ nama: "", email: "", pesan: "" });
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(null);
  const footerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#feedback") {
      const feedbackSection = document.getElementById("feedback-section");
      if (feedbackSection) {
        setTimeout(() => {
          feedbackSection.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nama, email, pesan } = formData;

    if (!nama || !email || !pesan) {
      setPopupSuccess(false);
      setPopupVisible(true);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ nama: "", email: "", pesan: "" });
        setPopupSuccess(true);
      } else {
        setPopupSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setPopupSuccess(false);
    }

    setPopupVisible(true);
  };

  const handleScrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageFade>
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-8 w-full px-4 md:px-8 lg:px-32 py-10 bg-[#d6eadf] mt-20">
          {/* Teks - kiri */}
          <div className="w-full md:w-1/2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-snug text-justify md:text-left">
              Cegah Risiko Penyakit Jantung Dengan Teknologi Cerdas
            </h1>
            <p className="text-sm md:text-base text-black mt-4 text-justify">
              Gunakan sistem pakar kami untuk diagnosis dini dan pencegahan
              penyakit jantung dengan cara yang mudah dan akurat.
            </p>
            <Button
              id="diagnosis"
              className="bg-black text-white py-2 px-5 text-sm rounded-lg mt-6"
              onClick={() => navigate("/inputpage")}
            >
              Mulai Diagnosis
            </Button>
          </div>

          {/* Gambar - kanan */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              src={Animasi}
              alt="Ilustrasi Jantung"
              className="w-full max-w-[400px] h-auto object-contain"
            />
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full px-4 md:px-8 lg:px-32 py-12 bg-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-10">
            Layanan Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {services.map(
              (
                { img, title, description, navigateTo, scrollToFooter },
                index
              ) => (
                <div
                  key={index}
                  className="flex flex-col items-center overflow-hidden rounded-lg border border-gray-300 w-full max-w-xs shadow-md transition-transform hover:scale-105 duration-300"
                  onClick={() =>
                    navigateTo
                      ? navigate(navigateTo)
                      : scrollToFooter && handleScrollToFooter()
                  }
                >
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-56 object-cover bg-gray-100"
                  />
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-700 mb-1">{description}</p>
                    <h3 className="text-lg font-semibold text-black">
                      {title}
                    </h3>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Feedback Form */}
        <section
          id="feedback-section"
          className="flex flex-col md:flex-row justify-center items-center px-4 md:px-12 lg:px-[200px] py-8 bg-[#d6eadf] w-full gap-12 md:gap-24"
        >
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">
              Berikan Masukan Anda!
            </h2>
            <p className="text-base md:text-lg text-black leading-relaxed">
              Kami ingin tahu pendapat Anda agar kami dapat memberikan layanan
              yang lebih baik.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 w-full"
            >
              {["nama", "email"].map((field) => (
                <div key={field}>
                  <Label className="block text-black font-medium text-lg mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={`Masukkan ${field} Anda`}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-3 border border-black rounded-md placeholder-gray-500 bg-white text-black text-lg"
                  />
                </div>
              ))}
              <div>
                <Label className="block text-black font-medium text-lg mb-2">
                  Pesan
                </Label>
                <textarea
                  name="pesan"
                  placeholder="Masukkan pesan Anda"
                  value={formData.pesan}
                  onChange={handleChange}
                  className="w-full h-28 p-3 border border-black rounded-md placeholder-gray-500 bg-white text-black text-lg"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300 text-lg font-semibold"
              >
                Kirim
              </Button>
            </form>
          </div>
        </section>

        {/* Popup Alert */}
        {popupVisible && (
          <PopupAlert
            message={
              popupSuccess
                ? "Pesan Anda berhasil dikirim. Terima kasih atas masukan Anda!"
                : "Mohon lengkapi formulir terlebih dahulu!"
            }
            success={popupSuccess}
            onClose={() => setPopupVisible(false)}
          />
        )}

        {/* Footer */}
        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    </PageFade>
  );
};

export default LandingPage;
