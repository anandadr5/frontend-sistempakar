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
    "Mudah lelah": "mudah_lelah",
    "Bengkak pada kaki": "bengkak_kaki",
    "Keringat dingin": "keringat_dingin",
  };

  const formFields = [
    { label: "Nama", type: "text", id: "nama" },
    { label: "Usia", type: "number", id: "usia", min: 0, max: 120 },
    { label: "Jenis Kelamin", type: "text", id: "gender" },
    {
      label: "Berat Badan",
      type: "number",
      id: "weight",
      helper: "Satuan kg",
      min: 1,
      max: 500,
      step: "0.1",
    },
    {
      label: "Tinggi Badan",
      type: "number",
      id: "height",
      helper: "Satuan cm",
      min: 50,
      max: 250,
      step: "0.1",
    },
    {
      label: "Tekanan Darah Sistolik (Atas)",
      type: "number",
      id: "sistolik",
      helper: "Contoh: 120 (mmHg)",
      min: 60,
      max: 250,
    },
    {
      label: "Tekanan Darah Diastolik (Bawah)",
      type: "number",
      id: "diastolik",
      helper: "Contoh: 80 (mmHg)",
      min: 40,
      max: 150,
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
  const [popupMessage, setPopupMessage] = useState("");
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

  // Validasi input
  const validateInput = () => {
    const errors = [];

    // Validasi form data
    const requiredFields = ["nama", "usia", "gender", "weight", "height"];
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field] === "") {
        const fieldName =
          formFields.find((f) => f.id === field)?.label || field;
        errors.push(`${fieldName} harus diisi`);
      }
    });

    // Validasi numerik
    const age = parseInt(formData.usia);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const sistolik = parseFloat(formData.sistolik || 120);
    const diastolik = parseFloat(formData.diastolik || 80);

    if (age && (age < 0 || age > 120)) {
      errors.push("Usia harus antara 0-120 tahun");
    }

    if (weight && (weight < 1 || weight > 500)) {
      errors.push("Berat badan tidak valid");
    }

    if (height && (height < 50 || height > 250)) {
      errors.push("Tinggi badan tidak valid");
    }

    if (sistolik && (sistolik < 60 || sistolik > 250)) {
      errors.push("Tekanan sistolik tidak valid (60-250 mmHg)");
    }

    if (diastolik && (diastolik < 40 || diastolik > 150)) {
      errors.push("Tekanan diastolik tidak valid (40-150 mmHg)");
    }

    if (sistolik && diastolik && sistolik <= diastolik) {
      errors.push("Tekanan sistolik harus lebih tinggi dari diastolik");
    }

    // Validasi gejala - minimal harus ada pilihan untuk semua gejala
    const symptomCount = Object.keys(selectedSymptoms).length;
    if (symptomCount < symptoms.length) {
      errors.push("Mohon pilih ya/tidak untuk semua gejala");
    }

    return errors;
  };

  // Validasi dan submit
  const handleSubmit = async () => {
    const validationErrors = validateInput();

    if (validationErrors.length > 0) {
      setPopupMessage(validationErrors.join(", "));
      setPopupVisible(true);
      return;
    }

    setLoading(true);

    try {
      // Mapping gejala sesuai backend
      const mappedSymptoms = {};
      Object.entries(selectedSymptoms).forEach(([frontendKey, value]) => {
        const backendKey = symptomMapping[frontendKey];
        mappedSymptoms[backendKey] = value.toLowerCase();
      });

      console.log("🔍 DEBUG - Original symptoms:", selectedSymptoms);
      console.log("🔍 DEBUG - Mapped symptoms:", mappedSymptoms);

      // Payload sesuai dengan endpoint backend
      const payload = {
        nama: formData.nama.trim(),
        usia: parseInt(formData.usia),
        gender: formData.gender,
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        sistolik: parseFloat(formData.sistolik || 120),
        diastolik: parseFloat(formData.diastolik || 80),
        riwayat_penyakit: formData.riwayat_penyakit || "Tidak Ada",
        riwayat_merokok: formData.riwayat_merokok || "Tidak",
        aspek_psikologis: formData.aspek_psikologis || "Tenang",
        gejala: mappedSymptoms,
      };

      console.log("🔍 DEBUG - Payload:", payload);

      const response = await fetch(`${BASE_URL}/api/diagnosis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Hasil diagnosis:", result);

      // Simpan result ke sessionStorage untuk halaman hasil
      sessionStorageStorage.setItem("hasilDiagnosis", JSON.stringify(result));
      navigate("/hasildiagnosis");
    } catch (error) {
      console.error("❌ Gagal kirim data:", error);
      setPopupMessage(`Gagal memproses diagnosis: ${error.message}`);
      setPopupVisible(true);
    } finally {
      setLoading(false);
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
            {formFields.map(({ label, type, id, helper, min, max, step }) => (
              <div key={id} className="flex flex-col">
                <Label className="text-sm font-semibold mb-1">
                  {label} <span className="text-red-500">*</span>
                </Label>

                {id === "gender" ? (
                  <select
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleInputChange}
                    className="w-full h-[50px] px-2.5 py-[15px] border border-gray-400 rounded-md bg-white text-gray-700 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      Pilih Jenis Kelamin
                    </option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                ) : (
                  <Input
                    type={type}
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleInputChange}
                    placeholder={`Masukkan ${label}`}
                    min={min}
                    max={max}
                    step={step}
                    className="py-3 px-4 w-full border border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                )}

                {helper && (
                  <p className="text-xs text-gray-500 mt-1">{helper}</p>
                )}
              </div>
            ))}

            {additionalFields.map(({ label, id, options }) => (
              <div key={id} className="flex flex-col">
                <Label className="text-sm font-semibold mb-1">
                  {label} <span className="text-red-500">*</span>
                </Label>
                <select
                  id={id}
                  name={id}
                  value={formData[id] || ""}
                  onChange={handleInputChange}
                  className="w-full h-[50px] px-2.5 py-[15px] border border-gray-400 rounded-md bg-white text-gray-700 focus:border-blue-500 focus:outline-none"
                >
                  <option value="" disabled hidden>
                    Pilih {label}
                  </option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
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

            {/* Progress indicator */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Gejala terpilih: {Object.keys(selectedSymptoms).length} dari{" "}
                {symptoms.length}
              </p>
              <div className="w-64 bg-gray-200 rounded-full h-2 mt-2 mx-auto">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (Object.keys(selectedSymptoms).length / symptoms.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button
                className="w-full sm:w-48 p-3 rounded-lg bg-gray-600 hover:bg-gray-700 font-medium text-white transition-colors"
                onClick={handleReset}
                type="button"
              >
                Ulang
              </Button>
              <Button
                className="w-full sm:w-48 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium text-white transition-colors"
                onClick={handleSubmit}
                type="button"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Kirim"}
              </Button>
            </div>
          </div>
        </section>

        {/* Popup jika data belum lengkap */}
        {popupVisible && (
          <PopupAlert
            message={popupMessage}
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
