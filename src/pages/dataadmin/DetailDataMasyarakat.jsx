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
        setDetailData(data);
      } catch (error) {
        console.error("Gagal mengambil detail data:", error);
      }
    };

    if (id) fetchDetail();
  }, [id]);

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
    const cleanNama = data.nama.replace(/\s+/g, "");
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
              <p>Nama: {detailData.nama}</p>
              <p>Usia: {detailData.usia} tahun</p>
              <p>Jenis Kelamin: {detailData.jenis_kelamin}</p>
              <p>Berat Badan: {detailData.berat_badan} kg</p>
              <p>Tinggi Badan: {detailData.tinggi_badan} cm</p>
              <p>
                BMI: {detailData.bmi} ({detailData.kategori_bmi})
              </p>
            </DataCard>

            <DataCard title="Gejala yang Dirasakan">
              <ul className="list-disc list-inside">
                {detailData.gejala.split(",").map((g, index) => (
                  <li key={index}>{g.trim()}</li>
                ))}
              </ul>
            </DataCard>

            <div className="md:col-span-2">
              <DataCard title="Hasil Diagnosis">
                <p>Diagnosis: {detailData.diagnosis}</p>
                <p>Persentase: {detailData.persentase}%</p>
                <p>Risiko: {detailData.risiko}</p>
                <p className="mt-2">Saran: {detailData.saran}</p>
              </DataCard>
            </div>
          </div>

          <div className="mt-6 w-full md:w-1/2 mx-auto flex flex-row justify-center items-center gap-4 no-print">
            <Button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  navigate("/datamasyarakat");
                }, 300);
              }}
            >
              Kembali
            </Button>

            <Button onClick={handlePrint}>Cetak Hasil</Button>
          </div>
        </section>

        {/* Fullscreen Loader */}
        {isLoading && <FullScreenLoader />}
      </main>
    </div>
  );
};

export default DetailDataMasyarakat;
