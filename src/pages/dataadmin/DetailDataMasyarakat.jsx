import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "@/components/admin/sidebar";
import NavbarAdmin from "@/components/admin/navbaradmin";
import AdminTitle from "@/components/admin/admintitle";

import DataCard from "@/components/user/datacard";
import Button from "@/components/user/button";

import FullScreenLoader from "@/components/loading";

const BASE_URL = import.meta.env.VITE_API_URL;

const DetailDataMasyarakat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detailData, setDetailData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/data-masyarakat/${id}`);
        const data = await res.json();
        console.log("📥 Detail data dari backend:", data);
        setDetailData(data);
      } catch (error) {
        console.error("Gagal mengambil detail data:", error);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  // Function untuk format gejala
  const formatGejala = (gejalaData) => {
    if (!gejalaData) return "Tidak ada data gejala";

    // Jika gejala berupa string, coba parse
    if (typeof gejalaData === "string") {
      try {
        const parsed = JSON.parse(gejalaData);
        if (typeof parsed === "object") {
          // Format dari object menjadi list gejala yang dialami
          const gejalaDialami = Object.entries(parsed)
            .filter(([key, value]) => value === "ya")
            .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
            .join(", ");
          return gejalaDialami || "Tidak ada gejala yang dialami";
        } else {
          // Jika hasil parse bukan object, split dengan koma
          return parsed
            .split(",")
            .map((g) => g.trim())
            .join(", ");
        }
      } catch (e) {
        // Jika gagal parse, split dengan koma
        return gejalaData
          .split(",")
          .map((g) => g.trim())
          .join(", ");
      }
    }

    // Jika gejala berupa object
    if (typeof gejalaData === "object") {
      const gejalaDialami = Object.entries(gejalaData)
        .filter(([key, value]) => value === "ya")
        .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
        .join(", ");
      return gejalaDialami || "Tidak ada gejala yang dialami";
    }

    return "Format data gejala tidak valid";
  };

  if (!detailData) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-700">
        <p>Memuat detail data...</p>
      </div>
    );
  }

  const handlePrint = () => {
    const originalTitle = document.title;

    const today = new Date().toLocaleDateString("id-ID").replace(/\//g, "-");
    const cleanNama = detailData.nama.replace(/\s+/g, "");
    const fileTitle = `Hasil_Diagnosis_${cleanNama}_${today}`;

    document.title = fileTitle;

    window.print();

    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      <aside className="w-1/4 sm:w-1/5 h-full bg-white shadow-lg no-print">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col h-full">
        <NavbarAdmin title="Detail Data Masyarakat" className="no-print" />

        <section className="flex-1 p-6 overflow-auto">
          <div className="sticky top-0 bg-gray-100 z-10 py-4">
            <AdminTitle title="Detail Data Masyarakat" />
          </div>

          <div className="print-area grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-black">
            <DataCard title="Data Diri">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Nama:</span> {detailData.nama}
                </p>
                <p>
                  <span className="font-semibold">Usia:</span> {detailData.usia}{" "}
                  tahun
                </p>
                <p>
                  <span className="font-semibold">Jenis Kelamin:</span>{" "}
                  {detailData.jenis_kelamin}
                </p>
                <p>
                  <span className="font-semibold">Berat Badan:</span>{" "}
                  {detailData.berat_badan} kg
                </p>
                <p>
                  <span className="font-semibold">Tinggi Badan:</span>{" "}
                  {detailData.tinggi_badan} cm
                </p>
                <p>
                  <span className="font-semibold">BMI:</span> {detailData.bmi} (
                  {detailData.kategori_bmi})
                </p>
              </div>
            </DataCard>

            <DataCard title="Riwayat & Kondisi Medis">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Tekanan Darah:</span>{" "}
                  {detailData.sistolik || "N/A"}/{detailData.diastolik || "N/A"}{" "}
                  mmHg
                </p>
                {detailData.kategori_tekanan_darah && (
                  <p>
                    <span className="font-semibold">
                      Kategori Tekanan Darah:
                    </span>{" "}
                    {detailData.kategori_tekanan_darah}
                  </p>
                )}
                <p>
                  <span className="font-semibold">
                    Riwayat Penyakit Jantung:
                  </span>{" "}
                  {detailData.riwayat_penyakit || "Tidak diketahui"}
                </p>
                <p>
                  <span className="font-semibold">Riwayat Merokok:</span>{" "}
                  {detailData.riwayat_merokok || "Tidak diketahui"}
                </p>
                <p>
                  <span className="font-semibold">Aspek Psikologis:</span>{" "}
                  {detailData.aspek_psikologis || "Tidak diketahui"}
                </p>
              </div>
            </DataCard>

            <DataCard title="Gejala yang Dirasakan">
              <div className="text-sm">
                <p>
                  <span className="font-semibold">Gejala yang Dialami:</span>
                </p>
                <p className="mt-1 text-gray-700">
                  {formatGejala(detailData.gejala)}
                </p>
              </div>
            </DataCard>

            <DataCard title="Hasil Diagnosis">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Diagnosis:</span>{" "}
                  {detailData.diagnosis}
                </p>
                <p>
                  <span className="font-semibold">Persentase Kemungkinan:</span>{" "}
                  {detailData.persentase}%
                </p>
                <p>
                  <span className="font-semibold">Tingkat Risiko:</span>{" "}
                  {detailData.risiko}
                </p>
              </div>
            </DataCard>

            <div className="md:col-span-2">
              <DataCard title="Saran Medis">
                <p className="text-sm leading-relaxed">{detailData.saran}</p>
              </DataCard>
            </div>

            <div className="md:col-span-2">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-yellow-600 mt-0.5"
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
                    <h4 className="font-semibold text-yellow-800 text-sm mb-1">
                      Penting untuk Diperhatikan
                    </h4>
                    <p className="text-xs text-yellow-700 leading-relaxed">
                      Hasil diagnosis ini dihasilkan oleh sistem pakar berbasis
                      AI dan hanya sebagai rujukan awal. Untuk diagnosis akurat
                      dan penanganan yang tepat, selalu konsultasikan dengan
                      dokter atau tenaga medis profesional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full md:w-1/2 mx-auto flex flex-row justify-center items-center gap-4 no-print">
            <Button
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  navigate("/datamasyarakat");
                }, 300);
              }}
            >
              Kembali
            </Button>

            <Button
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              onClick={handlePrint}
            >
              Cetak Hasil
            </Button>
          </div>
        </section>

        {/* Fullscreen Loader */}
        {isLoading && <FullScreenLoader />}
      </main>
    </div>
  );
};

export default DetailDataMasyarakat;
