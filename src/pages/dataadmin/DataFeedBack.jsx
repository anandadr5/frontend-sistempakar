import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "@/components/admin/sidebar";
import NavbarAdmin from "@/components/admin/navbaradmin";
import AdminTitle from "@/components/admin/admintitle";
import Table from "@/components/admin/table";
import Pagination from "@/components/admin/pagination";

const BASE_URL = import.meta.env.VITE_API_URL;

const DataFeedBack = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Nama", field: "nama" },
    { label: "Email", field: "email" },
    { label: "Pesan", field: "pesan" },
  ];

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch(`${BASE_URL}/api/feedback`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleDelete = async (row) => {
    try {
      const response = await fetch(`${BASE_URL}/api/feedback/${row.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData((prev) => prev.filter((item) => item.id !== row.id));
        toast.success(`Feedback dari ${row.nama} berhasil dihapus.`);
      } else {
        toast.error("Gagal menghapus data.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Terjadi kesalahan saat menghapus data.");
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      <aside className="w-1/4 sm:w-1/5 h-full bg-white shadow-lg">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col h-full">
        <NavbarAdmin title="Data Feedback" />

        <section className="flex-1 flex flex-col p-6 overflow-auto">
          <div className="sticky top-0 bg-gray-100 z-10 py-4">
            <AdminTitle title="Evaluasi & Saran Masyarakat" />
          </div>

          <Table
            columns={columns}
            data={currentData}
            onDelete={handleDelete}
            showDetailAction={false}
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
          />
        </section>
      </main>
    </div>
  );
};

export default DataFeedBack;
