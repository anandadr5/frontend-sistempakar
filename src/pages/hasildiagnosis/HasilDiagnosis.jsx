import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/user/navbar";
import Footer from "@/components/user/footer";
import Button from "@/components/user/button";
import SectionHeader from "@/components/user/sectionheader";
import DataCard from "@/components/user/datacard";

import FullScreenLoader from "@/components/loading";

const HasilDiagnosis = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasil = sessionStorage.getItem("hasilDiagnosis");
    if (hasil) {
      setData(JSON.parse(hasil));
    }
  }, []);

  const formatGejala = (gejalaObj) => {
    if (typeof gejalaObj !== "object" || gejalaObj === null) {
      return "Data gejala tidak valid.";
    }

    const gejalaDialami = Object.entries(gejalaObj)
      .filter(([key, value]) => value === "ya")
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
      .join(", ");

    return gejalaDialami || "Tidak ada gejala yang dialami.";
  };

  // Cetak hasil
  const handlePrint = () => {
    const originalTitle = document.title;
    const today = new Date().toLocaleDateString("id-ID").replace(/\//g, "-");
    const cleanNama = data.nama.replace(/\s+/g, "");
    const fileTitle = `Hasil_Diagnosis_${cleanNama}_${today}`;

    document.title = fileTitle;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center w-full pt-20 bg-white">
        <Navbar />
        <div className="p-10 text-center">
          <h1 className="text-xl font-bold">
            Data hasil diagnosis tidak ditemukan.
          </h1>
          <Button
            className="mt-6 px-4 py-2 bg-black text-white rounded-lg"
            onClick={() => navigate("/inputpage")}
          >
            Kembali ke Diagnosis
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full pt-20 bg-white">
      <Navbar />

      <SectionHeader
        title="Hasil Diagnosis"
        subtitle="Analisis Gejala dan Diagnosis Penyakit Jantung dengan Sistem Pakar Berbasis Fuzzy Mamdani"
      />

      <div className="print-area flex flex-col items-center w-full max-w-4xl px-6 py-10 space-y-6">
        <DataCard title="Data & Hasil Diagnosis">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            <p>
              <span className="font-semibold">Nama:</span> {data.nama}
            </p>
            <p>
              <span className="font-semibold">Usia:</span> {data.usia} tahun
            </p>
            <p>
              <span className="font-semibold">Jenis Kelamin:</span>{" "}
              {data.gender}
            </p>
            <p>
              <span className="font-semibold">Berat Badan:</span> {data.weight}{" "}
              kg
            </p>
            <p>
              <span className="font-semibold">Tinggi Badan:</span> {data.height}{" "}
              cm
            </p>
            <p>
              <span className="font-semibold">BMI:</span> {data.bmi} (
              {data.kategori_bmi})
            </p>
            <p>
              <span className="font-semibold">Tekanan Darah:</span>{" "}
              {data.sistolik}/{data.diastolik} mmHg
            </p>
            <p>
              <span className="font-semibold">Riwayat Penyakit Jantung:</span>{" "}
              {data.riwayatPenyakit}
            </p>
            <p>
              <span className="font-semibold">Riwayat Merokok:</span>{" "}
              {data.riwayatMerokok}
            </p>
            <p className="col-span-1 sm:col-span-2">
              <span className="font-semibold">Aspek Psikologis:</span>{" "}
              {data.aspekPsikologis}
            </p>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="space-y-2">
            <p>
              <span className="font-semibold">Diagnosis:</span> {data.diagnosis}
            </p>
            <p>
              <span className="font-semibold">Persentase Kemungkinan:</span>{" "}
              {data.persentase}%
            </p>
            <p>
              <span className="font-semibold">Tingkat Risiko:</span>{" "}
              {data.risiko}
            </p>
            <p>
              <span className="font-semibold">Gejala yang Dialami:</span>{" "}
              {formatGejala(data.gejala)}
            </p>
          </div>

          <hr className="my-4 border-gray-300" />

          <div>
            <p className="font-semibold">Saran:</p>
            <p className="mt-1">{data.saran}</p>
          </div>
        </DataCard>

        {/* Disclaimer */}
        <div className="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <svg
              className="w-6 h-6 text-yellow-600 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">
                Penting untuk Diperhatikan
              </h4>
              <p className="text-sm text-yellow-700 leading-relaxed">
                Hasil diagnosis ini dihasilkan oleh sistem pakar berbasis
                kecerdasan buatan dan hanya sebagai rujukan awal. Untuk
                diagnosis yang akurat dan penanganan medis yang tepat, selalu
                konsultasikan dengan dokter atau tenaga medis profesional.
                Jangan menggunakan hasil ini sebagai pengganti konsultasi medis
                langsung.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center w-full max-w-md gap-4 no-print">
        <Button
          className="w-full p-3 rounded-lg bg-black text-white font-medium"
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              navigate("/inputpage");
            }, 300);
          }}
          type="button"
        >
          Kembali ke Diagnosis
        </Button>
        <Button
          className="w-full p-3 rounded-lg bg-black text-white font-medium"
          type="button"
          onClick={handlePrint}
        >
          Cetak Hasil
        </Button>
      </div>

      <div className="w-full border-t border-gray-300 my-10" />
      <Footer className="no-print" />

      {/* Fullscreen Loader */}
      {isLoading && <FullScreenLoader />}
    </div>
  );
};

export default HasilDiagnosis;
