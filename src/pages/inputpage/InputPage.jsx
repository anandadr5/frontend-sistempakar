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
    "Nyeri dada": "nyeri_dada",
    "Sesak napas": "sesak_napas",
    Pusing: "pusing",
    Lemas: "lemas",
    "Jantung berdebar": "jantung_berdebar",
    "Mudah lelah": "mudah lelah",
    "Bengkak pada kaki": "bengkak_kaki",
    "Keringat dingin": "keringat_dingin",
  };

  const formFields = [
    { label: "Nama", type: "text", id: "nama" },
    { label: "Usia", type: "number", id: "usia" },
    { label: "Jenis Kelamin", type: "text", id: "gender" },
    {
      label: "Berat Badan",
      type: "number",
      id: "weight",
      helper: "Satuan kg",
    },
    {
      label: "Tinggi Badan",
      type: "number",
      id: "height",
      helper: "Satuan cm",
    },
    {
      label: "Tekanan Darah Sistolik (Atas)",
      type: "number",
      id: "sistolik",
      helper: "Contoh: 120",
    },
    {
      label: "Tekanan Darah Diastolik (Bawah)",
      type: "number",
      id: "diastolik",
      helper: "Contoh: 80",
    },
  ];

  const additionalFields = [
    {
      label: "Riwayat Penyakit",
      id: "riwayat_penyakit",
      type: "select",
      options: ["Ada", "Tidak Ada"],
    },
    {
      label: "Riwayat Merokok",
      id: "riwayat_merokok",
      type: "select",
      options: ["Ya", "Tidak"],
    },
    {
      label: "Aspek Psikologis",
      id: "aspek_psikologis",
      type: "select",
      options: [
        "Tenang",
        "Takut",
        "Marah",
        "Depresi",
        "Cemas",
        "Kecenderungan Bunuh Diri",
      ],
    },
  ];

  // State
  const allFormFields = [...formFields, ...additionalFields];

  const [formData, setFormData] = useState(
    allFormFields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
  );

  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handler input form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handler pemilihan gejala
  const handleSymptomSelection = (symptom, option) => {
    setSelectedSymptoms((prev) => ({ ...prev, [symptom]: option }));
  };

  // Reset semua input
  const handleReset = () => {
    setFormData(
      allFormFields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {})
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

      try {
        const response = await fetch(`${BASE_URL}/api/diagnosis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nama: formData.nama,
            usia: formData.usia,
            gender: formData.gender,
            weight: formData.weight,
            height: formData.height,
            sistolik: formData.sistolik,
            diastolik: formData.diastolik,
            riwayat_penyakit: formData.riwayat_penyakit,
            riwayat_merokok: formData.riwayat_merokok,
            aspek_psikologis: formData.aspek_psikologis,
            gejala: mappedSymptoms,
          }),
        });

        const result = await response.json();
        console.log("Hasil diagnosis:", result);

        // Simpan result ke localStorage/sessionStorage untuk halaman hasil
        localStorage.setItem("hasilDiagnosis", JSON.stringify(result));
        navigate("/hasildiagnosis");
      } catch (error) {
        console.error("Gagal kirim data:", error);
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
        <form className="w-full max-w-[900px] mt-4 mb-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map(({ label, type, id, helper }) => (
              <div key={id} className="flex flex-col">
                <Label className="text-sm font-semibold mb-1">{label}</Label>
                <Input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleInputChange}
                  placeholder={`Masukkan ${label}`}
                  className="py-3 px-4 w-full border border-gray-300 rounded-lg"
                />
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
