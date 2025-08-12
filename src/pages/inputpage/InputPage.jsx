import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/user/navbar";
import Footer from "@/components/user/footer";
import Button from "@/components/user/button";
import Label from "@/components/user/label";
import Input from "@/components/user/input";
import SectionHeader from "@/components/user/sectionheader";

import PopupAlert from "@/components/popup";
import FullScreenLoader from "@/components/loading";
import PageFade from "@/components/pagefade";

const BASE_URL = import.meta.env.VITE_API_URL;

const InputPage = () => {
  const navigate = useNavigate();

  // Data gejala dan field formulir
  const symptoms = [
    "Nyeri dada",
    "Sesak napas",
    "Pusing",
    "Lemas",
    "Jantung berdebar",
    "Mudah lelah",
    "Bengkak pada kaki",
    "Keringat dingin",
  ];

  const symptomMapping = {
    "Nyeri dada": "nyeri dada",
    "Sesak napas": "sesak napas",
    Pusing: "pusing",
    Lemas: "lemas",
    "Jantung berdebar": "jantung berdebar",
    "Mudah lelah": "mudah lelah",
    "Bengkak pada kaki": "bengkak pada kaki",
    "Keringat dingin": "keringat dingin",
  };

  const formFields = [
    { label: "Nama", type: "text", id: "nama" },
    { label: "Usia", type: "text", id: "usia" },
    {
      label: "Jenis Kelamin",
      type: "select",
      id: "gender",
      options: ["Laki-laki", "Perempuan"],
    },
    {
      label: "Berat Badan",
      type: "text",
      id: "weight",
      helper: "Satuan kg",
    },
    {
      label: "Tinggi Badan",
      type: "text",
      id: "height",
      helper: "Satuan cm",
    },
    {
      label: "Sistolik",
      type: "text",
      id: "sistolik",
      helper: "Tekanan darah atas (e.g., 120 mmHg)",
    },
    {
      label: "Diastolik",
      type: "text",
      id: "diastolik",
      helper: "Tekanan darah bawah (e.g., 80 mmHg)",
    },
    {
      label: "Riwayat Penyakit Jantung",
      type: "select",
      id: "riwayatPenyakit",
      options: ["Ada", "Tidak Ada"],
    },
    {
      label: "Riwayat Merokok",
      type: "select",
      id: "riwayatMerokok",
      options: ["Ya", "Tidak"],
    },
    {
      label: "Aspek Psikologis",
      type: "select",
      id: "aspekPsikologis",
      options: [
        "Tidak Ada Masalah/Tenang",
        "Takut",
        "Marah",
        "Kecenderungan Bunuh Diri",
        "Depresi",
        "Cemas",
      ],
    },
  ];

  // State
  const [formData, setFormData] = useState(
    formFields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
  );

  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handler input form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const numericFields = ["usia", "weight", "height", "sistolik", "diastolik"];

    if (numericFields.includes(id)) {
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 3);
      setFormData((prev) => ({ ...prev, [id]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Handler pemilihan gejala
  const handleSymptomSelection = (symptom, option) => {
    setSelectedSymptoms((prev) => ({ ...prev, [symptom]: option }));
  };

  // Reset semua input
  const handleReset = () => {
    setFormData(
      formFields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
    );
    setSelectedSymptoms({});
  };

  // Validasi dan submit
  const handleSubmit = async () => {
    const isFormComplete = Object.values(formData).every((val) => val !== "");
    const isSymptomsComplete =
      Object.keys(selectedSymptoms).length === symptoms.length;

    if (!isFormComplete || !isSymptomsComplete) {
      setPopupVisible(true);
    } else {
      setLoading(true);

      // MAPPING GEJALA YANG BENAR untuk backend
      const mappedSymptoms = {};
      Object.entries(selectedSymptoms).forEach(([frontendKey, value]) => {
        const backendKey = symptomMapping[frontendKey];
        mappedSymptoms[backendKey] = value.toLowerCase();
      });

      console.log("🔍 DEBUG - Original symptoms:", selectedSymptoms);
      console.log("🔍 DEBUG - Mapped symptoms:", mappedSymptoms);

      const dataToSend = {
        nama: formData.nama,
        usia: formData.usia,
        gender: formData.gender,
        weight: formData.weight,
        height: formData.height,
        sistolik: formData.sistolik,
        diastolik: formData.diastolik,
        riwayatPenyakit: formData.riwayatPenyakit,
        riwayatMerokok: formData.riwayatMerokok,
        aspekPsikologis: formData.aspekPsikologis,
        gejala: mappedSymptoms,
      };

      console.log("📤 DATA YANG DIKIRIM:", dataToSend);

      try {
        const response = await fetch(`${BASE_URL}/api/diagnosis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        });

        const result = await response.json();
        console.log("📥 HASIL DARI BACKEND:", result);

        // Simpan result ke sessionStorage untuk halaman hasil
        sessionStorage.setItem("hasilDiagnosis", JSON.stringify(result));
        navigate("/hasildiagnosis");
      } catch (error) {
        console.error("❌ Gagal kirim data:", error);
        alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <PageFade>
      <div className="flex flex-col items-center w-full pt-20 bg-white">
        <Navbar />

        <SectionHeader
          title="Lengkapi Data untuk Analisis Diagnosis"
          subtitle="Silakan lengkapi data di bawah ini untuk membantu sistem dalam menentukan diagnosis."
        />

        {/* Form Data Pengguna */}
        <form className="w-full max-w-[600px] mt-4 mb-6">
          <div className="grid grid-cols-2 gap-6">
            {formFields.map(({ label, type, id, helper, options = [] }) => (
              <div key={id} className="flex flex-col">
                <Label className="text-sm font-semibold mb-1">{label}</Label>

                {type === "select" ? (
                  <select
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleInputChange}
                    className="w-full h-[50px] px-2.5 py-[15px] border border-black rounded-md bg-white text-gray-600"
                  >
                    <option value="" disabled hidden>
                      Pilih {label}
                    </option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={type}
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleInputChange}
                    placeholder={`Masukkan ${label}`}
                    className="py-3 px-4 w-full border border-gray-300 rounded-lg"
                  />
                )}

                {helper && (
                  <p className="text-xs text-gray-500 mt-1">{helper}</p>
                )}
              </div>
            ))}
          </div>
        </form>

        {/* Form Gejala */}
        <section className="w-full flex flex-col items-center px-4 py-16 bg-[#d6eadf]">
          <div className="text-center mb-10">
            <p className="text-4xl md:text-5xl font-semibold text-black">
              Gejala
            </p>
            <p className="text-base md:text-lg text-black mt-2">
              Pilih gejala yang dialami
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex flex-col gap-1 w-full">
                <Label className="text-sm font-medium text-black">
                  {symptom}
                </Label>
                <div className="flex gap-2">
                  {["Ya", "Tidak"].map((option) => (
                    <div
                      key={option}
                      onClick={() => handleSymptomSelection(symptom, option)}
                      className={`flex justify-center items-center w-full p-2 rounded-md cursor-pointer transition-colors
                ${
                  selectedSymptoms[symptom] === option
                    ? "bg-green-400 text-white"
                    : "bg-black/10 text-black"
                }`}
                    >
                      <p className="text-sm">{option}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Tombol Responsif */}
            <div className="col-span-2 flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button
                className="w-full sm:w-48 p-3 rounded-lg bg-black font-medium text-white"
                onClick={handleReset}
                type="button"
              >
                Ulang
              </Button>
              <Button
                className="w-full sm:w-48 p-3 rounded-lg bg-black font-medium text-white"
                onClick={handleSubmit}
                type="button"
              >
                Kirim
              </Button>
            </div>
          </div>
        </section>

        {/* Popup jika data belum lengkap */}
        {popupVisible && (
          <PopupAlert
            message="Mohon lengkapi semua data dan pilih gejala terlebih dahulu!"
            onClose={() => setPopupVisible(false)}
          />
        )}

        <Footer />
        {loading && <FullScreenLoader />}
      </div>
    </PageFade>
  );
};

export default InputPage;
