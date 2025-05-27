import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "@/components/admin/Sidebar";
import NavbarAdmin from "@/components/admin/NavbarAdmin";
import AdminTitle from "@/components/admin/AdminTitle";
import Table from "@/components/admin/Table";
import Pagination from "@/components/admin/Pagination";
import FullScreenLoader from "@/components/loading";

const DataMasyarakat = () => {
  const navigate = useNavigate();

  const columns = [
    { label: "ID", field: "id" },
    { label: "Nama", field: "nama" },
    { label: "Usia", field: "usia" },
    { label: "Jenis Kelamin", field: "jenis_kelamin" },
    { label: "Hasil Diagnosis", field: "diagnosis" },
  ];

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/data-masyarakat");
      const json = await res.json();
      setData(json);
    } catch (error) {
      toast.error("Gagal mengambil data.");
      console.error(error);
    }
  };

  const handleDetail = (row) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/detaildatamasyarakat/${row.id}`);
    }, 300);
  };

  const handleDelete = async (row) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/data-masyarakat/${row.id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setData(data.filter((item) => item.id !== row.id));
        toast.success(`Data dari ${row.nama} berhasil dihapus.`);
      } else {
        toast.error("Gagal menghapus data.");
      }
    } catch (error) {
      toast.error("Gagal menghapus data. Silakan coba lagi.");
      console.error("Delete error:", error);
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = [...data]
    .sort((a, b) => a.id - b.id)
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      <aside className="w-1/4 sm:w-1/5 h-full bg-white shadow-lg">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col h-full">
        <NavbarAdmin title="Data Masyarakat" />

        <section className="flex-1 flex flex-col p-6 overflow-hidden">
          <div className="sticky top-0 bg-gray-100 z-10 py-4">
            <AdminTitle title="Hasil Input Diagnosis Masyarakat" />
          </div>

          <Table
            columns={columns}
            data={currentData}
            onDetail={handleDetail}
            onDelete={handleDelete}
          />

          <div className="mt-4 flex justify-center pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
          />

          {isLoading && <FullScreenLoader />}
        </section>
      </main>
    </div>
  );
};

export default DataMasyarakat;
