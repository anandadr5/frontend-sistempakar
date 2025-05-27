import React from "react";
import Navbar from "@/components/user/navbar";
import Footer from "@/components/user/footer";
import SectionHeader from "@/components/user/sectionheader";
import DataCard from "@/components/user/datacard";

import PageFade from "@/components/pagefade";

import SakitJantung from "@/assets/sakit_jantung.jpg";
import AnimasiJantung from "@/assets/animasi_jantung.png";

const heartDiseaseDefinition = {
  title: "Pengertian Penyakit Jantung",
  description: [
    "Menurut Ryfai et al. (2022), penyakit jantung merupakan salah satu penyebab utama kematian di dunia, termasuk di Indonesia. Penyakit ini terjadi saat jantung mengalami gangguan dalam memompa darah, seperti penyumbatan pembuluh, gangguan katup, atau irama jantung tidak normal.",
    "Normalnya, detak jantung berkisar antara 50–70 denyut per menit. Jika terlalu tinggi atau rendah, bisa jadi ada gangguan jantung. Umumnya, penyebabnya adalah penumpukan kolesterol yang menghambat aliran darah dan meningkatkan tekanan darah. Oleh karena itu, deteksi dini sangat penting untuk mencegah komplikasi yang lebih serius.",
  ],
};

const heartSymptoms = [
  {
    emoji: "💔",
    title: "Nyeri Dada",
    description:
      "Merupakan gejala paling umum dari penyakit jantung, biasanya terasa seperti tekanan atau rasa tertindih di bagian tengah atau kiri dada. Rasa ini bisa menjalar ke bahu, lengan kiri, leher, rahang, atau punggung (Laksono et al., 2021).",
  },
  {
    emoji: "😮‍💨",
    title: "Sesak Napas",
    description:
      "Kondisi ketika napas terasa pendek dan tidak lega, bahkan saat beristirahat. Biasanya terjadi karena jantung tidak mampu memompa darah secara efisien sehingga paru-paru terisi cairan (Yoanny Putri Nurhalisa et al., 2022).",
  },
  {
    emoji: "💫",
    title: "Pusing",
    description:
      "Sensasi seperti melayang, ingin pingsan, atau kehilangan keseimbangan yang muncul mendadak. Hal ini bisa terjadi akibat gangguan aliran darah ke otak karena jantung tidak memompa secara optimal (Mu’jizatillah et al., 2021).",
  },
  {
    emoji: "😵",
    title: "Lemas",
    description:
      "Perasaan tubuh yang sangat lemah dan tidak bertenaga, bahkan untuk melakukan aktivitas ringan. Hal ini bisa disebabkan oleh suplai darah dan oksigen yang tidak mencukupi ke seluruh tubuh (Ramadhan, 2024).",
  },
  {
    emoji: "❤️‍🔥",
    title: "Jantung Berdebar",
    description:
      "Detak jantung yang terasa cepat, tidak beraturan, atau terlalu kuat. Kondisi ini bisa muncul secara tiba-tiba dan sering kali terasa hingga ke leher atau tenggorokan (Aziz et al., 2020).",
  },
  {
    emoji: "😴",
    title: "Mudah Lelah",
    description:
      "Merasa lelah luar biasa setelah melakukan aktivitas ringan atau bahkan tanpa aktivitas sama sekali. Ini mengindikasikan bahwa jantung tidak mampu memasok energi dengan cukup (A. A. Ginting, 2023).",
  },
  {
    emoji: "🦶",
    title: "Bengkak Kaki",
    description:
      "Akibat penumpukan cairan di kaki karena jantung tidak memompa darah kembali ke atas secara efisien. Biasanya terjadi pada pergelangan atau betis (Wisnu Nugroho Adi et al., 2024).",
  },
  {
    emoji: "🥶",
    title: "Keringat Dingin",
    description:
      "Keringat tiba-tiba yang muncul tanpa aktivitas atau suhu panas. Biasanya muncul bersamaan dengan gejala lain seperti nyeri dada atau pusing (Makarim, n.d.).",
  },
];

const preventionTips = [
  {
    emoji: "🚭",
    title: "Berhenti merokok",
    description:
      "Hentikan kebiasaan merokok untuk menurunkan risiko terkena penyakit jantung.",
  },
  {
    emoji: "⚖️",
    title: "Menjaga berat badan",
    description: "Pertahankan berat badan ideal untuk mencegah obesitas.",
  },
  {
    emoji: "🏃‍♂️",
    title: "Rutin olahraga",
    description:
      "Lakukan olahraga selama 30–60 menit setiap minimal 3x dalam seminggu.",
  },
  {
    emoji: "🍎",
    title: "Makan buah & sayur",
    description: "Perbanyak konsumsi buah, sayuran, dan lemak omega-3.",
  },
  {
    emoji: "💓",
    title: "Kontrol stres",
    description:
      "Kurangi stres dengan melakukan latihan pernapasan dan relaksasi.",
  },
  {
    emoji: "🩺",
    title: "Rutin cek kesehatan",
    description: "Lakukan pemeriksaan kesehatan secara berkala.",
  },
];

const PenyakitPage = () => {
  return (
    <PageFade>
      <div className="flex flex-col items-center w-full pt-20 bg-white">
        <Navbar />

        <SectionHeader
          title="Mengenal Penyakit Jantung"
          subtitle="Pengertian dan Pencegahan Penyakit Jantung"
        />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl px-6 mt-8">
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-black text-center">
              Penyakit Jantung
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src={SakitJantung}
              alt="Sakit jantung"
              className="max-w-full max-h-48 object-contain"
            />
          </div>
        </div>

        {/* Definition Section */}
        <div className="w-full max-w-6xl mt-12 px-6">
          <DataCard title={heartDiseaseDefinition.title}>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex-1 min-w-[280px] bg-white p-4 rounded-md shadow flex flex-col gap-2">
                <div className="w-24 h-24 self-center">
                  <img
                    src={AnimasiJantung}
                    alt="Animasi jantung"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                {heartDiseaseDefinition.description.map((para, index) => (
                  <p
                    key={index}
                    className="text-gray-800 text-base text-justify mb-4"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </DataCard>
        </div>

        {/* Separator */}
        <div className="w-full border-t border-gray-300 my-10" />

        {/* Gejala Section */}
        <div className="w-full max-w-6xl px-6">
          <DataCard title="Gejala Penyakit Jantung">
            <div className="flex flex-wrap -mx-2 mt-4">
              {heartSymptoms.map((symptom, index) => (
                <div key={index} className="basis-full md:basis-1/2 px-2 mb-4">
                  <div className="bg-white p-4 rounded-md shadow h-full flex flex-col gap-2">
                    <div className="text-3xl">{symptom.emoji}</div>
                    <h3 className="text-lg font-semibold text-black">
                      {symptom.title}
                    </h3>
                    <p className="text-gray-700 text-justify">
                      {symptom.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DataCard>
        </div>

        {/* Separator */}
        <div className="w-full border-t border-gray-300 my-10" />

        {/* Prevention Section */}
        <div className="w-full max-w-6xl px-6">
          <DataCard title="Pencegahan Penyakit Jantung">
            <div className="flex flex-wrap gap-4 mt-4">
              {preventionTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex-1 min-w-[280px] bg-white p-4 rounded-md shadow flex flex-col gap-2"
                >
                  <div className="text-2xl">{tip.emoji}</div>
                  <h3 className="text-lg font-semibold text-black">
                    {tip.title}
                  </h3>
                  <p className="text-gray-700">{tip.description}</p>
                </div>
              ))}
            </div>
          </DataCard>
        </div>

        {/* Separator */}
        <div className="w-full border-t border-gray-300 my-10" />
        <Footer />
      </div>
    </PageFade>
  );
};

export default PenyakitPage;
