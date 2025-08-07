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
      try {
        const parsedData = JSON.parse(hasil);
        setData(parsedData);
        console.log("✅ Data hasil diagnosis:", parsedData);
      } catch (error) {
        console.error("❌ Error parsing hasil diagnosis:", error);
        localStorage.removeItem("hasilDiagnosis");
      }
    }
  }, []);

  // Format persentase untuk tampilan
  const formatPersentase = (nilai) => {
    if (typeof nilai === "number") {
      return nilai.toFixed(1);
    }
    return nilai;
  };

  // Get risk level color
  const getRiskColor = (risiko) => {
    if (!risiko) return "text-gray-600";

    const risikoLower = risiko.toLowerCase();
    if (risikoLower.includes("tidak ada") || risikoLower.includes("rendah")) {
      return "text-green-600";
    } else if (risikoLower.includes("sedang")) {
      return "text-yellow-600";
    } else if (risikoLower.includes("tinggi")) {
      return "text-red-600";
    } else if (
      risikoLower.includes("sangat tinggi") ||
      risikoLower.includes("darurat")
    ) {
      return "text-red-800";
    }
    return "text-gray-600";
  };

  // Get diagnosis status color
  const getDiagnosisColor = (diagnosis) => {
    if (!diagnosis) return "text-gray-600";

    const diagnosisLower = diagnosis.toLowerCase();
    if (diagnosisLower.includes("tidak terdeteksi")) {
      return "text-green-600";
    } else if (diagnosisLower.includes("terdeteksi")) {
      return "text-orange-600";
    }
    return "text-gray-600";
  };

  const handlePrint = () => {
    const originalTitle = document.title;

    const today = new Date().toLocaleDateString("id-ID").replace(/\//g, "-");
    const cleanNama = data?.nama ? data.nama.replace(/\s+/g, "") : "Unknown";
    const fileTitle = `Hasil_Diagnosis_${cleanNama}_${today}`;

    document.title = fileTitle;

    // Hide elements that shouldn't be printed
    const noPrintElements = document.querySelectorAll(".no-print");
    noPrintElements.forEach((el) => {
      el.style.display = "none";
    });

    window.print();

    // Restore elements after printing
    setTimeout(() => {
      document.title = originalTitle;
      noPrintElements.forEach((el) => {
        el.style.display = "";
      });
    }, 1000);
  };

  const handleBackToDiagnosis = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Clear localStorage
      localStorage.removeItem("hasilDiagnosis");
      navigate("/inputpage");
    }, 300);
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center w-full pt-20 bg-white min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Data Hasil Diagnosis Tidak Ditemukan
            </h1>
            <p className="text-gray-600 mb-6">
              Silakan lakukan diagnosis terlebih dahulu untuk melihat hasilnya.
            </p>
            <Button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              onClick={() => navigate("/inputpage")}
            >
              Mulai Diagnosis
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full pt-20 bg-white">
      <Navbar className="no-print" />

      <SectionHeader
        title="Hasil Diagnosis Sistem Pakar"
        subtitle="Analisis Penyakit Jantung Menggunakan Metode Fuzzy Mamdani"
      />

      <div className="print-area flex flex-col items-center w-full max-w-5xl px-6 py-10 space-y-8">
        {/* Data Pasien */}
        <DataCard title="📋 Informasi Pasien">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-base">
                <span className="font-semibold">Nama:</span> {data.nama}
              </p>
              <p className="text-base">
                <span className="font-semibold">Usia:</span> {data.usia} tahun
              </p>
              <p className="text-base">
                <span className="font-semibold">Jenis Kelamin:</span>{" "}
                {data.gender}
              </p>
              <p className="text-base">
                <span className="font-semibold">Berat Badan:</span>{" "}
                {data.weight} kg
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-base">
                <span className="font-semibold">Tinggi Badan:</span>{" "}
                {data.height} cm
              </p>
              <p className="text-base">
                <span className="font-semibold">BMI:</span> {data.bmi}
                <span
                  className={`ml-2 px-2 py-1 text-xs rounded ${
                    data.kategori_bmi === "Normal"
                      ? "bg-green-100 text-green-800"
                      : data.kategori_bmi === "Overweight"
                      ? "bg-yellow-100 text-yellow-800"
                      : data.kategori_bmi === "Obese"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {data.kategori_bmi}
                </span>
              </p>
              <p className="text-base">
                <span className="font-semibold">Tekanan Darah:</span>{" "}
                {data.sistolik}/{data.diastolik} mmHg
                {data.kategori_tekanan_darah && (
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded ${
                      data.kategori_tekanan_darah === "Normal"
                        ? "bg-green-100 text-green-800"
                        : data.kategori_tekanan_darah.includes("Hipertensi")
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {data.kategori_tekanan_darah}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Data Tambahan */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-lg mb-3">Data Tambahan</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <p className="text-base">
                <span className="font-semibold">Riwayat Penyakit:</span>
                <span
                  className={
                    data.riwayat_penyakit === "Ada"
                      ? "text-red-600 ml-1"
                      : "text-green-600 ml-1"
                  }
                >
                  {data.riwayat_penyakit}
                </span>
              </p>
              <p className="text-base">
                <span className="font-semibold">Riwayat Merokok:</span>
                <span
                  className={
                    data.riwayat_merokok === "Ya"
                      ? "text-red-600 ml-1"
                      : "text-green-600 ml-1"
                  }
                >
                  {data.riwayat_merokok}
                </span>
              </p>
              <p className="text-base">
                <span className="font-semibold">Aspek Psikologis:</span>
                <span
                  className={`ml-1 ${
                    data.aspek_psikologis === "Tenang"
                      ? "text-green-600"
                      : ["Depresi", "Kecenderungan Bunuh Diri"].includes(
                          data.aspek_psikologis
                        )
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {data.aspek_psikologis}
                </span>
              </p>
            </div>
          </div>
        </DataCard>

        {/* Hasil Diagnosis */}
        <DataCard title="🩺 Hasil Diagnosis">
          <div className="text-center mb-6">
            <h3
              className={`text-2xl font-bold mb-2 ${getDiagnosisColor(
                data.diagnosis
              )}`}
            >
              {data.diagnosis}
            </h3>
            <div className="text-6xl font-bold mb-2">
              {formatPersentase(data.persentase)}%
            </div>
            <p className="text-gray-600">Tingkat Kepercayaan Sistem</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-lg mb-3">Tingkat Risiko</h4>
            <p
              className={`text-xl font-bold mb-4 ${getRiskColor(data.risiko)}`}
            >
              {data.risiko}
            </p>

            {/* Progress bar untuk visualisasi risiko */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  data.persentase < 25
                    ? "bg-green-500"
                    : data.persentase < 50
                    ? "bg-yellow-500"
                    : data.persentase < 75
                    ? "bg-orange-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${Math.min(data.persentase, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-lg mb-3">
              Gejala yang Terdeteksi
            </h4>
            <p className="text-base bg-blue-50 p-4 rounded-lg">
              {data.gejala || "Tidak ada gejala yang dilaporkan"}
            </p>
          </div>
        </DataCard>

        {/* Rekomendasi dan Saran */}
        <DataCard title="💡 Rekomendasi Medis">
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <h4 className="font-semibold text-lg mb-2 text-blue-800">
                Saran Utama
              </h4>
              <p className="text-base text-blue-700 leading-relaxed">
                {data.saran}
              </p>
            </div>

            {/* Rekomendasi tambahan jika ada */}
            {data.recommendations && data.recommendations.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-3">
                  Rekomendasi Tambahan
                </h4>
                <div className="space-y-2">
                  {data.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <p className="text-base">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target values jika ada */}
            {data.targets && (
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-3">Target Kesehatan</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(data.targets).map(([key, value]) => (
                    <div key={key} className="bg-green-50 p-3 rounded">
                      <p className="text-sm font-medium text-green-800 capitalize">
                        {key.replace("_", " ")}
                      </p>
                      <p className="text-base text-green-700">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
      <div className="flex flex-col sm:flex-row justify-center w-full max-w-md gap-4 mb-8 no-print">
        <Button
          className="w-full sm:w-48 p-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-medium transition-colors"
          onClick={handleBackToDiagnosis}
          type="button"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Diagnosis Baru"}
        </Button>
        <Button
          className="w-full sm:w-48 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          type="button"
          onClick={handlePrint}
        >
          📄 Cetak Hasil
        </Button>
      </div>

      <div className="w-full border-t border-gray-300 my-6 no-print" />
      <Footer className="no-print" />

      {/* Loading overlay */}
      {isLoading && <FullScreenLoader />}

      {/* Print styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-area {
            max-width: none !important;
            margin: 0 !important;
          }
          body {
            font-size: 12pt;
          }
          h1,
          h2,
          h3,
          h4 {
            page-break-after: avoid;
          }
          .page-break {
            page-break-before: always;
          }
        }
      `}</style>
    </div>
  );
};

export default HasilDiagnosis;
