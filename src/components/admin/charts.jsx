import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Charts = () => {
  const [data, setData] = useState([]);
  const [totalDiagnosis, setTotalDiagnosis] = useState(0);

  const fetchChartData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/statistik-harian");
      const json = await res.json();
      setData(json);

      const total = json.reduce((sum, item) => sum + item.diagnosis, 0);
      setTotalDiagnosis(total);
    } catch (err) {
      console.error("Gagal ambil data statistik:", err);
    }
  };

  useEffect(() => {
    fetchChartData();
    const interval = setInterval(fetchChartData, 10000); // tiap 10 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10 gap-6 bg-gray-100 min-h-screen">
      <p className="text-5xl font-bold text-black text-center">
        Statistik Diagnosis Penyakit Jantung
      </p>
      <hr className="w-full border-t border-black opacity-10" />

      {/* Box Total Diagnosis */}
      <div className="w-full flex flex-col items-start gap-4 text-black">
        <div className="bg-[#d6eadf] p-4 rounded-md border border-black/10">
          <p className="text-base">Total Diagnosis</p>
          <p className="text-2xl font-semibold">{totalDiagnosis} Diagnosis</p>
        </div>

        {/* Grafik */}
        <div className="w-full h-[440px] bg-[#d6eadf] p-5 rounded-md border border-black/10">
          <p className="text-xl font-medium text-black">Statistik Diagnosis</p>
          <p className="text-base text-black/50">Jumlah Diagnosis / Hari</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="diagnosis"
                stroke="#8B8ACF"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
