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
    const hasil = localStorage.getItem("hasilDiagnosis");
    if (hasil) {
      setData(JSON.parse(hasil));
    }
  }, []);

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
          <div className="space-y-1">
            <p className="text-base font-medium text-black">
              Nama: {data.nama}
            </p>
            <p className="text-base font-medium text-black">
              Usia: {data.usia}
            </p>
            <p className="text-base font-medium text-black">
              Jenis Kelamin: {data.gender}
            </p>
            <p className="text-base font-medium text-black">
              Berat Badan: {data.weight} kg
            </p>
            <p className="text-base font-medium text-black">
              Tinggi Badan: {data.height} cm
            </p>
            <p className="text-base font-medium text-black">
              BMI: {data.bmi} ({data.kategori_bmi})
            </p>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="space-y-1">
            <p className="text-base font-medium text-black">
              Diagnosis: {data.diagnosis}
            </p>
            <p className="text-base font-medium text-black">
              Persentase Kemungkinan: {data.persentase}%
            </p>
            <p className="text-base font-medium text-black">
              Risiko: {data.risiko}
            </p>
            <p className="text-base font-medium text-black">
              Gejala yang Dipilih: {data.gejala}
            </p>
          </div>

          <hr className="my-4 border-gray-300" />

          <div>
            <p className="text-base font-medium text-black">
              Saran: {data.saran}
            </p>
          </div>
        </DataCard>
      </div>

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
