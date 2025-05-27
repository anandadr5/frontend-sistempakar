import React from "react";
import Sidebar from "@/components/admin/sidebar";
import NavbarAdmin from "@/components/admin/navbaradmin";
import Charts from "@/components/admin/charts";

const Dashboard = () => {
  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-1/4 sm:w-1/5 h-full bg-white shadow-lg">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full">
        {/* Top Navbar */}
        <NavbarAdmin title="Dashboard" />

        {/* Charts Section */}
        <section className="flex-1 p-6 overflow-auto">
          <Charts />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
